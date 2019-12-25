package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * oracle reader标准格式
 */
public class OracleReader {
    public static JSONObject oracleReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","oraclereader");
        JSONObject parameter = new JSONObject();
        parameter.put("username",jbInfo.getR_db_username());
        parameter.put("password",jbInfo.getR_db_password());
        if("1".equals(jbInfo.getR_jb_tbgs())){
            parameter.put("column",jbInfo.getR_jb_column_arr());
            parameter.put("where","");
        }
        parameter.put("splitPk",jbInfo.getR_jb_splitPk());
        parameter.put("fetchSize",1024);

        String[] session_arr = {"alter session set NLS_DATE_FORMAT='yyyy-mm-dd hh24:mi:ss'","alter session set NLS_TIMESTAMP_FORMAT='yyyy-mm-dd hh24:mi:ss'","alter session set NLS_TIMESTAMP_TZ_FORMAT='yyyy-mm-dd hh24:mi:ss'","alter session set TIME_ZONE='US/Pacific'"};
        parameter.put("session",session_arr);

        JSONArray connection = new JSONArray();
        JSONObject connection_a = new JSONObject();
        if("1".equals(jbInfo.getR_jb_tbgs())){
            connection_a.put("table",jbInfo.getR_jb_table_arr());
        }
        if("2".equals(jbInfo.getR_jb_tbgs())){
            connection_a.put("querySql",jbInfo.getR_jb_sql_arr());
        }
        connection_a.put("jdbcUrl",jbInfo.getR_jb_url_arr());
        connection.add(connection_a);
        parameter.put("connection",connection);
        reader.put("parameter",parameter);
        return reader;
    }
}
