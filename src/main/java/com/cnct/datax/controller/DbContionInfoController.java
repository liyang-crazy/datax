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
       try {
           if("1".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?"+dbContionInfo.getDb_zfj());
           }
           if("2".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_sid());
           }
           if("4".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_SQLSERVER+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+";DatabaseName="+dbContionInfo.getDb_name());
           }
           if("6".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MONGODB+dbContionInfo.getDb_username()+":"+dbContionInfo.getDb_password()+"@"+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port());
           }
           if("7".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port());
           }
           if("8".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_DRDS+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?useUnicode=true&characterEncoding="+dbContionInfo.getDb_bm());
           }
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
       try {
           if("1".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MYSQL+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?"+dbContionInfo.getDb_zfj());
           }
           if("2".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_ORACLE+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_sid());
           }
           if("4".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_SQLSERVER+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+";DatabaseName="+dbContionInfo.getDb_name());
           }
           if("6".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_MONGODB+dbContionInfo.getDb_username()+":"+dbContionInfo.getDb_password()+"@"+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port());
           }
           if("7".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port());
           }
           if("8".equals(dbContionInfo.getDb_type())){
               dbContionInfo.setDb_url(DbUrlHeader.DB_URL_DRDS+dbContionInfo.getDb_ip()+":"+dbContionInfo.getDb_port()+"/"+dbContionInfo.getDb_name()+"?useUnicode=true&characterEncoding="+dbContionInfo.getDb_bm());
           }
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
            if(!"".equals(dbContionInfo.getWriterId()) && dbContionInfo.getWriterId()!=null){
                //写这个的目的是因为：writer是mongodb的时候存在多选
                String[] writerId = dbContionInfo.getWriterId().split(",");
                if(writerId.length > 1){
                    List<Object> dbCon_w_arr = new ArrayList<>();
                    for(String w_id : writerId){
                        DbContionInfo dbContionInfo_w = new DbContionInfo();
                        dbContionInfo_w.setId(Integer.valueOf(w_id));
                        DbContionInfo dbCon_w = dbContionInfoService.queryOneDbContionById(dbContionInfo_w);
                        dbCon_w_arr.add(dbCon_w);
                    }
                    map.put("data_w",dbCon_w_arr);
                }else {
                    DbContionInfo dbCon_w = new DbContionInfo();
                    DbContionInfo dbContionInfo_w = new DbContionInfo();
                    dbContionInfo_w.setId(Integer.valueOf(dbContionInfo.getWriterId()));
                    dbCon_w = dbContionInfoService.queryOneDbContionById(dbContionInfo_w);
                    map.put("data_w",dbCon_w);
                }
            }
            map.put("code",0);
            map.put("data_r",dbCon_r_arr);
            map.put("msg","查询成功！");
        }catch (Exception e){
            e.printStackTrace();
            map.put("code",999);
            map.put("msg","查询失败！");
        }
        return map;
    }
}
