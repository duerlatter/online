/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: z8a93N01f+KfpVOIVFhuHTUjgxZAEL0W
 */
package net.shopxx.entity;

import java.math.BigDecimal;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import net.shopxx.Setting;
import net.shopxx.merge.vo.CartItemVO;
import net.shopxx.util.SystemUtils;

/**
 * Entity - 购物车项
 *
 * @author ixincheng
 * @version 6.1
 */
@Entity
public class CartItem extends BaseEntity<Long> {

    private static final long serialVersionUID = 2979296789363163144L;

    /**
     * 最大数量
     */
    public static final Integer MAX_QUANTITY = 10000;

    /**
     * 数量
     */
    @Column(nullable = false)
    private Integer quantity;

    /**
     * SKU
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private Sku sku;

    /**
     * 购物车
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, updatable = false)
    private Cart cart;

    
    
    /**
     * 是否被选中
     */
    @Column
    private Boolean isChecked;
    
    
    /**
     * 获取数量
     *
     * @return 数量
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * 设置数量
     *
     * @param quantity 数量
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

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
     * @param sku SKU
     */
    public void setSku(Sku sku) {
        this.sku = sku;
    }

    /**
     * 获取购物车
     *
     * @return 购物车
     */
    public Cart getCart() {
        return cart;
    }

    /**
     * 设置购物车
     *
     * @param cart 购物车
     */
    public void setCart(Cart cart) {
        this.cart = cart;
    }

    
    public Boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Boolean isChecked) {
		this.isChecked = isChecked;
	}

	/**
     * 获取店铺
     *
     * @return 店铺
     */
    @Transient
    public Store getStore() {
        return getSku() != null ? getSku().getStore() : null;
    }

    /**
     * 获取重量
     *
     * @return 重量
     */
    @Transient
    public Integer getWeight() {
        if (getSku() != null && getSku().getWeight() != null && getQuantity() != null) {
            return getSku().getWeight() * getQuantity();
        } else {
            return null;
        }
    }

    /**
     * 获取赠送积分
     *
     * @return 赠送积分
     */
    @Transient
    public long getRewardPoint() {
        if (getSku() != null && getSku().getRewardPoint() != null && getQuantity() != null) {
            return getSku().getRewardPoint() * getQuantity();
        } else {
            return 0L;
        }
    }

    /**
     * 获取兑换积分
     *
     * @return 兑换积分
     */
    @Transient
    public long getExchangePoint() {
        if (getSku() != null && getSku().getExchangePoint() != null && getQuantity() != null) {
            return getSku().getExchangePoint() * getQuantity();
        } else {
            return 0L;
        }
    }

    /**
     * 获取价格
     *
     * @return 价格
     */
    @Transient
    public BigDecimal getPrice() {
        if (getSku() != null && getSku().getPrice() != null) {
            Setting setting = SystemUtils.getSetting();
            if (getCart() != null && getCart().getMember() != null && getCart().getMember().getMemberRank() != null) {
                MemberRank memberRank = getCart().getMember().getMemberRank();
                if (memberRank.getScale() != null) {
                    return setting.setScale(getSku().getPrice().multiply(new BigDecimal(String.valueOf(memberRank.getScale()))));
                }
            }
            return setting.setScale(getSku().getPrice());
        } else {
            return BigDecimal.ZERO;
        }
    }

    /**
     * 获取小计
     *
     * @return 小计
     */
    @Transient
    public BigDecimal getSubtotal() {
        if (getQuantity() != null) {
            return getPrice().multiply(new BigDecimal(getQuantity()));
        } else {
            return BigDecimal.ZERO;
        }
    }

    /**
     * 获取是否有效
     *
     * @return 是否有效
     */
    @Transient
    public boolean getIsActive() {
        return getSku() != null && getSku().getIsActive();
    }

    /**
     * 获取是否上架
     *
     * @return 是否上架
     */
    @Transient
    public boolean getIsMarketable() {
        return getSku() != null && getSku().getIsMarketable();
    }

    /**
     * 获取是否需要物流
     *
     * @return 是否需要物流
     */
    @Transient
    public boolean getIsDelivery() {
        return getSku() != null && getSku().getIsDelivery();
    }

    /**
     * 获取是否库存不足
     *
     * @return 是否库存不足
     */
    @Transient
    public boolean getIsLowStock() {
        return getQuantity() != null && getSku() != null && getQuantity() > getSku().getAvailableStock();
    }

    /**
     * 获取是否存在过期店铺商品
     *
     * @return 是否存在过期店铺商品
     */
    @Transient
    public boolean hasExpiredProduct() {
        return getSku() != null && getSku().getProduct().getStore().hasExpired();
    }

    /**
     * 增加SKU数量
     *
     * @param quantity 数量
     */
    @Transient
    public void add(int quantity) {
        if (quantity < 1) {
            return;
        }
        if (getQuantity() != null) {
            setQuantity(getQuantity() + quantity);
        } else {
            setQuantity(quantity);
        }
    }

    @Transient
    public CartItemVO getCartItemVO() {
        CartItemVO cartItemVO = new CartItemVO();
        cartItemVO.setSku(this.sku.getSkuVO());
        cartItemVO.setQuantity(this.quantity);
        cartItemVO.setId(this.getId());
        cartItemVO.setIsChecked(this.getIsChecked());
        return cartItemVO;
    }
}