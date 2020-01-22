package com.cnct.datax.dao;

import com.cnct.datax.entity.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 脚本的所有信息
 */
@Repository
public interface JbInfoMapper {
    /**
     * 查询所有的脚本的信息
     */
    public List<JbInfo> queryAllJbInfo(PageUtil pageUtil);
    /**
     * 查询所有脚本的总数，用于分页
     */
    public int queryAllJbInfoCount();
    /**
     * 添加脚本信息
     */
    public int addJbInfo(JbInfo jbInfo);
    /**
     * 根据脚本id查询脚本的详细信息
     */
    public JbInfo queryJbInfoById(JbInfo jbInfo);
    /**
     *根据脚本id查询出该脚本对应的reader和writer对应的username和password
     */
    public JbInfo queryUserNameAndPasw(JbInfo jbInfo);
    /**
     * 根据脚本id修改脚本详细信息
     */
    public int editJbInfoById(JbInfo jbInfo);
    /**
     * 根据id删除对应脚本的信息
     */
    public int delJbInfoById(JbInfo jbInfo);
    /**
     *根据id删除对应脚本时候判断该脚本是否存在
     */
    public int isNullJbInfoById(JbInfo jbInfo);

    /**
     *根据数据库连接信息的id查询对应的数据库信息
     */
    public JbInfo queryDbInfoById(JbInfo jbInfo);
    /*
      *根据筛选的条件查询脚本信息
     */
    public List<JbInfo> queryAllJbInfoByTj(JbInfo jbInfo);
    /**
     *根据条件查询的时候，查询出总条数用于分页
     */
    public int queryAllJbInfoByTjPage(JbInfo jbInfo);
    /**
     * 查询所有脚本的分组信息
     */
    public List<JbInfo> queryAllJbGroup();
    /**
     *向txtfile表中添加对应的脚本信息
     */
    public int addTxtfileJbInfo(JbInfo jbInfo);
    /*
    根据id查询脚本信息-查询的是txtfile的
     */
    public TxtFileInfo queryJbInfoByIdTxtFile(TxtFileInfo txtFileInfo);

    /**
     * 根据脚本id修改对应脚本信息-txtfile
     */
    public void editJbInfoByIdTxtFile(TxtFileInfo txtFileInfo);
    /**
     * 向ftp表中添加对应的脚本信息
     */
    public int addFtpJbInfo(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是ftp的
     */
    public FtpInfo queryJbInfoByIdFtp(FtpInfo ftpInfo);
    /**
     * 根据脚本id修改对应脚本信息-ftp
     */
    public void editJbInfoByIdFtP(FtpInfo ftpInfo);
    /**
     * 向mongodb表中添加对应的脚本信息
     */
    public int addMongodbJbInfo(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是mongodb的
     */
    public MongodbInfo queryJbInfoByIdMongoDB(MongodbInfo mongodbInfo);
    /**
     *根据脚本id修改对应脚本信息-mongodb
     */
    public void editJbInfoByIdMongoDB(MongodbInfo mongodbInfo);
    /**
     * 向cassandra表中添加对应的脚本信息
     */
    public int addCassandraJbInfo(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是cassabdra的
     */
    public CassandraInfo queryJbInfoByIdCassandra(CassandraInfo cassandraInfo);
    /**
     * 根据脚本id修改对应脚本信息-cassandra
     */
    public void editJbInfoByIdCassandra(CassandraInfo cassandraInfo);
    /**
     * 向drds表中添加对应的脚本信息
     */
    public int addDrdsJbInfo(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是drds的
     */
    public DrdsInfo queryJbInfoByIdDrds(DrdsInfo drdsInfo);
    /**
     * 根据脚本id修改对应脚本信息-drds
     */
    public void editJbInfoByIdDrds(DrdsInfo drdsInfo);
    /**
     * 向hdfs表中添加脚本信息
     */
    public int addHdfsJbInfo(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是hdfs的
     */
    public HdfsInfo queryJbInfoByIdHdfs(HdfsInfo hdfsInfo);
    /**
     * 根据脚本id修改对应脚本信息-hdfs
     */
    public void editJbInfoByIdHdfs(HdfsInfo hdfsInfo);
}
