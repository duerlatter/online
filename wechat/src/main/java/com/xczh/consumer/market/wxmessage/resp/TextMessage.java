package com.xczh.consumer.market.wxmessage.resp;

public class TextMessage extends BaseMessage {

    /**
     * 回复的消息内容
     */
    private String Content;

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }
}
