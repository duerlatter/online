/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: PMWXl90eJgqvqwOPblLQzIYMBzbln/DK
 */
package net.shopxx.entity;

import com.fasterxml.jackson.annotation.JsonView;
import net.shopxx.BaseAttributeConverter;
import net.shopxx.BigDecimalNumericFieldBridge;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang.StringUtils;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Store;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.*;

/**
 * Entity - 商品
 *
 * @author ixincheng
 * @version 6.1
 */
@Indexed
@Entity
public class Product extends BaseEntity<Long> {

    private static final long serialVersionUID = -6977025562650112419L;

    /**
     * 点击数缓存名称
     */
    public static final String HITS_CACHE_NAME = "productHits";

    public static final String USER_VIEW_CACHE_NAME = "userViewClick";

    /**
     * 属性值属性个数
     */
    public static final int ATTRIBUTE_VALUE_PROPERTY_COUNT = 20;

    /**
     * 属性值属性名称前缀
     */
    public static final String ATTRIBUTE_VALUE_PROPERTY_NAME_PREFIX = "attributeValue";

    /**
     * 最大商品图片数量
     */
    public static final int MAX_PRODUCT_IMAGE_SIZE = 20;

    /**
     * 最大参数值数量
     */
    public static final int MAX_PARAMETER_VALUE_SIZE = 100;

    /**
     * 最大规格项数量
     */
    public static final int MAX_SPECIFICATION_ITEM_SIZE = 100;

    /**
     * 路径
     */
    private static final String PATH = "/product/detail/%d";

    /**
     * 类型
     */
    public enum Type {

        /**
         * 普通商品
         */
        GENERAL,

        /**
         * 兑换商品
         */
        EXCHANGE,

        /**
         * 赠品
         */
        GIFT
    }

    /**
     * 排序类型
     */
    public enum OrderType {

        /**
         * 置顶降序
         */
        TOP_DESC,

        /**
         * 价格升序
         */
        PRICE_ASC,

        /**
         * 价格降序
         */
        PRICE_DESC,

        /**
         * 销量降序
         */
        SALES_DESC,

        /**
         * 评分降序
         */
        SCORE_DESC,

        /**
         * 日期降序
         */
        DATE_DESC
    }

    /**
     * 排名类型
     */
    public enum RankingType {

        /**
         * 评分
         */
        SCORE,

        /**
         * 评分数
         */
        SCORE_COUNT,

        /**
         * 周点击数
         */
        WEEK_HITS,

        /**
         * 月点击数
         */
        MONTH_HITS,

        /**
         * 点击数
         */
        HITS,

        /**
         * 周销量
         */
        WEEK_SALES,

        /**
         * 月销量
         */
        MONTH_SALES,

        /**
         * 销量
         */
        SALES
    }

    /**
     * 编号
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @Length(max = 100)
    @Pattern(regexp = "^[0-9a-zA-Z_-]+$")
    @Column(nullable = false, updatable = false, unique = true)
    private String sn;

    /**
     * 名称
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.YES)
    @Boost(1.5F)
    @NotEmpty
    @Length(max = 200)
    @Column(nullable = false)
    private String name;

    /**
     * 副标题
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.NO, analyze = Analyze.NO)
    @Length(max = 200)
    private String caption;

    /**
     * 类型
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NotNull(groups = Save.class)
    @Column(nullable = false, updatable = false)
    private Product.Type type;

    /**
     * 销售价
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @FieldBridge(impl = BigDecimalNumericFieldBridge.class)
    @SortableField
    @Column(nullable = false, precision = 21, scale = 6)
    private BigDecimal price;

    /**
     * 成本价
     */
    @Column(precision = 21, scale = 6)
    private BigDecimal cost;

    /**
     * 市场价
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.NO, analyze = Analyze.NO)
    @NumericField
    @FieldBridge(impl = BigDecimalNumericFieldBridge.class)
    @Column(nullable = false, precision = 21, scale = 6)
    private BigDecimal marketPrice;

    /**
     * 最大佣金
     */
    @Min(0)
    @Digits(integer = 12, fraction = 3)
    @Column(nullable = false, precision = 21, scale = 6)
    private BigDecimal maxCommission;

    /**
     * 单位
     */
    @Field(store = Store.YES, index = Index.NO, analyze = Analyze.NO)
    @Length(max = 200)
    private String unit;

    /**
     * 重量
     */
    @Field(store = Store.YES, index = Index.NO, analyze = Analyze.NO)
    @NumericField
    @Min(0)
    private Integer weight;

    /**
     * 是否上架
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NotNull
    @Column(nullable = false)
    private Boolean isMarketable;

    /**
     * 是否列出
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NotNull
    @Column(nullable = false)
    private Boolean isList;

    /**
     * 是否置顶
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @SortableField
    @NotNull
    @Column(nullable = false)
    private Boolean isTop;

    /**
     * 是否需要物流
     */
    @NotNull
    @Column(nullable = false)
    private Boolean isDelivery;

    /**
     * 是否有效
     */
    @JsonView(BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @Column(nullable = false)
    private Boolean isActive;

    /**
     * 介绍
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.YES)
    @Lob
    private String introduction;

    /**
     * 备注
     */
    @Length(max = 200)
    private String memo;

    /**
     * 搜索关键词
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.YES)
    @Boost(1.5F)
    @Length(max = 200)
    private String keyword;

    /**
     * 评分
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @SortableField
    @Column(nullable = false, precision = 12, scale = 6)
    private Float score;

    /**
     * 总评分
     */
    @Column(nullable = false)
    private Long totalScore;

    /**
     * 评分数
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @Column(nullable = false)
    private Long scoreCount;

    /**
     * 周点击数
     */
    @Column(nullable = false)
    private Long weekHits;

    /**
     * 月点击数
     */
    @Column(nullable = false)
    private Long monthHits;

    /**
     * 点击数
     */
    @Column(nullable = false)
    private Long hits;

    @Column
    private Long uv;

    /**
     * 周销量
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @Column(nullable = false)
    private Long weekSales;

    /**
     * 月销量
     */
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @Column(nullable = false)
    private Long monthSales;

    /**
     * 销量
     */
    @JsonView(BaseEntity.BaseView.class)
    @Field(store = Store.YES, index = Index.YES, analyze = Analyze.NO)
    @NumericField
    @SortableField
    @Column(nullable = false)
    private Long sales;

    /**
     * 周点击数更新日期
     */
    @Column(nullable = false)
    private Date weekHitsDate;

    /**
     * 月点击数更新日期
     */
    @Column(nullable = false)
    private Date monthHitsDate;

    /**
     * 周销量更新日期
     */
    @Column(nullable = false)
    private Date weekSalesDate;

    /**
     * 月销量更新日期
     */
    @Column(nullable = false)
    private Date monthSalesDate;

    /**
     * 属性值0
     */
    @Length(max = 200)
    private String attributeValue0;

    /**
     * 属性值1
     */
    @Length(max = 200)
    private String attributeValue1;

    /**
     * 属性值2
     */
    @Length(max = 200)
    private String attributeValue2;

    /**
     * 属性值3
     */
    @Length(max = 200)
    private String attributeValue3;

    /**
     * 属性值4
     */
    @Length(max = 200)
    private String attributeValue4;

    /**
     * 属性值5
     */
    @Length(max = 200)
    private String attributeValue5;

    /**
     * 属性值6
     */
    @Length(max = 200)
    private String attributeValue6;

    /**
     * 属性值7
     */
    @Length(max = 200)
    private String attributeValue7;

    /**
     * 属性值8
     */
    @Length(max = 200)
    private String attributeValue8;

    /**
     * 属性值9
     */
    @Length(max = 200)
    private String attributeValue9;

    /**
     * 属性值10
     */
    @Length(max = 200)
    private String attributeValue10;

    /**
     * 属性值11
     */
    @Length(max = 200)
    private String attributeValue11;

    /**
     * 属性值12
     */
    @Length(max = 200)
    private String attributeValue12;

    /**
     * 属性值13
     */
    @Length(max = 200)
    private String attributeValue13;

    /**
     * 属性值14
     */
    @Length(max = 200)
    private String attributeValue14;

    /**
     * 属性值15
     */
    @Length(max = 200)
    private String attributeValue15;

    /**
     * 属性值16
     */
    @Length(max = 200)
    private String attributeValue16;

    /**
     * 属性值17
     */
    @Length(max = 200)
    private String attributeValue17;

    /**
     * 属性值18
     */
    @Length(max = 200)
    private String attributeValue18;

    /**
     * 属性值19
     */
    @Length(max = 200)
    private String attributeValue19;

    /**
     * 店铺
     */
    @JsonView(BaseView.class)
    @IndexedEmbedded(includeEmbeddedObjectId = true)
    @NotNull(groups = Save.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private net.shopxx.entity.Store store;

    /**
     * 商品分类
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private ProductCategory productCategory;

    /**
     * 店铺商品分类
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private StoreProductCategory storeProductCategory;

    /**
     * 品牌
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private Brand brand;

    /**
     * 商品图片
     */
    @Valid
    @Size(max = MAX_PRODUCT_IMAGE_SIZE)
    @Column(length = 4000)
    @Convert(converter = ProductImageConverter.class)
    private List<ProductImage> productImages = new ArrayList<>();

    /**
     * 参数值
     */
    @Valid
    @Size(max = MAX_PARAMETER_VALUE_SIZE)
    @Column(length = 4000)
    @Convert(converter = ParameterValueConverter.class)
    private List<ParameterValue> parameterValues = new ArrayList<>();

    /**
     * 规格项
     */
    @Valid
    @Size(max = MAX_SPECIFICATION_ITEM_SIZE)
    @Column(length = 4000)
    @Convert(converter = SpecificationItemConverter.class)
    private List<SpecificationItem> specificationItems = new ArrayList<>();

    /**
     * 促销
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @OrderBy("order asc")
    private Set<Promotion> promotions = new HashSet<>();

    /**
     * 商品标签
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @OrderBy("order asc")
    private Set<ProductTag> productTags = new HashSet<>();

    /**
     * 店铺商品标签
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @OrderBy("order asc")
    private Set<StoreProductTag> storeProductTags = new HashSet<>();

    /**
     * 评论
     */
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Review> reviews = new HashSet<>();

    /**
     * 咨询
     */
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<Consultation> consultations = new HashSet<>();

    /**
     * 商品收藏
     */
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<ProductFavorite> productFavorites = new HashSet<>();

    /**
     * SKU
     */
    @IndexedEmbedded(depth = 1)
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Sku> skus = new HashSet<>();


    /**
     * 医师推荐星级
     */
    @Column
    private Integer recommends;
    /**
     * 医师推荐语
     */
    @Column
    private String recommentContent;
    
    /**
     * 医师推荐数
     */
    @Column
    private Integer doctorRecommends;
    
    @Column
    private Long defaultSales;
    
    @Column
    private Long totalSales;
    
    
    /**
     * 获取编号
     *
     * @return 编号
     */
    public String getSn() {
        return sn;
    }

    /**
     * 设置编号
     *
     * @param sn 编号
     */
    public void setSn(String sn) {
        this.sn = sn;
    }

    /**
     * 获取名称
     *
     * @return 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置名称
     *
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取副标题
     *
     * @return 副标题
     */
    public String getCaption() {
        return caption;
    }

    /**
     * 设置副标题
     *
     * @param caption 副标题
     */
    public void setCaption(String caption) {
        this.caption = caption;
    }

    /**
     * 获取类型
     *
     * @return 类型
     */
    public Product.Type getType() {
        return type;
    }

    /**
     * 设置类型
     *
     * @param type 类型
     */
    public void setType(Product.Type type) {
        this.type = type;
    }

    /**
     * 获取销售价
     *
     * @return 销售价
     */
    public BigDecimal getPrice() {
        return price;
    }

    /**
     * 设置销售价
     *
     * @param price 销售价
     */
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    /**
     * 获取成本价
     *
     * @return 成本价
     */
    public BigDecimal getCost() {
        return cost;
    }

    /**
     * 设置成本价
     *
     * @param cost 成本价
     */
    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    /**
     * 获取市场价
     *
     * @return 市场价
     */
    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    /**
     * 设置市场价
     *
     * @param marketPrice 市场价
     */
    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    /**
     * 获取最大佣金
     *
     * @return 最大佣金
     */
    public BigDecimal getMaxCommission() {
        return maxCommission;
    }

    /**
     * 设置最大佣金
     *
     * @param maxCommission 最大佣金
     */
    public void setMaxCommission(BigDecimal maxCommission) {
        this.maxCommission = maxCommission;
    }

    /**
     * 获取单位
     *
     * @return 单位
     */
    public String getUnit() {
        return unit;
    }

    /**
     * 设置单位
     *
     * @param unit 单位
     */
    public void setUnit(String unit) {
        this.unit = unit;
    }

    /**
     * 获取重量
     *
     * @return 重量
     */
    public Integer getWeight() {
        return weight;
    }

    /**
     * 设置重量
     *
     * @param weight 重量
     */
    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    /**
     * 获取是否上架
     *
     * @return 是否上架
     */
    public Boolean getIsMarketable() {
        return isMarketable;
    }

    /**
     * 设置是否上架
     *
     * @param isMarketable 是否上架
     */
    public void setIsMarketable(Boolean isMarketable) {
        this.isMarketable = isMarketable;
    }

    /**
     * 获取是否列出
     *
     * @return 是否列出
     */
    public Boolean getIsList() {
        return isList;
    }

    /**
     * 设置是否列出
     *
     * @param isList 是否列出
     */
    public void setIsList(Boolean isList) {
        this.isList = isList;
    }

    /**
     * 获取是否置顶
     *
     * @return 是否置顶
     */
    public Boolean getIsTop() {
        return isTop;
    }

    /**
     * 设置是否置顶
     *
     * @param isTop 是否置顶
     */
    public void setIsTop(Boolean isTop) {
        this.isTop = isTop;
    }

    /**
     * 获取是否需要物流
     *
     * @return 是否需要物流
     */
    public Boolean getIsDelivery() {
        return isDelivery;
    }

    /**
     * 设置是否需要物流
     *
     * @param isDelivery 是否需要物流
     */
    public void setIsDelivery(Boolean isDelivery) {
        this.isDelivery = isDelivery;
    }

    /**
     * 获取是否有效
     *
     * @return 是否有效
     */
    public Boolean getIsActive() {
        return isActive;
    }

    /**
     * 设置是否有效
     *
     * @param isActive 是否有效
     */
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     * 获取介绍
     *
     * @return 介绍
     */
    public String getIntroduction() {
        return introduction;
    }

    /**
     * 设置介绍
     *
     * @param introduction 介绍
     */
    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    /**
     * 获取备注
     *
     * @return 备注
     */
    public String getMemo() {
        return memo;
    }

    /**
     * 设置备注
     *
     * @param memo 备注
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * 获取搜索关键词
     *
     * @return 搜索关键词
     */
    public String getKeyword() {
        return keyword;
    }

    /**
     * 设置搜索关键词
     *
     * @param keyword 搜索关键词
     */
    public void setKeyword(String keyword) {
        if (keyword != null) {
            keyword = keyword.replaceAll("[,\\s]*,[,\\s]*", ",").replaceAll("^,|,$", StringUtils.EMPTY);
        }
        this.keyword = keyword;
    }

    /**
     * 获取评分
     *
     * @return 评分
     */
    public Float getScore() {
        return score;
    }

    /**
     * 设置评分
     *
     * @param score 评分
     */
    public void setScore(Float score) {
        this.score = score;
    }

    /**
     * 获取总评分
     *
     * @return 总评分
     */
    public Long getTotalScore() {
        return totalScore;
    }

    /**
     * 设置总评分
     *
     * @param totalScore 总评分
     */
    public void setTotalScore(Long totalScore) {
        this.totalScore = totalScore;
    }

    /**
     * 获取评分数
     *
     * @return 评分数
     */
    public Long getScoreCount() {
        return scoreCount;
    }

    /**
     * 设置评分数
     *
     * @param scoreCount 评分数
     */
    public void setScoreCount(Long scoreCount) {
        this.scoreCount = scoreCount;
    }

    /**
     * 获取周点击数
     *
     * @return 周点击数
     */
    public Long getWeekHits() {
        return weekHits;
    }

    /**
     * 设置周点击数
     *
     * @param weekHits 周点击数
     */
    public void setWeekHits(Long weekHits) {
        this.weekHits = weekHits;
    }

    /**
     * 获取月点击数
     *
     * @return 月点击数
     */
    public Long getMonthHits() {
        return monthHits;
    }

    /**
     * 设置月点击数
     *
     * @param monthHits 月点击数
     */
    public void setMonthHits(Long monthHits) {
        this.monthHits = monthHits;
    }

    /**
     * 获取点击数
     *
     * @return 点击数
     */
    public Long getHits() {
        return hits;
    }

    /**
     * 设置点击数
     *
     * @param hits 点击数
     */
    public void setHits(Long hits) {
        this.hits = hits;
    }

    /**
     * 获取周销量
     *
     * @return 周销量
     */
    public Long getWeekSales() {
        return weekSales;
    }

    /**
     * 设置周销量
     *
     * @param weekSales 周销量
     */
    public void setWeekSales(Long weekSales) {
        this.weekSales = weekSales;
    }

    /**
     * 获取月销量
     *
     * @return 月销量
     */
    public Long getMonthSales() {
        return monthSales;
    }

    /**
     * 设置月销量
     *
     * @param monthSales 月销量
     */
    public void setMonthSales(Long monthSales) {
        this.monthSales = monthSales;
    }

    /**
     * 获取销量
     *
     * @return 销量
     */
    public Long getSales() {
        return sales;
    }

    /**
     * 设置销量
     *
     * @param sales 销量
     */
    public void setSales(Long sales) {
        this.sales = sales;
    }

    /**
     * 获取周点击数更新日期
     *
     * @return 周点击数更新日期
     */
    public Date getWeekHitsDate() {
        return weekHitsDate;
    }

    /**
     * 设置周点击数更新日期
     *
     * @param weekHitsDate 周点击数更新日期
     */
    public void setWeekHitsDate(Date weekHitsDate) {
        this.weekHitsDate = weekHitsDate;
    }

    /**
     * 获取月点击数更新日期
     *
     * @return 月点击数更新日期
     */
    public Date getMonthHitsDate() {
        return monthHitsDate;
    }

    /**
     * 设置月点击数更新日期
     *
     * @param monthHitsDate 月点击数更新日期
     */
    public void setMonthHitsDate(Date monthHitsDate) {
        this.monthHitsDate = monthHitsDate;
    }

    /**
     * 获取周销量更新日期
     *
     * @return 周销量更新日期
     */
    public Date getWeekSalesDate() {
        return weekSalesDate;
    }

    /**
     * 设置周销量更新日期
     *
     * @param weekSalesDate 周销量更新日期
     */
    public void setWeekSalesDate(Date weekSalesDate) {
        this.weekSalesDate = weekSalesDate;
    }

    /**
     * 获取月销量更新日期
     *
     * @return 月销量更新日期
     */
    public Date getMonthSalesDate() {
        return monthSalesDate;
    }

    /**
     * 设置月销量更新日期
     *
     * @param monthSalesDate 月销量更新日期
     */
    public void setMonthSalesDate(Date monthSalesDate) {
        this.monthSalesDate = monthSalesDate;
    }

    /**
     * 获取属性值0
     *
     * @return 属性值0
     */
    public String getAttributeValue0() {
        return attributeValue0;
    }

    /**
     * 设置属性值0
     *
     * @param attributeValue0 属性值0
     */
    public void setAttributeValue0(String attributeValue0) {
        this.attributeValue0 = attributeValue0;
    }

    /**
     * 获取属性值1
     *
     * @return 属性值1
     */
    public String getAttributeValue1() {
        return attributeValue1;
    }

    /**
     * 设置属性值1
     *
     * @param attributeValue1 属性值1
     */
    public void setAttributeValue1(String attributeValue1) {
        this.attributeValue1 = attributeValue1;
    }

    /**
     * 获取属性值2
     *
     * @return 属性值2
     */
    public String getAttributeValue2() {
        return attributeValue2;
    }

    /**
     * 设置属性值2
     *
     * @param attributeValue2 属性值2
     */
    public void setAttributeValue2(String attributeValue2) {
        this.attributeValue2 = attributeValue2;
    }

    /**
     * 获取属性值3
     *
     * @return 属性值3
     */
    public String getAttributeValue3() {
        return attributeValue3;
    }

    /**
     * 设置属性值3
     *
     * @param attributeValue3 属性值3
     */
    public void setAttributeValue3(String attributeValue3) {
        this.attributeValue3 = attributeValue3;
    }

    /**
     * 获取属性值4
     *
     * @return 属性值4
     */
    public String getAttributeValue4() {
        return attributeValue4;
    }

    /**
     * 设置属性值4
     *
     * @param attributeValue4 属性值4
     */
    public void setAttributeValue4(String attributeValue4) {
        this.attributeValue4 = attributeValue4;
    }

    /**
     * 获取属性值5
     *
     * @return 属性值5
     */
    public String getAttributeValue5() {
        return attributeValue5;
    }

    /**
     * 设置属性值5
     *
     * @param attributeValue5 属性值5
     */
    public void setAttributeValue5(String attributeValue5) {
        this.attributeValue5 = attributeValue5;
    }

    /**
     * 获取属性值6
     *
     * @return 属性值6
     */
    public String getAttributeValue6() {
        return attributeValue6;
    }

    /**
     * 设置属性值6
     *
     * @param attributeValue6 属性值6
     */
    public void setAttributeValue6(String attributeValue6) {
        this.attributeValue6 = attributeValue6;
    }

    /**
     * 获取属性值7
     *
     * @return 属性值7
     */
    public String getAttributeValue7() {
        return attributeValue7;
    }

    /**
     * 设置属性值7
     *
     * @param attributeValue7 属性值7
     */
    public void setAttributeValue7(String attributeValue7) {
        this.attributeValue7 = attributeValue7;
    }

    /**
     * 获取属性值8
     *
     * @return 属性值8
     */
    public String getAttributeValue8() {
        return attributeValue8;
    }

    /**
     * 设置属性值8
     *
     * @param attributeValue8 属性值8
     */
    public void setAttributeValue8(String attributeValue8) {
        this.attributeValue8 = attributeValue8;
    }

    /**
     * 获取属性值9
     *
     * @return 属性值9
     */
    public String getAttributeValue9() {
        return attributeValue9;
    }

    /**
     * 设置属性值9
     *
     * @param attributeValue9 属性值9
     */
    public void setAttributeValue9(String attributeValue9) {
        this.attributeValue9 = attributeValue9;
    }

    /**
     * 获取属性值10
     *
     * @return 属性值10
     */
    public String getAttributeValue10() {
        return attributeValue10;
    }

    /**
     * 设置属性值10
     *
     * @param attributeValue10 属性值10
     */
    public void setAttributeValue10(String attributeValue10) {
        this.attributeValue10 = attributeValue10;
    }

    /**
     * 获取属性值11
     *
     * @return 属性值11
     */
    public String getAttributeValue11() {
        return attributeValue11;
    }

    /**
     * 设置属性值11
     *
     * @param attributeValue11 属性值11
     */
    public void setAttributeValue11(String attributeValue11) {
        this.attributeValue11 = attributeValue11;
    }

    /**
     * 获取属性值12
     *
     * @return 属性值12
     */
    public String getAttributeValue12() {
        return attributeValue12;
    }

    /**
     * 设置属性值12
     *
     * @param attributeValue12 属性值12
     */
    public void setAttributeValue12(String attributeValue12) {
        this.attributeValue12 = attributeValue12;
    }

    /**
     * 获取属性值13
     *
     * @return 属性值13
     */
    public String getAttributeValue13() {
        return attributeValue13;
    }

    /**
     * 设置属性值13
     *
     * @param attributeValue13 属性值13
     */
    public void setAttributeValue13(String attributeValue13) {
        this.attributeValue13 = attributeValue13;
    }

    /**
     * 获取属性值14
     *
     * @return 属性值14
     */
    public String getAttributeValue14() {
        return attributeValue14;
    }

    /**
     * 设置属性值14
     *
     * @param attributeValue14 属性值14
     */
    public void setAttributeValue14(String attributeValue14) {
        this.attributeValue14 = attributeValue14;
    }

    /**
     * 获取属性值15
     *
     * @return 属性值15
     */
    public String getAttributeValue15() {
        return attributeValue15;
    }

    /**
     * 设置属性值15
     *
     * @param attributeValue15 属性值15
     */
    public void setAttributeValue15(String attributeValue15) {
        this.attributeValue15 = attributeValue15;
    }

    /**
     * 获取属性值16
     *
     * @return 属性值16
     */
    public String getAttributeValue16() {
        return attributeValue16;
    }

    /**
     * 设置属性值16
     *
     * @param attributeValue16 属性值16
     */
    public void setAttributeValue16(String attributeValue16) {
        this.attributeValue16 = attributeValue16;
    }

    /**
     * 获取属性值17
     *
     * @return 属性值17
     */
    public String getAttributeValue17() {
        return attributeValue17;
    }

    /**
     * 设置属性值17
     *
     * @param attributeValue17 属性值17
     */
    public void setAttributeValue17(String attributeValue17) {
        this.attributeValue17 = attributeValue17;
    }

    /**
     * 获取属性值18
     *
     * @return 属性值18
     */
    public String getAttributeValue18() {
        return attributeValue18;
    }

    /**
     * 设置属性值18
     *
     * @param attributeValue18 属性值18
     */
    public void setAttributeValue18(String attributeValue18) {
        this.attributeValue18 = attributeValue18;
    }

    /**
     * 获取属性值19
     *
     * @return 属性值19
     */
    public String getAttributeValue19() {
        return attributeValue19;
    }

    /**
     * 设置属性值19
     *
     * @param attributeValue19 属性值19
     */
    public void setAttributeValue19(String attributeValue19) {
        this.attributeValue19 = attributeValue19;
    }

    /**
     * 获取店铺
     *
     * @return 店铺
     */
    public net.shopxx.entity.Store getStore() {
        return store;
    }

    /**
     * 设置店铺
     *
     * @param store 店铺
     */
    public void setStore(net.shopxx.entity.Store store) {
        this.store = store;
    }

    /**
     * 获取商品分类
     *
     * @return 商品分类
     */
    public ProductCategory getProductCategory() {
        return productCategory;
    }

    /**
     * 设置商品分类
     *
     * @param productCategory 商品分类
     */
    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    /**
     * 获取店铺商品分类
     *
     * @return 店铺商品分类
     */
    public StoreProductCategory getStoreProductCategory() {
        return storeProductCategory;
    }

    /**
     * 设置店铺商品分类
     *
     * @param storeProductCategory 店铺商品分类
     */
    public void setStoreProductCategory(StoreProductCategory storeProductCategory) {
        this.storeProductCategory = storeProductCategory;
    }

    /**
     * 获取品牌
     *
     * @return 品牌
     */
    public Brand getBrand() {
        return brand;
    }

    /**
     * 设置品牌
     *
     * @param brand 品牌
     */
    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    /**
     * 获取商品图片
     *
     * @return 商品图片
     */
    public List<ProductImage> getProductImages() {
        return productImages;
    }

    /**
     * 设置商品图片
     *
     * @param productImages 商品图片
     */
    public void setProductImages(List<ProductImage> productImages) {
        this.productImages = productImages;
    }

    /**
     * 获取参数值
     *
     * @return 参数值
     */
    public List<ParameterValue> getParameterValues() {
        return parameterValues;
    }

    /**
     * 设置参数值
     *
     * @param parameterValues 参数值
     */
    public void setParameterValues(List<ParameterValue> parameterValues) {
        this.parameterValues = parameterValues;
    }

    /**
     * 获取规格项
     *
     * @return 规格项
     */
    public List<SpecificationItem> getSpecificationItems() {
        return specificationItems;
    }

    /**
     * 设置规格项
     *
     * @param specificationItems 规格项
     */
    public void setSpecificationItems(List<SpecificationItem> specificationItems) {
        this.specificationItems = specificationItems;
    }

    /**
     * 获取促销
     *
     * @return 促销
     */
    public Set<Promotion> getPromotions() {
        return promotions;
    }

    /**
     * 设置促销
     *
     * @param promotions 促销
     */
    public void setPromotions(Set<Promotion> promotions) {
        this.promotions = promotions;
    }

    /**
     * 获取商品标签
     *
     * @return 商品标签
     */
    public Set<ProductTag> getProductTags() {
        return productTags;
    }

    /**
     * 设置商品标签
     *
     * @param productTags 商品标签
     */
    public void setProductTags(Set<ProductTag> productTags) {
        this.productTags = productTags;
    }

    /**
     * 获取店铺商品标签
     *
     * @return 店铺商品标签
     */
    public Set<StoreProductTag> getStoreProductTags() {
        return storeProductTags;
    }

    /**
     * 设置店铺商品标签
     *
     * @param storeProductTags 店铺商品标签
     */
    public void setStoreProductTags(Set<StoreProductTag> storeProductTags) {
        this.storeProductTags = storeProductTags;
    }

    /**
     * 获取评论
     *
     * @return 评论
     */
    public Set<Review> getReviews() {
        return reviews;
    }

    /**
     * 设置评论
     *
     * @param reviews 评论
     */
    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    /**
     * 获取咨询
     *
     * @return 咨询
     */
    public Set<Consultation> getConsultations() {
        return consultations;
    }

    /**
     * 设置咨询
     *
     * @param consultations 咨询
     */
    public void setConsultations(Set<Consultation> consultations) {
        this.consultations = consultations;
    }

    /**
     * 获取商品收藏
     *
     * @return 商品收藏
     */
    public Set<ProductFavorite> getProductFavorites() {
        return productFavorites;
    }

    /**
     * 设置商品收藏
     *
     * @param productFavorites 商品收藏
     */
    public void setProductFavorites(Set<ProductFavorite> productFavorites) {
        this.productFavorites = productFavorites;
    }

    /**
     * 获取SKU
     *
     * @return SKU
     */
    public Set<Sku> getSkus() {
        return skus;
    }

    /**
     * 设置SKU
     *
     * @param skus SKU
     */
    public void setSkus(Set<Sku> skus) {
        this.skus = skus;
    }


    public Integer getRecommends() {
        return recommends;
    }

    public void setRecommends(Integer recommends) {
        this.recommends = recommends;
    }

    public Long getUv() {
        return uv;
    }

    public void setUv(Long uv) {
        this.uv = uv;
    }

    public String getRecommentContent() {
        return recommentContent;
    }

    public void setRecommentContent(String recommentContent) {
        this.recommentContent = recommentContent;
    }

    
    public Integer getDoctorRecommends() {
		return doctorRecommends;
	}

	public void setDoctorRecommends(Integer doctorRecommends) {
		this.doctorRecommends = doctorRecommends;
	}
	
	
	public Long getDefaultSales() {
		return defaultSales;
	}

	public void setDefaultSales(Long defaultSales) {
		this.defaultSales = defaultSales;
	}

	
	public Long getTotalSales() {
		return totalSales;
	}

	public void setTotalSales(Long totalSales) {
		this.totalSales = totalSales;
	}

	/**
     * 获取路径
     *
     * @return 路径
     */
    @JsonView(BaseView.class)
    @Transient
    public String getPath() {
        return String.format(Product.PATH, getId());
    }

    /**
     * 获取缩略图
     *
     * @return 缩略图
     */
    @JsonView(BaseView.class)
    @Transient
    public String getThumbnail() {
        if (CollectionUtils.isEmpty(getProductImages())) {
            return null;
        }
        return getProductImages().get(0).getThumbnail();
    }

    /**
     * 获取是否库存警告
     *
     * @return 是否库存警告
     */
    @Transient
    public boolean getIsStockAlert() {
        return CollectionUtils.exists(getSkus(), new Predicate() {

            public boolean evaluate(Object object) {
                Sku sku = (Sku) object;
                return sku != null && sku.getIsStockAlert();
            }
        });
    }

    public static void main(String[] args) {
    	String[] langs = {"java1", "python", "c"};
		boolean exists = CollectionUtils.exists(Arrays.asList(langs), new Predicate() {
			public boolean evaluate(Object object) {
				return "java".equals((String)object);
			}
		});

		System.out.println(exists);
	}
    
    /**
     * 获取是否缺货
     *
     * @return 是否缺货
     */
    @Transient
    public boolean getIsOutOfStock() {
        return CollectionUtils.exists(getSkus(), new Predicate() {

            public boolean evaluate(Object object) {
                Sku sku = (Sku) object;
                return sku != null && sku.getIsOutOfStock();
            }
        });
    }

    /**
     * 获取规格项条目ID
     *
     * @return 规格项条目ID
     */
    @Transient
    public List<Integer> getSpecificationItemEntryIds() {
        List<Integer> specificationItemEntryIds = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(getSpecificationItems())) {
            for (SpecificationItem specificationItem : getSpecificationItems()) {
                if (CollectionUtils.isNotEmpty(specificationItem.getEntries())) {
                    for (SpecificationItem.Entry entry : specificationItem.getEntries()) {
                        specificationItemEntryIds.add(entry.getId());
                    }
                }
            }
            Collections.sort(specificationItemEntryIds);
        }
        return specificationItemEntryIds;
    }

    /**
     * 获取默认SKU
     *
     * @return 默认SKU
     */
    @JsonView(BaseView.class)
    @Transient
    public Sku getDefaultSku() {
        return (Sku) CollectionUtils.find(getSkus(), new Predicate() {

            public boolean evaluate(Object object) {
                Sku sku = (Sku) object;
                return sku != null && sku.getIsDefault();
            }
        });
    }

    /**
     * 获取赠送积分
     *
     * @return 赠送积分
     */
    @JsonView(BaseView.class)
    @Transient
    public Long getRewardPoint() {
        Sku defaultSku = getDefaultSku();
        return defaultSku != null ? defaultSku.getRewardPoint() : null;
    }

    /**
     * 获取兑换积分
     *
     * @return 兑换积分
     */
    @JsonView(BaseView.class)
    @Transient
    public Long getExchangePoint() {
        Sku defaultSku = getDefaultSku();
        return defaultSku != null ? defaultSku.getExchangePoint() : null;
    }

    /**
     * 获取有效促销
     *
     * @return 有效促销
     */
    @SuppressWarnings("unchecked")
    @Transient
    public List<Promotion> getValidPromotions() {
        if (!Product.Type.GENERAL.equals(getType()) || CollectionUtils.isEmpty(getPromotions())) {
            return Collections.emptyList();
        }
        return new ArrayList<>(CollectionUtils.select(getPromotions(), new Predicate() {

            public boolean evaluate(Object object) {
                Promotion promotion = (Promotion) object;
                return promotion != null && promotion.getIsEnabled() && promotion.hasBegun() && !promotion.hasEnded() && CollectionUtils.isNotEmpty(promotion.getMemberRanks());
            }
        }));
    }

    /**
     * 是否存在规格
     *
     * @return 是否存在规格
     */
    @Transient
    public boolean hasSpecification() {
        return CollectionUtils.isNotEmpty(getSpecificationItems());
    }

    /**
     * 判断促销是否有效
     *
     * @param promotion 促销
     * @return 促销是否有效
     */
    @Transient
    public boolean isValid(Promotion promotion) {
        return Product.Type.GENERAL.equals(getType()) && promotion.getIsEnabled() && promotion.hasBegun() && !promotion.hasEnded() && CollectionUtils.isNotEmpty(promotion.getMemberRanks()) && getValidPromotions().contains(promotion);
    }

    /**
     * 获取属性值
     *
     * @param attribute 属性
     * @return 属性值
     */
    @Transient
    public String getAttributeValue(Attribute attribute) {
        if (attribute == null || attribute.getPropertyIndex() == null) {
            return null;
        }
        try {
            String propertyName = ATTRIBUTE_VALUE_PROPERTY_NAME_PREFIX + attribute.getPropertyIndex();
            return String.valueOf(PropertyUtils.getProperty(this, propertyName));
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    /**
     * 设置属性值
     *
     * @param attribute      属性
     * @param attributeValue 属性值
     */
    @Transient
    public void setAttributeValue(Attribute attribute, String attributeValue) {
        if (attribute == null || attribute.getPropertyIndex() == null) {
            return;
        }
        try {
            String propertyName = ATTRIBUTE_VALUE_PROPERTY_NAME_PREFIX + attribute.getPropertyIndex();
            PropertyUtils.setProperty(this, propertyName, attributeValue);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (InvocationTargetException e) {
            throw new RuntimeException(e.getMessage(), e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    /**
     * 移除所有属性值
     */
    @Transient
    public void removeAttributeValue() {
        for (int i = 0; i < ATTRIBUTE_VALUE_PROPERTY_COUNT; i++) {
            String propertyName = ATTRIBUTE_VALUE_PROPERTY_NAME_PREFIX + i;
            try {
                PropertyUtils.setProperty(this, propertyName, null);
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e.getMessage(), e);
            } catch (InvocationTargetException e) {
                throw new RuntimeException(e.getMessage(), e);
            } catch (NoSuchMethodException e) {
                throw new RuntimeException(e.getMessage(), e);
            }
        }
    }

    /**
     * 持久化前处理
     */
    @PrePersist
    public void prePersist() {
        setSn(StringUtils.lowerCase(getSn()));
        if (CollectionUtils.isNotEmpty(getProductImages())) {
            Collections.sort(getProductImages());
        }
    }

    /**
     * 更新前处理
     */
    @PreUpdate
    public void preUpdate() {
        if (getTotalScore() != null && getScoreCount() != null && getScoreCount() > 0) {
            setScore((float) getTotalScore() / getScoreCount());
        } else {
            setScore(0F);
        }
        if (CollectionUtils.isNotEmpty(getProductImages())) {
            Collections.sort(getProductImages());
        }
    }

    /**
     * 类型转换 - 商品图片
     *
     * @author ixincheng
     * @version 6.1
     */
    @Converter
    public static class ProductImageConverter extends BaseAttributeConverter<ArrayList<ProductImage>> {
    }

    /**
     * 类型转换 - 参数值
     *
     * @author ixincheng
     * @version 6.1
     */
    @Converter
    public static class ParameterValueConverter extends BaseAttributeConverter<ArrayList<ParameterValue>> {
    }

    /**
     * 类型转换 - 规格项
     *
     * @author ixincheng
     * @version 6.1
     */
    @Converter
    public static class SpecificationItemConverter extends BaseAttributeConverter<ArrayList<SpecificationItem>> {
    }
}