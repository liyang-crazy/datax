package com.cnct.datax.controller;



import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.service.MD5UtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MD5UtilsController {

    @Autowired
    private MD5UtilsService md5UtilsService;

    @RequestMapping(value = "getToMD5",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getToMD5(String md5Str){
        Map<String,Object> map = new HashMap<>();
        try {
            String md5_str = this.md5UtilsService.getToMD5(md5Str);
            md5_str = md5_str.substring(0,md5_str.length()-3)+"}";
            JSONObject md5_obj = JSONObject.parseObject(md5_str);
            if((int)md5_obj.get("err") == 0){
                map.put("md5_obj",md5_obj);
                map.put("code",200);
                map.put("data",md5_obj.get("data"));
                map.put("type",md5_obj.get("type"));
                map.put("msg","破解成功！");
            }else {
                map.put("md5_obj",md5_obj);
                map.put("code",999);
                map.put("msg","破解失败！");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","破解失败！");
        }
        return map;
    }

}
