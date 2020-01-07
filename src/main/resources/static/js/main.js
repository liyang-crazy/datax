$(function () {
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;
        var select_val = 1;//新增下拉默认值是1：mysql
        var select_data = {};//编辑时候选择的数据
        var dbContionInfo = {//定义一个数据连接对象用于存储数据
            id:'',
            db_type:'',
            db_name:'',
            db_ip:'',
            db_port:'',
            db_sid:'',
            db_zfj:'',
            db_username:'',
            db_password:''
        };
        var is_null_flg = "";//判断新增参数是否为空

        var data_info = function () {
            table.render({
                elem: '#con-data',
                url:'/db_info/queryAllDbInfo',
                cellMinWidth: 80,
                page:true,
                fit:true,
                fitColumns:true,
                title: '用户数据表',
                cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field:'id', title:'编号', width:80, fixed: 'left', unresize: true, sort: true},
                    {field:'db_type_name',width:100, title:'连接类型'},
                    {field:'db_name',width:120, title:'连接名称'},
                    {field:'db_ip',width:120, title:'IP地址'},
                    {field:'db_port',width:80, title:'端口'},
                    {field:'db_sid', width:80,title:'SID'},
                    {field:'db_url',width:150, title:'URL地址'},
                    {field:'db_lrsj',width:120, title:'录入时间',sort: true,templet:"<div>{{layui.util.toDateString(d.db_lrsj, 'yyyy-MM-dd')}}</div>"},
                    {field:'db_xgsj',width:120, title:'修改时间',sort: true,templet:"<div>{{layui.util.toDateString(d.db_xgsj, 'yyyy-MM-dd')}}</div>"},
                    {fixed:'right',width:160, title:'操作', toolbar: '#bar' }
                ]]
            });
        };
        /*加载数据*/
        data_info();

        //获取下拉列表的信息
        form.on('select(xl_list)',function (data) {
            select_val = data.value;
        });
        //监听工具条
        table.on('tool(con-data)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                back_dafa_fun(data,obj.event);
            } else if(obj.event === 'del'){
                layer.confirm('真的删除"'+data.db_name+'"吗？', function(index){
                    delet_info_fun(data);
                    obj.del();
                    layer.close(index);
                });
            } else if(obj.event === 'edit'){//点击编辑
                back_dafa_fun(data,obj.event);
            }else if(obj.event === 'select'){//点击应用
                console.log(data);
            }
        });

        /*点击新增弹出弹框*/
        $('.add-btn').on('click',function () {
            if(select_val == 1){
                $('#add_title').text("新增Mysql数据");
                $('#oracle-contion').addClass('layui-hide');
                $('#mysql-zfj').removeClass('layui-hide');
            }
            if(select_val == 2){
                $('#add_title').text("新增Oracle数据");
                $('#oracle-contion').removeClass('layui-hide');
                $('#mysql-zfj').addClass('layui-hide');
            }
            if(select_val == 4){
                $('#add_title').text("新增SqlServer数据");
                $('#oracle-contion').addClass('layui-hide');
                $('#mysql-zfj').addClass('layui-hide');
            }
            if(select_val == 6){
                $('#add_title').text("新增MongoDB数据");
                $('#oracle-contion').addClass('layui-hide');
                $('#mysql-zfj').addClass('layui-hide');
            }
            $('#add_info_mysql').removeClass('layui-hide');
            layer.open({
                type: 1,
                title:'新增信息',
                area: ['650px', '500px'],
                content: $('#add_info_mysql'),
                closeBtn:0
            });
            $("#sure").unbind("click");
            $('#sure').on('click',function () {
                /*获取连接信息的参数数据*/
                dbContionInfo.db_type = select_val.toString();
                dbContionInfo.db_name = $.trim($('#add_db_name').val());
                dbContionInfo.db_ip = $.trim($('#add_db_ip').val());
                dbContionInfo.db_port = $.trim($('#add_db_port').val());
                dbContionInfo.db_sid = $.trim($('#add_db_sid').val());
                dbContionInfo.db_zfj = $.trim($('#add_db_zfj').val());
                dbContionInfo.db_username = $.trim($('#add_db_username').val());
                dbContionInfo.db_password = $.trim($('#add_db_password').val());
                if(select_val == 1 && isNull_fun(dbContionInfo) == 1){
                    layer.alert('连接参数信息不全！')
                }else if(select_val == 1 && isNull_fun(dbContionInfo) == 2){
                    /*点击新增确定*/
                    add_info_fun(dbContionInfo);
                    clean_parms_fun();
                    $('#add_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                    return false;
                }
                if(select_val == 2 && isNull_fun(dbContionInfo) == 1){
                    layer.alert('连接参数信息不全！')
                }else if(select_val == 2 && isNull_fun(dbContionInfo) == 2){
                    /*点击新增确定*/
                    add_info_fun(dbContionInfo);
                    clean_parms_fun();
                    $('#add_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                }
                if(select_val == 4 && isNull_fun(dbContionInfo) == 1){
                    layer.alert('连接参数信息不全！')
                }else if(select_val == 4 && isNull_fun(dbContionInfo) == 2){
                    /*点击新增确定*/
                    add_info_fun(dbContionInfo);
                    clean_parms_fun();
                    $('#add_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                }
                if(select_val == 6 && isNull_fun(dbContionInfo) == 1){
                    layer.alert('连接参数信息不全！')
                }else if(select_val == 6 && isNull_fun(dbContionInfo) == 2){
                    /*点击新增确定*/
                    add_info_fun(dbContionInfo);
                    clean_parms_fun();
                    $('#add_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                }
            });
            $('#cancel').on('click',function () {
                clean_parms_fun();
                $('#add_info_mysql').addClass('layui-hide');
                layer.closeAll();
            });
        });

        /*回填数据的公用方式*/
        var back_dafa_fun = function (data,str_flg) {
            if(data.db_type == 1){
                $('#update_oracle-contion').addClass('layui-hide');
                $('#show_oracle-contion').addClass('layui-hide');
                $('#show_mysql-zfj').removeClass('layui-hide');
                $('#update_mysql-zfj').removeClass('layui-hide');
            }
            if(data.db_type == 2){
                $('#update_oracle-contion').removeClass('layui-hide');
                $('#show_oracle-contion').removeClass('layui-hide');
                $('#show_mysql-zfj').addClass('layui-hide');
                $('#update_mysql-zfj').addClass('layui-hide');
            }
            if(data.db_type == 4){
                $('#show_oracle-contion').addClass('layui-hide');
                $('#show_mysql-zfj').addClass('layui-hide');
                $('#update_oracle-contion').addClass('layui-hide');
                $('#update_mysql-zfj').addClass('layui-hide');
            }
            if(data.db_type == 6){
                $('#show_oracle-contion').addClass('layui-hide');
                $('#show_mysql-zfj').addClass('layui-hide');
                $('#update_oracle-contion').addClass('layui-hide');
                $('#update_mysql-zfj').addClass('layui-hide');
            }
            select_data = data;
            //将内容回填到对应input上
            if(str_flg == 'detail'){
                $('#show_title').text('查看'+data.db_name);
                $('#show_contion_name').val(data.db_name);
                $('#show_contion_ip').val(data.db_ip);
                $('#show_contion_dk').val(data.db_port);
                $('#show_contion_sid').val(data.db_sid);
                $('#show_db_zfj').val(data.db_zfj);
                $('#show_contion_username').val(data.db_username);
                $('#show_contion_userpassword').val(data.db_password);
                $('#show_info_mysql').removeClass('layui-hide');
                layer.open({
                    type: 1,
                    title:'数据信息',
                    area: ['650px', '500px'],
                    content: $('#show_info_mysql'),
                    closeBtn:0
                });
                $('#show_sure').on('click',function () {
                    $('#show_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                });
                $('#show_cancel').on('click',function () {
                    $('#show_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                })
            }
            if(str_flg == 'edit'){
                $('#update_title').text('修改'+data.db_name);
                $('#contion_name').val(data.db_name);
                $('#contion_ip').val(data.db_ip);
                $('#contion_dk').val(data.db_port);
                $('#contion_sid').val(data.db_sid);
                $('#update_db_zfj').val(data.db_zfj);
                $('#contion_username').val(data.db_username);
                $('#contion_userpassword').val(data.db_password);
                $('#update_info_mysql').removeClass('layui-hide');
                layer.open({
                    type: 1,
                    title:'数据信息',
                    area: ['650px', '500px'],
                    content: $('#update_info_mysql'),
                    closeBtn:0
                });
                $("#update_sure").unbind("click");
                $('#update_sure').on('click',function () {
                    /*获取连接信息的参数数据*/
                    dbContionInfo.id = data.id;
                    dbContionInfo.db_type = data.db_type;
                    dbContionInfo.db_name = $.trim($('#contion_name').val());
                    dbContionInfo.db_ip = $.trim($('#contion_ip').val());
                    dbContionInfo.db_port = $.trim($('#contion_dk').val());
                    dbContionInfo.db_sid = $.trim($('#contion_sid').val());
                    dbContionInfo.db_zfj = $.trim($('#update_db_zfj').val());
                    dbContionInfo.db_username = $.trim($('#contion_username').val());
                    dbContionInfo.db_password = $.trim($('#contion_userpassword').val());

                    if(dbContionInfo.db_type == 1 && isNull_fun_update(dbContionInfo) == 1){
                        layer.alert('连接参数信息不全！')
                    }else if(dbContionInfo.db_type == 1 && isNull_fun_update(dbContionInfo) == 2){
                        /*调用修改的方法*/
                        update_info_fun(dbContionInfo);
                        dbContionInfo={};
                        $('#update_info_mysql').addClass('layui-hide');
                        layer.closeAll();
                    }
                    if(dbContionInfo.db_type == 2 && isNull_fun_update(dbContionInfo) == 1){
                        layer.alert('连接参数信息不全！')
                    }else if(dbContionInfo.db_type == 2 && isNull_fun_update(dbContionInfo) == 2){
                        /*调用修改的方法*/
                        update_info_fun(dbContionInfo);
                        dbContionInfo={};
                        $('#update_info_mysql').addClass('layui-hide');
                        layer.closeAll();
                    }
                    if(dbContionInfo.db_type == 4 && isNull_fun_update(dbContionInfo) == 1){
                        layer.alert('连接参数信息不全！')
                    }else if(dbContionInfo.db_type == 4 && isNull_fun_update(dbContionInfo) == 2){
                        /*调用修改的方法*/
                        update_info_fun(dbContionInfo);
                        dbContionInfo={};
                        $('#update_info_mysql').addClass('layui-hide');
                        layer.closeAll();
                    }
                    if(dbContionInfo.db_type == 6 && isNull_fun_update(dbContionInfo) == 1){
                        layer.alert('连接参数信息不全！')
                    }else if(dbContionInfo.db_type == 6 && isNull_fun_update(dbContionInfo) == 2){
                        /*调用修改的方法*/
                        update_info_fun(dbContionInfo);
                        dbContionInfo={};
                        $('#update_info_mysql').addClass('layui-hide');
                        layer.closeAll();
                    }
                });
                $('#update_cancel').on('click',function () {
                    $('#update_info_mysql').addClass('layui-hide');
                    layer.closeAll();
                })
            }

        };

        /*定义新增方法*/
        var add_info_fun = function (dbContionInfo) {
           $.ajax({
               type:'post',
               dataType: "json",
               contentType: "application/json;charset=UTF-8",
               headers : {"Content-Type" : "application/json;charset=utf-8"},
               url:'/db_info/addDbInfo',
               data:JSON.stringify(dbContionInfo),
               success:function(res){
                   if(res.code == 0){
                       data_info();
                       layer.msg(res.msg);
                   }else {
                       layer.msg(res.msg);
                   }
               },
               error:function () {
                   layer.alert("请求错误！")
               }
           })
        };
        /*定义修改连接信息的方法*/
        var update_info_fun = function (dbContionInfo) {
            $.ajax({
                type:'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                headers : {"Content-Type" : "application/json;charset=utf-8"},
                url:'/db_info/updateDbInfoById',
                data:JSON.stringify(dbContionInfo),
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
        /*定义删除的方法*/
        var delet_info_fun = function (dbContionInfo) {
            $.ajax({
                type:'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                headers : {"Content-Type" : "application/json;charset=utf-8"},
                url:'/db_info/deletDbInfoById',
                data:JSON.stringify(dbContionInfo),
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
        /*判断新增提交参数不能为空*/
        var isNull_fun = function (parm) {
            if(select_val == 1){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(select_val == 2){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_sid == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_sid == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(select_val == 4){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(select_val == 6){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
        };
        /*判断修改提交参数不能为空*/
        var isNull_fun_update = function (parm) {
            if(parm.db_type == 1){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(parm.db_type == 2){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_sid == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_sid == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(parm.db_type == 4){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
            if(parm.db_type == 6){
                if((parm.db_name == "" || parm.db_ip == "" || parm.db_port == "" || parm.db_username == "" ||parm.db_password == "")||(parm.db_name == null || parm.db_ip == null || parm.db_port == null || parm.db_username == null ||parm.db_password == null)){
                    return  is_null_flg = 1;
                }else {
                    return  is_null_flg = 2;
                }
            }
        };

        /*将参数情况方法*/
        var clean_parms_fun = function () {
            $('#add_db_name').val('');
            $('#add_db_ip').val('');
            $('#add_db_port').val('');
            $('#add_db_sid').val('');
            $('#add_db_username').val('');
            $('#add_db_password').val('');
        }

    })
});