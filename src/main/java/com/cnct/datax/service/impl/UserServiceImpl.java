package com.cnct.datax.service.impl;

import com.cnct.datax.dao.UserMapper;
import com.cnct.datax.entity.User;
import com.cnct.datax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserMapper userMapper;
    @Override
    public List<User> queryAllUser() {
        return userMapper.queryAllUser();
    }
}
