package com.cnct.datax.service;

import com.cnct.datax.entity.JbInfo;

import java.util.List;

/**
 * 脚本的所有信息
 */
public interface JbInfoService {
    /**
     * 查询所有的脚本的信息
     */
    public List<JbInfo> queryAllJbInfo(int page,int limit);
    /**
     * 查询所有脚本的总数，用于分页
     */
    public int queryAllJbInfoCount();
    /**
     * 添加脚本信息
     */
    public void addJbInfo(JbInfo jbInfo);
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
    public void editJbInfoById(JbInfo jbInfo);
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
    public JbInfo queryDbInfoById(String db_id);
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
    /*
    根据id查询脚本信息-查询的是txtfile的
     */
    public JbInfo queryJbInfoByIdTxtFile(JbInfo jbInfo);
    /**
     * 根据id查询脚本信息-查询的是ftp的
     */
    public JbInfo queryJbInfoByIdFtp(JbInfo jbInfo);

}
