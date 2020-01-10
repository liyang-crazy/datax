$(function () {
    child = {};
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;
        var dbContionInfo = {//定义一个数据连接对象用于存储数据
            id:'',
            readerId:'',
            writerId:'',
            db_type:'',
            r_db_type:'',
            w_db_type:'',
            db_name:'',
            db_ip:'',
            db_port:'',
            db_sid:'',
            db_username:'',
            db_password:'',
            r_db_username:'',
            r_db_password:'',
            w_db_username:'',
            w_db_password:''
        };
        var dbConJson = {//定义一个用存储添加json脚本的变量
            id:'',
            r_db_type:'',
            w_db_type:'',
            r_db_id:'',
            w_db_id:'',
            r_jb_tbgs:'',
            r_db_url:'',
            r_db_username:'',
            r_db_password:'',
            w_db_url:'',
            w_db_username:'',
            w_db_password:'',
            jb_name:'',
            r_jb_column:'',
            w_jb_column:'',
            r_jb_table:'',
            w_jb_table:'',
            r_jb_url:'',
            w_jb_url:'',
            r_jb_splitPk:'',
            r_jb_sql:'',
            r_where:'',
            w_jb_session:'',
            w_jb_presql:'',
            w_jb_postsql:'',
            jb_bz:'',
            jb_lrsj_q:'',
            jb_lrsj_z:'',
            jb_group_id:'',
            w_jb_mode:'',
            jb_byte:'',
            jb_channel:'',
            jb_record:'',
            jb_percentage:''
        };
        var txtfile_jb = {};//定义一个txtfile的脚本信息对象
        var ftp_jb = {};//定义一个ftp的脚本信息对象
        var mongodb_jb = {};//定义一个mongodb的脚本信息对象
        var cassandra_jb = {};//定义一个cassandra的脚本信息对象
        var data_reader_db_arr = [];
        var data_reader_db = {
            name:'',
            value:''
        };
        var reader_db_name = '';
        var writer_db_name = '';
        //日期
        laydate.render({
            elem: '#date_q'
        });
        laydate.render({
            elem: '#date_z'
        });

        //获取数据库类型list
        var getAllDb_type = function() {
            $.ajax({
                url:'/db_info/queryAllType',
                dataType: 'json',
                type: 'post',
                success: function (res) {
                    $.each(res.data, function (index, item) {
                        $('#r_db_type_id').append(new Option(item.db_type_name, item.db_type));// 下拉菜单里添加元素
                        $('#w_db_type_id').append(new Option(item.db_type_name, item.db_type));
                        $('#query_r_db_type_id').append(new Option(item.db_type_name, item.db_type));
                        $('#query_w_db_type_id').append(new Option(item.db_type_name, item.db_type));
                    });
                    layui.form.render("select");//重新渲染 固定写法
                }
            });
        };
        getAllDb_type();
        /*定义获脚本分组数据的方法*/
        var getAllJb_group_fun = function () {
            $.ajax({
                url:'/jbInfo/queryAllJbGroup',
                dataType: 'json',
                type: 'post',
                success: function (res) {
                    $.each(res.data, function (index, item) {
                        $('#jb_group').append(new Option(item.jb_group_name, item.jb_group_id));
                    });
                    layui.form.render("select");//重新渲染 固定写法
                }
            });
        };
        getAllJb_group_fun();
        /*定义获取reader区域数据库名称的多选下拉方法*/
        var reader_db_name_fun = function (data_reader_db_arr) {
            reader_db_name = xmSelect.render({
                el: '#r_db_name_id',
                toolbar: {show: true},
                model: {
                    label: {
                        type: 'block',
                        block: {
                            //最大显示数量, 0:不限制
                            showCount: 2,
                            //是否显示删除图标
                            showIcon: true
                        }
                    }
                },
                paging: true,
                pageSize: 3,
                data: data_reader_db_arr
            });
        };
        reader_db_name_fun(data_reader_db_arr);
        /*定义获取writer区域数据库名称的多选下拉方法*/
        //写这个的目的是因为：writer是mongodb的时候存在多选
        var writer_db_name_fun = function (data_reader_db_arr) {
            writer_db_name = xmSelect.render({
                el: '#w_db_name_id_dx',
                toolbar: {show: true},
                model: {
                    label: {
                        type: 'block',
                        block: {
                            //最大显示数量, 0:不限制
                            showCount: 2,
                            //是否显示删除图标
                            showIcon: true
                        }
                    }
                },
                paging: true,
                pageSize: 3,
                data: data_reader_db_arr
            });
        };
        writer_db_name_fun(data_reader_db_arr);
        //获取对应数据库类型下面的连接名称
        var getDb_nameByDb_type = function(data,flg) {
            dbContionInfo.db_type = data;
            //检查项目添加到下拉框中
            $.ajax({
                type:'post',
                dataType:"json",
                contentType:"application/json;charset=UTF-8",
                headers:{"Content-Type" : "application/json;charset=utf-8"},
                data:JSON.stringify(dbContionInfo),
                url:'/db_info/queryAllContionNameByTypeId',
                success: function (res) {
                    if(flg == 'r'){
                        /*$("#r_db_name_id").empty();//清空下拉框的值
                        $.each(res.data, function (index, item) {
                            $('#r_db_name_id').append(new Option(item.db_name, item.id));// 下拉菜单里添加元素
                        });*/
                        data_reader_db_arr = [];
                        $.each(res.data,function (index,item) {
                            data_reader_db = {};
                            data_reader_db.name = item.db_name;
                            data_reader_db.value = item.id;
                            data_reader_db_arr.push(data_reader_db);
                        });
                        reader_db_name_fun(data_reader_db_arr);
                    }
                    if(flg == 'w'){
                        if(data == 6){//写这个的目的是因为：writer是mongodb的时候存在多选
                            data_reader_db_arr = [];
                            $.each(res.data,function (index,item) {
                                data_reader_db = {};
                                data_reader_db.name = item.db_name;
                                data_reader_db.value = item.id;
                                data_reader_db_arr.push(data_reader_db);
                            });
                            writer_db_name_fun(data_reader_db_arr);
                        }else if(data == 7){//写这个的目的是因为：writer是cassandra的时候存在多选
                            data_reader_db_arr = [];
                            $.each(res.data,function (index,item) {
                                data_reader_db = {};
                                data_reader_db.name = item.db_name;
                                data_reader_db.value = item.id;
                                data_reader_db_arr.push(data_reader_db);
                            });
                            writer_db_name_fun(data_reader_db_arr);
                        }else {
                            $("#w_db_name_id").empty();
                            $.each(res.data, function (index, item) {
                                $('#w_db_name_id').append(new Option(item.db_name, item.id));
                            });
                        }
                    }

                    layui.form.render("select");//重新渲染 固定写法
                }
            });
        };
        //联动
        form.on('select(r_db_typeFilter)', function(data){
            if(data.value == 3 || data.value == 5){
                $('.r_db_name').addClass('layui-hide');
                $('.to_local').addClass('layui-hide');
            }else if(data.value == 6){
                getDb_nameByDb_type(data.value,'r');
                $('.r_db_name').removeClass('layui-hide');
                $('.to_local').addClass('layui-hide');
            }else if(data.value == 7){
                getDb_nameByDb_type(data.value,'r');
                $('.r_db_name').removeClass('layui-hide');
                $('.to_local').addClass('layui-hide');
            }else {
                getDb_nameByDb_type(data.value,'r');
                $('.r_db_name').removeClass('layui-hide');
                $('.to_local').removeClass('layui-hide');
            }

        });
        form.on('select(w_db_typeFilter)', function(data){
            if(data.value == 3 || data.value == 5){
                $('.w_db_name').addClass('layui-hide');
            }else if(data.value == 6){//写这个的目的是因为：writer是mongodb的时候存在多选
                getDb_nameByDb_type(data.value,'w');
                $('.w_db_name').removeClass('layui-hide');
                $('.w_db_name_id_all').addClass('layui-hide');
                $('#w_db_name_id_dx').removeClass('layui-hide');
            }else if(data.value == 7){//写这个的目的是因为：writer是cassandra的时候存在多选
                getDb_nameByDb_type(data.value,'w');
                $('.w_db_name').removeClass('layui-hide');
                $('.w_db_name_id_all').addClass('layui-hide');
                $('#w_db_name_id_dx').removeClass('layui-hide');
            }else {
                getDb_nameByDb_type(data.value,'w');
                $('.w_db_name').removeClass('layui-hide');
                $('#w_db_name_id_dx').addClass('layui-hide');
                $('.w_db_name_id_all').removeClass('layui-hide');

            }
        });

        var data_info = function () {
            table.render({
                elem: '#con-data',
                url:'/jbInfo/queryAllJbInfo',
                cellMinWidth: 80,
                page:true,
                fit:true,
                fitColumns:true,
                title: '用户数据表',
                cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field:'id', title:'编号',width:80,  fixed: 'left', unresize: true, sort: true},
                    {field:'jb_name', title:'脚本名称'},
                    {field:'jb_bz', title:'脚本说明'},
                    {field:'jb_json_file_name',width:178, title:'json文件名称'},
                    {field:'jb_lrsj', title:'录入时间',sort: true,templet:"<div>{{layui.util.toDateString(d.jb_lrsj, 'yyyy-MM-dd')}}</div>"},
                    {field:'jb_xgsj', title:'修改时间',sort: true,templet:"<div>{{layui.util.toDateString(d.jb_xgsj, 'yyyy-MM-dd')}}</div>"},
                    {fixed:'right',width:210, title:'操作', toolbar: '#bar' }
                ]]
            });
        };
        /*加载数据*/
        data_info();
        /*点击新增之前需要获取对应的参数*/
        //1.获取连接名称对应的id,用于查询出该数据库连接的信息
        $('#r_db_type_id').val();
        $('#w_db_type_id').val();
        //$('#r_db_name_id').val();
        $('#w_db_name_id').val();
        $('#to_local').val();

        /*定义一个根据reader和writer的id查询对应数据库信息的方法*/
        var radearAndwriter_fun = function (dbContionInfo) {
            $.ajax({
                type:'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                headers : {"Content-Type" : "application/json;charset=utf-8"},
                url:'/db_info/queryOneDbContionById',
                data:JSON.stringify(dbContionInfo),
                success:function(res){
                    if(res.code == 0){
                        /*将查询出来的reader和writer的数据库信息存入缓存中*/
                        if(dbContionInfo.r_db_type == 3){
                            layui.data('data', {
                                key: 'data_r',
                                value: {}
                            });
                        }else {
                            layui.data('data', {
                                key: 'data_r',
                                value: res.data_r
                            });
                        }
                        if(dbContionInfo.w_db_type == 3){
                            layui.data('data',{
                                key:'data_w',
                                value: {}
                            });
                        }else {
                            layui.data('data',{
                                key:'data_w',
                                value: res.data_w
                            });
                        }
                    }else {
                        layer.alert(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };

        /*弹出新增窗口*/
        $('.scr-all-til-add').on('click',function () {
            /*首先根据数据库信息的id查询出该数据库对应的联系信息*/
            dbContionInfo = {};
            txtfile_jb = {};
            ftp_jb = {};
            mongodb_jb = {};
            cassandra_jb = {};
            //dbContionInfo.readerId = $('#r_db_name_id').val();
            dbContionInfo.r_db_type = $('#r_db_type_id').val();
            dbContionInfo.w_db_type = $('#w_db_type_id').val();
            dbContionInfo.r_jb_tbgs = $('#to_local').val();
            if(dbContionInfo.r_db_type == 3 || dbContionInfo.r_db_type == 5){
                dbContionInfo.readerId = '';
                dbContionInfo.r_jb_tbgs = '';
            }else {
                dbContionInfo.readerId = reader_db_name.getValue('value').toString();
            }
            if(dbContionInfo.w_db_type == 3 || dbContionInfo.w_db_type == 5){
                dbContionInfo.writerId = '';
            }else if(dbContionInfo.w_db_type == 6){//写这个的目的是因为：writer是mongodb的时候存在多选
                dbContionInfo.writerId = writer_db_name.getValue('value').toString();
            }else if(dbContionInfo.w_db_type == 7){//写这个的目的是因为：writer是cassandra的时候存在多选
                dbContionInfo.writerId = writer_db_name.getValue('value').toString();
            }else {
                dbContionInfo.writerId = $('#w_db_name_id').val();
            }
            radearAndwriter_fun(dbContionInfo);
            layer.open({
                type: 2,
                title:'新增信息',
                area: ['700px', '550px'],
                content: '/script-add.html?jb_tbgs='+dbContionInfo.r_jb_tbgs+'&r_db_type='+dbContionInfo.r_db_type+'&w_db_type='+dbContionInfo.w_db_type,
                closeBtn:1,
                btn: ['确认', '取消'],
                yes: function(index,layero){
                    dbConJson.r_db_type = $('#r_db_type_id').val();
                    dbConJson.w_db_type = $('#w_db_type_id').val();
                    dbConJson.r_db_id = reader_db_name.getValue('value').toString();
                    if(dbConJson.w_db_type == 6){//写这个的目的是因为：writer是mongodb的时候存在多选
                        dbConJson.w_db_id = writer_db_name.getValue('value').toString();
                    }else if(dbConJson.w_db_type == 7){//写这个的目的是因为：writer是cassandra的时候存在多选
                        dbConJson.w_db_id = writer_db_name.getValue('value').toString();
                    }else {
                        dbConJson.w_db_id = $('#w_db_name_id').val();
                    }
                    dbConJson.r_jb_tbgs = $('#to_local').val();
                    dbConJson.jb_group_id = layero.find('iframe').contents().find('[id="jb_group"]').val();
                    dbConJson.jb_name = layero.find('iframe').contents().find('[id="sc-add-jb_name"]').val();
                    dbConJson.jb_byte = layero.find('iframe').contents().find('[id="setting_byte"]').val();
                    dbConJson.jb_channel = layero.find('iframe').contents().find('[id="settin_channel"]').val();
                    dbConJson.jb_record = layero.find('iframe').contents().find('[id="setting_record"]').val();
                    dbConJson.jb_percentage = layero.find('iframe').contents().find('[id="setting_percentage"]').val();
                    dbConJson.r_jb_column = layero.find('iframe').contents().find('[id="add_column"]').val();
                    dbConJson.w_jb_column = layero.find('iframe').contents().find('[id="w-add_column"]').val();
                    dbConJson.r_jb_table = layero.find('iframe').contents().find('[id="add_table"]').val();
                    dbConJson.w_jb_table = layero.find('iframe').contents().find('[id="w-add_table"]').val();
                    dbConJson.r_jb_url = layero.find('iframe').contents().find('[id="add_contaion"]').val().replace(/\n/g,',');
                    dbConJson.w_jb_url = layero.find('iframe').contents().find('[id="w-add_contaion"]').val();
                    dbConJson.r_jb_splitPk = layero.find('iframe').contents().find('[id="sc-add-splitPk"]').val();
                    dbConJson.r_jb_sql = layero.find('iframe').contents().find('[id="add_sql"]').val();
                    dbConJson.r_where = '';
                    dbConJson.w_jb_session = layero.find('iframe').contents().find('[id="w-add_session"]').val();
                    dbConJson.w_jb_presql = layero.find('iframe').contents().find('[id="w-add_preSql"]').val();
                    dbConJson.w_jb_postsql = layero.find('iframe').contents().find('[id="w-add_postSql"]').val();
                    dbConJson.jb_bz = layero.find('iframe').contents().find('[id="sc-add-jb_bz"]').val();
                    dbConJson.r_db_url = layero.find('iframe').contents().find('[id="add_contaion"]').val().replace(/\n/g,',');
                    /*dbConJson.w_db_url = res.data_w.db_url;*/
                    dbConJson.w_db_url = layero.find('iframe').contents().find('[id="w-add_contaion"]').val();
                    dbConJson.r_db_username = layero.find('iframe').contents().find('[id="sc-add-db-username"]').val();
                    dbConJson.w_db_username = layero.find('iframe').contents().find('[id="w-sc-add-db-username"]').val();
                    dbConJson.r_db_password = layero.find('iframe').contents().find('[id="sc-add-db-pasw"]').val();
                    dbConJson.w_db_password = layero.find('iframe').contents().find('[id="w-sc-add-db-pasw"]').val();
                    dbConJson.w_jb_mode = layero.find('iframe').contents().find('[id="w_add_db_mode"]').val();
                    /*dbConJson.r_db_username = res.data_r[0].db_username;
                    dbConJson.w_db_username = res.data_w.db_username;
                    dbConJson.r_db_password = res.data_r[0].db_password;
                    dbConJson.w_db_password = res.data_w.db_password;*/
                    /*获取txtfile的脚本信息*/
                    txtfile_jb.jb_r_txtFile_path = layero.find('iframe').contents().find('[id="add_path"]').val();
                    txtfile_jb.jb_r_txtFile_en = layero.find('iframe').contents().find('[id="add_encoding"]').val();
                    txtfile_jb.jb_r_txtFile_column = layero.find('iframe').contents().find('[id="add_txtFile_column"]').val();
                    txtfile_jb.jb_r_txtFile_fgf = layero.find('iframe').contents().find('[id="add_fgf"]').val();
                    txtfile_jb.jb_r_txtFile_ysgs = layero.find('iframe').contents().find('[id="add_ys"]').val();
                    txtfile_jb.jb_r_txtFile_csv_h = layero.find('iframe').contents().find('[id="add_csv"]').val();
                    txtfile_jb.jb_r_txtFile_nullF = layero.find('iframe').contents().find('[id="add_nullFor"]').val();
                    txtfile_jb.jb_w_txtFile_path = layero.find('iframe').contents().find('[id="w_add_path"]').val();
                    txtfile_jb.jb_w_txtFile_filename = layero.find('iframe').contents().find('[id="w_add_fileName"]').val();
                    txtfile_jb.jb_w_txtfile_ms = layero.find('iframe').contents().find('[id="w_add_wmode"]').val();
                    txtfile_jb.jb_w_txtfile_fgf = layero.find('iframe').contents().find('[id="w_add_fgf"]').val();
                    txtfile_jb.jb_w_txtfile_ysgs = layero.find('iframe').contents().find('[id="w_add_ys"]').val();
                    txtfile_jb.jb_w_txtfile_en = layero.find('iframe').contents().find('[id="w_add_encoding"]').val();
                    txtfile_jb.jb_w_txtfile_nullF = layero.find('iframe').contents().find('[id="w_add_nullFor"]').val();
                    txtfile_jb.jb_w_txtfile_dateF = layero.find('iframe').contents().find('[id="w_add_date"]').val();
                    txtfile_jb.jb_w_txtfile_fileF = layero.find('iframe').contents().find('[id="w_add_fileFormat"]').val();
                    txtfile_jb.jb_w_txtfile_header = layero.find('iframe').contents().find('[id="w_add_header"]').val();
                    dbConJson.txtFileInfo = txtfile_jb;
                    /*获取ftp的脚本信息*/
                    ftp_jb.jb_ftp_host_r = layero.find('iframe').contents().find('[id="add_ftp_host"]').val();
                    ftp_jb.jb_ftp_port_r = layero.find('iframe').contents().find('[id="add_ftp_port"]').val();
                    ftp_jb.jb_ftp_username_r = layero.find('iframe').contents().find('[id="add_ftp_username"]').val();
                    ftp_jb.jb_ftp_password_r = layero.find('iframe').contents().find('[id="add_ftp_pasw"]').val();
                    ftp_jb.jb_ftp_protocol_r = layero.find('iframe').contents().find('[id="add_ftp_protocol"]').val();
                    ftp_jb.jb_ftp_path_r = layero.find('iframe').contents().find('[id="add_ftp_path"]').val();
                    ftp_jb.jb_ftp_column_r = layero.find('iframe').contents().find('[id="add_ftp_column"]').val();
                    ftp_jb.jb_ftp_en_r = layero.find('iframe').contents().find('[id="add_ftp_en"]').val();
                    ftp_jb.jb_ftp_fgf_r = layero.find('iframe').contents().find('[id="add_ftp_fgf"]').val();
                    ftp_jb.jb_ftp_timeout_r = layero.find('iframe').contents().find('[id="add_ftp_timeout"]').val();
                    ftp_jb.jb_ftp_cp_r = layero.find('iframe').contents().find('[id="add_ftp_cp"]').val();
                    ftp_jb.jb_ftp_ysgs_r = layero.find('iframe').contents().find('[id="add_ftp_ysgs"]').val();
                    ftp_jb.jb_ftp_csvH_r = layero.find('iframe').contents().find('[id="add_ftp_csvH"]').val();
                    ftp_jb.jb_ftp_nullF_r = layero.find('iframe').contents().find('[id="add_ftp_nullF"]').val();
                    ftp_jb.jb_ftp_maxT_r = layero.find('iframe').contents().find('[id="add_ftp_maxT"]').val();
                    ftp_jb.jb_ftp_host_w = layero.find('iframe').contents().find('[id="w_add_ftp_host"]').val();
                    ftp_jb.jb_ftp_port_w = layero.find('iframe').contents().find('[id="w_add_ftp_port"]').val();
                    ftp_jb.jb_ftp_username_w = layero.find('iframe').contents().find('[id="w_add_ftp_username"]').val();
                    ftp_jb.jb_ftp_password_w = layero.find('iframe').contents().find('[id="w_add_ftp_pasw"]').val();
                    ftp_jb.jb_ftp_protocol_w = layero.find('iframe').contents().find('[id="w_add_ftp_protocol"]').val();
                    ftp_jb.jb_ftp_timeout_w = layero.find('iframe').contents().find('[id="w_add_ftp_timeout"]').val();
                    ftp_jb.jb_ftp_cp_w = layero.find('iframe').contents().find('[id="w_add_ftp_cp"]').val();
                    ftp_jb.jb_ftp_path_w = layero.find('iframe').contents().find('[id="w_add_ftp_path"]').val();
                    ftp_jb.jb_ftp_fileName_w = layero.find('iframe').contents().find('[id="w_add_ftp_fileName"]').val();
                    ftp_jb.jb_ftp_ms_w = layero.find('iframe').contents().find('[id="w_add_ftp_ms"]').val();
                    ftp_jb.jb_ftp_fgf_w = layero.find('iframe').contents().find('[id="w_add_ftp_fgf"]').val();
                    ftp_jb.jb_ftp_ysgs_w = layero.find('iframe').contents().find('[id="w_add_ftp_ysgs"]').val();
                    ftp_jb.jb_ftp_en_w = layero.find('iframe').contents().find('[id="w_add_ftp_en"]').val();
                    ftp_jb.jb_ftp_nullF_w = layero.find('iframe').contents().find('[id="w_add_ftp_nullF"]').val();
                    ftp_jb.jb_ftp_dateF_w = layero.find('iframe').contents().find('[id="w_add_ftp_dateF"]').val();
                    ftp_jb.jb_ftp_fileF_w = layero.find('iframe').contents().find('[id="w_add_ftp_fileF"]').val();
                    ftp_jb.jb_ftp_header_w = layero.find('iframe').contents().find('[id="w_add_ftp_header"]').val();
                    dbConJson.ftpInfo = ftp_jb;
                    /*获取mongodb脚本的信息*/
                    mongodb_jb.jb_mongodb_address_r = layero.find('iframe').contents().find('[id="add_mongodb_address"]').val().replace(/\n/g,',');
                    mongodb_jb.jb_mongodb_username_r = layero.find('iframe').contents().find('[id="add_mongodb_username"]').val();
                    mongodb_jb.jb_mongodb_userpasw_r = layero.find('iframe').contents().find('[id="add_mongodb_pasw"]').val();
                    mongodb_jb.jb_mongodb_dbname_r = layero.find('iframe').contents().find('[id="add_mongodb_dbname"]').val();
                    mongodb_jb.jb_mongodb_collname_r = layero.find('iframe').contents().find('[id="add_mongodb_collName"]').val();
                    mongodb_jb.jb_mongodb_column_r = layero.find('iframe').contents().find('[id="add_mongodb_column"]').val();
                    mongodb_jb.jb_mongodb_address_w = layero.find('iframe').contents().find('[id="w_add_mongodb_address"]').val().replace(/\n/g,',');
                    mongodb_jb.jb_mongodb_username_w = layero.find('iframe').contents().find('[id="w_add_mongodb_username"]').val();
                    mongodb_jb.jb_mongodb_userpasw_w = layero.find('iframe').contents().find('[id="w_add_mongodb_pasw"]').val();
                    mongodb_jb.jb_mongodb_dbname_w = layero.find('iframe').contents().find('[id="w_add_mongodb_dbname"]').val();
                    mongodb_jb.jb_mongodb_collname_w = layero.find('iframe').contents().find('[id="w_add_mongodb_collName"]').val();
                    mongodb_jb.jb_mongodb_column_w = layero.find('iframe').contents().find('[id="w_add_mongodb_column"]').val();
                    mongodb_jb.jb_mongodb_isupsert_w = layero.find('iframe').contents().find('[id="add_mongodb_isUpsert"]').val();
                    mongodb_jb.jb_mongodb_upsertKey_w = layero.find('iframe').contents().find('[id="w_add_mongodb_upsertKey"]').val();
                    dbConJson.mongodbInfo = mongodb_jb;
                    /*获取cassandra脚本的信息*/
                    cassandra_jb.jb_cassandra_host_r = layero.find('iframe').contents().find('[id="add_cassandra_host"]').val();
                    cassandra_jb.jb_cassandra_port_r = layero.find('iframe').contents().find('[id="add_cassandra_port"]').val();
                    cassandra_jb.jb_cassandra_username_r = layero.find('iframe').contents().find('[id="add_cassandra_username"]').val();
                    cassandra_jb.jb_cassandra_pasw_r = layero.find('iframe').contents().find('[id="add_cassandra_pasw"]').val();
                    cassandra_jb.jb_cassandra_useSSL_r = layero.find('iframe').contents().find('[id="add_cassandra_useSSL"]').val();
                    cassandra_jb.jb_cassandra_keyspace_r = layero.find('iframe').contents().find('[id="add_cassandra_keyspace"]').val();
                    cassandra_jb.jb_cassandra_table_r = layero.find('iframe').contents().find('[id="add_cassandra_table"]').val();
                    cassandra_jb.jb_cassandra_column_r = layero.find('iframe').contents().find('[id="add_cassandra_column"]').val();
                    cassandra_jb.jb_cassandra_where_r = layero.find('iframe').contents().find('[id="add_cassandra_where"]').val();
                    cassandra_jb.jb_cassandra_allowF_r = layero.find('iframe').contents().find('[id="add_cassandra_allowF"]').val();
                    cassandra_jb.jb_cassandra_conL_r = layero.find('iframe').contents().find('[id="add_cassandra_conL"]').val();
                    cassandra_jb.jb_cassandra_host_w = layero.find('iframe').contents().find('[id="w_add_cassandra_host"]').val();
                    cassandra_jb.jb_cassandra_port_w = layero.find('iframe').contents().find('[id="w_add_cassandra_port"]').val();
                    cassandra_jb.jb_cassandra_username_w = layero.find('iframe').contents().find('[id="w_add_cassandra_username"]').val();
                    cassandra_jb.jb_cassandra_pasw_w = layero.find('iframe').contents().find('[id="w_add_cassandra_pasw"]').val();
                    cassandra_jb.jb_cassandra_useSSL_w = layero.find('iframe').contents().find('[id="w_add_cassandra_useSSL"]').val();
                    cassandra_jb.jb_cassandra_conP_w = layero.find('iframe').contents().find('[id="w_add_cassandra_conP"]').val();
                    cassandra_jb.jb_cassandra_maxC_w = layero.find('iframe').contents().find('[id="w_add_cassandra_maxC"]').val();
                    cassandra_jb.jb_cassandra_keyspace_w = layero.find('iframe').contents().find('[id="w_add_cassandra_keyspace"]').val();
                    cassandra_jb.jb_cassandra_table_w = layero.find('iframe').contents().find('[id="w_add_cassandra_table"]').val();
                    cassandra_jb.jb_cassandra_batchSize_w = layero.find('iframe').contents().find('[id="w_add_cassandra_batchSize"]').val();
                    cassandra_jb.jb_cassandra_column_w = layero.find('iframe').contents().find('[id="w_add_cassandra_column"]').val();
                    cassandra_jb.jb_cassandra_conL_w = layero.find('iframe').contents().find('[id="w_add_cassandra_conL"]').val();
                    dbConJson.cassandraInfo = cassandra_jb;
                    add_info_fun(dbConJson);
                    layer.closeAll();
                },
                no: function(){
                    layer.closeAll();
                }
            });


        });
        //监听工具条
        table.on('tool(con-data)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                detail_fun(data);
            } else if(obj.event === 'del'){
                layer.confirm('真的删除"'+data.jb_name+'"吗？', function(index){
                    del_info_fun(data);
                });
            } else if(obj.event === 'edit'){//点击编辑
                edit_fun(data);
            }else if(obj.event === 'select'){//点击应用
                layer.alert('脚本地址：'+'<br/>'+data.jb_json_fullPath,{
                    area:['650px','400px']
                })
            }
        });
        /*点击查看的时候数据显示方法*/
        var detail_fun = function (data) {
            layer.open({
                type: 2,
                title:'查询'+data.jb_name,
                area: ['700px', '550px'],
                content: '/script-show.html?id='+data.id+'&r_db_type='+data.r_db_type+'&w_db_type='+data.w_db_type,
                closeBtn:1,
                btn: ['确认', '取消'],
                yes:function () {
                    layer.closeAll();
                },
                no: function(){
                    layer.closeAll();
                }
            });
        };
        /*点击编辑的时候执行的方法*/
        var edit_fun = function (data) {
            layer.open({
                type: 2,
                title:'编辑'+data.jb_name,
                area: ['700px', '550px'],
                content: '/script-edit.html?id='+data.id+'&r_db_type='+data.r_db_type+'&w_db_type='+data.w_db_type,
                closeBtn:1,
                btn: ['确认', '取消'],
                yes:function (index,layero) {//点击确认时候调用修改的方法
                    dbContionInfo = {};
                    txtfile_jb = {};
                    ftp_jb = {};
                    mongodb_jb = {};
                    cassandra_jb = {};
                    dbConJson.id = data.id;
                    dbConJson.r_db_type = data.r_db_type;
                    dbConJson.w_db_type = data.w_db_type;
                    dbConJson.r_db_id = data.r_db_id;
                    dbConJson.w_db_id = data.w_db_id;
                    dbConJson.r_jb_tbgs = data.r_jb_tbgs;
                    dbConJson.jb_group_id = layero.find('iframe').contents().find('[id="edit_jb_group"]').val();
                    dbConJson.jb_name = layero.find('iframe').contents().find('[id="sc-edit-jb_name"]').val();
                    dbConJson.jb_byte = layero.find('iframe').contents().find('[id="edit_setting_byte"]').val();
                    dbConJson.jb_channel = layero.find('iframe').contents().find('[id="edit_settin_channel"]').val();
                    dbConJson.jb_record = layero.find('iframe').contents().find('[id="edit_setting_record"]').val();
                    dbConJson.jb_percentage = layero.find('iframe').contents().find('[id="edit_setting_percentage"]').val();
                    dbConJson.r_jb_column = layero.find('iframe').contents().find('[id="edit_r_column"]').val();
                    dbConJson.w_jb_column = layero.find('iframe').contents().find('[id="w-edit_column"]').val();
                    dbConJson.r_jb_table = layero.find('iframe').contents().find('[id="edit_r_table"]').val();
                    dbConJson.w_jb_table = layero.find('iframe').contents().find('[id="w-edit_table"]').val();
                    dbConJson.r_jb_url = layero.find('iframe').contents().find('[id="edit_r_contaion"]').val().replace(/\n/g,',');
                    //dbConJson.r_jb_url = data.r_jb_url;
                    dbConJson.w_jb_url = layero.find('iframe').contents().find('[id="w-edit_contaion"]').val().replace(/\n/g,',');
                    //dbConJson.w_jb_url = data.w_jb_url;
                    dbConJson.r_jb_splitPk = layero.find('iframe').contents().find('[id="sc-edit-r-splitPk"]').val();
                    dbConJson.r_jb_sql = layero.find('iframe').contents().find('[id="edit_r_sql"]').val();
                    dbConJson.r_where = '';
                    dbConJson.w_jb_session = layero.find('iframe').contents().find('[id="w-edit_session"]').val();
                    dbConJson.w_jb_presql = layero.find('iframe').contents().find('[id="w-edit_preSql"]').val();
                    dbConJson.w_jb_postsql = layero.find('iframe').contents().find('[id="w-edit_postSql"]').val();
                    dbConJson.jb_bz = layero.find('iframe').contents().find('[id="sc-edit-jb_bz"]').val();
                    dbConJson.r_db_username = layero.find('iframe').contents().find('[id="sc-edit-db-username"]').val();
                    dbConJson.w_db_username = layero.find('iframe').contents().find('[id="w-sc-edit-db-username"]').val();
                    dbConJson.r_db_password = layero.find('iframe').contents().find('[id="sc-edit-db-pasw"]').val();
                    dbConJson.w_db_password = layero.find('iframe').contents().find('[id="w-sc-edit-db-pasw"]').val();
                    dbConJson.w_jb_mode = layero.find('iframe').contents().find('[id="w_edit_db_mode"]').val();
                    /*获取txtfile的脚本信息*/
                    txtfile_jb.jb_r_txtFile_path = layero.find('iframe').contents().find('[id="edit_path"]').val();
                    txtfile_jb.jb_r_txtFile_en = layero.find('iframe').contents().find('[id="edit_encoding"]').val();
                    txtfile_jb.jb_r_txtFile_column = layero.find('iframe').contents().find('[id="edit_txtFile_column"]').val();
                    txtfile_jb.jb_r_txtFile_fgf = layero.find('iframe').contents().find('[id="edit_fgf"]').val();
                    txtfile_jb.jb_r_txtFile_ysgs = layero.find('iframe').contents().find('[id="edit_ys"]').val();
                    txtfile_jb.jb_r_txtFile_csv_h = layero.find('iframe').contents().find('[id="edit_csv"]').val();
                    txtfile_jb.jb_r_txtFile_nullF = layero.find('iframe').contents().find('[id="edit_nullFor"]').val();
                    txtfile_jb.jb_w_txtFile_path = layero.find('iframe').contents().find('[id="w_edit_path"]').val();
                    txtfile_jb.jb_w_txtFile_filename = layero.find('iframe').contents().find('[id="w_edit_fileName"]').val();
                    txtfile_jb.jb_w_txtfile_ms = layero.find('iframe').contents().find('[id="w_edit_wmode"]').val();
                    txtfile_jb.jb_w_txtfile_fgf = layero.find('iframe').contents().find('[id="w_edit_fgf"]').val();
                    txtfile_jb.jb_w_txtfile_ysgs = layero.find('iframe').contents().find('[id="w_edit_ys"]').val();
                    txtfile_jb.jb_w_txtfile_en = layero.find('iframe').contents().find('[id="w_edit_encoding"]').val();
                    txtfile_jb.jb_w_txtfile_nullF = layero.find('iframe').contents().find('[id="w_edit_nullFor"]').val();
                    txtfile_jb.jb_w_txtfile_dateF = layero.find('iframe').contents().find('[id="w_edit_date"]').val();
                    txtfile_jb.jb_w_txtfile_fileF = layero.find('iframe').contents().find('[id="w_edit_fileFormat"]').val();
                    txtfile_jb.jb_w_txtfile_header = layero.find('iframe').contents().find('[id="w_edit_header"]').val();
                    dbConJson.txtFileInfo = txtfile_jb;
                    /*获取ftp的脚本信息*/
                    ftp_jb.jb_ftp_host_r = layero.find('iframe').contents().find('[id="edit_ftp_host"]').val();
                    ftp_jb.jb_ftp_port_r = layero.find('iframe').contents().find('[id="edit_ftp_port"]').val();
                    ftp_jb.jb_ftp_username_r = layero.find('iframe').contents().find('[id="edit_ftp_username"]').val();
                    ftp_jb.jb_ftp_password_r = layero.find('iframe').contents().find('[id="edit_ftp_pasw"]').val();
                    ftp_jb.jb_ftp_protocol_r = layero.find('iframe').contents().find('[id="edit_ftp_protocol"]').val();
                    ftp_jb.jb_ftp_path_r = layero.find('iframe').contents().find('[id="edit_ftp_path"]').val();
                    ftp_jb.jb_ftp_column_r = layero.find('iframe').contents().find('[id="edit_ftp_column"]').val();
                    ftp_jb.jb_ftp_en_r = layero.find('iframe').contents().find('[id="edit_ftp_en"]').val();
                    ftp_jb.jb_ftp_fgf_r = layero.find('iframe').contents().find('[id="edit_ftp_fgf"]').val();
                    ftp_jb.jb_ftp_timeout_r = layero.find('iframe').contents().find('[id="edit_ftp_timeout"]').val();
                    ftp_jb.jb_ftp_cp_r = layero.find('iframe').contents().find('[id="edit_ftp_cp"]').val();
                    ftp_jb.jb_ftp_ysgs_r = layero.find('iframe').contents().find('[id="edit_ftp_ysgs"]').val();
                    ftp_jb.jb_ftp_csvH_r = layero.find('iframe').contents().find('[id="edit_ftp_csvH"]').val();
                    ftp_jb.jb_ftp_nullF_r = layero.find('iframe').contents().find('[id="edit_ftp_nullF"]').val();
                    ftp_jb.jb_ftp_maxT_r = layero.find('iframe').contents().find('[id="edit_ftp_maxT"]').val();
                    ftp_jb.jb_ftp_host_w = layero.find('iframe').contents().find('[id="w_edit_ftp_host"]').val();
                    ftp_jb.jb_ftp_port_w = layero.find('iframe').contents().find('[id="w_edit_ftp_port"]').val();
                    ftp_jb.jb_ftp_username_w = layero.find('iframe').contents().find('[id="w_edit_ftp_username"]').val();
                    ftp_jb.jb_ftp_password_w = layero.find('iframe').contents().find('[id="w_edit_ftp_pasw"]').val();
                    ftp_jb.jb_ftp_protocol_w = layero.find('iframe').contents().find('[id="w_edit_ftp_protocol"]').val();
                    ftp_jb.jb_ftp_timeout_w = layero.find('iframe').contents().find('[id="w_edit_ftp_timeout"]').val();
                    ftp_jb.jb_ftp_cp_w = layero.find('iframe').contents().find('[id="w_edit_ftp_cp"]').val();
                    ftp_jb.jb_ftp_path_w = layero.find('iframe').contents().find('[id="w_edit_ftp_path"]').val();
                    ftp_jb.jb_ftp_fileName_w = layero.find('iframe').contents().find('[id="w_edit_ftp_fileName"]').val();
                    ftp_jb.jb_ftp_ms_w = layero.find('iframe').contents().find('[id="w_edit_ftp_ms"]').val();
                    ftp_jb.jb_ftp_fgf_w = layero.find('iframe').contents().find('[id="w_edit_ftp_fgf"]').val();
                    ftp_jb.jb_ftp_ysgs_w = layero.find('iframe').contents().find('[id="w_edit_ftp_ysgs"]').val();
                    ftp_jb.jb_ftp_en_w = layero.find('iframe').contents().find('[id="w_edit_ftp_en"]').val();
                    ftp_jb.jb_ftp_nullF_w = layero.find('iframe').contents().find('[id="w_edit_ftp_nullF"]').val();
                    ftp_jb.jb_ftp_dateF_w = layero.find('iframe').contents().find('[id="w_edit_ftp_dateF"]').val();
                    ftp_jb.jb_ftp_fileF_w = layero.find('iframe').contents().find('[id="w_edit_ftp_fileF"]').val();
                    ftp_jb.jb_ftp_header_w = layero.find('iframe').contents().find('[id="w_edit_ftp_header"]').val();
                    dbConJson.ftpInfo = ftp_jb;
                    /*获取mongodb的脚本信息*/
                    mongodb_jb.jb_mongodb_address_r = layero.find('iframe').contents().find('[id="edit_mongodb_address"]').val().replace(/\n/g,',');
                    mongodb_jb.jb_mongodb_username_r = layero.find('iframe').contents().find('[id="edit_mongodb_username"]').val();
                    mongodb_jb.jb_mongodb_userpasw_r = layero.find('iframe').contents().find('[id="edit_mongodb_pasw"]').val();
                    mongodb_jb.jb_mongodb_dbname_r = layero.find('iframe').contents().find('[id="edit_mongodb_dbname"]').val();
                    mongodb_jb.jb_mongodb_collname_r = layero.find('iframe').contents().find('[id="edit_mongodb_collName"]').val();
                    mongodb_jb.jb_mongodb_column_r = layero.find('iframe').contents().find('[id="edit_mongodb_column"]').val();
                    mongodb_jb.jb_mongodb_address_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_address"]').val().replace(/\n/g,',');
                    mongodb_jb.jb_mongodb_username_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_username"]').val();
                    mongodb_jb.jb_mongodb_userpasw_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_pasw"]').val();
                    mongodb_jb.jb_mongodb_dbname_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_dbname"]').val();
                    mongodb_jb.jb_mongodb_collname_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_collName"]').val();
                    mongodb_jb.jb_mongodb_column_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_column"]').val();
                    mongodb_jb.jb_mongodb_isupsert_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_isUpsert"]').val();
                    mongodb_jb.jb_mongodb_upsertKey_w = layero.find('iframe').contents().find('[id="w_edit_mongodb_upsertKey"]').val();
                    dbConJson.mongodbInfo = mongodb_jb;
                    /*获取cassandra脚本的信息*/
                    cassandra_jb.jb_cassandra_host_r = layero.find('iframe').contents().find('[id="edit_cassandra_host"]').val();
                    cassandra_jb.jb_cassandra_port_r = layero.find('iframe').contents().find('[id="edit_cassandra_port"]').val();
                    cassandra_jb.jb_cassandra_username_r = layero.find('iframe').contents().find('[id="edit_cassandra_username"]').val();
                    cassandra_jb.jb_cassandra_pasw_r = layero.find('iframe').contents().find('[id="edit_cassandra_pasw"]').val();
                    cassandra_jb.jb_cassandra_useSSL_r = layero.find('iframe').contents().find('[id="edit_cassandra_useSSL"]').val();
                    cassandra_jb.jb_cassandra_keyspace_r = layero.find('iframe').contents().find('[id="edit_cassandra_keyspace"]').val();
                    cassandra_jb.jb_cassandra_table_r = layero.find('iframe').contents().find('[id="edit_cassandra_table"]').val();
                    cassandra_jb.jb_cassandra_column_r = layero.find('iframe').contents().find('[id="edit_cassandra_column"]').val();
                    cassandra_jb.jb_cassandra_where_r = layero.find('iframe').contents().find('[id="edit_cassandra_where"]').val();
                    cassandra_jb.jb_cassandra_allowF_r = layero.find('iframe').contents().find('[id="edit_cassandra_allowF"]').val();
                    cassandra_jb.jb_cassandra_conL_r = layero.find('iframe').contents().find('[id="edit_cassandra_conL"]').val();
                    cassandra_jb.jb_cassandra_host_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_host"]').val();
                    cassandra_jb.jb_cassandra_port_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_port"]').val();
                    cassandra_jb.jb_cassandra_username_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_username"]').val();
                    cassandra_jb.jb_cassandra_pasw_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_pasw"]').val();
                    cassandra_jb.jb_cassandra_useSSL_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_useSSL"]').val();
                    cassandra_jb.jb_cassandra_conP_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_conP"]').val();
                    cassandra_jb.jb_cassandra_maxC_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_maxC"]').val();
                    cassandra_jb.jb_cassandra_keyspace_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_keyspace"]').val();
                    cassandra_jb.jb_cassandra_table_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_table"]').val();
                    cassandra_jb.jb_cassandra_batchSize_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_batchSize"]').val();
                    cassandra_jb.jb_cassandra_column_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_column"]').val();
                    cassandra_jb.jb_cassandra_conL_w = layero.find('iframe').contents().find('[id="w_edit_cassandra_conL"]').val();
                    dbConJson.cassandraInfo = cassandra_jb;
                    edit_info_fun(dbConJson);
                    layer.closeAll();
                },
                no: function(){
                    layer.closeAll();
                }
            });
        };
        /*定义新增方法*/
        var add_info_fun = function (dbConJson) {
            $.ajax({
                type:'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                headers : {"Content-Type" : "application/json;charset=utf-8"},
                url:'/jbInfo/addJbInfo',
                data:JSON.stringify(dbConJson),
                success:function(res){
                    if(res.code == 0){
                        layer.msg(res.msg);
                        data_info();
                    }else {
                        layer.alert(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };
        /*定义根据id修改脚本信息的方法*/
        var edit_info_fun = function (dbConJson) {
            $.ajax({
                type:'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                headers : {"Content-Type" : "application/json;charset=utf-8"},
                url:'/jbInfo/editJbInfoById',
                data:JSON.stringify(dbConJson),
                success:function(res){
                    if(res.code == 0){
                        layer.msg(res.msg);
                        data_info();
                    }else {
                        layer.alert(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };

        /*定义根据脚本id删除该脚本方法*/
        var  del_info_fun = function (data) {
            $.ajax({
                type:'post',
                dataType: "json",
                url:'/jbInfo/delJbInfoById',
                data:{
                    id:data.id
                },
                success:function(res){
                    if(res.code == 0){
                        layer.msg(res.msg);
                        data_info();
                    }else {
                        layer.msg(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };
        /*定义根据筛选条件查询脚本信息方法*/
        var info_by_tj_fun = function (dbConJson) {
            table.render({
                elem: '#con-data',
                url:'/jbInfo/queryAllJbInfoByTj',
                method:'post',
                contentType:'application/json',
                where:{
                    jb_name:dbConJson.jb_name,
                    r_db_type:dbConJson.r_db_type,
                    w_db_type:dbConJson.w_db_type,
                    jb_lrsj_q:dbConJson.jb_lrsj_q,
                    jb_lrsj_z:dbConJson.jb_lrsj_z,
                    jb_group_id:dbConJson.jb_group_id
                },
                cellMinWidth: 80,
                page:true,
                fit:true,
                fitColumns:true,
                title: '用户数据表',
                cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field:'id', title:'编号',width:80,  fixed: 'left', unresize: true, sort: true},
                    {field:'jb_name', title:'脚本名称'},
                    {field:'jb_bz', title:'脚本说明'},
                    {field:'jb_json_file_name',width:178, title:'json文件名称'},
                    {field:'jb_lrsj', title:'录入时间',sort: true,templet:"<div>{{layui.util.toDateString(d.jb_lrsj, 'yyyy-MM-dd')}}</div>"},
                    {field:'jb_xgsj', title:'修改时间',sort: true,templet:"<div>{{layui.util.toDateString(d.jb_xgsj, 'yyyy-MM-dd')}}</div>"},
                    {fixed:'right',width:210, title:'操作', toolbar: '#bar' }
                ]]
            });
        };

        /*点击筛选条件时候查询脚本信息*/
        $('#query_sure_tj').on('click',function () {
            /*获取查询的条件参数*/
            dbConJson = {};
            dbConJson.jb_name = $('#query_tj_jb_name').val();
            dbConJson.r_db_type = $('#query_r_db_type_id').val();
            dbConJson.w_db_type = $('#query_w_db_type_id').val();
            dbConJson.jb_lrsj_q = $('#date_q').val();
            dbConJson.jb_lrsj_z = $('#date_z').val();
            dbConJson.jb_group_id = $('#jb_group').val();
            info_by_tj_fun(dbConJson);
        });

        /*监听复选框事件*/
        var select_jb_obj = [];
        var select_jb_name = [];
        var select_jb_path = [];
        table.on('checkbox(con-data)', function(obj){
            select_jb_obj = table.checkStatus('con-data').data;
            if(select_jb_obj.length > 0){
                select_jb_name = [];
                select_jb_path = [];
                $.each(select_jb_obj,function (index,item) {
                    select_jb_name.push(item.jb_name);
                    select_jb_path.push(item.jb_json_fullPath);
                })
            }else {
                select_jb_name = [];
                select_jb_path = [];
            }
            $('#select_jb_name').val(select_jb_name.join(','));
            if(select_jb_name.length > 0){
                $('#select_jb_name_all').addClass('layui-show');
            }else {
                $('#select_jb_name_all').removeClass('layui-show');
            }
        });
        $('#select_jb_name_btn').on('click',function () {
            layer.alert('脚本地址：'+'<br/>'+select_jb_path.join('<br/>'), {
                area:['650px','400px']
            })
        });



    })
});