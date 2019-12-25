package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * oracle writer格式
 */
public class OracleWriter {
    public static JSONObject oracleWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","oraclewriter");
        JSONObject parameter = new JSONObject();
        parameter.put("username",jbInfo.getW_db_username());
        parameter.put("password",jbInfo.getW_db_password());
        parameter.put("column",jbInfo.getW_jb_column_arr());
        parameter.put("preSql",jbInfo.getW_jb_preSql_arr());
        parameter.put("postSql",jbInfo.getW_jb_preSql_arr());
        parameter.put("batchSize",1024);

        String[] session_arr = {"alter session set nls_date_format = 'dd.mm.yyyy hh24:mi:ss';","alter session set NLS_LANG = 'AMERICAN';"};
        parameter.put("session",session_arr);

        JSONArray connection = new JSONArray();
        JSONObject connection_a = new JSONObject();
        connection_a.put("table",jbInfo.getW_jb_table_arr());
        connection_a.put("jdbcUrl",jbInfo.getW_jb_url());
        connection.add(connection_a);
        parameter.put("connection",connection);
        writer.put("parameter",parameter);
        return writer;
    }
}
