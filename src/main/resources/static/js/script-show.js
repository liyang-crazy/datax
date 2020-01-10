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
        }

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
            }else if(data.r_db_type == 7){
                $('.mysqlAndOracle').addClass('layui-hide');
                $('.cassandra').removeClass('layui-hide');
            }else {
                $('.mysqlAndOracle').removeClass('layui-hide');
                $('.txtFile').addClass('layui-hide');
                if(data.r_jb_tbgs == 1){
                    $('#sc-show-sql').addClass('layui-hide');
                    $('#sc-show-col').removeClass('layui-hide');
                    $('#sc-show-tab').removeClass('layui-hide');
                    $('#sc-show-split').removeClass('layui-hide');
                }
                if(data.r_jb_tbgs == 2){
                    $('#sc-show-col').addClass('layui-hide');
                    $('#sc-show-tab').addClass('layui-hide');
                    $('#sc-show-split').addClass('layui-hide');
                    $('#sc-show-sql').removeClass('layui-hide');
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
            }else if(data.w_db_type == 7){
                $('.w_mysqlAndOracle').addClass('layui-hide');
                $('.w_cassandra').removeClass('layui-hide');
            }else {
                $('.w_mysqlAndOracle').removeClass('layui-hide');
                $('.w_txtFile').addClass('layui-hide');
                if(data.w_db_type == 1){
                    $('#w-sc-show-session').removeClass('layui-hide');
                    $('#w_show_db_mode_all').removeClass('layui-hide');
                }
                if(data.w_db_type == 2){
                    $('#w-sc-show-session').addClass('layui-hide');
                    $('#w_show_db_mode_all').addClass('layui-hide');
                }
                if(data.w_db_type == 4){
                    $('#w-sc-show-postSql').removeClass('layui-hide');
                    $('#w-sc-show-session').addClass('layui-hide');
                    $('#w_show_db_mode_all').addClass('layui-hide');
                }
            }
            $('#sc-show-jb_name').val(data.jb_name);
            $("#show_jb_group").append("<option value="+data.jb_group_id+" selected>"+data.jb_group_name+"</option>");
            layui.form.render("select");
            $('#show_settin_channel').val(data.jb_channel);
            $('#show_setting_byte').val(data.jb_byte);
            $('#show_setting_record').val(data.jb_record);
            $('#show_setting_percentage').val(data.jb_percentage);
            //$('#sc-show-r-db-url').val(data.r_db_url);
            $('#sc-show-r-db-username').val(data.r_db_username);
            $('#sc-show-r-db-pasw').val(data.r_db_password);
            $('#show_r_column').val(data.r_jb_column);
            $('#show_r_table').val(data.r_jb_table);
            $('#show_r_contaion').val(data.r_jb_url.replaceAll(',','\n'));
            $('#sc-show-r-splitPk').val(data.r_jb_splitPk);
            $('#show_r_sql').val(data.r_jb_sql);
            //$('#w-sc-show-db-url').val(data.w_db_url);
            $('#w-sc-show-db-username').val(data.w_db_username);
            $('#w-sc-show-db-pasw').val(data.w_db_password);
            $("#w_show_db_mode").append("<option value="+data.w_jb_mode+" selected>"+data.w_jb_mode+"</option>");
            layui.form.render("select");
            $('#w-show_column').val(data.w_jb_column);
            $('#w-show_table').val(data.w_jb_table);
            $('#w-show_contaion').val(data.w_jb_url);
            $('#w-show_session').val(data.w_jb_session);
            $('#w-show_preSql').val(data.w_jb_presql);
            $('#w-show_postSql').val(data.w_jb_postsql);
            $('#sc-show-jb_bz').val(data.jb_bz);
            /*给txtfile表单赋值*/
            if(data.txtFileInfo != null){
                $('#show_path').val(data.txtFileInfo.jb_r_txtFile_path);
                $('#show_encoding').val(data.txtFileInfo.jb_r_txtFile_en);
                $('#show_fgf').val(data.txtFileInfo.jb_r_txtFile_fgf);
                $("#show_ys").append("<option value="+data.txtFileInfo.jb_r_txtFile_ysgs+" selected>"+data.txtFileInfo.jb_r_txtFile_ysgs+"</option>");
                layui.form.render("select");
                $("#show_csv").append("<option value="+data.txtFileInfo.jb_r_txtFile_csv_h+" selected>"+data.txtFileInfo.jb_r_txtFile_csv_h+"</option>");
                layui.form.render("select");
                $('#show_txtFile_column').val(data.txtFileInfo.jb_r_txtFile_column);
                $('#w_show_path').val(data.txtFileInfo.jb_w_txtFile_path);
                $('#w_show_fileName').val(data.txtFileInfo.jb_w_txtFile_filename);
                $("#w_show_wmode").append("<option value="+data.txtFileInfo.jb_w_txtfile_ms+" selected>"+data.txtFileInfo.jb_w_txtfile_ms+"</option>");
                layui.form.render("select");
                $("#w_show_ys").append("<option value="+data.txtFileInfo.jb_w_txtfile_ysgs+" selected>"+data.txtFileInfo.jb_w_txtfile_ysgs+"</option>");
                layui.form.render("select");
                $('#w_show_fgf').val(data.txtFileInfo.jb_w_txtfile_fgf);
                $('#w_show_encoding').val(data.txtFileInfo.jb_w_txtfile_en);
                $('#w_show_date').val(data.txtFileInfo.jb_w_txtfile_dateF);
                $('#w_show_fileFormat').val(data.txtFileInfo.jb_w_txtfile_fileF);
                $('#w_show_header').val(data.txtFileInfo.jb_w_txtfile_header);
            }
            /*给ftp赋值*/
            if(data.ftpInfo != null){
                $('#show_ftp_username').val(data.ftpInfo.jb_ftp_username_r);
                $('#show_ftp_pasw').val(data.ftpInfo.jb_ftp_password_r);
                $("#show_ftp_protocol").append("<option value="+data.ftpInfo.jb_ftp_protocol_r+" selected>"+data.ftpInfo.jb_ftp_protocol_r+"</option>");
                layui.form.render("select");
                $('#show_ftp_host').val(data.ftpInfo.jb_ftp_host_r);
                $('#show_ftp_port').val(data.ftpInfo.jb_ftp_port_r);
                $('#show_ftp_path').val(data.ftpInfo.jb_ftp_path_r);
                $('#show_ftp_column').val(data.ftpInfo.jb_ftp_column_r);
                $('#show_ftp_en').val(data.ftpInfo.jb_ftp_en_r);
                $('#show_ftp_fgf').val(data.ftpInfo.jb_ftp_fgf_r);
                $('#show_ftp_timeout').val(data.ftpInfo.jb_ftp_timeout_r);
                if(data.ftpInfo.jb_ftp_protocol_r == 'ftp'){
                    $('#show_ftp_cp_all').removeClass('layui-hide');
                    $("#show_ftp_cp").append("<option value="+data.ftpInfo.jb_ftp_cp_r+" selected>"+data.ftpInfo.jb_ftp_cp_r+"</option>");
                    layui.form.render("select");
                }
                $("#show_ftp_ysgs").append("<option value="+data.ftpInfo.jb_ftp_ysgs_r+" selected>"+data.ftpInfo.jb_ftp_ysgs_r+"</option>");
                layui.form.render("select");
                $("#show_ftp_csvH").append("<option value="+data.ftpInfo.jb_ftp_csvH_r+" selected>"+data.ftpInfo.jb_ftp_csvH_r+"</option>");
                layui.form.render("select");
                $('#show_ftp_maxT').val(data.ftpInfo.jb_ftp_maxT_r);
                $('#w_show_ftp_username').val(data.ftpInfo.jb_ftp_username_w);
                $('#w_show_ftp_pasw').val(data.ftpInfo.jb_ftp_password_w);
                $("#w_show_ftp_protocol").append("<option value="+data.ftpInfo.jb_ftp_protocol_w+" selected>"+data.ftpInfo.jb_ftp_protocol_w+"</option>");
                layui.form.render("select");
                $('#w_show_ftp_host').val(data.ftpInfo.jb_ftp_host_w);
                $('#w_show_ftp_port').val(data.ftpInfo.jb_ftp_port_w);
                $('#w_show_ftp_timeout').val(data.ftpInfo.jb_ftp_timeout_w);
                if(data.ftpInfo.jb_ftp_protocol_w == 'ftp'){
                    $('#w_show_ftp_cp_all').removeClass('layui-hide');
                    $("#w_show_ftp_cp").append("<option value="+data.ftpInfo.jb_ftp_cp_w+" selected>"+data.ftpInfo.jb_ftp_cp_w+"</option>");
                    layui.form.render("select");
                }
                $('#w_show_ftp_path').val(data.ftpInfo.jb_ftp_path_w);
                $('#w_show_ftp_fileName').val(data.ftpInfo.jb_ftp_fileName_w);
                $("#w_show_ftp_ms").append("<option value="+data.ftpInfo.jb_ftp_ms_w+" selected>"+data.ftpInfo.jb_ftp_ms_w+"</option>");
                layui.form.render("select");
                $('#w_show_ftp_fgf').val(data.ftpInfo.jb_ftp_fgf_w);
                $("#w_show_ftp_ysgs").append("<option value="+data.ftpInfo.jb_ftp_ysgs_w+" selected>"+data.ftpInfo.jb_ftp_ysgs_w+"</option>");
                layui.form.render("select");
                $('#w_show_ftp_en').val(data.ftpInfo.jb_ftp_en_w);
                $('#w_show_ftp_dateF').val(data.ftpInfo.jb_ftp_dateF_w);
                $('#w_show_ftp_fileF').val(data.ftpInfo.jb_ftp_fileF_w);
                $('#w_show_ftp_header').val(data.ftpInfo.jb_ftp_header_w);
            }
            /*给mongodb赋值*/
            if(data.mongodbInfo != null){
                $('#show_mongodb_address').val(data.mongodbInfo.jb_mongodb_address_r.replaceAll(',','\n'));
                $('#show_mongodb_username').val(data.mongodbInfo.jb_mongodb_username_r);
                $('#show_mongodb_pasw').val(data.mongodbInfo.jb_mongodb_userpasw_r);
                $('#show_mongodb_dbname').val(data.mongodbInfo.jb_mongodb_dbname_r);
                $('#show_mongodb_collName').val(data.mongodbInfo.jb_mongodb_collname_r);
                $('#show_mongodb_column').val(data.mongodbInfo.jb_mongodb_column_r);
                $('#w_show_mongodb_address').val(data.mongodbInfo.jb_mongodb_address_w.replaceAll(',','\n'));
                $('#w_show_mongodb_username').val(data.mongodbInfo.jb_mongodb_username_w);
                $('#w_show_mongodb_pasw').val(data.mongodbInfo.jb_mongodb_userpasw_w);
                $('#w_show_mongodb_dbname').val(data.mongodbInfo.jb_mongodb_dbname_w);
                $('#w_show_mongodb_collName').val(data.mongodbInfo.jb_mongodb_collname_w);
                $('#w_show_mongodb_column').val(data.mongodbInfo.jb_mongodb_column_w);
                $("#w_show_mongodb_isUpsert").append("<option value="+data.mongodbInfo.jb_mongodb_isupsert_w+" selected>"+data.mongodbInfo.jb_mongodb_isupsert_w+"</option>");
                layui.form.render("select");
                $('#w_show_mongodb_upsertKey').val(data.mongodbInfo.jb_mongodb_upsertKey_w);
            }
            /*给cassandra赋值*/
            if(data.cassandraInfo != null){
                $('#show_cassandra_host').val(data.cassandraInfo.jb_cassandra_host_r);
                $('#show_cassandra_port').val(data.cassandraInfo.jb_cassandra_port_r);
                $('#show_cassandra_username').val(data.cassandraInfo.jb_cassandra_username_r);
                $('#show_cassandra_pasw').val(data.cassandraInfo.jb_cassandra_pasw_r);
                $("#show_cassandra_useSSL").append("<option value="+data.cassandraInfo.jb_cassandra_useSSL_r+" selected>"+data.cassandraInfo.jb_cassandra_useSSL_r+"</option>");
                layui.form.render("select");
                $('#show_cassandra_keyspace').val(data.cassandraInfo.jb_cassandra_keyspace_r);
                $('#show_cassandra_table').val(data.cassandraInfo.jb_cassandra_table_r);
                $('#show_cassandra_column').val(data.cassandraInfo.jb_cassandra_column_r);
                $('#show_cassandra_where').val(data.cassandraInfo.jb_cassandra_where_r);
                $("#show_cassandra_allowF").append("<option value="+data.cassandraInfo.jb_cassandra_allowF_r+" selected>"+data.cassandraInfo.jb_cassandra_allowF_r+"</option>");
                layui.form.render("select");
                $("#show_cassandra_conL").append("<option value="+data.cassandraInfo.jb_cassandra_conL_r+" selected>"+data.cassandraInfo.jb_cassandra_conL_r+"</option>");
                layui.form.render("select");
                $('#w_show_cassandra_host').val(data.cassandraInfo.jb_cassandra_host_w);
                $('#w_show_cassandra_port').val(data.cassandraInfo.jb_cassandra_port_w);
                $('#w_show_cassandra_username').val(data.cassandraInfo.jb_cassandra_username_w);
                $('#w_show_cassandra_pasw').val(data.cassandraInfo.jb_cassandra_pasw_w);
                $("#w_show_cassandra_useSSL").append("<option value="+data.cassandraInfo.jb_cassandra_useSSL_w+" selected>"+data.cassandraInfo.jb_cassandra_useSSL_w+"</option>");
                layui.form.render("select");
                $('#w_show_cassandra_conP').val(data.cassandraInfo.jb_cassandra_conP_w);
                $('#w_show_cassandra_maxC').val(data.cassandraInfo.jb_cassandra_maxC_w);
                $('#w_show_cassandra_keyspace').val(data.cassandraInfo.jb_cassandra_keyspace_w);
                $('#w_show_cassandra_table').val(data.cassandraInfo.jb_cassandra_table_w);
                $('#w_show_cassandra_batchSize').val(data.cassandraInfo.jb_cassandra_batchSize_w);
                $('#w_show_cassandra_column').val(data.cassandraInfo.jb_cassandra_column_w);
                $("#w_show_cassandra_conL").append("<option value="+data.cassandraInfo.jb_cassandra_conL_w+" selected>"+data.cassandraInfo.jb_cassandra_conL_w+"</option>");
                layui.form.render("select");
            }
        };


        /*监听当鼠标点击列名input框的时候弹出对应的文本区域*/
        $('#show_r_column').on('focus',function () {
            $('.col-textarea').removeClass('layui-hide');
            $('#r_col_texta').val($('#show_r_column').val())
        });
        $('#col-sure').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
        });
        $('#col-cancle').on('click',function () {
            $('.col-textarea').addClass('layui-hide');
        });

        $('#w-show_column').on('focus',function () {
            $('.w-col-textarea').removeClass('layui-hide');
            $('#w-col_texta').val($('#w-show_column').val())
        });
        $('#w-col-sure').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
        });
        $('#w-col-cancle').on('click',function () {
            $('.w-col-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击同步表名input框的时候弹出对应的文本区域*/
        $('#show_r_table').on('focus',function () {
            $('.tab-textarea').removeClass('layui-hide');
            $('#r_tab_texta').val($('#show_r_table').val())
        });
        $('#tab-sure').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
        });
        $('#tab-cancle').on('click',function () {
            $('.tab-textarea').addClass('layui-hide');
        });

        $('#w-show_table').on('focus',function () {
            $('.w-tab-textarea').removeClass('layui-hide');
            $('#w-tab_texta').val($('#w-show_table').val())
        });
        $('#w-tab-sure').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
        });
        $('#w-tab-cancle').on('click',function () {
            $('.w-tab-textarea').addClass('layui-hide');
        });


        /*监听当鼠标点击URL地址input框的时候弹出对应的文本区域*/
        $('#show_r_contaion').on('focus',function () {
            $('.cont-textarea').removeClass('layui-hide');
            $('#r_url_texta').val($('#show_r_contaion').val())
        });
        $('#cont-sure').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
        });
        $('#cont-cancle').on('click',function () {
            $('.cont-textarea').addClass('layui-hide');
        });

        $('#w-show_contaion').on('focus',function () {
            $('.w-cont-textarea').removeClass('layui-hide');
            $('#w-url_texta').val($('#w-show_contaion').val())
        });
        $('#w-cont-sure').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
        });
        $('#w-cont-cancle').on('click',function () {
            $('.w-cont-textarea').addClass('layui-hide');
        });

        /*监听当鼠标点击动态sqlinput框的时候弹出对应的文本区域*/
        $('#show_r_sql').on('focus',function () {
            $('.sql-textarea').removeClass('layui-hide');
            $('#r_sql_texta').val($('#show_r_sql').val())
        });
        $('#sql-sure').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
        });
        $('#sql-cancle').on('click',function () {
            $('.sql-textarea').addClass('layui-hide');
        });
        /*session*/
        $('#w-show_session').on('focus',function () {
            $('.w-session-textarea').removeClass('layui-hide');
            $('#w-session_texta').val($('#w-show_session').val())
        });
        $('#w-session-sure').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
        });
        $('#w-session-cancle').on('click',function () {
            $('.w-session-textarea').addClass('layui-hide');
        });
        /*presql*/
        $('#w-show_preSql').on('focus',function () {
            $('.w-presql-textarea').removeClass('layui-hide');
            $('#w-preSql_texta').val($('#w-show_preSql').val().replaceAll('&','\n'));
        });
        $('#w-preSql-sure').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
        });
        $('#w-preSql-cancle').on('click',function () {
            $('.w-presql-textarea').addClass('layui-hide');
        });
        /*postsql*/
        $('#w-show_postSql').on('focus',function () {
            $('.w-postSql-textarea').removeClass('layui-hide');
            $('#w-postSql_texta').val($('#w-show_postSql').val().replaceAll('&','\n'));
        });
        $('#w-postSql-sure').on('click',function () {
            $('.w-postSql-textarea').addClass('layui-hide');
        });
        $('#w-postSql-cancle').on('click',function () {
            $('.w-postSql-textarea').addClass('layui-hide');
        });
        /*监听：ftp-path*/
        $('#show_ftp_path').on('focus',function () {
            $('.show-ftp-path-textarea').removeClass('layui-hide');
            $('#show_ftp_path_texta').val($('#show_ftp_path').val().replaceAll(',','\n'));
        });
        $('#show_ftp_path-sure').on('click',function () {
            $('.show-ftp-path-textarea').addClass('layui-hide');
        });
        $('#show_ftp_path-cancle').on('click',function () {
            $('.show-ftp-path-textarea').addClass('layui-hide');
        });

    })
});