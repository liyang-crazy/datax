package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
mysql reader的json格式
 */
public class MysqlReader {
    public static JSONObject mysqlReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","mysqlreader");
        JSONObject parameter = new JSONObject();
        parameter.put("username",jbInfo.getR_db_username());
        parameter.put("password",jbInfo.getR_db_password());
        parameter.put("splitPk",jbInfo.getR_jb_splitPk());
        if("1".equals(jbInfo.getR_jb_tbgs())){
            parameter.put("column",jbInfo.getR_jb_column_arr());
            parameter.put("where","");
        }
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

