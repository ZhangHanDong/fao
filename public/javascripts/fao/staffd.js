/* 
<div id="addStaffdDialog">
<div class="hd">请输入人员信息：</div>
<div class="bd">
<form method="POST" action="assets/post.php">
        <input type="hidden" name="id" value="" id="id_sfd_dlg" />
	<label for="name">名字：</label><input type="textbox" name="name" id="name_sfd_dlg" />
        <label for="danwei">单位：</label><input type="textbox" name="danwei" id="danwei_sfd_dlg"/>
        <label for="zhiwu">职务：</label><input type="textbox" name="zhiwu" id="zhiwu_sfd_dlg"/>
        <label for="hzhaoma">护照：</label><input type="textbox" name="hzhaoma" id="hzhaoma_sfd_dlg"/>
        <label for="hzghriqi">归还日期：</label><input type="textbox" name="hzghriqi" id="hzghriqi_sfd_dlg"/>
	<div class="clear"></div>
	<label for="isreturned">护照是否归还：</label><input type="checkbox" name="isreturned" value="1" id="isreturned_sfd_dlg"/> 已归还
	<div class="clear"></div>
	<label for="note">备注：</label><textarea name="note" id="note_sfd_dlg"></textarea>
	<div class="clear"></div>
</form>
</div>
</div>
 */

fao.classes.Staffd = function(data){
        if(!data.id){
            var uuid =new UUID();
            this.id = uuid.id.replace(/-/g,"").toLowerCase();
        }else{
            this.id = data.id;
        }
        this.staff_id = data.staff_id;
        this.activity_id = data.activity_id;
        this.danwei = data.danwei;
        this.zhiwu = data.zhiwu;
        this.hzhaoma = data.hzhaoma;
        this.hzghriqi = fao.utils.convertDate(data.hzghriqi);
        this.isreturned = data.isreturned ? 1 : 0;
        this.sync_state = 'new';
        this.note = data.note;
        var curTime = new Date().getTime();
        this.save = function(){
            fao.variables.db.execute("insert into staffds " +
                " (id,staff_id,activity_id,danwei,zhiwu,hzhaoma,hzghriqi,isreturned,note,sync_state,created_at,updated_at) " +
                " values (?,?,?,?,?,?,?,?,?,?,?,?)",[this.id,this.staff_id,this.activity_id,this.danwei,this.zhiwu,this.hzhaoma,this.hzghriqi,this.isreturned,this.note,this.sync_state,curTime,curTime]);
        };
        this.update = function(){
            fao.variables.db.execute("update staffds set " +
                " danwei=?,zhiwu=?,hzhaoma=?,hzghriqi=?,isreturned = ?,note=?,sync_state=?,updated_at=? where id=? ",
                [this.danwei,this.zhiwu,this.hzhaoma,this.hzghriqi,this.isreturned,this.note,'changed',curTime,this.id]);
        };
      };

    fao.classes.DialogStaffd = function() {

	// Define various event handlers for Dialog
	var handleSubmit = function() {
//            alert("submit");
            this.submit();
	};
	var handleCancel = function() {
		this.cancel();
	};

	var handleSuccess = function(o) {
//            alert("handle success");
	};
	var handleFailure = function(o) {
		alert("Submission failed: " + o.status);
	};

        this.setData = function(oData){
            try{
              Dom.get("id_sfd_dlg").value = oData.id;
              Dom.get("name_sfd_dlg").value = oData.name;
              Dom.get("danwei_sfd_dlg").value = oData.danwei;
              Dom.get("zhiwu_sfd_dlg").value = oData.zhiwu;
              Dom.get("hzhaoma_sfd_dlg").value = oData.hzhaoma;
              var hzghriqi = oData.hzghriqi;
              Dom.get("hzghriqi_sfd_dlg").value = hzghriqi.getFullYear() + "-" + hzghriqi.getMonth() +  "-" + hzghriqi.getDate();
//              alert(oData.birthday instanceof Date);
              Dom.get("isreturned_sfd_dlg").checked = oData.isreturned;
              Dom.get("note_sfd_dlg").value = oData.note;
            }
            catch(e){
                alert(e.message);
//                alert(1);
            }
        };

	// Instantiate the Dialog
	this.dialog = new YAHOO.widget.Dialog("addStaffdDialog",
							{ width : "30em",
                                                          zIndex : 20,
							  fixedcenter : true,
							  visible : false,
							  constraintoviewport : true,
                                                          postmethod: "none",
							  buttons : [ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel } ]
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
		if (data.name == "" || data.pyname =="" || data.spyname == "") {
			alert("请输入完整的资料.");
			return false;
		}
                var ymd = /\d{4}[^\d]\d{1,2}[^\d]\d{1,2}/;
                var result = data.hzghriqi.match(ymd);
                if(!result && data.hzghriqi){
                    alert("日期的格式是：2008-08-08.");
                    return false;
                }else{
                    data.hzghriqi = result[0];
                }
                //save new staff.
//                alert(data.id);
                var staffd = new fao.classes.Staffd(this.getData());
//                alert(data.id);
                if(data.id)
                    staffd.update();
                else
                     staffd.save();
                 fao.variables.staffds_datatable.datasource.sendRequest('', fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffds_datatable.datatable);
                 return true;
            }
            catch(e){
                alert(e.message);
//                alert(2);
                return false;
            }
	};

	// Wire up the success and failure handlers
	this.dialog.callback = { success: handleSuccess,
						     failure: handleFailure };

	// Render the Dialog
	this.dialog.render();
//        alert(fao.addStaffDialog.cfg.getProperty("postmethod"));
//        var addStaffBtnClick = function(){
//            Dom.get("id_sf_dlg").value = "";
//            this.show();
//        };
//	Event.addListener("addStaffBtn", "click", addStaffBtnClick, this.dialog, true);
//	Event.addListener("hide", "click", fao.addStaffDialog.hide, fao.addStaffDialog, true);
}
//Event.onDOMReady(init_dialog_staff);

  fao.classes.StaffdsDataTable = function(){
    this.datasource = null;
    this.datatable = null;
    
    var formathzgh = function(el,oRecord, oColumn, oData){
        var isreturned = oData;
        if(isreturned)
            el.innerHTML = '<input type="checkbox" disabled checked/>';
        else
            el.innerHTML = '<input type="checkbox" disabled/>';
    };
    
    var formatDate = function(elCell, oRecord, oColumn, oData){
        var date =oData;
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        m = m < 10 ? "0"+ m : m;
        d = d < 10 ? "0"+ d : d;
        elCell.innerHTML = y + "-" + m + "-" + d;
    };
    
    var formatDelete = function(el, oRecord, oColumn, oData) {
        el.innerHTML = "<button type=\"button\">删除</button>";
    };
    
    var columnDefs = [
        { key:"name",sortable:true,label:"姓名"},
        { key:"danwei",label:"单位"},
        {key:"zhiwu",label:"职务"},
        {key:"hzhaoma",label:"护照号码"},
        {key:"hzghriqi",label:"归还日期",formatter : formatDate},
        {key:"isreturned",label:"护照归还",formatter:formathzgh,sortable:true},
        {key:"note",label:"备注"},
        {key:"id",label:"删除",formatter:formatDelete}
    ];
    var dsfunc= function(condi){
//          alert("argument one:" + arguments[0]);
//          alert("staffdsfunc is called!");
          var offset = condi ? (condi.offset || 0) : 0;
          var rowspp = condi ? (condi.rowspp || 4) : 4;
//          var phrase = fao.doms.ac_input.value + "%";
          var activity_id = fao.variables.curactivity.id;
          var sqlstmt = 'select * from staffds where activity_id = ? order by created_at desc limit ? offset ?';
          var rs = fao.variables.db.execute(sqlstmt,[activity_id,rowspp,offset]);
          var results = {staffds:[]};
          while(rs.isValidRow()) {
            var staffname = null;
            var rs1 = fao.variables.db.execute("select name from staffs where id = ?",[rs.fieldByName("staff_id")]);
            if(rs1.isValidRow()){
                staffname = rs1.field(0);
//                alert(staffname);
            }

//            alert(staffname);
            results.staffds.push({
                id:rs.fieldByName("id"),
                name : staffname,
                staff_id:rs.fieldByName("staff_id"),
                activity_id:rs.fieldByName("activity_id"),
                danwei:rs.fieldByName("danwei"),
                zhiwu:rs.fieldByName("zhiwu"),
                note:rs.fieldByName("note"),
                hzhaoma:rs.fieldByName("hzhaoma"),
                hzghriqi:new Date(rs.fieldByName("hzghriqi")),
                isreturned:rs.fieldByName("isreturned"),
                sync_state:rs.fieldByName("sync_state")
            });
            rs.next();
          }
          rs.close();
          var count = 0;
          rs = fao.variables.db.execute("select count(*) from staffds where activity_id = ?",[activity_id]);
          if(rs.isValidRow())count = rs.field(0);
          rs.close();
//          alert(count);
          results.totalRecords = count;
          return results;
        };

      try{
            dsfunc();
        }
      catch(e){
            alert(e.message);
        }

        this.datasource = new YAHOO.util.DataSource(dsfunc);
        this.datasource.responseType = YAHOO.util.DataSource.TYPE_JSON;
        this.datasource.responseSchema = {
            resultsList : 'staffds',
            fields: [
                "id",
                "name",
                "staff_id",
                "activity_id",
                "danwei",
                "zhiwu",
                "hzhaoma",
                "hzghriqi",
                "isreturned",
                "note",
                "sync_state"
            ],
            metaFields :{totalRecords:"totalRecords"}
        };

        var buildQueryString = function(state,dt){
            return {offset:state.pagination.recordOffset,rowspp:state.pagination.rowsPerPage};
        };
        var dataTableConfig = {
            initialRequest : "",
            initialLoad : false,
            dynamicData : true,
            paginator: new YAHOO.widget.Paginator({
                rowsPerPage:4
            }),
            generateRequest : buildQueryString,
//            paginationEventHandler : YAHOO.widget.DataTable.handleDataSourcePagination,
            caption : fao.variables.curactivity.dguojia
//            paginationEventHandler : YAHOO.widget.DataTable.handleSimplePagination
        };

        this.datatable = new YAHOO.widget.DataTable("staffdDataTable", columnDefs,
            this.datasource, dataTableConfig);

        this.datatable.set("selectionMode","single");
//        this.datatable.selectRow(this.datatable.getTrEl(0));

    var dsCallbackfn = function(sRequest,oResponse,oPayload){
      fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable(sRequest,oResponse,oPayload);
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

    var onRowDblClick = function(oArgs){

//        alert("dbl");
        try{
          var targetRow = oArgs.target;
          var targetRecordData = this.getRecord(targetRow).getData();

//          alert(targetRecordData.birthday);
          fao.variables.dialog_staffd.setData(targetRecordData);
          fao.variables.dialog_staffd.setButtons();
//          var buttons = fao.variables.dialog_staff.dialog.cfg.setProperty("buttons",
//      [{ text:"添加", handler:handleSubmit, isDefault:true }, {text:"取消", handler:handleCancel }]);

          fao.variables.dialog_staffd.dialog.show();
        }catch(e){
            alert(e.message);
        }
    }


//        this.datatable.selectRow(this.datatable.getTrEl(0));
    var onRowClick = function(oArgs){
        this.onEventSelectRow(oArgs);
//        alert(m3958.utils.DisplayPropertyNames(oArgs));
//        alert(Event.getTarget(oArgs.event).tagName + "kkk");

        var targetRow = oArgs.target;
        var targetRecordData = this.getRecord(targetRow).getData();
//        alert(targetRecord);
//        alert(targetRow.id);
        var targetEl = Event.getTarget(oArgs.event);
//        alert(targetEl.id);
        if(targetEl.tagName.toUpperCase() == "BUTTON"){
            if(targetEl.innerHTML == "删除"){
              var answer =  confirm("真的要删除？");
  //            alert(answer);
              if(answer){
                  this.deleteRow(targetRow);
                  fao.variables.db.execute("delete from staffds where id = ?", [targetRecordData.id]);
              }
            }
            else if(targetEl.innerHTML == "人员"){
//                alert(targetRecordData.id);
                fao.variables.curactivity= targetRecordData;
                fao.doms.staff_radio.click();
                fao.variables.staffds_datatable.datasource.sendRequest('', fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffds_datatable.datatable);
                fao.doms.staff_panel_tab.style.display = "block";
                fao.variables.staff_panel.panel.show();
            }
            else{

            }
        }

//        alert("htmlid:" + oArgs.target.id);
//        alert("yuiRecordId:"+oArgs.target.yuiRecordId);
//        alert("recordindex:"+this.datatable.getRecordIndex(0));
        };
        this.datatable.subscribe('rowClickEvent', onRowClick,this.datatable,true);
        this.datatable.subscribe('rowDblclickEvent', onRowDblClick,this.datatable,true);
  }

