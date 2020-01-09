package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
Cassandra reader的json格式
 */
public class CassandraReader {
    public static JSONObject cassandraReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","cassandrareader");
        JSONObject parameter = new JSONObject();
        parameter.put("host",jbInfo.getCassandraInfo().getJb_cassandra_host_arr_r());
        parameter.put("port",jbInfo.getCassandraInfo().getJb_cassandra_port_r());
        parameter.put("username",jbInfo.getCassandraInfo().getJb_cassandra_username_r());
        parameter.put("password",jbInfo.getCassandraInfo().getJb_cassandra_pasw_r());
        parameter.put("useSSL",jbInfo.getCassandraInfo().getJb_cassandra_useSSL_r());
        parameter.put("keyspace",jbInfo.getCassandraInfo().getJb_cassandra_keyspace_r());
        parameter.put("table",jbInfo.getCassandraInfo().getJb_cassandra_table_r());
        parameter.put("column",jbInfo.getCassandraInfo().getJb_cassandra_column_arr_r());
        parameter.put("where",jbInfo.getCassandraInfo().getJb_cassandra_where_r());
        parameter.put("allowFiltering",jbInfo.getCassandraInfo().getJb_cassandra_allowF_r());
        parameter.put("consistancyLevel",jbInfo.getCassandraInfo().getJb_cassandra_conL_r());
        reader.put("parameter",parameter);
        return reader;
    }
}

