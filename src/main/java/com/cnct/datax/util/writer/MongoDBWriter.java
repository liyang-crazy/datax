package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * MongoDB writer格式
 */
public class MongoDBWriter {
    public static JSONObject mongoDBWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","mongodbwriter");
        JSONObject parameter = new JSONObject();
        parameter.put("address",jbInfo.getMongodbInfo().getJb_mongodb_address_arr_w());
        parameter.put("userName",jbInfo.getMongodbInfo().getJb_mongodb_username_w());
        parameter.put("userPassword",jbInfo.getMongodbInfo().getJb_mongodb_userpasw_w());
        parameter.put("dbName",jbInfo.getMongodbInfo().getJb_mongodb_dbname_w());
        parameter.put("collectionName",jbInfo.getMongodbInfo().getJb_mongodb_collname_w());
        parameter.put("column",jbInfo.getMongodbInfo().getJb_mongodb_column_arr_w());
        JSONObject upsertInfo = new JSONObject();
        upsertInfo.put("isUpsert",jbInfo.getMongodbInfo().getJb_mongodb_isupsert_w());
        upsertInfo.put("upsertKey",jbInfo.getMongodbInfo().getJb_mongodb_upsertKey_w());
        parameter.put("upsertInfo",upsertInfo);
        writer.put("parameter",parameter);
        return writer;
    }
}
