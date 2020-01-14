package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
Drds reader的json格式
 */
public class DrdsReader {
    public static JSONObject drdsReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","drdsReader");
        JSONObject parameter = new JSONObject();
        parameter.put("username",jbInfo.getDrdsInfo().getJb_drds_username_r());
        parameter.put("password",jbInfo.getDrdsInfo().getJb_drds_pasw_r());
        if("1".equals(jbInfo.getR_jb_tbgs())){
            parameter.put("column",jbInfo.getDrdsInfo().getJb_drds_column_arr_r());
            parameter.put("where",jbInfo.getDrdsInfo().getJb_drds_where_r());
        }
        JSONArray connection = new JSONArray();
        JSONObject connection_a = new JSONObject();
        if("1".equals(jbInfo.getR_jb_tbgs())){
            connection_a.put("table",jbInfo.getDrdsInfo().getJb_drds_table_arr_r());
        }
        if("2".equals(jbInfo.getR_jb_tbgs())){
            connection_a.put("querySql",jbInfo.getDrdsInfo().getJb_drds_querySql_arr_r());
        }
        connection_a.put("jdbcUrl",jbInfo.getDrdsInfo().getJb_drds_jdbcUrl_arr_r());
        connection.add(connection_a);
        parameter.put("connection",connection);
        reader.put("parameter",parameter);
        return reader;
    }
}

