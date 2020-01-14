package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * Drds writer格式
 */
public class DrdsWriter {
    public static JSONObject drdsWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","drdswriter");
        JSONObject parameter = new JSONObject();
        parameter.put("writeMode",jbInfo.getDrdsInfo().getJb_drds_writeM_w());
        parameter.put("username",jbInfo.getDrdsInfo().getJb_drds_username_w());
        parameter.put("password",jbInfo.getDrdsInfo().getJb_drds_pasw_w());
        parameter.put("column",jbInfo.getDrdsInfo().getJb_drds_colemn_arr_w());
        parameter.put("preSql",jbInfo.getDrdsInfo().getJb_drds_preSql_arr_w());
        parameter.put("postSql",jbInfo.getDrdsInfo().getJb_drds_postSql_arr_w());
        JSONArray connection = new JSONArray();
        JSONObject connection_a = new JSONObject();
        connection_a.put("jdbcUrl",jbInfo.getDrdsInfo().getJb_drds_jdbcUrl_w());
        connection_a.put("table",jbInfo.getDrdsInfo().getJb_drds_table_arr_w());
        connection.add(connection_a);
        parameter.put("connection",connection);
        parameter.put("batchSize",jbInfo.getDrdsInfo().getJb_drds_batchSize_w());
        writer.put("parameter",parameter);
        return writer;
    }
}
