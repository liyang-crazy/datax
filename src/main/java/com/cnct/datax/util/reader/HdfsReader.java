package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
Hdfs reader的json格式
 */
public class HdfsReader {
    public static JSONObject hdfsReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","hdfsreader");
        JSONObject parameter = new JSONObject();
        parameter.put("path",jbInfo.getHdfsInfo().getJb_hdfs_path_r());
        parameter.put("defaultFS",jbInfo.getHdfsInfo().getJb_hdfs_defaultFS_r());
        parameter.put("column",jbInfo.getHdfsInfo().getJb_hdfs_column_arr_r());
        parameter.put("fileType",jbInfo.getHdfsInfo().getJb_hdfs_fileType_r());
        parameter.put("encoding",jbInfo.getHdfsInfo().getJb_hdfs_en_r());
        parameter.put("fieldDelimiter",jbInfo.getHdfsInfo().getJb_hdfs_fieldD_r());
        //parameter.put("nullFormat",jbInfo.getHdfsInfo().getJb_hdfs_nullF_r());
        parameter.put("haveKerberos",jbInfo.getHdfsInfo().getJb_hdfs_haveK_r());
        if(jbInfo.getHdfsInfo().getJb_hdfs_haveK_r()){
            parameter.put("kerberosKeytabFilePath",jbInfo.getHdfsInfo().getJb_hdfs_kerberosK_r());
            parameter.put("kerberosPrincipal",jbInfo.getHdfsInfo().getJb_hdfs_kerberosP_r());
        }
        parameter.put("compress",jbInfo.getHdfsInfo().getJb_hdfs_compress_r());
        JSONObject hadoopConfig = new JSONObject();
        hadoopConfig.put("dfs.nameservices",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_a_r());
        hadoopConfig.put("dfs.ha.namenodes.testDfs",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_b_r());
        hadoopConfig.put("dfs.namenode.rpc-address.aliDfs.namenode1",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_c_r());
        hadoopConfig.put("dfs.namenode.rpc-address.aliDfs.namenode2",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_d_r());
        hadoopConfig.put("dfs.client.failover.proxy.provider.testDfs",jbInfo.getHdfsInfo().getJb_hdfs_hadoopCfg_e_r());
        parameter.put("hadoopConfig",hadoopConfig);
        JSONObject csvReaderConfig = new JSONObject();
        csvReaderConfig.put("safetySwitch",false);
        csvReaderConfig.put("skipEmptyRecords",false);
        csvReaderConfig.put("useTextQualifier",false);
        parameter.put("csvReaderConfig",csvReaderConfig);
        reader.put("parameter",parameter);
        return reader;
    }
}

