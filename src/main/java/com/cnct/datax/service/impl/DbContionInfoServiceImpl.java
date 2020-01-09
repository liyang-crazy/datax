package com.cnct.datax.service.impl;

import com.cnct.datax.dao.DbContionInfoMapper;
import com.cnct.datax.entity.DbContionInfo;
import com.cnct.datax.entity.PageUtil;
import com.cnct.datax.service.DbContionInfoService;
import com.cnct.datax.util.DbUrlHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *数据库联系信息
 */
@Service
public class DbContionInfoServiceImpl implements DbContionInfoService{
    @Autowired
    private DbContionInfoMapper dbContionInfoMapper;

    @Override
    public List<DbContionInfo> queryAllDbInfo(int page,int limit) {
        PageUtil pageUtil = new PageUtil();
        pageUtil.setPageNum((page-1)*limit);
        pageUtil.setLimit(limit);
        List<DbContionInfo> list = dbContionInfoMapper.queryAllDbInfo(pageUtil);
        for(DbContionInfo dbInfo : list){
            if("1".equals(dbInfo.getDb_type())){
                if(!"".equals(dbInfo.getDb_zfj()) && dbInfo.getDb_zfj() != null){
                    dbInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbInfo.getDb_ip()+":"+dbInfo.getDb_port()+"/"+dbInfo.getDb_name()+"?"+dbInfo.getDb_zfj());
                }else {
                    dbInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbInfo.getDb_ip()+":"+dbInfo.getDb_port()+"/"+dbInfo.getDb_name());
                }
            }
            if("2".equals(dbInfo.getDb_type())){
                dbInfo.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbInfo.getDb_ip()+":"+dbInfo.getDb_port()+"/"+dbInfo.getDb_sid());
            }
            if("4".equals(dbInfo.getDb_type())){
                dbInfo.setDb_url(DbUrlHeader.DB_URL_SQLSERVER+dbInfo.getDb_ip()+":"+dbInfo.getDb_port()+";DatabaseName="+dbInfo.getDb_name());
            }
            if("6".equals(dbInfo.getDb_type())){
                dbInfo.setDb_url(DbUrlHeader.DB_URL_MONGODB+dbInfo.getDb_username()+":"+dbInfo.getDb_password()+"@"+dbInfo.getDb_ip()+":"+dbInfo.getDb_port());
            }
            if("7".equals(dbInfo.getDb_type())){
                dbInfo.setDb_url(dbInfo.getDb_ip()+":"+dbInfo.getDb_port());
            }
        }
        return list;
    }

    @Override
    public int queryAllCount() {
        return dbContionInfoMapper.queryAllCount();
    }

    @Override
    public int addDbInfo(DbContionInfo dbContionInfo) {
        return dbContionInfoMapper.addDbInfo(dbContionInfo);
    }

    @Override
    public int updateDbInfoById(DbContionInfo dbContionInfo) {
        return dbContionInfoMapper.updateDbInfoById(dbContionInfo);
    }

    @Override
    public int deletDbInfoById(DbContionInfo dbContionInfo) {
        return dbContionInfoMapper.deletDbInfoById(dbContionInfo);
    }

    @Override
    public int isNullById(DbContionInfo dbContionInfo) {
        return dbContionInfoMapper.isNullById(dbContionInfo);
    }

    @Override
    public List<DbContionInfo> queryAllType() {
        List<DbContionInfo> list = dbContionInfoMapper.queryAllType();
        return list;
    }

    @Override
    public List<DbContionInfo> queryAllContionNameByTypeId(DbContionInfo dbContionInfo) {
        List<DbContionInfo> list = dbContionInfoMapper.queryAllContionNameByTypeId(dbContionInfo);
        return list;
    }
    //根据id查询数据库连接信息
    @Override
    public DbContionInfo queryOneDbContionById(DbContionInfo dbContionInfo) {
        DbContionInfo dbCon = dbContionInfoMapper.queryOneDbContionById(dbContionInfo);
        if("1".equals(dbCon.getDb_type())){
            if(!"".equals(dbCon.getDb_zfj()) && dbCon.getDb_zfj() != null){
                dbCon.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbCon.getDb_ip()+":"+dbCon.getDb_port()+"/"+dbCon.getDb_name()+"?"+dbCon.getDb_zfj());
            }else {
                dbCon.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbCon.getDb_ip()+":"+dbCon.getDb_port()+"/"+dbCon.getDb_name());
            }
        }
        if("2".equals(dbCon.getDb_type())){
            dbCon.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbCon.getDb_ip()+":"+dbCon.getDb_port()+"/"+dbCon.getDb_sid());
        }
        if("4".equals(dbCon.getDb_type())){
            dbCon.setDb_url(DbUrlHeader.DB_URL_SQLSERVER+dbCon.getDb_ip()+":"+dbCon.getDb_port()+";DatabaseName="+dbCon.getDb_name());
        }
        if("6".equals(dbCon.getDb_type())){
            dbCon.setDb_url(DbUrlHeader.DB_URL_MONGODB+dbCon.getDb_username()+":"+dbCon.getDb_password()+"@"+dbCon.getDb_ip()+":"+dbCon.getDb_port());
        }
        if("7".equals(dbCon.getDb_type())){
            dbCon.setDb_url(dbCon.getDb_ip()+":"+dbCon.getDb_port());
        }
        return dbCon;
    }


}
