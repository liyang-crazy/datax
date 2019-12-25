package com.cnct.datax.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 将reader和writer的文件信息汇总，合并成一个json文件
 */
public class Merge {
    public static String mergeAll(JSONObject reader,JSONObject writer){
        JSONObject root = new JSONObject();
        JSONObject job = new JSONObject();
        JSONObject setting = new JSONObject();
        JSONObject speed = new JSONObject();
        speed.put("channel",5);
        speed.put("byte",1048576);
        JSONObject errorLimit = new JSONObject();
        errorLimit.put("record",0);
        errorLimit.put("percentage",0.02);
        setting.put("speed",speed);
        setting.put("errorLimit",errorLimit);
        job.put("setting",setting);

        JSONArray content = new JSONArray();
        JSONObject content_obj = new JSONObject();
        content_obj.put("reader",reader);
        content_obj.put("writer",writer);
        content.add(content_obj);

        job.put("content",content);
        root.put("job",job);
        //格式化json字符串
        String jsonString = FormatJson.formatJson(root.toString());
        return jsonString;
    }
}
