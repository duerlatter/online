package com.xczhihui.course.model;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * ClassName: Course.java <br>
 * Description: <br>
 * Create by: name：yangxuan <br>email: 15936216273@163.com <br>
 * Create Time: 2018年1月14日<br>
 */
@TableName("oe_line_apply")
public class LineApply extends Model<LineApply> {

    private String id;

    @TableField("user_id")
    private String userId;

    @TableField("is_delete")
    private Boolean isDelete;

    @TableField("create_time")
    private Date createTime;

    @TableField("update_time")
    private Date updateTime;

    @TableField("real_name")
    private String realName;

    @TableField("sex")
    private Integer sex;

    @TableField("mobile")
    private String mobile;

    @TableField("wechat_no")
    private String wechatNo;

    @TableField("course_id")
    private Integer courseId;

    @TableField("anchor_id")
    private String anchorId;

    private Boolean learned;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWechatNo() {
        return wechatNo;
    }

    public void setWechatNo(String wechatNo) {
        this.wechatNo = wechatNo;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Boolean getLearned() {
        return learned;
    }

    public void setLearned(Boolean learned) {
        this.learned = learned;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public String getAnchorId() {
        return anchorId;
    }

    public void setAnchorId(String anchorId) {
        this.anchorId = anchorId;
    }

    @Override
    public String toString() {
        return "LineApply [id=" + id + ", userId=" + userId + ", isDelete=" + isDelete + ", createTime=" + createTime
                + ", updateTime=" + updateTime + ", realName=" + realName + ", sex=" + sex + ", mobile=" + mobile
                + ", wechatNo=" + wechatNo + "]";
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }
}