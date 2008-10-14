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
        this.danwei = data.danwei,
        this.zhiwu = data.zhiwu,
        this.hzhaoma = data.hzhaoma,
        this.hzghriqi = data.hzghriqi,
        this.pyname = fao.utils.ch2py.find_pystr(this.name)[0].join(",");
        this.spyname = fao.utils.ch2py.find_pystr(this.name)[1].join(",");
        this.sex = data.sex;
        this.sync_state = 'new';
        this.birthday = fao.utils.convertDate(data.birthday);
        this.note = data.note;
        var curTime = new Date().getTime();
        this.save = function(){
            fao.variables.db.execute("insert into staffs " +
                " (id,name,danwei,zhiwu,hzhaoma,hzghriqi,pyname,spyname,sex,birthday,note,sync_state,created_at,updated_at) " +
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[this.id,this.name,this.danwei,this.zhiwu,this.hzhaoma,this.hzghriqi,this.pyname,this.spyname,this.sex,this.birthday,this.note,this.sync_state,curTime,curTime]);
        };
        this.update = function(){
            fao.variables.db.execute("update staffs set" +
                " name = ?,danwei =?,zhiwu=?,hzhaoma=?,hzghriqi=?,pyname=?,spyname =?,sex=?,birthday=?,note=?,sync_state=?,updated_at=? where id = ?",
            [this.name,this.danwei,this.zhiwu,this.hzhaoma,this.hzghriqi,this.pyname,this.spyname,this.sex,this.birthday,this.note,'changed',curTime,this.id]);
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
//          alert("here");
//          alert("here");
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
              Dom.get("hzghriqi_sf_dlg").value = "";
//              Dom.get("pyname_sf_dlg").value = "";
//              Dom.get("spyname_sf_dlg").value = "";
              var birthday = "";
              Dom.get("birthday_sf_dlg").value = "";
//              alert(oData.birthday instanceof Date);
              Dom.get("sex_sf_dlg").checked = "";
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
              Dom.get("hzghriqi_sf_dlg").value = oData.hzghriqi;
//              Dom.get("pyname_sf_dlg").value = oData.pyname;
//              Dom.get("spyname_sf_dlg").value = oData.spyname;
              var birthday = oData.birthday;
              Dom.get("birthday_sf_dlg").value = birthday.getFullYear() + "-" + birthday.getMonth() +  "-" + birthday.getDate();
//              alert(oData.birthday instanceof Date);
              Dom.get("sex_sf_dlg").checked = oData.sex == "false" ? false : true;
              Dom.get("note_sf_dlg").value = oData.note;
            }
            catch(e){
                alert(e.message);
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
//            alert("validate");
            try{
		var data = this.getData();
		if (data.name == "") {
			alert("请输入完整的资料.");
			return false;
		}
                var ymd = /\d{4}[^\d]\d{1,2}[^\d]\d{1,2}/;
                var result = data.birthday.match(ymd);
                if(!result){
                  result = data.birthday.match(/\d{8}/);
                }
                if(!result){
                    alert("日期的格式是：2008-08-08 或者20080808");
                    return false;
                }else{
                    data.birthday = result[0];
                }
                //save new staff.
//                alert(data.id);
                var staff = new fao.classes.Staff(this.getData());

                if(data.id)
                    staff.update();
                else
                     staff.save();

                 fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
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
    this.initTable = function(){
//      fao.
    }
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
        {key:"hzhaoma",label:"护照"},
//        {key:"pyname",label:"名字拼音"},
//        {key:"spyname",label:"名字首拼音"},
        {key:"age",label:"年龄"},
        {key:"sex",label:"性别",formatter:function(elCell, oRecord, oColumn, oData){
                                                    if(oData == "false"){
                                                      elCell.innerHTML = "男";
                                                    }else{
                                                      elCell.innerHTML = "女";
                                                    }
                                                    }
        },
        {key:"birthday",label:"出生日期",formatter:fao.utils.formatDate},
        {key:"note",label:"备注"},
        {key:"id",label:"删除",formatter:fao.utils.formatDeleteButton}
    ];
    var dsfunc= function(condi){
      var offset = condi ? (condi.offset || 0) : 0;
      var rowspp = condi ? (condi.rowspp || 4) : 4;
      var phrase = "%" + fao.doms.ac_input.value + "%";
      var sqlstmt = 'select * from staffs where name like ? or pyname like ? or spyname like ? order by created_at desc limit ? offset ?';
      var rs = fao.variables.db.execute(sqlstmt,[phrase,phrase,phrase,rowspp,offset]);
      var results = {staffs:[]};
      while(rs.isValidRow()) {
        results.staffs.push({
            id:rs.fieldByName("id"),
            name:rs.fieldByName("name"),
            danwei:rs.fieldByName("danwei"),
            zhiwu:rs.fieldByName("zhiwu"),
            hzhaoma:rs.fieldByName("hzhaoma"),
            hzghriqi:rs.fieldByName("hzghriqi"),
            pyname:rs.fieldByName("pyname"),
            spyname:rs.fieldByName("spyname"),
            sex:rs.fieldByName("sex"),
            birthday:new Date(rs.fieldByName("birthday")),
            note:rs.fieldByName("note"),
            sync_state:rs.fieldByName("sync_state"),
            age : fao.utils.convertAge(rs.fieldByName("birthday"))
        });
        rs.next();
      }
      rs.close();
      var count = 0;
      rs = fao.variables.db.execute("select count(*) from staffs where name like ? or pyname like ? or spyname like ?",[phrase,phrase,phrase]);
      if(rs.isValidRow())count = rs.field(0);
      rs.close();
//          alert(count);
      results.totalRecords = count;
//      alert("num:" + results.staffs.length);
      return results;
    };

//    try{
//        dsfunc();
//    }
//    catch(e){
//        alert(e.message);
//    }

//    this.datasource = new YAHOO.util.DataSource(dsfunc);
    this.datasource = new YAHOO.util.FunctionDataSource(dsfunc);
    this.datasource.responseType = YAHOO.util.FunctionDataSource.TYPE_JSON;
    this.datasource.responseSchema = {
        resultsList : 'staffs',
        fields: [
            "id",
            "name",
            "danwei",
            "zhiwu",
            "hzhaoma",
            "hzghriqi",
            "pyname",
            "spyname",
            "sex",
            "birthday",
            "note",
            "age",
            "sync_state"
        ],
        metaFields :{totalRecords:"totalRecords"}
    };

    var buildQueryString = function(state,dt){
        alert(fao.variables.staffs_datatable.datatable.get("paginator").getState().page);
        alert(state);
        var offset = state.pagination.recordOffset;
        var rowspp = state.pagination.rowsPerPage;
        return {offset:offset,rowspp:rowspp};
    };
    var dataTableConfig = {
        initialRequest:"",
        initialLoad:true,
        dynamicData:true,
        paginator: new YAHOO.widget.Paginator({
            rowsPerPage:4,
            totalRecords:20
        }),
        generateRequest : buildQueryString
//        paginationEventHandler : YAHOO.widget.DataTable.handleDataSourcePagination
//            paginationEventHandler : YAHOO.widget.DataTable.handleSimplePagination
    };

    this.datatable = new YAHOO.widget.DataTable("staffDataTable", columnDefs,
        this.datasource, dataTableConfig);

    
//    this.datatable.handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
//            alert(oRequest);
//            alert(oResponse);
//            alert(oPayload);
//            oPayload.totalRecords = oResponse.meta.totalRecords;
//            return oPayload;
//        }

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
//                alert(ev.type);
//                alert(Event.getTarget(ev));
//                alert(m3958.utils.DisplayPropertyNames(ev));
                YAHOO.util.DragDropMgr.stopDrag(ev,true);
                Dom.get(this.getDragEl()).style.visibility = 'hidden';
                var selectedRowIds = fao.variables.staffs_datatable.datatable.getSelectedRows();
                for(var i =0;i<selectedRowIds.length;i++){
                    var staff = fao.variables.staffs_datatable.datatable.getRecord(selectedRowIds[i]).getData();
                    var staffd = new fao.classes.Staffd({
                        staff_id : staff.id,
                        activity_id :fao.variables.curactivity.id,
                        danwei : staff.danwei,
                        zhiwu : staff.zhiwu,
                        hzhaoma : staff.hzhaoma,
                        hzghriqi : staff.hzghriqi,
                        note : ""
                    });
                    try{
                        staffd.save();
                    }
                    catch(e){
                        alert(staff.name + "已经在列表中！");
                    }
                }

                var callback = {
                    success : fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable,
                    failure : fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable,
                    scope : this.datatable
                };
                
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
                fao.variables.db.execute("delete from staffs where id = ?", [targetRecordData.id]);
                fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
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


