package com.xczhihui.pay.alipay;

/**
 * Description: <br>
 *
 * @author: name：yuxin <br>email: yuruixin@ixincheng.com <br>
 * Create Time:  2018/4/19 0019-上午 11:36<br>
 */
public class AliPayBean {
    private String appId;
    private String privateKey;
    private String publicKey;
    private String serverUrl;
    private String domain;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public void setServerUrl(String serverUrl) {
        this.serverUrl = serverUrl;
    }


    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    @Override
    public String toString() {
        return "AliPayBean [appId=" + appId + ", privateKey=" + privateKey + ", publicKey=" + publicKey + ", serverUrl="
                + serverUrl + ", domain=" + domain + "]";
    }


}
