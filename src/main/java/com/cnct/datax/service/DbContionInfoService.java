package com.cnct.datax.service;

import com.cnct.datax.entity.DbContionInfo;

import java.util.List;

/**
 * 数据库联系信息
 */
public interface DbContionInfoService {
    public List<DbContionInfo> queryAllDbInfo(int page,int limit);
    int queryAllCount();
    public int addDbInfo(DbContionInfo dbContionInfo);
    public int updateDbInfoById(DbContionInfo dbContionInfo);
    public int deletDbInfoById(DbContionInfo dbContionInfo);
    public int isNullById(DbContionInfo dbContionInfo);
    public List<DbContionInfo> queryAllType();
    public List<DbContionInfo> queryAllContionNameByTypeId(DbContionInfo dbContionInfo);
    public DbContionInfo queryOneDbContionById(DbContionInfo dbContionInfo);
}
