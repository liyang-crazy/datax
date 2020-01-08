package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
MongoDB reader的json格式
 */
public class MongoDBReader {
    public static JSONObject mongoDBReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","mongodbreader");
        JSONObject parameter = new JSONObject();
        parameter.put("address",jbInfo.getMongodbInfo().getJb_mongodb_address_arr_r());
        parameter.put("userName",jbInfo.getMongodbInfo().getJb_mongodb_username_r());
        parameter.put("userPassword",jbInfo.getMongodbInfo().getJb_mongodb_userpasw_r());
        parameter.put("dbName",jbInfo.getMongodbInfo().getJb_mongodb_dbname_r());
        parameter.put("collectionName",jbInfo.getMongodbInfo().getJb_mongodb_collname_r());
        parameter.put("column",jbInfo.getMongodbInfo().getJb_mongodb_column_arr_r());
        reader.put("parameter",parameter);
        return reader;
    }
}

