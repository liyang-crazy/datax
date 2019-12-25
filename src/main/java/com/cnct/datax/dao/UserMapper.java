package com.cnct.datax.dao;

import com.cnct.datax.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserMapper {
    public List<User> queryAllUser();
}
