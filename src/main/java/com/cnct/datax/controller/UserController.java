package com.cnct.datax.controller;

import com.cnct.datax.entity.ResData;
import com.cnct.datax.entity.User;
import com.cnct.datax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller()
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/queryAllUser",method = RequestMethod.POST)
    @ResponseBody
    public ResData queryAllUser(){
        ResData res = new ResData();
        List<User> list = userService.queryAllUser();
        try {
            res.setCode(100).putData("list",list).setMsg("查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            res.setCode(999).setMsg("查询失败！");
        }
        return res;
    }
}
