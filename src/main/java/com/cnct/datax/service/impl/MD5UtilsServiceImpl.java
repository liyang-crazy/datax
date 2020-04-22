package com.cnct.datax.service.impl;

import com.cnct.datax.service.MD5UtilsService;
import com.cnct.datax.util.ToInterfaceUtils;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class MD5UtilsServiceImpl implements MD5UtilsService{


    @Override
    public String getToMD5(String md5Str) {

        String pathUrl = "https://www.somd5.com/search.php";
        int t = 0;
        String captcha = "t02Zx917vWh2MAQX30MusakJMeGFhSaCtDMr6B_irjH5w3GXx6rZdIAwSzGrPMY9DeQ0SUmAbpZ52dD1hQ2stXhJ2qLXI68ypR_yqkokh8P8TdV6jQcGsNjnQ**|@1Af";
        String params = "hash="+md5Str+"&t="+t+"&captcha="+captcha;

        String s = ToInterfaceUtils.httpUrlConnection(pathUrl, params);
        return s;
    }


}
