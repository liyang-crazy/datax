package com.cnct.datax.entity;

import java.util.Date;

/**
 * 脚本信息实体类
 */
public class JbInfo {
    private int id;
    //数据库类型-读
    private String r_db_type;
    //数据库类型-写
    private String w_db_type;
    //连接数据库的id-读
    private String r_db_id;
    //连接数据库的id-写
    private String w_db_id;
    //脚本-同步格式-读
    private String r_jb_tbgs;
    //脚本-名称
    private String jb_name;
    //脚本-列名-读
    private String r_jb_column;
    //脚本-列名-写
    private String w_jb_column;
    //脚本-表名-读
    private String r_jb_table;
    //脚本-表名-写
    private String w_jb_table;
    //脚本-jdbcUrl连接地址-读
    private String r_jb_url;
    //脚本-jdbcUrl连接地址-写
    private String w_jb_url;
    //脚本-数据分片-读
    private String r_jb_splitPk;
    //脚本-动态sql-读
    private String r_jb_sql;
    //脚本-oracle条件-读
    private String r_where;
    //脚本-写session
    private String w_jb_session;
    //脚本-写presql
    private String w_jb_presql;
    //脚本-写postsql
    private String w_jb_postsql;
    //脚本-备注
    private String jb_bz;
    //脚本-录入时间
    private Date jb_lrsj;
    //脚本-修改时间
    private Date jb_xgsj;
    //脚本-生成json文件的名称
    private String jb_json_file_name;
    //脚本-生成json文件的存放地址
    private String jb_json_fullPath;
    //脚本-有效标志
    private String jb_yxbz;

    //脚本-数据库连接用户名-读
    private String r_jb_username;
    //脚本-数据库连接密码-读
    private String r_jb_password;
    //脚本-数据库连接用户名-写
    private String w_jb_username;
    //脚本-数据库连接密码-写
    private String w_jb_password;

    //脚本-列名-数组-读
    private String[] r_jb_column_arr;
    //脚本-表名-数组-读
    private String[] r_jb_table_arr;
    //脚本-连接地址-数组-读
    private String[] r_jb_url_arr;
    //脚本-动态sql-数组-读
    private String[] r_jb_sql_arr;

    //脚本-列名-数组-写
    private String[] w_jb_column_arr;
    //脚本-表名-数组-写
    private String[] w_jb_table_arr;
    //脚本-session-数组-写
    private String[] w_jb_session_arr;
    //脚本-preSql-数组-写
    private String[] w_jb_preSql_arr;
    //脚本-postSql-数组-写
    private String[] w_jb_postSql_arr;


    //数据库ip-读
    private String r_db_ip;
    //数据库端口-读
    private String r_db_port;
    //数据库sid-读
    private String r_db_sid;
    //数据库username-读
    private String r_db_username;
    //数据库password-读
    private String r_db_password;
    //数据库连接地址-读
    private String r_db_url;


    //数据库ip-写
    private String w_db_ip;
    //数据库端口-写
    private String w_db_port;
    //数据库sid-写
    private String w_db_sid;
    //数据库username-写
    private String w_db_username;
    //数据库password-写
    private String w_db_password;
    //数据库连接地址-写
    private String w_db_url;
    private String db_username;
    private String db_password;
    private String db_id;
    private Date jb_lrsj_q;
    private Date jb_lrsj_z;
    private PageUtil pageUtil;
    //脚本分组编号
    private String jb_group_id;
    //脚本分组名称
    private String jb_group_name;
    //写入mysql的时候的方式
    private String w_jb_mode;
    //存入txtfile的对象
    private TxtFileInfo txtFileInfo;
    //存入ftp的对象
    private FtpInfo ftpInfo;
    //存入mongodb的对象
    private MongodbInfo mongodbInfo;
    //存入cassandra的对象
    private CassandraInfo cassandraInfo;
    //存入drds的对象
    private DrdsInfo drdsInfo;
    //存入hdfs的对象
    private HdfsInfo hdfsInfo;
    //通道数量
    private int jb_channel;
    //通道速度
    private int jb_byte;
    //出错限制
    private int jb_record;
    //出错限制-百分比
    private double jb_percentage;

    public HdfsInfo getHdfsInfo() {
        return hdfsInfo;
    }

    public void setHdfsInfo(HdfsInfo hdfsInfo) {
        this.hdfsInfo = hdfsInfo;
    }

    public DrdsInfo getDrdsInfo() {
        return drdsInfo;
    }

    public void setDrdsInfo(DrdsInfo drdsInfo) {
        this.drdsInfo = drdsInfo;
    }

    public CassandraInfo getCassandraInfo() {
        return cassandraInfo;
    }

    public void setCassandraInfo(CassandraInfo cassandraInfo) {
        this.cassandraInfo = cassandraInfo;
    }

    public MongodbInfo getMongodbInfo() {
        return mongodbInfo;
    }

    public void setMongodbInfo(MongodbInfo mongodbInfo) {
        this.mongodbInfo = mongodbInfo;
    }

    public FtpInfo getFtpInfo() {
        return ftpInfo;
    }

    public void setFtpInfo(FtpInfo ftpInfo) {
        this.ftpInfo = ftpInfo;
    }

    public String getW_jb_postsql() {
        return w_jb_postsql;
    }

    public void setW_jb_postsql(String w_jb_postsql) {
        this.w_jb_postsql = w_jb_postsql;
    }

    public String[] getW_jb_postSql_arr() {
        return w_jb_postSql_arr;
    }

    public void setW_jb_postSql_arr(String[] w_jb_postSql_arr) {
        this.w_jb_postSql_arr = w_jb_postSql_arr;
    }

    public int getJb_channel() {
        return jb_channel;
    }

    public void setJb_channel(int jb_channel) {
        this.jb_channel = jb_channel;
    }

    public int getJb_byte() {
        return jb_byte;
    }

    public void setJb_byte(int jb_byte) {
        this.jb_byte = jb_byte;
    }

    public int getJb_record() {
        return jb_record;
    }

    public void setJb_record(int jb_record) {
        this.jb_record = jb_record;
    }

    public double getJb_percentage() {
        return jb_percentage;
    }

    public void setJb_percentage(double jb_percentage) {
        this.jb_percentage = jb_percentage;
    }

    public TxtFileInfo getTxtFileInfo() {
        return txtFileInfo;
    }

    public void setTxtFileInfo(TxtFileInfo txtFileInfo) {
        this.txtFileInfo = txtFileInfo;
    }

    public String getW_jb_mode() {
        return w_jb_mode;
    }

    public void setW_jb_mode(String w_jb_mode) {
        this.w_jb_mode = w_jb_mode;
    }

    public String getJb_group_id() {
        return jb_group_id;
    }

    public void setJb_group_id(String jb_group_id) {
        this.jb_group_id = jb_group_id;
    }

    public String getJb_group_name() {
        return jb_group_name;
    }

    public void setJb_group_name(String jb_group_name) {
        this.jb_group_name = jb_group_name;
    }

    public PageUtil getPageUtil() {
        return pageUtil;
    }

    public void setPageUtil(PageUtil pageUtil) {
        this.pageUtil = pageUtil;
    }

    public Date getJb_lrsj_q() {
        return jb_lrsj_q;
    }

    public void setJb_lrsj_q(Date jb_lrsj_q) {
        this.jb_lrsj_q = jb_lrsj_q;
    }

    public Date getJb_lrsj_z() {
        return jb_lrsj_z;
    }

    public void setJb_lrsj_z(Date jb_lrsj_z) {
        this.jb_lrsj_z = jb_lrsj_z;
    }

    public String getDb_id() {
        return db_id;
    }

    public void setDb_id(String db_id) {
        this.db_id = db_id;
    }

    public String getDb_username() {
        return db_username;
    }

    public void setDb_username(String db_username) {
        this.db_username = db_username;
    }

    public String getDb_password() {
        return db_password;
    }

    public void setDb_password(String db_password) {
        this.db_password = db_password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getR_db_type() {
        return r_db_type;
    }

    public void setR_db_type(String r_db_type) {
        this.r_db_type = r_db_type;
    }

    public String getW_db_type() {
        return w_db_type;
    }

    public void setW_db_type(String w_db_type) {
        this.w_db_type = w_db_type;
    }

    public String getR_db_id() {
        return r_db_id;
    }

    public void setR_db_id(String r_db_id) {
        this.r_db_id = r_db_id;
    }

    public String getW_db_id() {
        return w_db_id;
    }

    public void setW_db_id(String w_db_id) {
        this.w_db_id = w_db_id;
    }

    public String getR_jb_tbgs() {
        return r_jb_tbgs;
    }

    public void setR_jb_tbgs(String r_jb_tbgs) {
        this.r_jb_tbgs = r_jb_tbgs;
    }

    public String getJb_name() {
        return jb_name;
    }

    public void setJb_name(String jb_name) {
        this.jb_name = jb_name;
    }

    public String getR_jb_column() {
        return r_jb_column;
    }

    public void setR_jb_column(String r_jb_column) {
        this.r_jb_column = r_jb_column;
    }

    public String getW_jb_column() {
        return w_jb_column;
    }

    public void setW_jb_column(String w_jb_column) {
        this.w_jb_column = w_jb_column;
    }

    public String getR_jb_table() {
        return r_jb_table;
    }

    public void setR_jb_table(String r_jb_table) {
        this.r_jb_table = r_jb_table;
    }

    public String getW_jb_table() {
        return w_jb_table;
    }

    public void setW_jb_table(String w_jb_table) {
        this.w_jb_table = w_jb_table;
    }

    public String getR_jb_url() {
        return r_jb_url;
    }

    public void setR_jb_url(String r_jb_url) {
        this.r_jb_url = r_jb_url;
    }

    public String getW_jb_url() {
        return w_jb_url;
    }

    public void setW_jb_url(String w_jb_url) {
        this.w_jb_url = w_jb_url;
    }

    public String getR_jb_splitPk() {
        return r_jb_splitPk;
    }

    public void setR_jb_splitPk(String r_jb_splitPk) {
        this.r_jb_splitPk = r_jb_splitPk;
    }

    public String getR_jb_sql() {
        return r_jb_sql;
    }

    public void setR_jb_sql(String r_jb_sql) {
        this.r_jb_sql = r_jb_sql;
    }

    public String getR_where() {
        return r_where;
    }

    public void setR_where(String r_where) {
        this.r_where = r_where;
    }

    public String getW_jb_session() {
        return w_jb_session;
    }

    public void setW_jb_session(String w_jb_session) {
        this.w_jb_session = w_jb_session;
    }

    public String getW_jb_presql() {
        return w_jb_presql;
    }

    public void setW_jb_presql(String w_jb_presql) {
        this.w_jb_presql = w_jb_presql;
    }

    public String getJb_bz() {
        return jb_bz;
    }

    public void setJb_bz(String jb_bz) {
        this.jb_bz = jb_bz;
    }

    public Date getJb_lrsj() {
        return jb_lrsj;
    }

    public void setJb_lrsj(Date jb_lrsj) {
        this.jb_lrsj = jb_lrsj;
    }

    public Date getJb_xgsj() {
        return jb_xgsj;
    }

    public void setJb_xgsj(Date jb_xgsj) {
        this.jb_xgsj = jb_xgsj;
    }

    public String getJb_json_file_name() {
        return jb_json_file_name;
    }

    public void setJb_json_file_name(String jb_json_file_name) {
        this.jb_json_file_name = jb_json_file_name;
    }

    public String getJb_json_fullPath() {
        return jb_json_fullPath;
    }

    public void setJb_json_fullPath(String jb_json_fullPath) {
        this.jb_json_fullPath = jb_json_fullPath;
    }

    public String getJb_yxbz() {
        return jb_yxbz;
    }

    public void setJb_yxbz(String jb_yxbz) {
        this.jb_yxbz = jb_yxbz;
    }

    public String getR_jb_username() {
        return r_jb_username;
    }

    public void setR_jb_username(String r_jb_username) {
        this.r_jb_username = r_jb_username;
    }

    public String getR_jb_password() {
        return r_jb_password;
    }

    public void setR_jb_password(String r_jb_password) {
        this.r_jb_password = r_jb_password;
    }

    public String getW_jb_username() {
        return w_jb_username;
    }

    public void setW_jb_username(String w_jb_username) {
        this.w_jb_username = w_jb_username;
    }

    public String getW_jb_password() {
        return w_jb_password;
    }

    public void setW_jb_password(String w_jb_password) {
        this.w_jb_password = w_jb_password;
    }

    public String[] getR_jb_column_arr() {
        return r_jb_column_arr;
    }

    public void setR_jb_column_arr(String[] r_jb_column_arr) {
        this.r_jb_column_arr = r_jb_column_arr;
    }

    public String[] getR_jb_table_arr() {
        return r_jb_table_arr;
    }

    public void setR_jb_table_arr(String[] r_jb_table_arr) {
        this.r_jb_table_arr = r_jb_table_arr;
    }

    public String[] getR_jb_url_arr() {
        return r_jb_url_arr;
    }

    public void setR_jb_url_arr(String[] r_jb_url_arr) {
        this.r_jb_url_arr = r_jb_url_arr;
    }

    public String[] getR_jb_sql_arr() {
        return r_jb_sql_arr;
    }

    public void setR_jb_sql_arr(String[] r_jb_sql_arr) {
        this.r_jb_sql_arr = r_jb_sql_arr;
    }

    public String[] getW_jb_column_arr() {
        return w_jb_column_arr;
    }

    public void setW_jb_column_arr(String[] w_jb_column_arr) {
        this.w_jb_column_arr = w_jb_column_arr;
    }

    public String[] getW_jb_table_arr() {
        return w_jb_table_arr;
    }

    public void setW_jb_table_arr(String[] w_jb_table_arr) {
        this.w_jb_table_arr = w_jb_table_arr;
    }

    public String[] getW_jb_session_arr() {
        return w_jb_session_arr;
    }

    public void setW_jb_session_arr(String[] w_jb_session_arr) {
        this.w_jb_session_arr = w_jb_session_arr;
    }

    public String[] getW_jb_preSql_arr() {
        return w_jb_preSql_arr;
    }

    public void setW_jb_preSql_arr(String[] w_jb_preSql_arr) {
        this.w_jb_preSql_arr = w_jb_preSql_arr;
    }

    public String getR_db_ip() {
        return r_db_ip;
    }

    public void setR_db_ip(String r_db_ip) {
        this.r_db_ip = r_db_ip;
    }

    public String getR_db_port() {
        return r_db_port;
    }

    public void setR_db_port(String r_db_port) {
        this.r_db_port = r_db_port;
    }

    public String getR_db_sid() {
        return r_db_sid;
    }

    public void setR_db_sid(String r_db_sid) {
        this.r_db_sid = r_db_sid;
    }

    public String getR_db_username() {
        return r_db_username;
    }

    public void setR_db_username(String r_db_username) {
        this.r_db_username = r_db_username;
    }

    public String getR_db_password() {
        return r_db_password;
    }

    public void setR_db_password(String r_db_password) {
        this.r_db_password = r_db_password;
    }

    public String getR_db_url() {
        return r_db_url;
    }

    public void setR_db_url(String r_db_url) {
        this.r_db_url = r_db_url;
    }

    public String getW_db_ip() {
        return w_db_ip;
    }

    public void setW_db_ip(String w_db_ip) {
        this.w_db_ip = w_db_ip;
    }

    public String getW_db_port() {
        return w_db_port;
    }

    public void setW_db_port(String w_db_port) {
        this.w_db_port = w_db_port;
    }

    public String getW_db_sid() {
        return w_db_sid;
    }

    public void setW_db_sid(String w_db_sid) {
        this.w_db_sid = w_db_sid;
    }

    public String getW_db_username() {
        return w_db_username;
    }

    public void setW_db_username(String w_db_username) {
        this.w_db_username = w_db_username;
    }

    public String getW_db_password() {
        return w_db_password;
    }

    public void setW_db_password(String w_db_password) {
        this.w_db_password = w_db_password;
    }

    public String getW_db_url() {
        return w_db_url;
    }

    public void setW_db_url(String w_db_url) {
        this.w_db_url = w_db_url;
    }
}
