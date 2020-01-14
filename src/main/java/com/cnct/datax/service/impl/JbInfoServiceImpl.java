package com.cnct.datax.service.impl;

import com.cnct.datax.dao.JbInfoMapper;
import com.cnct.datax.entity.*;
import com.cnct.datax.service.JbInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *脚本的所有信息
 */
@Service
public class JbInfoServiceImpl implements JbInfoService{
    @Autowired
    private JbInfoMapper jbInfoMapper;

    /**
     * 查询所有的脚本的信息
     */
    @Override
    public List<JbInfo> queryAllJbInfo(int page,int limit) {
        PageUtil pageUtil = new PageUtil();
        pageUtil.setPageNum((page-1)*limit);
        pageUtil.setLimit(limit);
        return jbInfoMapper.queryAllJbInfo(pageUtil);
    }
    /**
     * 查询所有脚本的总数，用于分页
     */
    @Override
    public int queryAllJbInfoCount() {
        return jbInfoMapper.queryAllJbInfoCount();
    }
    /**
     * 添加脚本信息
     */
    @Override
    public void addJbInfo(JbInfo jbInfo) {
        if("3".equals(jbInfo.getR_db_type()) || "3".equals(jbInfo.getW_db_type())){
            /*txtfile文件添加*/
            jbInfoMapper.addJbInfo(jbInfo);
            jbInfo.getTxtFileInfo().setJb_txtFile_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.addTxtfileJbInfo(jbInfo);
        }else if("5".equals(jbInfo.getR_db_type()) || "5".equals(jbInfo.getW_db_type())){
            /*ftp文件添加*/
            jbInfoMapper.addJbInfo(jbInfo);
            jbInfo.getFtpInfo().setJb_ftp_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.addFtpJbInfo(jbInfo);
        }else if("6".equals(jbInfo.getR_db_type()) || "6".equals(jbInfo.getW_db_type())){
            /*mongodb文件添加*/
            jbInfoMapper.addJbInfo(jbInfo);
            jbInfo.getMongodbInfo().setJb_mongodb_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.addMongodbJbInfo(jbInfo);
        }else if("7".equals(jbInfo.getR_db_type()) || "7".equals(jbInfo.getW_db_type())){
            /*cassandra文件添加*/
            jbInfoMapper.addJbInfo(jbInfo);
            jbInfo.getCassandraInfo().setJb_cassandra_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.addCassandraJbInfo(jbInfo);
        }else if("8".equals(jbInfo.getR_db_type()) || "8".equals(jbInfo.getW_db_type())){
            /*drds文件添加*/
            jbInfoMapper.addJbInfo(jbInfo);
            jbInfo.getDrdsInfo().setJb_drds_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.addDrdsJbInfo(jbInfo);
        }else {
            jbInfoMapper.addJbInfo(jbInfo);
        }
    }
    /**
     * 根据脚本id查询脚本的详细信息
     */
    @Override
    public JbInfo queryJbInfoById(JbInfo jbInfo) {
        return jbInfoMapper.queryJbInfoById(jbInfo);
    }
    /**
     *根据脚本id查询出该脚本对应的reader和writer对应的username和password
     */
    @Override
    public JbInfo queryUserNameAndPasw(JbInfo jbInfo) {
        return jbInfoMapper.queryUserNameAndPasw(jbInfo);
    }

    /**
     * 根据脚本id修改脚本详细信息
     */
    @Override
    public void editJbInfoById(JbInfo jbInfo) {
        if("3".equals(jbInfo.getR_db_type()) || "3".equals(jbInfo.getW_db_type())){
            TxtFileInfo txtFileInfo = jbInfo.getTxtFileInfo();
            txtFileInfo.setJb_txtFile_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.editJbInfoById(jbInfo);
            jbInfoMapper.editJbInfoByIdTxtFile(txtFileInfo);
        }else if("5".equals(jbInfo.getR_db_type()) || "5".equals(jbInfo.getW_db_type())){
            FtpInfo ftpInfo = jbInfo.getFtpInfo();
            ftpInfo.setJb_ftp_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.editJbInfoById(jbInfo);
            jbInfoMapper.editJbInfoByIdFtP(ftpInfo);
        }else if("6".equals(jbInfo.getR_db_type()) || "6".equals(jbInfo.getW_db_type())){
            MongodbInfo mongodbInfo = jbInfo.getMongodbInfo();
            mongodbInfo.setJb_mongodb_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.editJbInfoById(jbInfo);
            jbInfoMapper.editJbInfoByIdMongoDB(mongodbInfo);
        }else if("7".equals(jbInfo.getR_db_type()) || "7".equals(jbInfo.getW_db_type())){
            CassandraInfo cassandraInfo = jbInfo.getCassandraInfo();
            cassandraInfo.setJb_cassandra_id(String.valueOf(jbInfo.getId()));
            jbInfoMapper.editJbInfoById(jbInfo);
            jbInfoMapper.editJbInfoByIdCassandra(cassandraInfo);
        }else {
            jbInfoMapper.editJbInfoById(jbInfo);
        }
    }
    /**
     * 根据id删除对应脚本的信息
     */
    @Override
    public int delJbInfoById(JbInfo jbInfo) {
        return jbInfoMapper.delJbInfoById(jbInfo);
    }
    /**
     *根据id删除对应脚本时候判断该脚本是否存在
     */
    @Override
    public int isNullJbInfoById(JbInfo jbInfo) {
        return jbInfoMapper.isNullJbInfoById(jbInfo);
    }
    /**
     *根据数据库连接信息的id查询对应的数据库信息
     */
    @Override
    public JbInfo queryDbInfoById(String db_id) {
        JbInfo jbInfo = new JbInfo();
        jbInfo.setDb_id(db_id);
        return jbInfoMapper.queryDbInfoById(jbInfo);
    }
    /*
      *根据筛选的条件查询脚本信息
     */
    @Override
    public List<JbInfo> queryAllJbInfoByTj(JbInfo jbInfo) {
        List<JbInfo> list = jbInfoMapper.queryAllJbInfoByTj(jbInfo);
        return list;
    }
    /**
     *根据条件查询的时候，查询出总条数用于分页
     */
    @Override
    public int queryAllJbInfoByTjPage(JbInfo jbInfo) {
        return jbInfoMapper.queryAllJbInfoByTjPage(jbInfo);
    }
    /**
     * 查询所有脚本的分组信息
     */
    @Override
    public List<JbInfo> queryAllJbGroup() {
        return jbInfoMapper.queryAllJbGroup();
    }
    /*
    根据id查询脚本信息-查询的是txtfile的
     */
    @Override
    public JbInfo queryJbInfoByIdTxtFile(JbInfo jbInfo) {
        TxtFileInfo txtFileInfo = new TxtFileInfo();
        txtFileInfo.setJb_txtFile_id(String.valueOf(jbInfo.getId()));
        JbInfo jbInfo_obj = new JbInfo();
        jbInfo_obj = jbInfoMapper.queryJbInfoById(jbInfo);
        txtFileInfo = jbInfoMapper.queryJbInfoByIdTxtFile(txtFileInfo);
        jbInfo_obj.setTxtFileInfo(txtFileInfo);
        return jbInfo_obj;
    }

    /**
     * 根据id查询脚本信息-查询的是ftp的
     */
    @Override
    public JbInfo queryJbInfoByIdFtp(JbInfo jbInfo) {
        FtpInfo ftpInfo = new FtpInfo();
        ftpInfo.setJb_ftp_id(String.valueOf(jbInfo.getId()));
        JbInfo jbInfo_obj = new JbInfo();
        jbInfo_obj = jbInfoMapper.queryJbInfoById(jbInfo);
        ftpInfo = jbInfoMapper.queryJbInfoByIdFtp(ftpInfo);
        jbInfo_obj.setFtpInfo(ftpInfo);
        return jbInfo_obj;
    }
    /**
     * 根据id查询脚本信息-查询的是mongodb的
     */
    @Override
    public JbInfo queryJbInfoByIdMongoDB(JbInfo jbInfo) {
        MongodbInfo mongodbInfo = new MongodbInfo();
        mongodbInfo.setJb_mongodb_id(String.valueOf(jbInfo.getId()));
        JbInfo jbInfo_obj = new JbInfo();
        jbInfo_obj = jbInfoMapper.queryJbInfoById(jbInfo);
        mongodbInfo = jbInfoMapper.queryJbInfoByIdMongoDB(mongodbInfo);
        jbInfo_obj.setMongodbInfo(mongodbInfo);
        return jbInfo_obj;
    }
    /**
     * 根据id查询脚本信息-查询的是cassandra的
     */
    @Override
    public JbInfo queryJbInfoByIdCassandra(JbInfo jbInfo) {
        CassandraInfo cassandraInfo = new CassandraInfo();
        cassandraInfo.setJb_cassandra_id(String.valueOf(jbInfo.getId()));
        JbInfo jbInfo_obj = new JbInfo();
        jbInfo_obj = jbInfoMapper.queryJbInfoById(jbInfo);
        cassandraInfo = jbInfoMapper.queryJbInfoByIdCassandra(cassandraInfo);
        jbInfo_obj.setCassandraInfo(cassandraInfo);
        return jbInfo_obj;
    }
}
