package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * Hdfs writer格式
 */
public class HdfsWriter {
    public static JSONObject hdfsWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","hdfswriter");
        JSONObject parameter = new JSONObject();
        parameter.put("defaultFS",jbInfo.getHdfsInfo().getJb_hdfs_defaultFS_w());
        parameter.put("fileType",jbInfo.getHdfsInfo().getJb_hdfs_fileType_w());
        parameter.put("path",jbInfo.getHdfsInfo().getJb_hdfs_path_w());
        parameter.put("fileName",jbInfo.getHdfsInfo().getJb_hdfs_fileName_w());
        parameter.put("column",jbInfo.getHdfsInfo().getJb_hdfs_column_arr_w());
        parameter.put("writeMode",jbInfo.getHdfsInfo().getJb_hdfs_writeM_w());
        parameter.put("fieldDelimiter",jbInfo.getHdfsInfo().getJb_hdfs_fieldD_w());
        parameter.put("compress",jbInfo.getHdfsInfo().getJb_hdfs_compress_w());
        JSONObject hadoopConfig = new JSONObject();
        hadoopConfig.put("hadoopConfig",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_a_w());
        hadoopConfig.put("hadoopConfig",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_b_w());
        hadoopConfig.put("hadoopConfig",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_c_w());
        hadoopConfig.put("hadoopConfig",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_d_w());
        hadoopConfig.put("hadoopConfig",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_e_w());
        parameter.put("hadoopConfig",hadoopConfig);
        parameter.put("encoding",jbInfo.getHdfsInfo().getJb_hdfs_en_w());
        parameter.put("haveKerberos",jbInfo.getHdfsInfo().getJb_hdfs_haveK_w());
        if(jbInfo.getHdfsInfo().getJb_hdfs_haveK_w()){
            parameter.put("kerberosKeytabFilePath",jbInfo.getHdfsInfo().getJb_hdfs_kerberosK_w());
            parameter.put("kerberosPrincipal",jbInfo.getHdfsInfo().getJb_hdfs_kerberosP_w());
        }
        writer.put("parameter",parameter);
        return writer;
    }
}
