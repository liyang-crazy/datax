package com.cnct.datax.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * 将reader和writer的文件信息汇总，合并成一个json文件
 */
public class Merge {
    public static String mergeAll(JbInfo jbInfo,JSONObject reader, JSONObject writer){
        JSONObject root = new JSONObject();
        JSONObject job = new JSONObject();
        JSONObject setting = new JSONObject();
        JSONObject speed = new JSONObject();
        JSONObject errorLimit = new JSONObject();
        if(jbInfo.getJb_byte() != 0){
            speed.put("byte",jbInfo.getJb_byte());
        }
        if(jbInfo.getJb_channel() != 0){
            speed.put("channel",jbInfo.getJb_channel());
        }
        if(jbInfo.getJb_record() != 0){
            errorLimit.put("record",jbInfo.getJb_record());
        }
        if(jbInfo.getJb_percentage() != 0){
            errorLimit.put("percentage",jbInfo.getJb_percentage());
        }
        if(jbInfo.getJb_byte() != 0 || jbInfo.getJb_channel() != 0){
            setting.put("speed",speed);
        }
        if(jbInfo.getJb_record() != 0 || jbInfo.getJb_percentage() != 0){
            setting.put("errorLimit",errorLimit);
        }
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
