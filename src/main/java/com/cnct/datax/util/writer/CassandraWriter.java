package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * Cassandra writer格式
 */
public class CassandraWriter {
    public static JSONObject cassandraWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","cassandrawriter");
        JSONObject parameter = new JSONObject();
        parameter.put("host",jbInfo.getCassandraInfo().getJb_cassandra_host_arr_w());
        parameter.put("port",jbInfo.getCassandraInfo().getJb_cassandra_port_w());
        parameter.put("username",jbInfo.getCassandraInfo().getJb_cassandra_username_w());
        parameter.put("password",jbInfo.getCassandraInfo().getJb_cassandra_pasw_w());
        parameter.put("useSSL",jbInfo.getCassandraInfo().getJb_cassandra_useSSL_w());
        parameter.put("connectionsPerHost",jbInfo.getCassandraInfo().getJb_cassandra_conP_w());
        parameter.put("maxPendingPerConnection",jbInfo.getCassandraInfo().getJb_cassandra_maxC_w());
        parameter.put("keyspace",jbInfo.getCassandraInfo().getJb_cassandra_keyspace_w());
        parameter.put("table",jbInfo.getCassandraInfo().getJb_cassandra_table_w());
        parameter.put("batchSize",jbInfo.getCassandraInfo().getJb_cassandra_batchSize_w());
        parameter.put("column",jbInfo.getCassandraInfo().getJb_cassandra_column_arr_w());
        parameter.put("consistancyLevel",jbInfo.getCassandraInfo().getJb_cassandra_conL_w());
        writer.put("parameter",parameter);
        return writer;
    }
}
