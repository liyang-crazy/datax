package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * txtfile writer格式
 */
public class FtpWriter {
    public static JSONObject ftpWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","ftpwriter");
        JSONObject parameter = new JSONObject();
        parameter.put("protocol",jbInfo.getFtpInfo().getJb_ftp_protocol_w());
        parameter.put("host",jbInfo.getFtpInfo().getJb_ftp_host_w());
        parameter.put("port",jbInfo.getFtpInfo().getJb_ftp_port_w());
        parameter.put("username",jbInfo.getFtpInfo().getJb_ftp_username_w());
        parameter.put("password",jbInfo.getFtpInfo().getJb_ftp_password_w());
        parameter.put("timeout",jbInfo.getFtpInfo().getJb_ftp_timeout_w());
        if("ftp".equals(jbInfo.getFtpInfo().getJb_ftp_protocol_w())){
            parameter.put("connectPattern",jbInfo.getFtpInfo().getJb_ftp_cp_w());
        }
        parameter.put("path",jbInfo.getFtpInfo().getJb_ftp_path_w());
        parameter.put("fileName",jbInfo.getFtpInfo().getJb_ftp_fileName_w());
        parameter.put("writeMode",jbInfo.getFtpInfo().getJb_ftp_ms_w());
        parameter.put("fieldDelimiter",jbInfo.getFtpInfo().getJb_ftp_fgf_w());
        parameter.put("compress",jbInfo.getFtpInfo().getJb_ftp_ysgs_w());
        parameter.put("encoding",jbInfo.getFtpInfo().getJb_ftp_en_w());
        //parameter.put("nullFormat",jbInfo.getFtpInfo().getJb_ftp_nullF_w());
        parameter.put("dateFormat",jbInfo.getFtpInfo().getJb_ftp_dateF_w());
        parameter.put("fileFormat",jbInfo.getFtpInfo().getJb_ftp_fileF_w());
        parameter.put("header",jbInfo.getFtpInfo().getJb_ftp_header_arr_w());
        writer.put("parameter",parameter);
        return writer;
    }
}
