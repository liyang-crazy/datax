package com.cnct.datax.entity;

import java.util.Date;

/**
 * 数据库连接信息
 */
public class DbContionInfo {
    private int id;
    private String readerId;
    private String writerId;
    private String db_type;
    private String db_type_name;
    private String db_name;
    private String db_ip;
    private String db_port;
    private String db_sid;
    private String db_zfj;
    private String db_username;
    private String db_password;
    private String db_url;
    private String db_json;
    private Date db_lrsj;
    private Date db_xgsj;
    private String json_file_name;
    private String json_file_fullPath;

    public String getReaderId() {
        return readerId;
    }

    public String getDb_zfj() {
        return db_zfj;
    }

    public void setDb_zfj(String db_zfj) {
        this.db_zfj = db_zfj;
    }

    public void setReaderId(String readerId) {
        this.readerId = readerId;
    }

    public String getWriterId() {
        return writerId;
    }

    public void setWriterId(String writerId) {
        this.writerId = writerId;
    }

    public String getJson_file_fullPath() {
        return json_file_fullPath;
    }

    public void setJson_file_fullPath(String json_file_fullPath) {
        this.json_file_fullPath = json_file_fullPath;
    }

    public String getJson_file_name() {
        return json_file_name;
    }

    public void setJson_file_name(String json_file_name) {
        this.json_file_name = json_file_name;
    }

    public Date getDb_lrsj() {
        return db_lrsj;
    }

    public void setDb_lrsj(Date db_lrsj) {
        this.db_lrsj = db_lrsj;
    }

    public Date getDb_xgsj() {
        return db_xgsj;
    }

    public void setDb_xgsj(Date db_xgsj) {
        this.db_xgsj = db_xgsj;
    }

    public String getDb_json() {
        return db_json;
    }

    public void setDb_json(String db_json) {
        this.db_json = db_json;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDb_type() {
        return db_type;
    }

    public void setDb_type(String db_type) {
        this.db_type = db_type;
    }

    public String getDb_type_name() {
        return db_type_name;
    }

    public void setDb_type_name(String db_type_name) {
        this.db_type_name = db_type_name;
    }

    public String getDb_name() {
        return db_name;
    }

    public void setDb_name(String db_name) {
        this.db_name = db_name;
    }

    public String getDb_ip() {
        return db_ip;
    }

    public void setDb_ip(String db_ip) {
        this.db_ip = db_ip;
    }

    public String getDb_port() {
        return db_port;
    }

    public void setDb_port(String db_port) {
        this.db_port = db_port;
    }

    public String getDb_sid() {
        return db_sid;
    }

    public void setDb_sid(String db_sid) {
        this.db_sid = db_sid;
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

    public String getDb_url() {
        return db_url;
    }

    public void setDb_url(String db_url) {
        this.db_url = db_url;
    }

    @Override
    public String toString() {
        return "DbContionInfo{" +
                "id=" + id +
                ", db_type='" + db_type + '\'' +
                ", db_type_name='" + db_type_name + '\'' +
                ", db_name='" + db_name + '\'' +
                ", db_ip='" + db_ip + '\'' +
                ", db_port='" + db_port + '\'' +
                ", db_sid='" + db_sid + '\'' +
                ", db_username='" + db_username + '\'' +
                ", db_password='" + db_password + '\'' +
                ", db_url='" + db_url + '\'' +
                ", db_json='" + db_json + '\'' +
                ", db_lrsj=" + db_lrsj +
                ", db_xgsj=" + db_xgsj +
                '}';
    }
}
