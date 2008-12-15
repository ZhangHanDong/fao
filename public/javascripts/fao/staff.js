/* 
<div id="addStaffDialog">
<div class="hd">请输入人员信息：</div>
<div class="bd">
<form method="POST" action="assets/post.php">
        <input type="hidden" name="id" value="" id="id_sf_dlg" />
	<label for="name">名字：</label><input type="textbox" name="name" id="name_sf_dlg" />
        <label for="danwei">单位：</label><input type="textbox" name="danwei" id="danwei_sf_dlg"/>
        <label for="zhiwu">职务：</label><input type="textbox" name="zhiwu" id="zhiwu_sf_dlg"/>
        <label for="hzhaoma">护照：</label><input type="textbox" name="hzhaoma" id="hzhaoma_sf_dlg"/>
        <label for="hzghriqi">归还日期：</label><input type="textbox" name="hzghriqi" id="hzghriqi_sf_dlg"/>
        <label for="pyname">名字拼音：</label><input type="textbox" name="pyname" id="pyname_sf_dlg"/>
        <label for="spyname">名字短拼音：</label><input type="textbox" name="spyname" id="spyname_sf_dlg"/>
        <label for="birthday">生日（年龄）：</label><input type="textbox" name="birthday" id="birthday_sf_dlg"/>
	<div class="clear"></div>
	<label for="sex">性别：</label><input type="checkbox" name="sex" value="1" id="sex_sf_dlg"/> 女
	<div class="clear"></div>
	<label for="note">备注：</label><textarea name="note" id="note_sf_dlg"></textarea>
	<div class="clear"></div>
</form>
</div>
</div>
 */
try{
fao.classes.Staff =  function(data){
        if(!data.id){
            var uuid =new UUID();
            this.id = uuid.id.replace(/-/g,"").toLowerCase();
        }else{
            this.id = data.id;
        }
        this.name = data.name;
        this.danwei = data.danwei;
        this.zhiwu = data.zhiwu;
        this.hzhaoma = data.hzhaoma;
        this.hzfzriqi = fao.utils.datestr2milliseconds(data.hzfzriqi);
        this.hzyxq = fao.utils.datestr2milliseconds(data.hzyxq);
        this.hzghriqi = fao.utils.datestr2milliseconds(data.hzghriqi);
        this.pyname = fao.utils.ch2py.find_pystr(this.name)[0].join(",");
        this.spyname = fao.utils.ch2py.find_pystr(this.name)[1].join(",");
        this.sex = (data.sex == false ? 1 : 0);
        this.sync_state = 'new';
        this.birthday = fao.utils.datestr2milliseconds(data.birthday);
        this.note = data.note;
        var curTime = new Date().getTime();
        this.save = function(){
            fao.variables.db.execute("insert into staffs " +
                " (id,userhash,name,danwei,zhiwu,hzhaoma,hzfzriqi,hzyxq,hzghriqi,pyname,spyname,sex,birthday,note,sync_state,created_at,updated_at) " +
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[this.id,fao.variables.userhash,this.name,this.danwei,this.zhiwu,this.hzhaoma,this.hzfzriqi,this.hzyxq,this.hzghriqi,this.pyname,this.spyname,this.sex,this.birthday,this.note,this.sync_state,curTime,curTime]);
        };
        this.update = function(){
            fao.variables.db.execute("update staffs set" +
                " name = ?,danwei =?,zhiwu=?,hzhaoma=?,hzfzriqi=?,hzyxq=?,hzghriqi=?,pyname=?,spyname =?,sex=?,birthday=?,note=?,sync_state=?,updated_at=? where id = ?",
            [this.name,this.danwei,this.zhiwu,this.hzhaoma,this.hzfzriqi,this.hzyxq,this.hzghriqi,this.pyname,this.spyname,this.sex,this.birthday,this.note,'changed',curTime,this.id]);
        };
      };


fao.classes.DialogStaff = function() {
	// Define various event handlers for Dialog
        // this is a button handler,wheater validation passed or not,it will be called any way.
        // so we must set a flag to refection the validate results.
        this.validate_pass = false;

	var handleSubmit = function() {
          this.submit();
          if(fao.variables.dialog_staff.validate_pass){
            this.hide();
          }
//            submiting is after validating
//            if validate failure,this method will still be called.
//            alert("submit");
	};

        var handleAndHandle = function(){
          this.submit();
          if(fao.variables.dialog_staff.validate_pass){
            fao.variables.dialog_staff.clearData();
          }
        };

	var handleCancel = function() {
		this.cancel();
	};
// if dialog's  postmethod is none,these method will not be called.
	var handleSuccess = function(o) {
            alert("handle success");
	};
	var handleFailure = function(o) {
		alert("Submission failed: " + o.status);
	};

        this.clearData = function(){
            try{
              Dom.get("id_sf_dlg").value = "";
              Dom.get("name_sf_dlg").value = "";
              Dom.get("danwei_sf_dlg").value = "";
              Dom.get("zhiwu_sf_dlg").value = "";
              Dom.get("hzhaoma_sf_dlg").value = "";
              Dom.get("hzfzriqi_sf_dlg").value = "";
              Dom.get("hzyxq_sf_dlg").value = "";
              Dom.get("hzghriqi_sf_dlg").value = "";
//              Dom.get("pyname_sf_dlg").value = "";
//              Dom.get("spyname_sf_dlg").value = "";
              var birthday = "";
              Dom.get("birthday_sf_dlg").value = "";
//              alert(oData.birthday instanceof Date);
              Dom.get("sex_sf_dlg").checked = false;
              Dom.get("note_sf_dlg").value = "";
            } catch(e){
                alert(e.message);
            }
        };

        this.setData = function(oData){
            try{
              Dom.get("id_sf_dlg").value = oData.id;
              Dom.get("name_sf_dlg").value = oData.name;
              Dom.get("danwei_sf_dlg").value = oData.danwei;
              Dom.get("zhiwu_sf_dlg").value = oData.zhiwu;
              Dom.get("hzhaoma_sf_dlg").value = oData.hzhaoma;
              Dom.get("hzfzriqi_sf_dlg").value = fao.utils.date2str(oData.hzfzriqi);
              Dom.get("hzyxq_sf_dlg").value = fao.utils.date2str(oData.hzyxq);
              Dom.get("hzghriqi_sf_dlg").value = fao.utils.date2str(oData.hzghriqi);
//              Dom.get("pyname_sf_dlg").value = oData.pyname;
//              Dom.get("spyname_sf_dlg").value = oData.spyname;
              var birthday = oData.birthday;
              Dom.get("birthday_sf_dlg").value =  fao.utils.date2str(oData.birthday);
//              alert(oData.birthday instanceof Date);
              Dom.get("sex_sf_dlg").checked = oData.sex == 1 ? false : true;
              Dom.get("note_sf_dlg").value = oData.note;
            }
            catch(e){
                alert("from staff.js" + e.message);
            }
        };

	// Instantiate the Dialog
	this.dialog = new YAHOO.widget.Dialog("addStaffDialog",
							{ width : "30em",
                                                          zIndex : 10,
							  fixedcenter : true,
							  visible : false,
							  constraintoviewport : true,
                                                          postmethod: "none",
                                                          hideaftersubmit : false,
							  buttons : [ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel },
								      { text:"添加继续", handler:handleAndHandle} ]
							});
        this.setButtons = function(){
            this.dialog.cfg.setProperty("buttons",[ { text:"编辑", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel } ]);
        }

	// Validate the entries in the form to require that both first and last name are entered
	this.dialog.validate = function() {
             fao.variables.dialog_staff.validate_pass = false;
            try{
		var data = this.getData();
		if (data.name == "") {
			alert("名字是必须填写的");
			return false;
		}
//                var ymd = /\d{4}[^\d]\d{1,2}[^\d]\d{1,2}/;
//                var result = data.birthday.match(ymd);
//                if(!result){
//                  result = data.birthday.match(/\d{8}/);
//                }
//                if(!result){
//                    alert("日期的格式是：2008-08-08 或者20080808");
//                    return false;
//                }else{
//                    data.birthday = result[0];
//                }

                var staff = new fao.classes.Staff(data);

                if(data.id)
                    staff.update();
                else
                     staff.save();

//                 fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
                 fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.dsRequestCallback);
                 fao.variables.dialog_staff.validate_pass = true;
                 return true;
            }
            catch(e){
                alert(e.message);
                return false;
            }
	};

	// Wire up the success and failure handlers
	this.dialog.callback = { success: handleSuccess,
						     failure: handleFailure };

	// Render the Dialog
	this.dialog.render();
//        alert(fao.addStaffDialog.cfg.getProperty("postmethod"));
        var addStaffBtnClick = function(){
            Dom.get("id_sf_dlg").value = "";
            this.dialog.cfg.setProperty("buttons",[ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel },{ text:"添加继续", handler:handleAndHandle}]);
            this.dialog.show();
        };
	Event.addListener("addStaffBtn", "click", addStaffBtnClick, this, true);
//	Event.addListener("hide", "click", fao.addStaffDialog.hide, fao.addStaffDialog, true);
};


  fao.classes.StaffsDataTable = function(){
    this.datasource = null;
    this.datatable = null;
    this.paginator = new YAHOO.widget.Paginator({rowsPerPage:4});

//    this.initializeTable = function( sRequest , oResponse , oPayload ){
//        this.datatable.onDataReturnInitializeTable(sRequest , oResponse , oPayload);
//        var fte = this.datatable.getFirstTrEl();
//        while(fte){
//            new YAHOO.util.DDProxy(fte);
//            fte = this.datatable.getNextTrEl(fte);
//        }
//    }
    var columnDefs = [
        {key:"name",label:"名字",sortable:true},
        {key:"danwei",label:"单位"},
        {key:"zhiwu",label:"职务"},
        {key:"hzhaoma",label:"护照号码"},
        {key:"hzfzriqi",label:"发照日期",formatter:fao.utils.formatDate},
        {key:"hzyxq",label:"护照有效期",formatter:fao.utils.formatDate},
        {key:"hzghriqi",label:"护照归还日期",formatter:fao.utils.formatDate},
//        {key:"pyname",label:"名字拼音"},
//        {key:"spyname",label:"名字首拼音"},
        {key:"age",label:"年龄"},
        {key:"sex",label:"性别",formatter:function(elCell, oRecord, oColumn, oData){
                                                    if(oData == 1){
                                                      elCell.innerHTML = "男";
                                                    }else{
                                                      elCell.innerHTML = "女";
                                                    }
                                                    }
        },
        {key:"birthday",label:"出生日期",formatter:fao.utils.formatDate},
        {key:"note",label:"备注"},
        {key:"cfls",label:"出访历史",formatter:"button"},
        {key:"sc",label:"删除",formatter:"button"}
    ];

    var dsfunc= function(condi){
      var offset = condi ? (condi.offset || 0) : 0;
      var rowspp = condi ? (condi.rowspp || 4) : 4;
      var phrase = fao.doms.ac_input.value;
      var sqlstmts = fao.utils.sqldsl("staffs",phrase);
//      var sqlstmt = 'select * from staffs where (name like ? or pyname like ? or spyname like ?) and sync_state != ? order by created_at desc limit ? offset ?';
      var rs = fao.variables.db.execute(sqlstmts[0],[rowspp,offset]);
      //var rs = fao.variables.db.execute(sqlstmt,[phrase,phrase,phrase,'deleted',rowspp,offset]);
      var results = {staffs:[]};
      while(rs.isValidRow()) {
        results.staffs.push({
            id:rs.fieldByName("id"),
            name:rs.fieldByName("name"),
            danwei:rs.fieldByName("danwei"),
            zhiwu:rs.fieldByName("zhiwu"),
            hzhaoma:rs.fieldByName("hzhaoma"),
            hzfzriqi:fao.utils.milliseconds2date(rs.fieldByName("hzfzriqi")),
            hzyxq:fao.utils.milliseconds2date(rs.fieldByName("hzyxq")),
            hzghriqi:fao.utils.milliseconds2date(rs.fieldByName("hzghriqi")),
            pyname:rs.fieldByName("pyname"),
            spyname:rs.fieldByName("spyname"),
            sex:rs.fieldByName("sex"),
            birthday:fao.utils.milliseconds2date(rs.fieldByName("birthday")),
            note:rs.fieldByName("note"),
            sync_state:rs.fieldByName("sync_state"),
            cfls:"出访历史",
            sc:"删除",
            age : fao.utils.milliseconds2age(rs.fieldByName("birthday"))

        });
        rs.next();
      }
      rs.close();
      var count = 0;
      rs = fao.variables.db.execute(sqlstmts[1]);
      if(rs.isValidRow())count = rs.field(0);
      rs.close();
      results.totalRecords = count;
//      this.mypaginator.setTotalRecords(count);
      return results;
    };

    this.datasource = new YAHOO.util.FunctionDataSource(dsfunc);
//    this.datasource.mypaginator = this.paginator;
    this.datasource.responseType = YAHOO.util.FunctionDataSource.TYPE_JSON;
    this.datasource.responseSchema = {
        resultsList : 'staffs',
        fields: [
            "id",
            "name",
            "danwei",
            "zhiwu",
            "hzhaoma",
            "hzfzriqi",
            "hzyxq",
            "hzghriqi",
            "pyname",
            "spyname",
            "sex",
            "birthday",
            "note",
            "age",
            "cfls",
            "sc",
            "sync_state"
        ],
        metaFields :{totalRecords:"totalRecords"}
    };

    var buildQueryString = function(state,dt){
//        alert(fao.variables.staffs_datatable.paginator.getState().page);
//        alert(state.currentPage);
        var offset = state.pagination.recordOffset;
        var rowspp = state.pagination.rowsPerPage;
        return {offset:offset,rowspp:rowspp};
    };
    var dataTableConfig = {
//        initialLoad: {request:'',argument:"12345"},
        initialLoad: false,
        dynamicData:true,
        paginator : this.paginator,
        generateRequest : buildQueryString,
        caption: fao.doms.ac_input.value ? "人员姓名中 '" + fao.doms.ac_input.value + "' 的人员" : "所有人员列表"
//        paginationEventHandler : YAHOO.widget.DataTable.handleDataSourcePagination
//            paginationEventHandler : YAHOO.widget.DataTable.handleSimplePagination
    };

    this.datatable = new YAHOO.widget.DataTable("staffDataTable", columnDefs,
        this.datasource, dataTableConfig);

    var dsCallbackfn = function(sRequest,oResponse,oPayload){
      fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable(sRequest,oResponse,oPayload);
    };

    this.dsRequestCallback = {
        success : dsCallbackfn, 
        failure : dsCallbackfn,
        scope : this.datatable
    };

    this.datatable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
            if(!oPayload){
              oPayload = this.get("paginator").getState();
            }
            oPayload.totalRecords = oResponse.meta.totalRecords;
            return oPayload;
        };
//      this.datatable.doBeforeLoadData = function(sRequest, oResponse, oPayload) {
//          // When response returns, oPayload is "12345"
//          // and available in the doBeforeLoadData customizable method
//          alert(oPayload);
//          return true;
//      };

//    this.datatable.set("selectionMode","single");
//    this.datatable.selectRow(this.datatable.getTrEl(0));

    var onRowMouseDown = function(oArgs){
        var targetRow = oArgs.target;
        var dd2 = new YAHOO.util.DDProxy(this.getTrEl(targetRow));
        targetRow.handleMouseDown(oArgs.event);
//        alert("ya");
    }

//    var onRender = function(oArgs){
//        alert("ya!");
//    }
//    //context is datatable self.
    var onRowDblClick = function(oArgs){
//        alert("dbl");
        try{
          var targetRow = oArgs.target;
          var targetRecordData = this.getRecord(targetRow).getData();
//          alert(targetRecordData.birthday);
          fao.variables.dialog_staff.setData(targetRecordData);
          fao.variables.dialog_staff.setButtons();
//          var buttons = fao.variables.dialog_staff.dialog.cfg.setProperty("buttons",
//      [{ text:"添加", handler:handleSubmit, isDefault:true }, {text:"取消", handler:handleCancel }]);

          fao.variables.dialog_staff.dialog.show();
        }catch(e){
            alert(e.message);
        }
    }
    //context is datatable self.
    var onRowClick = function(oArgs){
        this.onEventSelectRow(oArgs);
        var targetRow = oArgs.target;
        var targetRecordData = this.getRecord(targetRow).getData();
        if(targetRow.isDD){
//            alert("already dd");
        }
        else{
            var ddRow = new YAHOO.util.DDProxy(targetRow);
            ddRow.onDragOver = function() {
//                Dom.addClass(arguments[1], 'over');
//                if (overLi && (overLi != arguments[1])) {
//                    Dom.removeClass(overLi, 'over');
//                }
//                overLi = arguments[1];
            }

            ddRow.onDragOut = function() {
//                Dom.removeClass(overLi, 'over');
            }

            ddRow.onDragDrop = function(ev) {
//                alert(Event.getTarget(ev));
//                alert(m3958.utils.DisplayPropertyNames(ev));
                YAHOO.util.DragDropMgr.stopDrag(ev,true);
                Dom.get(this.getDragEl()).style.visibility = 'hidden';
                var selectedRowIds = fao.variables.staffs_datatable.datatable.getSelectedRows();
                for(var i =0;i<selectedRowIds.length;i++){
                    var staff = fao.variables.staffs_datatable.datatable.getRecord(selectedRowIds[i]).getData();
                    var staffd = new fao.classes.Staffd({
                        staff_id : staff.id,
                        activity_id : fao.variables.curactivity.id,
                        danwei : staff.danwei,
                        zhiwu : staff.zhiwu,
                        hzhaoma : staff.hzhaoma,
                        hzghriqi : fao.utils.date2str(staff.hzghriqi),
                        note : ""
                    });
                    try{
                        staffd.save();
                    }
                    catch(e){
                        alert(staff.name + "已经在列表中！");
                    }
                }

//                var callback = {
//                    success : fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable,
//                    failure : fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable,
//                    scope : this.datatable
//                };
                
                fao.variables.staffds_datatable.datasource.sendRequest('', fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffds_datatable.datatable);
//                fao.variables.staffds_datatable.datasource.sendRequest('', callback);

                fao.variables.staffds_datatable.datatable.render();
//                alert(fao.variables.staffs_datatable.datatable.getSelectedRows()[0]l);
//                alert(fao.variables.staffs_datatable.datatable.getRecord(fao.variables.staffs_datatable.datatable.getSelectedRows()[0]).getData().id);
//                fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
            }
            ddRow.onInvalidDrop = function(ev){
                YAHOO.util.DragDropMgr.stopDrag(ev,true);
                Dom.get(this.getDragEl()).style.visibility = 'hidden';
            }


            targetRow.isDD = true;
        }
//        if(this.isSelected(targetRow)){
//            this.unselectRow(targetRow);
//        }
//        else{
//            this.selectRow(targetRow);
//        }
        var targetEl = Event.getTarget(oArgs.event);

        if(targetEl.tagName.toUpperCase() == "BUTTON" && targetEl.innerHTML == "删除"){
            var answer =  confirm("真的要删除？");
//            alert(answer);
            if(answer){
                this.deleteRow(targetRow);
//                this.render();
//                alert(targetRecordData.id);
//                fao.variables.db.execute("delete from staffs where id = ?", [targetRecordData.id]);
                fao.variables.db.execute("update staffs set sync_state = 'deleted' where id = ?", [targetRecordData.id]);
                fao.variables.db.execute("update staffds set sync_state = 'deleted' where staff_id = ?", [targetRecordData.id]);
                

//                fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
            }
        }
        if(targetEl.tagName.toUpperCase() == "BUTTON" && targetEl.innerHTML == "出访历史"){
          try{
            if(fao.variables.cur_table == 2){
                return;
            }
            else{
              fao.variables.pre_staff_phase = fao.doms.ac_input.value;
              fao.doms.ac_input.value = targetRecordData.id + ":";
              fao.variables.cur_table = 2;
              fao.doms.activity_tab.style.display="block";
              fao.doms.staff_tab.style.display="none";
//              fao.variables.activities_datatable.datatable.get("paginator").setPage(fao.variables.activities_datatable.datatable.get("paginator").getCurrentPage(),false);
              fao.variables.activities_datatable.datatable.set("caption",targetRecordData.name + "-曾出访过的国家");
               fao.variables.activities_datatable.datasource.sendRequest('', fao.variables.activities_datatable.datatable.onDataReturnInitializeTable, fao.variables.activities_datatable.datatable);
              fao.doms.activity_radio.checked = true;
              fao.variables.activities_datatable.datatable.render();
            }
          }
          catch(e){
              alert(e.message);
          }
        }
    };
    this.datatable.subscribe('rowClickEvent', onRowClick,this.datatable,true);
    this.datatable.subscribe('rowDblclickEvent', onRowDblClick,this.datatable,true);

//-------------------------------------------------------------------------------------------
  }
}catch(e){
  alert(e.message);
  alert("from staff.js");
}


