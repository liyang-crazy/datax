package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
txtfile reader的json格式
 */
public class FtpReader {
    public static JSONObject ftpReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","ftpreader");
        JSONObject parameter = new JSONObject();
        parameter.put("protocol",jbInfo.getFtpInfo().getJb_ftp_protocol_r());
        parameter.put("host",jbInfo.getFtpInfo().getJb_ftp_host_r());
        parameter.put("port",jbInfo.getFtpInfo().getJb_ftp_port_r());
        parameter.put("username",jbInfo.getFtpInfo().getJb_ftp_username_r());
        parameter.put("password",jbInfo.getFtpInfo().getJb_ftp_password_r());
        parameter.put("path",jbInfo.getFtpInfo().getJb_ftp_path_arr_r());
        parameter.put("column",jbInfo.getFtpInfo().getJb_ftp_column_arr_r());
        parameter.put("encoding",jbInfo.getFtpInfo().getJb_ftp_en_r());
        parameter.put("fieldDelimiter",jbInfo.getFtpInfo().getJb_ftp_fgf_r());
        parameter.put("timeout",jbInfo.getFtpInfo().getJb_ftp_timeout_r());
        if("ftp".equals(jbInfo.getFtpInfo().getJb_ftp_protocol_r())){
            parameter.put("connectPattern",jbInfo.getFtpInfo().getJb_ftp_cp_r());
        }
        parameter.put("compress",jbInfo.getFtpInfo().getJb_ftp_ysgs_r());
        parameter.put("skipHeader",jbInfo.getFtpInfo().getJb_ftp_csvH_r());
        //parameter.put("nullFormat",jbInfo.getFtpInfo().getJb_ftp_nullF_r());
        parameter.put("maxTraversalLevel",jbInfo.getFtpInfo().getJb_ftp_maxT_r());
        JSONObject csvReaderConfig = new JSONObject();
        csvReaderConfig.put("safetySwitch",false);
        csvReaderConfig.put("skipEmptyRecords",false);
        csvReaderConfig.put("useTextQualifier",false);
        parameter.put("csvReaderConfig",csvReaderConfig);
        reader.put("parameter",parameter);
        return reader;
    }
}

