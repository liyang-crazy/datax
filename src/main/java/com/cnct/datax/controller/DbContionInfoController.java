package com.cnct.datax.controller;

import com.cnct.datax.entity.DbContionInfo;
import com.cnct.datax.service.DbContionInfoService;
import com.cnct.datax.util.DbUrlHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 *数据库联系信息
 */
@Controller
@RequestMapping("/db_info")
public class DbContionInfoController {
    @Autowired
    private DbContionInfoService dbContionInfoService;

    @RequestMapping(value = "/queryAllDbInfo",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> queryAllDbInfo(int page,int limit){
        //ResData res = new ResData();
        Map<String,Object> map = new HashMap<>();
        try {
            List<DbContionInfo> list = dbContionInfoService.queryAllDbInfo(page,limit);
            //res.setCode(0).setMsg("查询成功！").putData("list",list);
            map.put("code",0);
            map.put("count",dbContionInfoService.queryAllCount());
            map.put("data",list);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
           // res.setCode(999).setMsg("查询失败！");
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        //return res;
       return map;
    }

   @RequestMapping(value = "/addDbInfo",method = RequestMethod.POST)
   @ResponseBody
   public Map<String,Object> addDbInfo(@RequestBody DbContionInfo dbContionInfo){
       Map<String,Object> map = new HashMap<>();
       /*String jsonString = "";*/
       try {
           if("1".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?"+dbContionInfo.getDb_zfj());
               /*jsonString = ToJSONFile.toJSONFile(dbContionInfo);*/
           }
           if("2".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_sid());
               /*jsonString = ToJSONFileByOracle.toJSONFileByOracle(dbContionInfo);*/
           }
           //将连接信息转成json格式数据，存入本地
           //String fileName = dbContionInfo.getDb_name() + Calendar.getInstance().getTimeInMillis();
           //存入地址：G:\ideal_project_test\datax\target\classes\json
           //String filePath = new File(this.getClass().getClassLoader().getResource("json").getPath()).toString();
          // String fullPath = filePath + File.separator + fileName + ".json";
           /*try {
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
           }*/
           //dbContionInfo.setJson_file_name(fileName);
           //dbContionInfo.setJson_file_fullPath(fullPath);
           int index = dbContionInfoService.addDbInfo(dbContionInfo);
           map.put("code",0);
           map.put("data",index);
           map.put("msg","新增连接信息成功！");
       }catch (Exception e){
           e.printStackTrace();
           map.put("code",999);
           map.put("msg","新增连接信息失败！");
       }
       return map;
   }

   @RequestMapping(value = "/updateDbInfoById",method = RequestMethod.POST)
   @ResponseBody
   public Map<String,Object> updateDbInfoById(@RequestBody DbContionInfo dbContionInfo){
       Map<String,Object> map = new HashMap<>();
       /*String jsonString = "";*/
       try {
           if("1".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?"+dbContionInfo.getDb_zfj());
              /* jsonString = ToJSONFile.toJSONFile(dbContionInfo);*/
           }
           if("2".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_sid());
               /*jsonString = ToJSONFileByOracle.toJSONFileByOracle(dbContionInfo);*/
           }
           //将连接信息转成json格式数据，存入本地
           //String fileName = dbContionInfo.getDb_name() + Calendar.getInstance().getTimeInMillis();
           //存入地址：G:\ideal_project_test\datax\target\classes\json
           //String filePath = new File(this.getClass().getClassLoader().getResource("json").getPath()).toString();
           //String fullPath = filePath + File.separator + fileName + ".json";
           /*try {
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
           dbContionInfo.setJson_file_name(fileName);
           dbContionInfo.setJson_file_fullPath(fullPath);*/
           int index =  dbContionInfoService.updateDbInfoById(dbContionInfo);
           map.put("code",0);
           map.put("data",index);
           map.put("msg","修改连接信息成功！");
       }catch (Exception e){
           e.printStackTrace();
           map.put("code",999);
           map.put("msg","修改连接信息失败！");
       }
       return map;
   }

   @RequestMapping(value = "/deletDbInfoById",method = RequestMethod.POST)
   @ResponseBody
   public Map<String,Object> deletDbInfoById(@RequestBody DbContionInfo dbContionInfo){
       Map<String,Object> map = new HashMap<>();
       try {
           //删除之前判断该id是否存在
         int count = dbContionInfoService.isNullById(dbContionInfo);
         if(count >= 0){
            int index = dbContionInfoService.deletDbInfoById(dbContionInfo);
            map.put("code",0);
            map.put("data",index);
            map.put("msg","删除成功！");
         }else {
             map.put("code",999);
             map.put("msg","对不起，不存在该信息！");
         }
       }catch (Exception e){
           e.printStackTrace();
           map.put("code",999);
           map.put("msg","删除失败！");
       }
       return map;
   }

    /**
     * 查询数据库连接类型list
     */
    @RequestMapping(value = "/queryAllType",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryAllType(){
        Map<String,Object> map = new HashMap<>();
        try {
            List<DbContionInfo> list = dbContionInfoService.queryAllType();
            map.put("code",0);
            map.put("data",list);
            map.put("msg","查询数据库类型成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询数据库类型失败！");
        }
        return map;
    }

    /**
     * 根据数据库类型查询对应的连接名称list
     */
    @RequestMapping(value = "/queryAllContionNameByTypeId",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryAllContionNameByTypeId(@RequestBody DbContionInfo dbContionInfo){
        Map<String,Object> map = new HashMap<>();
        try {
            List<DbContionInfo> list = dbContionInfoService.queryAllContionNameByTypeId(dbContionInfo);
            map.put("code",0);
            map.put("data",list);
            map.put("msg","查询数据库连接名称成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询数据库连接名称失败！");
        }
        return map;
    }
    /**
     * 根据id查询数据库连接信息
     */
    @RequestMapping(value = "/queryOneDbContionById",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> queryOneDbContionById(@RequestBody DbContionInfo dbContionInfo){
        Map<String,Object> map = new HashMap<>();
        try {
            List<Object> dbCon_r_arr = new ArrayList<>();
            if(!"".equals(dbContionInfo.getReaderId()) && dbContionInfo.getReaderId() !=null){
                String[] readerId = dbContionInfo.getReaderId().split(",");
                for(String r_id : readerId){
                    DbContionInfo dbContionInfo_r = new DbContionInfo();
                    dbContionInfo_r.setId(Integer.valueOf(r_id));
                    DbContionInfo dbCon_r = dbContionInfoService.queryOneDbContionById(dbContionInfo_r);
                    dbCon_r_arr.add(dbCon_r);
                }
            }
            DbContionInfo dbCon_w = new DbContionInfo();
            if(!"".equals(dbContionInfo.getWriterId()) && dbContionInfo.getWriterId()!=0){
                DbContionInfo dbContionInfo_w = new DbContionInfo();
                dbContionInfo_w.setId(dbContionInfo.getWriterId());
                dbCon_w = dbContionInfoService.queryOneDbContionById(dbContionInfo_w);
            }
            map.put("code",0);
            map.put("data_r",dbCon_r_arr);
            map.put("data_w",dbCon_w);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }
}
