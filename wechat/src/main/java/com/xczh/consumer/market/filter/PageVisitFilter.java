package com.xczh.consumer.market.filter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;


/**
 * gzip 压缩，针对css、js、html、jsp、.ftp 页面压缩。
 *
 * @author yangxuan
 */
public class PageVisitFilter implements Filter {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(PageVisitFilter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        //性能监控
        long startTime = System.currentTimeMillis();

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String uri = request.getRequestURI();
        String ext = FilenameUtils.getExtension(uri);

        try {
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            if (isGZipEncoding(request)) {
                //需要过滤的扩展名：.htm,.html,.jsp,.js,.ajax,.css
                String gzippPattern = ",.htm,.html,.js,.css,";
                if (StringUtils.indexOf(gzippPattern, ",." + ext + ",") != -1) {
                    BufferedResponse gzipResponse = new BufferedResponse(response);

                    chain.doFilter(request, gzipResponse);
                    byte[] srcData = gzipResponse.getResponseData();
                    byte[] outData = null;
                    if (srcData.length > 512) {

                        //byte[] gzipData = ZipUtil.toGzipBytes(srcData);
                        ByteArrayOutputStream bout = new ByteArrayOutputStream();
                        //压缩输出流中的数据
                        GZIPOutputStream gout = new GZIPOutputStream(bout);
                        gout.write(srcData);
                        gout.close();

                        byte gzip[] = bout.toByteArray();

                        response.addHeader("Content-Encoding", "gzip");
                        response.setContentLength(gzip.length);
                        outData = gzip;
                    } else {
                        outData = srcData;
                    }
                    ServletOutputStream output = response.getOutputStream();
                    output.write(outData);
                    output.flush();
                    output.close();
                } else {
                    chain.doFilter(request, response);
                }
                return;
            }

            chain.doFilter(request, response);
        } catch (Exception e) {

        } finally {
            //AcwsMonitorLog.warnHttpVisit(startTime, request);
        }
    }

    @Override
    public void destroy() {
    }

    /**
     * 判断浏览器是否支持GZIP
     *
     * @param request
     * @return
     */
    private boolean isGZipEncoding(HttpServletRequest request) {
        boolean flag = false;
        String encoding = request.getHeader("Accept-Encoding");
        if (encoding.indexOf("gzip") != -1) {
            flag = true;
        }
        return flag;
    }
}
