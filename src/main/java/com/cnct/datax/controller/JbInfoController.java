package com.cnct.datax.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;
import com.cnct.datax.entity.PageUtil;
import com.cnct.datax.entity.TxtFileInfo;
import com.cnct.datax.service.JbInfoService;
import com.cnct.datax.util.*;
import com.cnct.datax.util.reader.*;
import com.cnct.datax.util.writer.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 *脚本的所有信息
 */
@Controller
@RequestMapping("/jbInfo")
public class JbInfoController {
    @Autowired
    private JbInfoService jbInfoService;

    /**
     * 查询所有的脚本的信息
     */
    @RequestMapping(value = "/queryAllJbInfo",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> queryAllJbInfo(int page,int limit){
        Map<String,Object> map = new HashMap<>();
        try {
            List<JbInfo> list = jbInfoService.queryAllJbInfo(page,limit);
            int count = jbInfoService.queryAllJbInfoCount();
            map.put("code",0);
            map.put("data",list);
            map.put("count",count);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }
    /**
     * 添加脚本信息
     */
    @RequestMapping(value = "/addJbInfo",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addJbInfo(@RequestBody JbInfo jbInfo){
        Map<String,Object> map = new HashMap<>();
        String jsonString = "";
        JSONObject reader = null;
        JSONObject writer = null;

        try {
            //新增数据之前需要把前台传递过来column、table、jdbcUrl、querySql字符串处理成数组
            jbInfo.setR_jb_column_arr(jbInfo.getR_jb_column().split(","));
            jbInfo.setR_jb_table_arr(jbInfo.getR_jb_table().split(","));
            jbInfo.setR_jb_url_arr(jbInfo.getR_jb_url().split(","));
            jbInfo.setR_jb_sql_arr(jbInfo.getR_jb_sql().split("&"));
            jbInfo.setW_jb_column_arr(jbInfo.getW_jb_column().split(","));
            jbInfo.setW_jb_session_arr(jbInfo.getW_jb_session().split("&"));
            jbInfo.setW_jb_preSql_arr(jbInfo.getW_jb_presql().split("&"));
            jbInfo.setW_jb_postSql_arr(jbInfo.getW_jb_postsql().split("&"));
            jbInfo.setW_jb_table_arr(jbInfo.getW_jb_table().split(","));
            if("3".equals(jbInfo.getR_db_type()) || "3".equals(jbInfo.getW_db_type())){
                jbInfo.getTxtFileInfo().setJb_r_txtFile_path_arr(jbInfo.getTxtFileInfo().getJb_r_txtFile_path().split(","));
                jbInfo.getTxtFileInfo().setJb_w_txtfile_header_arr(jbInfo.getTxtFileInfo().getJb_w_txtfile_header().split(","));
                String[]  r_column = jbInfo.getTxtFileInfo().getJb_r_txtFile_column().split("&");
                ArrayList<Object> r_column_arr = new ArrayList<>();
                for(String r_column_one : r_column){
                    JSONObject jsonObject = JSON.parseObject(r_column_one);
                    r_column_arr.add(jsonObject);
                }
                jbInfo.getTxtFileInfo().setJb_r_txtFile_column_arr(r_column_arr);
            }
            if("5".equals(jbInfo.getR_db_type()) || "5".equals(jbInfo.getW_db_type())){
                jbInfo.getFtpInfo().setJb_ftp_path_arr_r(jbInfo.getFtpInfo().getJb_ftp_path_r().split(","));
                jbInfo.getFtpInfo().setJb_ftp_header_arr_w(jbInfo.getFtpInfo().getJb_ftp_header_w().split(","));
                String[] r_column = jbInfo.getFtpInfo().getJb_ftp_column_r().split("&");
                ArrayList<Object> r_column_arr = new ArrayList<>();
                for(String r_column_one : r_column){
                    JSONObject jsonObject = JSON.parseObject(r_column_one);
                    r_column_arr.add(jsonObject);
                }
                jbInfo.getFtpInfo().setJb_ftp_column_arr_r(r_column_arr);
            }
            if("6".equals(jbInfo.getR_db_type()) || "6".equals(jbInfo.getW_db_type())){
                jbInfo.getMongodbInfo().setJb_mongodb_address_arr_r(jbInfo.getMongodbInfo().getJb_mongodb_address_r().split(","));
                jbInfo.getMongodbInfo().setJb_mongodb_address_arr_w(jbInfo.getMongodbInfo().getJb_mongodb_address_w().split(","));
                String[] r_column = jbInfo.getMongodbInfo().getJb_mongodb_column_r().split("&");
                ArrayList<Object> r_column_arr = new ArrayList<>();
                for(String r_column_one : r_column){
                    JSONObject jsonObject = JSON.parseObject(r_column_one);
                    r_column_arr.add(jsonObject);
                }
                jbInfo.getMongodbInfo().setJb_mongodb_column_arr_r(r_column_arr);
                String[] w_column = jbInfo.getMongodbInfo().getJb_mongodb_column_w().split("&");
                ArrayList<Object> w_column_arr = new ArrayList<>();
                for(String w_column_one : w_column){
                    JSONObject jsonObject = JSON.parseObject(w_column_one);
                    w_column_arr.add(jsonObject);
                }
                jbInfo.getMongodbInfo().setJb_mongodb_column_arr_w(w_column_arr);
            }
            if("7".equals(jbInfo.getR_db_type()) || "7".equals(jbInfo.getW_db_type())){
                jbInfo.getCassandraInfo().setJb_cassandra_host_arr_r(jbInfo.getCassandraInfo().getJb_cassandra_host_r().split(","));
                jbInfo.getCassandraInfo().setJb_cassandra_column_arr_r(jbInfo.getCassandraInfo().getJb_cassandra_column_r().split(","));
                jbInfo.getCassandraInfo().setJb_cassandra_host_arr_w(jbInfo.getCassandraInfo().getJb_cassandra_host_w().split(","));
                jbInfo.getCassandraInfo().setJb_cassandra_column_arr_w(jbInfo.getCassandraInfo().getJb_cassandra_column_w().split(","));
            }
            switch (jbInfo.getR_db_type()){
                case "1":
                    reader = MysqlReader.mysqlReader(jbInfo);
                    break;
                case "2":
                    reader = OracleReader.oracleReader(jbInfo);
                    break;
                case "3":
                    reader = TxtFileReader.txtFileReader(jbInfo);
                    break;
                case "4":
                    reader = SqlServerReader.sqlServerReader(jbInfo);
                    break;
                case "5":
                    reader = FtpReader.ftpReader(jbInfo);
                    break;
                case "6":
                    reader = MongoDBReader.mongoDBReader(jbInfo);
                    break;
                case "7":
                    reader = CassandraReader.cassandraReader(jbInfo);
                    break;
            }
            switch (jbInfo.getW_db_type()){
                case "1":
                    writer = MysqlWriter.mysqlWriter(jbInfo);
                    break;
                case "2":
                    writer = OracleWriter.oracleWriter(jbInfo);
                    break;
                case "3":
                    writer = TxtFileWriter.txtFileWriter(jbInfo);
                    break;
                case "4":
                    writer = SqlServerWriter.sqlServerWriter(jbInfo);
                    break;
                case "5":
                    writer = FtpWriter.ftpWriter(jbInfo);
                    break;
                case "6":
                    writer = MongoDBWriter.mongoDBWriter(jbInfo);
                    break;
                case "7":
                    writer = CassandraWriter.cassandraWriter(jbInfo);
                    break;
            }
            jsonString = Merge.mergeAll(jbInfo,reader,writer);
            //将连接信息转成json格式数据，存入本地
            //String fileName = jbInfo.getJb_name() + "_" + Calendar.getInstance().getTimeInMillis();
            String fileName = jbInfo.getJb_group_id()+"_"+UUID.randomUUID().toString().replaceAll("-","");
            //存入地址：G:\ideal_project_test\datax\target\classes\json
            String filePath = new File(this.getClass().getClassLoader().getResource("json").getPath()).toString();
            String fullPath = filePath + File.separator + fileName + ".json";
            try {
                // 保证创建一个新文件
                File file = new File(fullPath);
                if(!file.getParentFile().exists()){// 如果父目录不存在，创建父目录
                    file.getParentFile().mkdirs();
                }
                if(file.exists()){// 如果已存在,删除旧文件
                    file.delete();
                }
                file.createNewFile();
                // 将格式化后的字符串写入文件
                Writer write = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
                write.write(jsonString);
                write.flush();
                write.close();
            }catch (Exception e){
                e.printStackTrace();
            }
            jbInfo.setJb_json_file_name(fileName);
            jbInfo.setJb_json_fullPath(fullPath);
            jbInfoService.addJbInfo(jbInfo);
            map.put("code",0);
            map.put("msg","新增脚本信息成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","新增脚本信息失败！");
        }
        return map;
    }

    /**
     * 根据脚本id查询脚本的详细信息
     */
    @RequestMapping(value = "/queryJbInfoById",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryJbInfoById(int id,String r_db_type,String w_db_type){
        Map<String,Object> map = new HashMap<>();
        try {
            JbInfo jbInfo = new JbInfo();
            jbInfo.setId(id);
            JbInfo jbInfo_obj = new JbInfo();
            if("3".equals(r_db_type) || "3".equals(w_db_type)){
                jbInfo_obj = jbInfoService.queryJbInfoByIdTxtFile(jbInfo);
            }else if("5".equals(r_db_type) || "5".equals(w_db_type)){
                jbInfo_obj = jbInfoService.queryJbInfoByIdFtp(jbInfo);
            }else if("6".equals(r_db_type) || "6".equals(w_db_type)){
                jbInfo_obj = jbInfoService.queryJbInfoByIdMongoDB(jbInfo);
            }else if("7".equals(r_db_type) || "7".equals(w_db_type)){
                jbInfo_obj = jbInfoService.queryJbInfoByIdCassandra(jbInfo);
            }else {
                jbInfo_obj = jbInfoService.queryJbInfoById(jbInfo);
                /*这里获取的reader的username和password默认取的是r_db_id的第一个*/
                String[] r_db_id_arr = jbInfo_obj.getR_db_id().split(",");
                jbInfo_obj.setR_db_username(jbInfoService.queryDbInfoById(r_db_id_arr[0]).getDb_username());
                jbInfo_obj.setR_db_password(jbInfoService.queryDbInfoById(r_db_id_arr[0]).getDb_password());
                jbInfo_obj.setW_db_username(jbInfoService.queryDbInfoById(jbInfo_obj.getW_db_id()).getDb_username());
                jbInfo_obj.setW_db_password(jbInfoService.queryDbInfoById(jbInfo_obj.getW_db_id()).getDb_password());

                jbInfo_obj.setR_db_url(jbInfo_obj.getR_jb_url());
                jbInfo_obj.setW_db_url(jbInfo_obj.getW_jb_url());
            }
            map.put("code",0);
            map.put("data",jbInfo_obj);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }

    /**
     *根据脚本id查询出该脚本对应的reader和writer对应的username和password
     */
    @RequestMapping(value = "/queryUserNameAndPasw",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryUserNameAndPasw(int id){
        Map<String,Object> map = new HashMap<>();
        try {
            JbInfo jbInfo = new JbInfo();
            jbInfo.setId(id);
            JbInfo jbInfo_obj = jbInfoService.queryUserNameAndPasw(jbInfo);
            map.put("code",0);
            map.put("data",jbInfo_obj);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }

    /**
     *根据脚本id修改脚本详细信息
     */
    @RequestMapping(value = "/editJbInfoById",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> editJbInfoById(@RequestBody JbInfo jbInfo){
        Map<String,Object> map = new HashMap<>();
        String jsonString = "";
        JSONObject reader = null;
        JSONObject writer = null;
       try {
            //修改数据之前需要把前台传递过来column、table、jdbcUrl、querySql字符串处理成数组
            jbInfo.setR_jb_column_arr(jbInfo.getR_jb_column().split(","));
            jbInfo.setR_jb_table_arr(jbInfo.getR_jb_table().split(","));
            jbInfo.setR_jb_url_arr(jbInfo.getR_jb_url().split(","));
            jbInfo.setR_jb_sql_arr(jbInfo.getR_jb_sql().split("&"));
            jbInfo.setW_jb_column_arr(jbInfo.getW_jb_column().split(","));
            jbInfo.setW_jb_session_arr(jbInfo.getW_jb_session().split("&"));
            jbInfo.setW_jb_preSql_arr(jbInfo.getW_jb_presql().split("&"));
            jbInfo.setW_jb_postSql_arr(jbInfo.getW_jb_postsql().split("&"));
            jbInfo.setW_jb_table_arr(jbInfo.getW_jb_table().split(","));
            if("3".equals(jbInfo.getR_db_type()) || "3".equals(jbInfo.getW_db_type())){
               jbInfo.getTxtFileInfo().setJb_r_txtFile_path_arr(jbInfo.getTxtFileInfo().getJb_r_txtFile_path().split(","));
               jbInfo.getTxtFileInfo().setJb_w_txtfile_header_arr(jbInfo.getTxtFileInfo().getJb_w_txtfile_header().split(","));
               String[]  r_column = jbInfo.getTxtFileInfo().getJb_r_txtFile_column().split("&");
               ArrayList<Object> r_column_arr = new ArrayList<>();
               for(String r_column_one : r_column){
                   JSONObject jsonObject = JSON.parseObject(r_column_one);
                   r_column_arr.add(jsonObject);
               }
               jbInfo.getTxtFileInfo().setJb_r_txtFile_column_arr(r_column_arr);
            }
           if("5".equals(jbInfo.getR_db_type()) || "5".equals(jbInfo.getW_db_type())){
               jbInfo.getFtpInfo().setJb_ftp_path_arr_r(jbInfo.getFtpInfo().getJb_ftp_path_r().split(","));
               jbInfo.getFtpInfo().setJb_ftp_header_arr_w(jbInfo.getFtpInfo().getJb_ftp_header_w().split(","));
               String[] r_column = jbInfo.getFtpInfo().getJb_ftp_column_r().split("&");
               ArrayList<Object> r_column_arr = new ArrayList<>();
               for(String r_column_one : r_column){
                   JSONObject jsonObject = JSON.parseObject(r_column_one);
                   r_column_arr.add(jsonObject);
               }
               jbInfo.getFtpInfo().setJb_ftp_column_arr_r(r_column_arr);
           }
           if("6".equals(jbInfo.getR_db_type()) || "6".equals(jbInfo.getW_db_type())){
               jbInfo.getMongodbInfo().setJb_mongodb_address_arr_r(jbInfo.getMongodbInfo().getJb_mongodb_address_r().split(","));
               jbInfo.getMongodbInfo().setJb_mongodb_address_arr_w(jbInfo.getMongodbInfo().getJb_mongodb_address_w().split(","));
               String[] r_column = jbInfo.getMongodbInfo().getJb_mongodb_column_r().split("&");
               ArrayList<Object> r_column_arr = new ArrayList<>();
               for(String r_column_one : r_column){
                   JSONObject jsonObject = JSON.parseObject(r_column_one);
                   r_column_arr.add(jsonObject);
               }
               jbInfo.getMongodbInfo().setJb_mongodb_column_arr_r(r_column_arr);
               String[] w_column = jbInfo.getMongodbInfo().getJb_mongodb_column_w().split("&");
               ArrayList<Object> w_column_arr = new ArrayList<>();
               for(String w_column_one : w_column){
                   JSONObject jsonObject = JSON.parseObject(w_column_one);
                   w_column_arr.add(jsonObject);
               }
               jbInfo.getMongodbInfo().setJb_mongodb_column_arr_w(w_column_arr);
           }
            switch (jbInfo.getR_db_type()){
                case "1":
                   reader = MysqlReader.mysqlReader(jbInfo);
                   break;
                case "2":
                   reader = OracleReader.oracleReader(jbInfo);
                   break;
                case "3":
                    reader = TxtFileReader.txtFileReader(jbInfo);
                    break;
                case "4":
                    reader = SqlServerReader.sqlServerReader(jbInfo);
                    break;
                case "5":
                    reader = FtpReader.ftpReader(jbInfo);
                    break;
                case "6":
                    reader = MongoDBReader.mongoDBReader(jbInfo);
                    break;
            }
            switch (jbInfo.getW_db_type()){
                case "1":
                   writer = MysqlWriter.mysqlWriter(jbInfo);
                   break;
                case "2":
                   writer = OracleWriter.oracleWriter(jbInfo);
                   break;
                case "3":
                    writer = TxtFileWriter.txtFileWriter(jbInfo);
                    break;
                case "4":
                    writer = SqlServerWriter.sqlServerWriter(jbInfo);
                    break;
                case "5":
                    writer = FtpWriter.ftpWriter(jbInfo);
                    break;
                case "6":
                    writer = MongoDBWriter.mongoDBWriter(jbInfo);
                    break;
            }
            jsonString = Merge.mergeAll(jbInfo,reader,writer);
            //将连接信息转成json格式数据，存入本地
            //String fileName = jbInfo.getJb_name() + "_" + Calendar.getInstance().getTimeInMillis();
            String fileName = jbInfo.getJb_group_id()+"_"+UUID.randomUUID().toString().replaceAll("-","");
            //存入地址：G:\ideal_project_test\datax\target\classes\json
            String filePath = new File(this.getClass().getClassLoader().getResource("json").getPath()).toString();
            String fullPath = filePath + File.separator + fileName + ".json";
            try {
                // 保证创建一个新文件
                File file = new File(fullPath);
                if(!file.getParentFile().exists()){// 如果父目录不存在，创建父目录
                    file.getParentFile().mkdirs();
                }
                if(file.exists()){// 如果已存在,删除旧文件
                    file.delete();
                }
                file.createNewFile();
                // 将格式化后的字符串写入文件
                Writer write = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
                write.write(jsonString);
                write.flush();
                write.close();
            }catch (Exception e){
                e.printStackTrace();
            }
            jbInfo.setJb_json_file_name(fileName);
            jbInfo.setJb_json_fullPath(fullPath);
            jbInfoService.editJbInfoById(jbInfo);
            map.put("code",0);
            map.put("msg","修改脚本信息成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","修改脚本信息失败");
        }
        return map;
    }
    /**
     *  根据id删除对应脚本的信息
     */
    @RequestMapping(value = "/delJbInfoById",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> delJbInfoById(int id){
        Map<String,Object> map = new HashMap<>();
        try {
            JbInfo jbInfo = new JbInfo();
            jbInfo.setId(id);
            //首先判断该id下脚本是否存在
            int countNum = jbInfoService.isNullJbInfoById(jbInfo);
            if(countNum > 0){
                int index = jbInfoService.delJbInfoById(jbInfo);
                map.put("code",0);
                map.put("data",index);
                map.put("msg","删除成功！");
            }else {
                map.put("code",999);
                map.put("msg","对不起，该脚本不存在！");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","删除失败！");
        }
        return map;
    }
    /*
    根据筛选的条件查询脚本信息
     */
    @RequestMapping(value = "/queryAllJbInfoByTj",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryAllJbInfoByTj(String jb_name,String r_db_type,String w_db_type,String jb_lrsj_q,String jb_lrsj_z,String jb_group_id,int page,int limit){
        Map<String,Object> map = new HashMap<>();
        JbInfo jbInfo = new JbInfo();
        if("".equals(jb_name) || jb_name == null){
            jb_name = "";
        }else{
            jb_name = "'%"+jb_name+"%'";
        }
        jbInfo.setJb_name(jb_name);
        jbInfo.setR_db_type(r_db_type);
        jbInfo.setW_db_type(w_db_type);
        jbInfo.setJb_group_id(jb_group_id);
        PageUtil pageUtil = new PageUtil();
        pageUtil.setPageNum((page-1)*limit);
        pageUtil.setLimit(limit);
        jbInfo.setPageUtil(pageUtil);
        if((!"".equals(jb_lrsj_q) && jb_lrsj_q != null) || (!"".equals(jb_lrsj_z) && jb_lrsj_z != null)){
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                jbInfo.setJb_lrsj_q(sf.parse(jb_lrsj_q));
                jbInfo.setJb_lrsj_z(sf.parse(jb_lrsj_z));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            List<JbInfo> list = jbInfoService.queryAllJbInfoByTj(jbInfo);
            int count = jbInfoService.queryAllJbInfoByTjPage(jbInfo);
            map.put("code",0);
            map.put("data",list);
            map.put("count",count);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }
    /*
    * 查询脚本信息的分组信息
    * */
    @RequestMapping(value = "/queryAllJbGroup",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryAllJbGroup(){
        Map<String,Object> map = new HashMap<>();
        try {
            List<JbInfo> list = jbInfoService.queryAllJbGroup();
            map.put("code",0);
            map.put("data",list);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }

}
