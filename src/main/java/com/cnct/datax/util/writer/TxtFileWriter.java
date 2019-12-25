package com.cnct.datax.util.writer;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/**
 * txtfile writer格式
 */
public class TxtFileWriter {
    public static JSONObject txtFileWriter(JbInfo jbInfo){
        JSONObject writer = new JSONObject();
        writer.put("name","txtfilewriter");
        JSONObject parameter = new JSONObject();
        parameter.put("path",jbInfo.getTxtFileInfo().getJb_w_txtFile_path());
        parameter.put("fileName",jbInfo.getTxtFileInfo().getJb_w_txtFile_filename());
        parameter.put("writeMode",jbInfo.getTxtFileInfo().getJb_w_txtfile_ms());
        parameter.put("fieldDelimiter",jbInfo.getTxtFileInfo().getJb_w_txtfile_fgf());
        parameter.put("compress",jbInfo.getTxtFileInfo().getJb_w_txtfile_ysgs());
        parameter.put("encoding",jbInfo.getTxtFileInfo().getJb_w_txtfile_en());
       /* parameter.put("nullFormat","\\"+"n");*/
        parameter.put("dateFormat",jbInfo.getTxtFileInfo().getJb_w_txtfile_dateF());
        parameter.put("fileFormat",jbInfo.getTxtFileInfo().getJb_w_txtfile_fileF());
        parameter.put("header",jbInfo.getTxtFileInfo().getJb_w_txtfile_header_arr());
        writer.put("parameter",parameter);
        return writer;
    }
}
