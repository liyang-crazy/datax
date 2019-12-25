package com.cnct.datax.dao;


import com.cnct.datax.entity.DbContionInfo;
import com.cnct.datax.entity.PageUtil;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DbContionInfoMapper {
    //查询所有连接信息list
    public List<DbContionInfo> queryAllDbInfo(PageUtil pageUtil);
    //获取所有连接信息的总条数
    int queryAllCount();
    //新增连接信息
    public int addDbInfo(DbContionInfo dbContionInfo);
    //根据id修改对应连接信息
    public int updateDbInfoById(DbContionInfo dbContionInfo);
    //根据id删除对应的连接信息
    public int deletDbInfoById(DbContionInfo dbContionInfo);
    //删除之前判断该id是否存在
    public int isNullById(DbContionInfo dbContionInfo);
    //查询数据库连接类型list
    public List<DbContionInfo> queryAllType();
    //根据数据库类型查询对应的连接名称list
    public List<DbContionInfo> queryAllContionNameByTypeId(DbContionInfo dbContionInfo);
    //根据id查询数据库连接信息
    public DbContionInfo queryOneDbContionById(DbContionInfo dbContionInfo);

}
