$(function () {
    String.prototype.replaceAll = function(s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    };
    layui.use(['element','table','laypage','layer','laydate','form','laytpl'],function () {
        var element = layui.element;
        var table = layui.table;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var form = layui.form;
        var r_jb_sql = true;//表示第一次点击input框
        var jb_group_arr = [];
        var w_jb_mode_arr = ["insert","replace","update"];
        var jb_r_txtFile_ysgs_arr = ["zip","gzip","bzip2"];
        var jb_r_txtFile_csv_h_arr = ["0","1"];
        var jb_w_txtfile_ms_arr = ["truncate","append","nonConflict"];
        var jb_w_txtfile_ysgs_arr = ["zip","lzo","lzop","tgz","bzip2"];
        var jb_ftp_protocol_arr = ["ftp","sftp"];
        var jb_ftp_cp_arr = ["PORT","PASV"];
        var jb_ftp_ysgs_arr = ["zip","gzip","bzip2"];
        var jb_w_ftp_ms_arr = ["truncate","append","nonConflict"];
        var flg = true;
        var flg_r= true;
        var flg_w = true;
        /*接收从父页面传递过来的三个参数*/
        function getSearchString(key) {
            // 获取URL中?之后的字符
            var str = location.search;
            str = str.substring(1,str.length);
            var arr = str.split("&");
            var obj = {};
            // 将每一个数组元素以=分隔并赋给obj对象
            for(var i = 0; i < arr.length; i++) {
                var tmp_arr = arr[i].split("=");
                obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
            }
            return obj[key];
        };

        /*根据脚本id查询脚本的信息*/
        var jb_info_byID = function (id,r_db_type,w_db_type) {
            $.ajax({
                type:'post',
                dataType: "json",
                url:'/jbInfo/queryJbInfoById',
                data:{
                    id:id,
                    r_db_type:r_db_type,
                    w_db_type:w_db_type

                },
                success:function(res){
                    if(res.code == 0){
                        back_data_fun(res.data);
                    }else {
                        layer.alert(res.msg);
                    }
                },
                error:function () {
                    layer.alert("请求错误！")
                }
            })
        };
        /*获取父页面传递过来的脚本id*/
        jb_info_byID(getSearchString('id'),getSearchString('r_db_type'),getSearchString('w_db_type'));
        /*定义获脚本分组数据的方法*/
        var getAllJb_group_fun = function () {
            $.ajax({
                url:'/jbInfo/queryAllJbGroup',
                dataType: 'json',
                type: 'post',
                success: function (res) {
                    if(res.code == 0){
                        jb_group_arr = res.data;
                    }
                    /*$.each(res.data, function (index, item) {
                        $('#edit_jb_group').append(new Option(item.jb_group_name, item.jb_group_id));
                    });*/
                    //layui.form.render("select");//重新渲染 固定写法
                }
            });
        };
        getAllJb_group_fun();
        /*回填数据的方法*/
        var back_data_fun = function (data) {
            if(data.r_db_type == 3){
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.txtFile').removeClass('layui-hide');
            }else if(data.r_db_type == 5){
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.ftp').removeClass('layui-hide');
            }else if(data.r_db_type == 6){
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.mongodb').removeClass('layui-hide');
            }else {
                $('.mysqlAndOracle').removeClass('layui-hide');
                $('.txtFile').addClass('layui-hide');
                if(data.r_jb_tbgs == 1){
                    $('#sc-edit-sql').addClass('layui-hide');
                    $('#sc-edit-col').removeClass('layui-hide');
                    $('#sc-edit-tab').removeClass('layui-hide');
                    $('#sc-edit-split').removeClass('layui-hide');
                }
                if(data.r_jb_tbgs == 2){
                    $('#sc-edit-col').addClass('layui-hide');
                    $('#sc-edit-tab').addClass('layui-hide');
                    $('#sc-edit-split').addClass('layui-hide');
                    $('#sc-edit-sql').removeClass('layui-hide');
                }
            }
            if(data.w_db_type == 3){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_txtFile').removeClass('layui-hide');
            }else if(data.w_db_type == 5){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_ftp').removeClass('layui-hide');
            }else if(data.w_db_type == 6){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_mongodb').removeClass('layui-hide');
            }else {
                $('.w_mysqlAndOracle').removeClass('layui-hide');
                $('.w_txtFile').addClass('layui-hide');
                if(data.w_db_type == 1){
                    $('#w-sc-edit-session').removeClass('layui-hide');
                    $('#w_edit_db_mode_all').removeClass('layui-hide');
                }
                if(data.w_db_type == 2){
                    $('#w-sc-edit-session').addClass('layui-hide');
                    $('#w_edit_db_mode_all').addClass('layui-hide');
                }
                if(data.w_db_type == 4){
                    $('#w-sc-edit-postSql').removeClass('layui-hide');
                    $('#w_edit_db_mode_all').addClass('layui-hide');
                    $('#w-sc-edit-session').addClass('layui-hide');
                }
            }
            $('#sc-edit-jb_name').val(data.jb_name);
            $.each(jb_group_arr,function (index,item) {
                if(data.jb_group_id == item.jb_group_id){
                    $("#edit_jb_group").append("<option value="+item.jb_group_id+" selected>"+item.jb_group_name+"</option>");
                }else {
                    $("#edit_jb_group").append("<option value="+item.jb_group_id+">"+item.jb_group_name+"</option>");
                }
            });
            layui.form.render("select");
            $('#edit_settin_channel').val(data.jb_channel);
            $('#edit_setting_byte').val(data.jb_byte);
            $('#edit_setting_record').val(data.jb_record);
            $('#edit_setting_percentage').val(data.jb_percentage);
            //$('#sc-edit-db-url').val(data.r_db_url);
            $('#sc-edit-db-username').val(data.r_db_username);
            $('#sc-edit-db-pasw').val(data.r_db_password);
            $('#edit_r_column').val(data.r_jb_column);
            $('#edit_r_table').val(data.r_jb_table);
            $('#edit_r_contaion').val(data.r_jb_url.replaceAll(',','\n'));
            $('#sc-edit-r-splitPk').val(data.r_jb_splitPk);
            $('#edit_r_sql').val(data.r_jb_sql);
            //$('#w-sc-edit-db-url').val(data.w_db_url);
            $('#w-sc-edit-db-username').val(data.w_db_username);
            $('#w-sc-edit-db-pasw').val(data.w_db_password);
            $.each(w_jb_mode_arr,function (index,item) {
                if(data.w_jb_mode == item){
                    $("#w_edit_db_mode").append("<option value="+item+" selected>"+item+"</option>");
                }else {
                    $("#w_edit_db_mode").append("<option value="+item+">"+item+"</option>");
                }
            });
            layui.form.render("select");
            $('#w-edit_column').val(data.w_jb_column);
            $('#w-edit_table').val(data.w_jb_table);
            $('#w-edit_contaion').val(data.w_jb_url);
            $('#w-edit_session').val(data.w_jb_session);
            $('#w-edit_preSql').val(data.w_jb_presql);
            $('#w-edit_postSql').val(data.w_jb_postsql);
            $('#sc-edit-jb_bz').val(data.jb_bz);
            /*给txtfile表单赋值*/
            if(data.txtFileInfo != null){
                $('#edit_path').val(data.txtFileInfo.jb_r_txtFile_path);
                $('#edit_encoding').val(data.txtFileInfo.jb_r_txtFile_en);
                $('#edit_fgf').val(data.txtFileInfo.jb_r_txtFile_fgf);
                $.each(jb_r_txtFile_ysgs_arr,function (index,item) {
                    if(data.txtFileInfo.jb_r_txtFile_ysgs == item){
                        $("#edit_ys").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#edit_ys").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $.each(jb_r_txtFile_csv_h_arr,function (index,item) {
                    if(data.txtFileInfo.jb_r_txtFile_csv_h == item){
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#edit_csv").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#edit_csv").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#edit_txtFile_column').val(data.txtFileInfo.jb_r_txtFile_column);
                $('#w_edit_path').val(data.txtFileInfo.jb_w_txtFile_path);
                $('#w_edit_fileName').val(data.txtFileInfo.jb_w_txtFile_filename);
                $.each(jb_w_txtfile_ms_arr,function (index,item) {
                    if(data.txtFileInfo.jb_w_txtfile_ms == item){
                        $("#w_edit_wmode").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#w_edit_wmode").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $.each(jb_w_txtfile_ysgs_arr,function (index,item) {
                    if(data.txtFileInfo.jb_w_txtfile_ysgs == item){
                        $("#w_edit_ys").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#w_edit_ys").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#w_edit_fgf').val(data.txtFileInfo.jb_w_txtfile_fgf);
                $('#w_edit_encoding').val(data.txtFileInfo.jb_w_txtfile_en);
                $('#w_edit_date').val(data.txtFileInfo.jb_w_txtfile_dateF);
                $('#w_editadd_fileFormat').val(data.txtFileInfo.jb_w_txtfile_fileF);
                $('#w_edit_header').val(data.txtFileInfo.jb_w_txtfile_header);
            }
            /*给ftp表单赋值*/
            if(data.ftpInfo != null){
                $('#edit_ftp_username').val(data.ftpInfo.jb_ftp_username_r);
                $('#edit_ftp_pasw').val(data.ftpInfo.jb_ftp_password_r);
                $.each(jb_ftp_protocol_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_protocol_r == item){
                        $("#edit_ftp_protocol").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#edit_ftp_protocol").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#edit_ftp_host').val(data.ftpInfo.jb_ftp_host_r);
                $('#edit_ftp_port').val(data.ftpInfo.jb_ftp_port_r);
                $('#edit_ftp_path').val(data.ftpInfo.jb_ftp_path_r);
                $('#edit_ftp_column').val(data.ftpInfo.jb_ftp_column_r);
                $('#edit_ftp_en').val(data.ftpInfo.jb_ftp_en_r);
                $('#edit_ftp_fgf').val(data.ftpInfo.jb_ftp_fgf_r);
                $('#edit_ftp_timeout').val(data.ftpInfo.jb_ftp_timeout_r);
                if(data.ftpInfo.jb_ftp_protocol_r == 'ftp'){
                    $('#edit_ftp_cp_all').removeClass('layui-hide');
                    $.each(jb_ftp_cp_arr,function (index,item) {
                        if(data.ftpInfo.jb_ftp_cp_r == item){
                            $("#edit_ftp_cp").append("<option value="+item+" selected>"+item+"</option>");
                        }else {
                            $("#edit_ftp_cp").append("<option value="+item+">"+item+"</option>");
                        }
                    });
                }
                layui.form.render("select");
                $.each(jb_ftp_ysgs_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_ysgs_r == item){
                        $("#edit_ftp_ysgs").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#edit_ftp_ysgs").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $.each(jb_r_txtFile_csv_h_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_csvH_r == item){
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#edit_ftp_csvH").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#edit_ftp_csvH").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#edit_ftp_maxT').val(data.ftpInfo.jb_ftp_maxT_r);
                $('#w_edit_ftp_username').val(data.ftpInfo.jb_ftp_username_w);
                $('#w_edit_ftp_pasw').val(data.ftpInfo.jb_ftp_password_w);
                $.each(jb_ftp_protocol_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_protocol_w == item){
                        $("#w_edit_ftp_protocol").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#w_edit_ftp_protocol").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#w_edit_ftp_host').val(data.ftpInfo.jb_ftp_host_w);
                $('#w_edit_ftp_port').val(data.ftpInfo.jb_ftp_port_w);
                $('#w_edit_ftp_timeout').val(data.ftpInfo.jb_ftp_timeout_w);
                if(data.ftpInfo.jb_ftp_protocol_w == 'ftp'){
                    $('#w_edit_ftp_cp_all').removeClass('layui-hide');
                    $.each(jb_ftp_cp_arr,function (index,item) {
                        if(data.ftpInfo.jb_ftp_cp_w == item){
                            $("#w_edit_ftp_cp").append("<option value="+item+" selected>"+item+"</option>");
                        }else {
                            $("#w_edit_ftp_cp").append("<option value="+item+">"+item+"</option>");
                        }
                    });
                }
                layui.form.render("select");
                $('#w_edit_ftp_path').val(data.ftpInfo.jb_ftp_path_w);
                $('#w_edit_ftp_fileName').val(data.ftpInfo.jb_ftp_fileName_w);
                $.each(jb_w_ftp_ms_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_ms_w == item){
                        $("#w_edit_ftp_ms").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#w_edit_ftp_ms").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#w_edit_ftp_fgf').val(data.ftpInfo.jb_ftp_fgf_w);
                $.each(jb_ftp_ysgs_arr,function (index,item) {
                    if(data.ftpInfo.jb_ftp_ysgs_w == item){
                        $("#w_edit_ftp_ysgs").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        $("#w_edit_ftp_ysgs").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#w_edit_ftp_en').val(data.ftpInfo.jb_ftp_en_w);
                $('#w_edit_ftp_dateF').val(data.ftpInfo.jb_ftp_dateF_w);
                $('#w_edit_ftp_fileF').val(data.ftpInfo.jb_ftp_fileF_w);
                $('#w_edit_ftp_header').val(data.ftpInfo.jb_ftp_header_w);
            }
            /*给mongodb表单赋值*/
            if(data.mongodbInfo != null){
                $('#edit_mongodb_address').val(data.mongodbInfo.jb_mongodb_address_r.replaceAll(',','\n'));
                $('#edit_mongodb_username').val(data.mongodbInfo.jb_mongodb_username_r);
                $('#edit_mongodb_pasw').val(data.mongodbInfo.jb_mongodb_userpasw_r);
                $('#edit_mongodb_dbname').val(data.mongodbInfo.jb_mongodb_dbname_r);
                $('#edit_mongodb_collName').val(data.mongodbInfo.jb_mongodb_collname_r);
                $('#edit_mongodb_column').val(data.mongodbInfo.jb_mongodb_column_r);
                $('#w_edit_mongodb_address').val(data.mongodbInfo.jb_mongodb_address_w.replaceAll(',','\n'));
                $('#w_edit_mongodb_username').val(data.mongodbInfo.jb_mongodb_username_w);
                $('#w_edit_mongodb_pasw').val(data.mongodbInfo.jb_mongodb_userpasw_w);
                $('#w_edit_mongodb_dbname').val(data.mongodbInfo.jb_mongodb_dbname_w);
                $('#w_edit_mongodb_collName').val(data.mongodbInfo.jb_mongodb_collname_w);
                $('#w_edit_mongodb_column').val(data.mongodbInfo.jb_mongodb_column_w);
                $.each(jb_r_txtFile_csv_h_arr,function (index,item) {
                    if(data.mongodbInfo.jb_mongodb_isupsert_w == item){
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#w_edit_mongodb_isUpsert").append("<option value="+item+" selected>"+item+"</option>");
                    }else {
                        if(item == 0){
                            item = false;
                        }else {
                            item = true;
                        }
                        $("#w_edit_mongodb_isUpsert").append("<option value="+item+">"+item+"</option>");
                    }
                });
                layui.form.render("select");
                $('#w_edit_mongodb_upsertKey').val(data.mongodbInfo.jb_mongodb_upsertKey_w);
            }
        };

        /*监听当鼠标点击列名input框的时候弹出对应的文本区域*/
        $('#edit_r_column').on('focus',function () {
            $('.col-textarea').removeClass('layui-hide');
            $('#r_col_texta').val($('#edit_r_column').val())
        });
        $('#r_col-sure').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
            $('#edit_r_column').val($.trim($('#r_col_texta').val()));
        });
        $('#r_col-cancle').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
        });
        /*column*/
        $('#w-edit_column').on('focus',function () {
            $('.w-col-textarea').removeClass('layui-hide');
            $('#w-col_texta').val($('#w-edit_column').val())
        });
        $('#w-col-sure').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
            $('#w-edit_column').val($.trim($('#w-col_texta').val()));
        });
        $('#w-col-cancle').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击同步表名input框的时候弹出对应的文本区域*/
        $('#edit_r_table').on('focus',function () {
            $('.tab-textarea').removeClass('layui-hide');
            $('#r_tab_texta').val($('#edit_r_table').val())
        });
        $('#r-tab-sure').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
            $('#edit_r_table').val($.trim($('#r_tab_texta').val()));
        });
        $('#r-tab-cancle').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
        });
        /*table*/
        $('#w-edit_table').on('focus',function () {
            $('.w-tab-textarea').removeClass('layui-hide');
            $('#w-tab_texta').val($('#w-edit_table').val())
        });
        $('#w-tab-sure').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
            $('#w-edit_table').val($.trim($('#w-tab_texta').val()));
        });
        $('#w-tab-cancle').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
        });


        /*监听当鼠标点击URL地址input框的时候弹出对应的文本区域*/
        /*$('#edit_r_contaion').on('focus',function () {
            $('.cont-textarea').removeClass('layui-hide');
            $('#r_url_texta').val($('#edit_r_contaion').val())
        });*/
        /*$('#r-cont-sure').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
            $('#edit_r_contaion').val($.trim($('#r_url_texta').val()));
        });
        $('#r-cont-cancle').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
        });*/

        /*$('#w-edit_contaion').on('focus',function () {
            $('.w-cont-textarea').removeClass('layui-hide');
            $('#w-url_texta').val($('#w-edit_contaion').val())
        });*/
        $('#w-cont-sure').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
            $('#w-edit_contaion').val($.trim($('#w-url_texta').val()));
        });
        $('#w-cont-cancle').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击动态sqlinput框的时候弹出对应的文本区域*/
        $('#edit_r_sql').on('focus',function () {
            $('.sql-textarea').removeClass('layui-hide');
            $('#r_sql_texta').val($('#edit_r_sql').val())
        });
        $('#r-sql-sure').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
            /*var sql_str_inpt = $('#edit_r_sql').val();
            if(sql_str_inpt == ""){
                sql_str_inpt = $.trim($('#r_sql_texta').val());
            }else {
                sql_str_inpt += '&'+$.trim($('#r_sql_texta').val());
            }
            $('#edit_r_sql').val(sql_str_inpt);*/
            $('#edit_r_sql').val($.trim($('#r_sql_texta').val()));

        });
        $('#r-sql-cancle').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
        });
        /*session*/
        $('#w-edit_session').on('focus',function () {
            $('.w-session-textarea').removeClass('layui-hide');
            $('#w-session_texta').val($('#w-edit_session').val())
        });
        $('#w-session-sure').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
            $('#w-edit_session').val($.trim($('#w-session_texta').val()));
        });
        $('#w-session-cancle').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
        });

        /*presql*/
        $('#w-edit_preSql').on('focus',function () {
            $('.w-presql-textarea').removeClass('layui-hide');
            $('#w-preSql_texta').val($('#w-edit_preSql').val().replaceAll('&','\n'))
        });
        $('#w-preSql-sure').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
            $('#w-edit_preSql').val($.trim($('#w-preSql_texta').val().replaceAll('\n','&')));
        });
        $('#w-preSql-cancle').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
        });
        /*postsql*/
        $('#w-edit_postSql').on('focus',function () {
            $('.w-postSql-textarea').removeClass('layui-hide');
            $('#w-postSql_texta').val($('#w-edit_postSql').val().replaceAll('&','\n'))
        });
        $('#w-postSql-sure').on('click',function () {
            $('.w-postSql-textarea').addClass('layui-hide');
            $('#w-edit_postSql').val($.trim($('#w-postSql_texta').val().replaceAll('\n','&')));
        });
        $('#w-postSql-cancle').on('click',function () {
            $('.w-postSql-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击txtfile的读取列的input框的时候，弹出下面的新增选择框*/
        $('#edit_txtFile_column').on('focus',function () {
            $('.edit_col_txt').removeClass('layui-hide');
        });
        $('#edit_txtFile_column_sure').on('click',function () {
            if(flg){
                $('#edit_txtFile_column').val('');
                flg = !flg;
            }
            $('.edit_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#edit_txtFile_column1').val();
            if(key1 == "index"){
                key1 = $('#edit_txtFile_column1').val();
                value1 = parseInt($('#edit_txtFile_column2').val())
            }else {
                key1 = $('#edit_txtFile_column1').val();
                value1 = $('#edit_txtFile_column2').val();
            }
            key2 = $('#edit_txtFile_column3').val();
            value2 = $('#edit_txtFile_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "date"){
                var key3 = "format";
                obj[key3] = "yyyy.MM.dd";
            }
            var add_cloumn_txt_inpt = $('#edit_txtFile_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#edit_txtFile_column').val(add_cloumn_txt_inpt);
        });
        $('#edit_txtFile_column_cancle').on('click',function () {
            $('.edit_col_txt').addClass('layui-hide');
        });

        /*监听ftp:path路径地址*/
        $('#edit_ftp_path').on('focus',function () {
            $('.edit-ftp-path-textarea').removeClass('layui-hide');
            $('#edit_ftp_path_texta').val($('#edit_ftp_path').val().replaceAll(',','\n'))
        });
        $('#edit_ftp_path-sure').on('click',function () {
            $('.edit-ftp-path-textarea').addClass('layui-hide');
            $('#edit_ftp_path').val($.trim($('#edit_ftp_path_texta').val().replaceAll('\n',',')));
        });
        $('#edit_ftp_path-cancle').on('click',function () {
            $('.edit-ftp-path-textarea').addClass('layui-hide');
        });
        /*监听ftp:column*/
        $('#edit_ftp_column').on('focus',function () {
            $('.edit_ftp_col_txt').removeClass('layui-hide');
        });
        $('#edit_ftp_column_sure').on('click',function () {
            if(flg){
                $('#edit_ftp_column').val('');
                flg = !flg;
            }
            $('.edit_ftp_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#edit_ftp_column1').val();
            if(key1 == "index"){
                key1 = $('#edit_ftp_column1').val();
                value1 = parseInt($('#edit_ftp_column2').val())
            }else {
                key1 = $('#edit_ftp_column1').val();
                value1 = $('#edit_ftp_column2').val();
            }
            key2 = $('#edit_ftp_column3').val();
            value2 = $('#edit_ftp_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "date"){
                var key3 = "format";
                obj[key3] = "yyyy.MM.dd";
            }
            var add_cloumn_txt_inpt = $('#edit_ftp_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#edit_ftp_column').val(add_cloumn_txt_inpt);
        });
        $('#edit_ftp_column_cancle').on('click',function () {
            $('.edit_ftp_col_txt').addClass('layui-hide');
        });
        /*监听mongodb:column-读*/
        $('#edit_mongodb_column').on('focus',function () {
            $('.edit_mongodb_col_txt').removeClass('layui-hide');
            $('#edit_mongodb_column4').bind('input propertychange', function(){
                if($(this).val() == 'array' || $(this).val() == 'Array'){
                    $('#edit_mongodb_col_key3').removeClass('layui-hide');
                }else {
                    $('#edit_mongodb_col_key3').addClass('layui-hide');
                }
            })
        });
        $('#edit_mongodb_column_sure').on('click',function () {
            if(flg_r){
                $('#edit_mongodb_column').val('');
                flg_r = !flg_r;
            }
            $('.edit_mongodb_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var key3 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#edit_mongodb_column1').val();
            value1 = $('#edit_mongodb_column2').val();
            key2 = $('#edit_mongodb_column3').val();
            value2 = $('#edit_mongodb_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "Array" || value2 == "array"){
                key3 = $('#edit_mongodb_column5').val();
                obj[key3] = $('#edit_mongodb_column6').val();
            }
            var add_cloumn_txt_inpt = $('#edit_mongodb_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#edit_mongodb_column').val(add_cloumn_txt_inpt);
        });
        $('#edit_mongodb_column_cancle').on('click',function () {
            $('.edit_mongodb_col_txt').addClass('layui-hide');
        });
        /*监听mongodb:column-写*/
        $('#w_edit_mongodb_column').on('focus',function () {
            $('.w_edit_mongodb_col_txt').removeClass('layui-hide');
            $('#w_edit_mongodb_column4').bind('input propertychange', function(){
                if($(this).val() == 'array' || $(this).val() == 'Array'){
                    $('#w_edit_mongodb_col_key3').removeClass('layui-hide');
                }else {
                    $('#w_edit_mongodb_col_key3').addClass('layui-hide');
                }
            })
        });
        $('#w_edit_mongodb_column_sure').on('click',function () {
            if(flg_w){
                $('#w_edit_mongodb_column').val('');
                flg_w = !flg_w;
            }
            $('.w_edit_mongodb_col_txt').addClass('layui-hide');
            /*将获取的数据封装成json对象的形式添加到input框中*/
            var key1 = "";
            var key2 = "";
            var key3 = "";
            var value1 = "";
            var value2 = "";
            var obj = {};
            key1 = $('#w_edit_mongodb_column1').val();
            value1 = $('#w_edit_mongodb_column2').val();
            key2 = $('#w_edit_mongodb_column3').val();
            value2 = $('#w_edit_mongodb_column4').val();
            obj[key1] = value1;
            obj[key2] = value2;
            if(value2 == "Array" || value2 == "array"){
                key3 = $('#w_edit_mongodb_column5').val();
                obj[key3] = $('#w_edit_mongodb_column6').val();
            }
            var add_cloumn_txt_inpt = $('#w_edit_mongodb_column').val();
            if(add_cloumn_txt_inpt == ""){
                add_cloumn_txt_inpt = JSON.stringify(obj);
            }else {
                add_cloumn_txt_inpt += '&'+JSON.stringify(obj);
            }
            $('#w_edit_mongodb_column').val(add_cloumn_txt_inpt);
        });
        $('#w_edit_mongodb_column_cancle').on('click',function () {
            $('.w_edit_mongodb_col_txt').addClass('layui-hide');
        });

    })
});