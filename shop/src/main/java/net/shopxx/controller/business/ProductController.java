/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: 4DjRaKq+hpaY3x43rOTk5/dTK0uL9kqd
 */
package net.shopxx.controller.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xczhihui.common.util.IStringUtil;
import com.xczhihui.medical.doctor.model.MedicalDoctorAccount;
import com.xczhihui.medical.doctor.service.IMedicalDoctorBusinessService;
import com.xczhihui.medical.doctor.service.IMedicalDoctorPostsService;

import net.shopxx.FileType;
import net.shopxx.Pageable;
import net.shopxx.Results;
import net.shopxx.entity.Attribute;
import net.shopxx.entity.BaseEntity;
import net.shopxx.entity.Brand;
import net.shopxx.entity.Business;
import net.shopxx.entity.Parameter;
import net.shopxx.entity.ParameterValue;
import net.shopxx.entity.Product;
import net.shopxx.entity.ProductCategory;
import net.shopxx.entity.ProductImage;
import net.shopxx.entity.ProductTag;
import net.shopxx.entity.Promotion;
import net.shopxx.entity.Sku;
import net.shopxx.entity.Specification;
import net.shopxx.entity.SpecificationItem;
import net.shopxx.entity.Store;
import net.shopxx.entity.StoreProductCategory;
import net.shopxx.entity.StoreProductTag;
import net.shopxx.exception.UnauthorizedException;
import net.shopxx.merge.entity.UsersRelation;
import net.shopxx.merge.service.UsersRelationService;
import net.shopxx.security.CurrentStore;
import net.shopxx.security.CurrentUser;
import net.shopxx.service.AttributeService;
import net.shopxx.service.BrandService;
import net.shopxx.service.BusinessService;
import net.shopxx.service.FileService;
import net.shopxx.service.ParameterValueService;
import net.shopxx.service.ProductCategoryService;
import net.shopxx.service.ProductImageService;
import net.shopxx.service.ProductService;
import net.shopxx.service.ProductTagService;
import net.shopxx.service.PromotionService;
import net.shopxx.service.SkuService;
import net.shopxx.service.SpecificationItemService;
import net.shopxx.service.SpecificationService;
import net.shopxx.service.StoreProductCategoryService;
import net.shopxx.service.StoreProductTagService;
import net.shopxx.service.StoreService;

/**
 * Controller - 商品
 * 
 * @author ixincheng
 * @version 6.1
 */
@Controller("businessProductController")
@RequestMapping("/business/product")
public class ProductController extends BaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
	
	@Inject
	private ProductService productService;
	@Inject
	private SkuService skuService;
	@Inject
	private StoreService storeService;
	@Inject
	private ProductCategoryService productCategoryService;
	@Inject
	private StoreProductCategoryService storeProductCategoryService;
	@Inject
	private BrandService brandService;
	@Inject
	private PromotionService promotionService;
	@Inject
	private ProductTagService productTagService;
	@Inject
	private StoreProductTagService storeProductTagService;
	@Inject
	private ProductImageService productImageService;
	@Inject
	private ParameterValueService parameterValueService;
	@Inject
	private SpecificationItemService specificationItemService;
	@Inject
	private AttributeService attributeService;
	@Inject
	private SpecificationService specificationService;
	@Inject
	private FileService fileService;
	
	@Inject
	private UsersRelationService usersRelationService;
	
	@Autowired
	private IMedicalDoctorPostsService medicalDoctorPostsService;
	
	@Autowired
	private BusinessService businessService;

	@Autowired
	private IMedicalDoctorBusinessService medicalDoctorBusinessService;
	
	/**
	 * 添加属性
	 */
	@ModelAttribute
	public void populateModel(Long productId, Long productCategoryId, @CurrentStore Store currentStore, ModelMap model) {
		Product product = productService.find(productId);
		if (product != null && !currentStore.equals(product.getStore())) {
			throw new UnauthorizedException();
		}
		ProductCategory productCategory = productCategoryService.find(productCategoryId);
		if (productCategory != null && !storeService.productCategoryExists(currentStore, productCategory)) {
			throw new UnauthorizedException();
		}

		model.addAttribute("product", product);
		model.addAttribute("productCategory", productCategory);
	}

	/**
	 * 检查编号是否存在
	 */
	@GetMapping("/check_sn")
	public @ResponseBody boolean checkSn(String sn) {
		return StringUtils.isNotEmpty(sn) && !productService.snExists(sn);
	}

	/**
	 * 上传商品图片
	 */
	@PostMapping("/upload_product_image")
	public ResponseEntity<?> uploadProductImage(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		if (!fileService.isValid(FileType.IMAGE, file)) {
			return Results.unprocessableEntity("common.upload.invalid");
		}
		ProductImage productImage = productImageService.generate(file);
		if (productImage == null) {
			return Results.unprocessableEntity("common.upload.error");
		}
		return ResponseEntity.ok(productImage);
	}

	/**
	 * 删除商品图片
	 */
	@PostMapping("/delete_product_image")
	public ResponseEntity<?> deleteProductImage() {
		return Results.OK;
	}

	/**
	 * 获取参数
	 */
	@GetMapping("/parameters")
	public @ResponseBody List<Map<String, Object>> parameters(@ModelAttribute(binding = false) ProductCategory productCategory) {
		List<Map<String, Object>> data = new ArrayList<>();
		if (productCategory == null || CollectionUtils.isEmpty(productCategory.getParameters())) {
			return data;
		}
		for (Parameter parameter : productCategory.getParameters()) {
			Map<String, Object> item = new HashMap<>();
			item.put("group", parameter.getGroup());
			item.put("names", parameter.getNames());
			data.add(item);
		}
		return data;
	}

	/**
	 * 获取属性
	 */
	@GetMapping("/attributes")
	public @ResponseBody List<Map<String, Object>> attributes(@ModelAttribute(binding = false) ProductCategory productCategory) {
		List<Map<String, Object>> data = new ArrayList<>();
		if (productCategory == null || CollectionUtils.isEmpty(productCategory.getAttributes())) {
			return data;
		}
		for (Attribute attribute : productCategory.getAttributes()) {
			Map<String, Object> item = new HashMap<>();
			item.put("id", attribute.getId());
			item.put("name", attribute.getName());
			item.put("options", attribute.getOptions());
			data.add(item);
		}
		return data;
	}

	/**
	 * 获取规格
	 */
	@GetMapping("/specifications")
	public @ResponseBody List<Map<String, Object>> specifications(@ModelAttribute(binding = false) ProductCategory productCategory) {
		List<Map<String, Object>> data = new ArrayList<>();
		if (productCategory == null || CollectionUtils.isEmpty(productCategory.getSpecifications())) {
			return data;
		}
		for (Specification specification : productCategory.getSpecifications()) {
			Map<String, Object> item = new HashMap<>();
			item.put("name", specification.getName());
			item.put("options", specification.getOptions());
			data.add(item);
		}
		return data;
	}

	/**
	 * 添加
	 */
	@GetMapping("/add")
	public String add(@CurrentStore Store currentStore, ModelMap model) {
		model.addAttribute("maxProductImageSize", Product.MAX_PRODUCT_IMAGE_SIZE);
		model.addAttribute("maxParameterValueSize", Product.MAX_PARAMETER_VALUE_SIZE);
		model.addAttribute("maxParameterValueEntrySize", ParameterValue.MAX_ENTRY_SIZE);
		model.addAttribute("maxSpecificationItemSize", Product.MAX_SPECIFICATION_ITEM_SIZE);
		model.addAttribute("maxSpecificationItemEntrySize", SpecificationItem.MAX_ENTRY_SIZE);
		model.addAttribute("types", Product.Type.values());
		model.addAttribute("productCategoryTree", productCategoryService.findTree());
		model.addAttribute("allowedProductCategories", productCategoryService.findList(currentStore, null, null, null));
		model.addAttribute("allowedProductCategoryParents", getAllowedProductCategoryParents(currentStore));
		model.addAttribute("storeProductCategoryTree", storeProductCategoryService.findTree(currentStore));
		model.addAttribute("brands", brandService.findAll());
		model.addAttribute("promotions", promotionService.findList(null, currentStore, true));
		model.addAttribute("productTags", productTagService.findAll());
		model.addAttribute("storeProductTags", storeProductTagService.findList(currentStore, true));
		model.addAttribute("specifications", specificationService.findAll());
		return "business/product/add";
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
	public ResponseEntity<?> save(@ModelAttribute(name = "productForm") Product productForm, 
			@ModelAttribute(binding = false) ProductCategory productCategory, 
			SkuForm skuForm, SkuListForm skuListForm, 
			Long brandId, Long[] promotionIds, Long[] productTagIds, Long[] storeProductTagIds,
			Long storeProductCategoryId, HttpServletRequest request,
			@CurrentStore Store currentStore,
			@RequestParam(required = false, value = "level")Integer level,
			@RequestParam(required = false, value = "recommentContent")String recommentContent,
			@CurrentUser Business currentUser) {
		productImageService.filter(productForm.getProductImages());
		parameterValueService.filter(productForm.getParameterValues());
		specificationItemService.filter(productForm.getSpecificationItems());
		skuService.filter(skuListForm.getSkuList());

		if (productForm.getProductImages()==null || productForm.getProductImages().size()<=0) {
			return Results.unprocessableEntity("商品图片不能为空");
		}
		
		
		Long productCount = productService.count(null, currentStore, null, null, null, null, null, null);
		if (currentStore.getStoreRank() != null && currentStore.getStoreRank().getQuantity() != null && productCount >= currentStore.getStoreRank().getQuantity()) {
			return Results.unprocessableEntity("business.product.addCountNotAllowed", currentStore.getStoreRank().getQuantity());
		}
		if (productCategory == null) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		if (storeProductCategoryId != null) {
			StoreProductCategory storeProductCategory = storeProductCategoryService.find(storeProductCategoryId);
			if (storeProductCategory == null || !currentStore.equals(storeProductCategory.getStore())) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			productForm.setStoreProductCategory(storeProductCategory);
		}
		productForm.setStore(currentStore);
		productForm.setProductCategory(productCategory);
		productForm.setBrand(brandService.find(brandId));
		productForm.setPromotions(new HashSet<>(promotionService.findList(promotionIds)));
		productForm.setProductTags(new HashSet<>(productTagService.findList(productTagIds)));
		productForm.setStoreProductTags(new HashSet<>(storeProductTagService.findList(storeProductTagIds)));
		if(level != null){
			productForm.setRecommends(level);
		} else {
			productForm.setRecommends(5);
		}
		if(recommentContent != null){
			productForm.setRecommentContent(recommentContent);
		} else {
			productForm.setRecommentContent("我为大家推荐一款商品，请查看");
		}

		productForm.removeAttributeValue();
		for (Attribute attribute : productForm.getProductCategory().getAttributes()) {
			String value = request.getParameter("attribute_" + attribute.getId());
			String attributeValue = attributeService.toAttributeValue(attribute, value);
			productForm.setAttributeValue(attribute, attributeValue);
		}

		if (!isValid(productForm, BaseEntity.Save.class)) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		if (StringUtils.isNotEmpty(productForm.getSn()) && productService.snExists(productForm.getSn())) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		Product product = null;
		if (productForm.hasSpecification()) {
			List<Sku> skus = skuListForm.getSkuList();
			if (CollectionUtils.isEmpty(skus) || !isValid(skus, getValidationGroup(productForm.getType()), BaseEntity.Save.class)) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			product = productService.create(productForm, skus);
		} else {
			Sku sku = skuForm.getSku();
			if (sku == null || !isValid(sku, getValidationGroup(productForm.getType()), BaseEntity.Save.class)) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			product = productService.create(productForm, sku);
		}
		
		LOGGER.info("product.getId():"+(product!=null ? product.getId() : null)+"recommentContent:"+recommentContent);
		if(product!=null) {
			Long businessId = currentUser.getId();
			Business business = businessService.find(businessId);
			MedicalDoctorAccount medicalDoctorAccount = medicalDoctorBusinessService.getByDoctorId(business.getDoctorId());
			
			if(productForm.getIsMarketable()){
				medicalDoctorPostsService.addDoctorPosts(medicalDoctorAccount.getAccountId(),
						productForm.getRecommentContent(), product.getId(), productForm.getRecommends());
			}

		}
		return Results.OK;
	}

	/**
	 * 编辑
	 */
	@GetMapping("/edit")
	public String edit(@ModelAttribute(binding = false) Product product, @CurrentStore Store currentStore, ModelMap model) {
		if (product == null) {
			return UNPROCESSABLE_ENTITY_VIEW;
		}

		model.addAttribute("maxProductImageSize", Product.MAX_PRODUCT_IMAGE_SIZE);
		model.addAttribute("maxParameterValueSize", Product.MAX_PARAMETER_VALUE_SIZE);
		model.addAttribute("maxParameterValueEntrySize", ParameterValue.MAX_ENTRY_SIZE);
		model.addAttribute("maxSpecificationItemSize", Product.MAX_SPECIFICATION_ITEM_SIZE);
		model.addAttribute("maxSpecificationItemEntrySize", SpecificationItem.MAX_ENTRY_SIZE);
		model.addAttribute("types", Product.Type.values());
		model.addAttribute("productCategoryTree", productCategoryService.findTree());
		model.addAttribute("allowedProductCategories", productCategoryService.findList(currentStore, null, null, null));
		model.addAttribute("allowedProductCategoryParents", getAllowedProductCategoryParents(currentStore));
		model.addAttribute("storeProductCategoryTree", storeProductCategoryService.findTree(currentStore));
		model.addAttribute("brands", brandService.findAll());
		model.addAttribute("promotions", promotionService.findList(null, currentStore, true));
		model.addAttribute("productTags", productTagService.findAll());
		model.addAttribute("storeProductTags", storeProductTagService.findList(currentStore, true));
		model.addAttribute("specifications", specificationService.findAll());
		model.addAttribute("product", product);
		return "business/product/edit";
	}

	/**
	 * 更新
	 */
	@PostMapping("/update")
	public ResponseEntity<?> update(@ModelAttribute("productForm") Product productForm, @ModelAttribute(binding = false) Product product, @ModelAttribute(binding = false) ProductCategory productCategory, SkuForm skuForm, SkuListForm skuListForm, Long brandId, Long[] promotionIds,
			Long[] productTagIds, Long[] storeProductTagIds, Long storeProductCategoryId, HttpServletRequest request,
			@CurrentStore Store currentStore,
			@RequestParam(required = false, value = "postsId")Integer postsId,
			@RequestParam(required = false, value = "level")Integer level,
			@RequestParam(required = false, value = "recommentContent")String recommentContent,
			@CurrentUser Business currentUser) {
		productImageService.filter(productForm.getProductImages());
		parameterValueService.filter(productForm.getParameterValues());
		specificationItemService.filter(productForm.getSpecificationItems());
		skuService.filter(skuListForm.getSkuList());
		
		if (productForm.getProductImages()==null || productForm.getProductImages().size()<=0) {
			return Results.unprocessableEntity("商品图片不能为空");
		}
		
		if(level != null){
			productForm.setRecommends(level);
		} else {
			productForm.setRecommends(5);
		}
		if(recommentContent != null){
			productForm.setRecommentContent(recommentContent);
		} else {
			productForm.setRecommentContent("我为大家推荐一款商品，请查看");
		}
		if (product == null) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		if (productCategory == null) {
			return Results.UNPROCESSABLE_ENTITY;
		}
		List<Promotion> promotions = promotionService.findList(promotionIds);
		if (CollectionUtils.isNotEmpty(promotions)) {
			if (currentStore.getPromotions() == null || !currentStore.getPromotions().containsAll(promotions)) {
				return Results.UNPROCESSABLE_ENTITY;
			}
		}
		if (storeProductCategoryId != null) {
			StoreProductCategory storeProductCategory = storeProductCategoryService.find(storeProductCategoryId);
			if (storeProductCategory == null || !currentStore.equals(storeProductCategory.getStore())) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			productForm.setStoreProductCategory(storeProductCategory);
		}
		productForm.setId(product.getId());
		productForm.setType(product.getType());
		productForm.setIsActive(true);
		productForm.setProductCategory(productCategory);
		productForm.setBrand(brandService.find(brandId));
		productForm.setPromotions(new HashSet<>(promotions));
		productForm.setProductTags(new HashSet<>(productTagService.findList(productTagIds)));
		productForm.setStoreProductTags(new HashSet<>(storeProductTagService.findList(storeProductTagIds)));

		productForm.removeAttributeValue();
		for (Attribute attribute : productForm.getProductCategory().getAttributes()) {
			String value = request.getParameter("attribute_" + attribute.getId());
			String attributeValue = attributeService.toAttributeValue(attribute, value);
			productForm.setAttributeValue(attribute, attributeValue);
		}

		if (!isValid(productForm, BaseEntity.Update.class)) {
			return Results.UNPROCESSABLE_ENTITY;
		}

		if (productForm.hasSpecification()) {
			List<Sku> skus = skuListForm.getSkuList();
			if (CollectionUtils.isEmpty(skus) || !isValid(skus, getValidationGroup(productForm.getType()), BaseEntity.Update.class)) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			productService.modify(productForm, skus);
		} else {
			Sku sku = skuForm.getSku();
			if (sku == null || !isValid(sku, getValidationGroup(productForm.getType()), BaseEntity.Update.class)) {
				return Results.UNPROCESSABLE_ENTITY;
			}
			productService.modify(productForm, sku);
		}

		//修改动态 或者 增加动态
		LOGGER.info("postsId:"+postsId+"product.getId():"+(product!=null ? product.getId() : null)+"recommentContent:"+recommentContent);
		if(product!=null) {
			Long businessId = currentUser.getId();
			Business business = businessService.find(businessId);
			MedicalDoctorAccount medicalDoctorAccount = medicalDoctorBusinessService.getByDoctorId(business.getDoctorId());
			if(productForm.getIsMarketable()){
				medicalDoctorPostsService.addDoctorPosts(medicalDoctorAccount.getAccountId(),
						productForm.getRecommentContent(), product.getId(), productForm.getRecommends());
			}
		}

		return Results.OK;
	}

	/**
	 * 列表
	 */
	@GetMapping("/list")
	public String list(@ModelAttribute(binding = false) ProductCategory productCategory, Product.Type type, Long brandId, Long promotionId, Long productTagId, Long storeProductTagId, Boolean isActive, Boolean isMarketable, Boolean isList, Boolean isTop, Boolean isOutOfStock, Boolean isStockAlert,
			Pageable pageable, @CurrentStore Store currentStore, ModelMap model) {
		Brand brand = brandService.find(brandId);
		Promotion promotion = promotionService.find(promotionId);
		ProductTag productTag = productTagService.find(productTagId);
		StoreProductTag storeProductTag = storeProductTagService.find(storeProductTagId);
		if (promotion != null) {
			if (!currentStore.equals(promotion.getStore())) {
				return UNPROCESSABLE_ENTITY_VIEW;
			}
		}
		if (storeProductTag != null) {
			if (!currentStore.equals(storeProductTag.getStore())) {
				return UNPROCESSABLE_ENTITY_VIEW;
			}
		}

		model.addAttribute("types", Product.Type.values());
		model.addAttribute("productCategoryTree", productCategoryService.findTree());
		model.addAttribute("allowedProductCategories", productCategoryService.findList(currentStore, null, null, null));
		model.addAttribute("allowedProductCategoryParents", getAllowedProductCategoryParents(currentStore));
		model.addAttribute("brands", brandService.findAll());
		model.addAttribute("promotions", promotionService.findList(null, currentStore, true));
		model.addAttribute("productTags", productTagService.findAll());
		model.addAttribute("storeProductTags", storeProductTagService.findList(currentStore, true));
		model.addAttribute("type", type);
		model.addAttribute("productCategoryId", productCategory != null ? productCategory.getId() : null);
		model.addAttribute("brandId", brandId);
		model.addAttribute("promotionId", promotionId);
		model.addAttribute("productTagId", productTagId);
		model.addAttribute("storeProductTagId", storeProductTagId);
		model.addAttribute("isMarketable", isMarketable);
		model.addAttribute("isList", isList);
		model.addAttribute("isTop", isTop);
		model.addAttribute("isActive", isActive);
		model.addAttribute("isOutOfStock", isOutOfStock);
		model.addAttribute("isStockAlert", isStockAlert);
		model.addAttribute("page", productService.findPage(type, null, currentStore, productCategory, null, brand, promotion, productTag, storeProductTag, null, null, null, isMarketable, isList, isTop, isActive, isOutOfStock, isStockAlert, null, null, pageable));
		return "business/product/list";
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
	public ResponseEntity<?> delete(Long[] ids, @CurrentStore Store currentStore) {
		if (ids != null) {
			for (Long id : ids) {
				Product product = productService.find(id);
				if (product == null) {
					return Results.UNPROCESSABLE_ENTITY;
				}
				if (!currentStore.equals(product.getStore())) {
					return Results.UNPROCESSABLE_ENTITY;
				}
				productService.delete(product.getId());
			}
		}
		return Results.OK;
	}

	/**
	 * 上架商品
	 */
	@PostMapping("/shelves")
	public ResponseEntity<?> shelves(Long[] ids, @CurrentStore Store currentStore,@CurrentUser Business currentUser) {
		if (ids != null) {
			for (Long id : ids) {
				Product product = productService.find(id);
				if (product == null || !currentStore.equals(product.getStore())) {
					return Results.UNPROCESSABLE_ENTITY;
				}
				if (!storeService.productCategoryExists(product.getStore(), product.getProductCategory())) {
					return Results.unprocessableEntity("business.product.marketableNotExistCategoryNotAllowed", product.getName());
				}
				try {
					Long businessId = currentUser.getId();
					Business business = businessService.find(businessId);
					MedicalDoctorAccount medicalDoctorAccount = medicalDoctorBusinessService.getByDoctorId(business.getDoctorId());
					medicalDoctorPostsService.addDoctorPosts(medicalDoctorAccount.getAccountId(),
							product.getRecommentContent(), product.getId(), product.getRecommends());
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}
			productService.shelves(ids);
		}
		return Results.OK;
	}

	/**
	 * 下架商品
	 */
	@PostMapping("/shelf")
	public ResponseEntity<?> shelf(Long[] ids, @CurrentStore final Store currentStore) {
		if (ids != null) {
			for (Long id : ids) {
				Product product = productService.find(id);
				if (product == null || !currentStore.equals(product.getStore())) {
					return Results.UNPROCESSABLE_ENTITY;
				}
			}
			productService.shelf(ids);
		}
		return Results.OK;
	}

	
	/**
	 * 获取允许发布商品分类上级分类
	 * 
	 * @param store
	 *            店铺
	 * @return 允许发布商品分类上级分类
	 */
	private Set<ProductCategory> getAllowedProductCategoryParents(Store store) {
		Assert.notNull(store, "[Assertion failed] - store is required; it must not be null");

		Set<ProductCategory> result = new HashSet<>();
		List<ProductCategory> allowedProductCategories = productCategoryService.findList(store, null, null, null);
		for (ProductCategory allowedProductCategory : allowedProductCategories) {
			result.addAll(allowedProductCategory.getParents());
		}
		return result;
	}

	/**
	 * 根据类型获取验证组
	 * 
	 * @param type
	 *            类型
	 * @return 验证组
	 */
	private Class<?> getValidationGroup(Product.Type type) {
		Assert.notNull(type, "[Assertion failed] - type is required; it must not be null");

		switch (type) {
		case GENERAL:
			return Sku.General.class;
		case EXCHANGE:
			return Sku.Exchange.class;
		case GIFT:
			return Sku.Gift.class;
		}
		return null;
	}

	/**
	 * FormBean - SKU
	 * 
	 * @author ixincheng
	 * @version 6.1
	 */
	public static class SkuForm {

		/**
		 * SKU
		 */
		private Sku sku;

		/**
		 * 获取SKU
		 * 
		 * @return SKU
		 */
		public Sku getSku() {
			return sku;
		}

		/**
		 * 设置SKU
		 * 
		 * @param sku
		 *            SKU
		 */
		public void setSku(Sku sku) {
			this.sku = sku;
		}

	}

	/**
	 * FormBean - SKU
	 * 
	 * @author ixincheng
	 * @version 6.1
	 */
	public static class SkuListForm {

		/**
		 * SKU
		 */
		private List<Sku> skuList;

		/**
		 * 获取SKU
		 * 
		 * @return SKU
		 */
		public List<Sku> getSkuList() {
			return skuList;
		}

		/**
		 * 设置SKU
		 * 
		 * @param skuList
		 *            SKU
		 */
		public void setSkuList(List<Sku> skuList) {
			this.skuList = skuList;
		}

	}

}