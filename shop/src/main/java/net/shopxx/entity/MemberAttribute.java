/*
 * Copyright 2008-2018 shopxx.net. All rights reserved.
 * Support: http://www.shopxx.net
 * License: http://www.shopxx.net/license
 * FileId: N/xM5c+NBilDht5uc4TZFeCnzV+1o7oz
 */
package net.shopxx.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Converter;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import net.shopxx.BaseAttributeConverter;

/**
 * Entity - 会员注册项
 * 
 * @author ixincheng
 * @version 6.1
 */
@Entity
public class MemberAttribute extends OrderedEntity<Long> {

	private static final long serialVersionUID = 4513705276569738136L;

	/**
	 * 最大可选项数量
	 */
	public static final int MAX_OPTION_SIZE = 100;

	/**
	 * 类型
	 */
	public enum Type {

		/**
		 * 姓名
		 */
		NAME,

		/**
		 * 性别
		 */
		GENDER,

		/**
		 * 出生日期
		 */
		BIRTH,

		/**
		 * 地区
		 */
		AREA,

		/**
		 * 地址
		 */
		ADDRESS,

		/**
		 * 邮编
		 */
		ZIP_CODE,

		/**
		 * 电话
		 */
		PHONE,

		/**
		 * 文本
		 */
		TEXT,

		/**
		 * 单选项
		 */
		SELECT,

		/**
		 * 多选项
		 */
		CHECKBOX
	}

	/**
	 * 名称
	 */
	@NotEmpty
	@Length(max = 200)
	@Column(nullable = false)
	private String name;

	/**
	 * 类型
	 */
	@NotNull(groups = Save.class)
	@Column(nullable = false, updatable = false)
	private MemberAttribute.Type type;

	/**
	 * 配比
	 */
	@Length(max = 200)
	private String pattern;

	/**
	 * 是否启用
	 */
	@NotNull
	@Column(nullable = false)
	private Boolean isEnabled;

	/**
	 * 是否必填
	 */
	@NotNull
	@Column(nullable = false)
	private Boolean isRequired;

	/**
	 * 属性序号
	 */
	@Column(updatable = false)
	private Integer propertyIndex;

	/**
	 * 可选项
	 */
	@Size(max = MAX_OPTION_SIZE)
	@Column(length = 4000)
	@Convert(converter = OptionConverter.class)
	private List<String> options = new ArrayList<>();

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
	 * 获取类型
	 * 
	 * @return 类型
	 */
	public MemberAttribute.Type getType() {
		return type;
	}

	/**
	 * 设置类型
	 * 
	 * @param type
	 *            类型
	 */
	public void setType(MemberAttribute.Type type) {
		this.type = type;
	}

	/**
	 * 获取配比
	 * 
	 * @return 配比
	 */
	public String getPattern() {
		return pattern;
	}

	/**
	 * 设置配比
	 * 
	 * @param pattern
	 *            配比
	 */
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	/**
	 * 获取是否启用
	 * 
	 * @return 是否启用
	 */
	public Boolean getIsEnabled() {
		return isEnabled;
	}

	/**
	 * 设置是否启用
	 * 
	 * @param isEnabled
	 *            是否启用
	 */
	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	/**
	 * 获取是否必填
	 * 
	 * @return 是否必填
	 */
	public Boolean getIsRequired() {
		return isRequired;
	}

	/**
	 * 设置是否必填
	 * 
	 * @param isRequired
	 *            是否必填
	 */
	public void setIsRequired(Boolean isRequired) {
		this.isRequired = isRequired;
	}

	/**
	 * 获取属性序号
	 * 
	 * @return 属性序号
	 */
	public Integer getPropertyIndex() {
		return propertyIndex;
	}

	/**
	 * 设置属性序号
	 * 
	 * @param propertyIndex
	 *            属性序号
	 */
	public void setPropertyIndex(Integer propertyIndex) {
		this.propertyIndex = propertyIndex;
	}

	/**
	 * 获取可选项
	 * 
	 * @return 可选项
	 */
	public List<String> getOptions() {
		return options;
	}

	/**
	 * 设置可选项
	 * 
	 * @param options
	 *            可选项
	 */
	public void setOptions(List<String> options) {
		this.options = options;
	}

	/**
	 * 类型转换 - 可选项
	 * 
	 * @author ixincheng
	 * @version 6.1
	 */
	@Converter
	public static class OptionConverter extends BaseAttributeConverter<ArrayList<String>> {
	}

}