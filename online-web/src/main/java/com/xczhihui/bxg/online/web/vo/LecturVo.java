package com.xczhihui.bxg.online.web.vo;

/**
 * 教师结果封装类
 *
 * @author Rongcai Kang
 */
public class LecturVo {

    /**
     * 讲师名
     */
    private String name;

    /**
     * 描述
     */
    private String description;

    /**
     * 头像
     */
    private String headImg;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }
}
