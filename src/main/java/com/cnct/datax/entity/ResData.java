package com.cnct.datax.entity;

import java.util.HashMap;
import java.util.Map;

/**
 * 响应结果封装类,可链式设置属性值
 * @author LYQ
 * @Date  2017/11/10
 */
public class ResData {
    /**响应状态码*/
    private Integer code =  100;
    /**提示消息*/
    private String msg = "成功";
    /**数据*/
    private Map data = new HashMap();

    public Integer getCode() {
        return code;
    }

    public ResData setCode(Integer code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public ResData setMsg(String msg) {
        this.msg = msg;
        return this;
    }


    public Map getData() {
        return data;
    }

    public ResData putData(String key,Object value) {
        data.put(key,value);
        return this;
    }
}
