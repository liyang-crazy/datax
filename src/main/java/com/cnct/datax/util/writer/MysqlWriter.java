package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * mysql writer格式
 */
public class MysqlWriter {
    public static JSONObject mysqlWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","mysqlwriter");
        JSONObject parameter = new JSONObject();
        parameter.put("writeMode",jbInfo.getW_jb_mode());
        parameter.put("username",jbInfo.getW_db_username());
        parameter.put("password",jbInfo.getW_db_password());
        parameter.put("column",jbInfo.getW_jb_column_arr());
        parameter.put("session",jbInfo.getW_jb_session_arr());
        parameter.put("preSql",jbInfo.getW_jb_preSql_arr());
        parameter.put("postSql",jbInfo.getW_jb_preSql_arr());
        parameter.put("batchSize",1024);
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
