/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: LwlxYUKYzzKPhBfrRyXfbdODCytj08VF
 */
package net.shopxx.entity;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import freemarker.template.TemplateException;
import net.shopxx.util.FreeMarkerUtils;

/**
 * Entity - 广告位
 * 
 * @author ixincheng
 * @version 6.1
 */
@Entity
public class AdPosition extends BaseEntity<Long> {

	private static final long serialVersionUID = -7849848867030199578L;

	/**
	 * 名称
	 */
	@NotEmpty
	@Length(max = 200)
	@Column(nullable = false)
	private String name;

	/**
	 * 宽度
	 */
	@NotNull
	@Min(1)
	@Column(nullable = false)
	private Integer width;

	/**
	 * 高度
	 */
	@NotNull
	@Min(1)
	@Column(nullable = false)
	private Integer height;

	/**
	 * 描述
	 */
	@Length(max = 200)
	private String description;

	/**
	 * 模板
	 */
	@NotEmpty
	@Lob
	@Column(nullable = false)
	private String template;

	/**
	 * 广告
	 */
	@OneToMany(mappedBy = "adPosition", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@OrderBy("order asc")
	private Set<Ad> ads = new HashSet<>();

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
	 * @param name
	 *            名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取宽度
	 * 
	 * @return 宽度
	 */
	public Integer getWidth() {
		return width;
	}

	/**
	 * 设置宽度
	 * 
	 * @param width
	 *            宽度
	 */
	public void setWidth(Integer width) {
		this.width = width;
	}

	/**
	 * 获取高度
	 * 
	 * @return 高度
	 */
	public Integer getHeight() {
		return height;
	}

	/**
	 * 设置高度
	 * 
	 * @param height
	 *            高度
	 */
	public void setHeight(Integer height) {
		this.height = height;
	}

	/**
	 * 获取描述
	 * 
	 * @return 描述
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * 设置描述
	 * 
	 * @param description
	 *            描述
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 获取模板
	 * 
	 * @return 模板
	 */
	public String getTemplate() {
		return template;
	}

	/**
	 * 设置模板
	 * 
	 * @param template
	 *            模板
	 */
	public void setTemplate(String template) {
		this.template = template;
	}

	/**
	 * 获取广告
	 * 
	 * @return 广告
	 */
	public Set<Ad> getAds() {
		return ads;
	}

	/**
	 * 设置广告
	 * 
	 * @param ads
	 *            广告
	 */
	public void setAds(Set<Ad> ads) {
		this.ads = ads;
	}

	/**
	 * 解析模板
	 * 
	 * @return 内容
	 */
	@Transient
	public String resolveTemplate() {
		try {
			Map<String, Object> model = new HashMap<>();
			model.put("adPosition", this);
			return FreeMarkerUtils.process(getTemplate(), model);
		} catch (IOException e) {
			return null;
		} catch (TemplateException e) {
			return null;
		}
	}

}