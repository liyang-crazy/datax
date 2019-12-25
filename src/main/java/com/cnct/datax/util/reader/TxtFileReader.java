package com.cnct.datax.util.reader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cnct.datax.entity.JbInfo;

/*
txtfile reader的json格式
 */
public class TxtFileReader {
    public static JSONObject txtFileReader(JbInfo jbInfo){
        JSONObject reader = new JSONObject();
        reader.put("name","txtfilereader");
        JSONObject parameter = new JSONObject();
        parameter.put("path",jbInfo.getTxtFileInfo().getJb_r_txtFile_path_arr());
        parameter.put("encoding",jbInfo.getTxtFileInfo().getJb_r_txtFile_en());
        parameter.put("column",jbInfo.getTxtFileInfo().getJb_r_txtFile_column_arr());
        parameter.put("fieldDelimiter",jbInfo.getTxtFileInfo().getJb_r_txtFile_fgf());
        parameter.put("compress",jbInfo.getTxtFileInfo().getJb_r_txtFile_ysgs());
        parameter.put("skipHeader",jbInfo.getTxtFileInfo().getJb_r_txtFile_csv_h());
        parameter.put("nullFormat",jbInfo.getTxtFileInfo().getJb_r_txtFile_nullF());
        JSONObject csvReaderConfig = new JSONObject();
        csvReaderConfig.put("safetySwitch",false);
        csvReaderConfig.put("skipEmptyRecords",false);
        csvReaderConfig.put("useTextQualifier",false);
        parameter.put("csvReaderConfig",csvReaderConfig);
        reader.put("parameter",parameter);
        return reader;
    }
}

