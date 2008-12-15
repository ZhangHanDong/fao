/* 
<div id="addActivityDialog">
<div class="hd">请输入人员信息：</div>
<div class="bd">
<form method="POST" action="assets/post.php">
        <input type="hidden" name="id" value="" id="id_ay_dlg">
	<label for="sqriqi">申请日期：</label><input type="textbox" name="sqriqi" id="sqriqi_ay_dlg"/>
        <label for="dguojia">出访国家：</label><input type="textbox" name="dguojia" id="dguojia_ay_dlg" />
        <label for="renwu">出访任务：</label><textarea name="renwu" id="renwu_ay_dlg"></textarea>
        <label for="cfshijian">出访时间：</label><input type="textbox" name="cfshijian"  id="cfshijian_ay_dlg"/>
        <label for="tltianshu">停留天数：</label><input type="textbox" name="tltianshu" id="tltianshu_ay_dlg" />
        <label for="ztdanwei">组团单位：</label><input type="textbox" name="ztdanwei" id="ztdanwei_ay_dlg" />
        <label for="yqdanwei">邀请单位：</label><input type="textbox" name="yqdanwei" id="yqdanwei_ay_dlg" />
        <label for="rwpihao">任务批号：</label><input type="textbox" name="rwpihao" id="rwpihao_ay_dlg" />
        <div class="clear"></div>
        <label for="note">备注：</label><textarea name="note" id="note_ay_dlg"></textarea>
	<div class="clear"></div>
</form>
</div>
</div>
 */

fao.classes.Activity = function(data){
        if(!data.id){
            var uuid =new UUID();
            this.id = uuid.id.replace(/-/g,"").toLowerCase();
        }else{
            this.id = data.id;
        }
        this.sqriqi = fao.utils.datestr2milliseconds(data.sqriqi);
        this.dguojia = data.dguojia;
        this.dgjpy = fao.utils.ch2py.find_pystr(this.dguojia)[0].join(",");
        this.dgjspy = fao.utils.ch2py.find_pystr(this.dguojia)[1].join(",");
        this.renwu = data.renwu;
        this.cfshijian = fao.utils.datestr2milliseconds(data.cfshijian);
        this.tltianshu = data.tltianshu;
        this.ztdanwei = data.ztdanwei;
        this.yqdanwei = data.yqdanwei;
        this.rwpihao = data.rwpihao;
        this.sync_state = 'new';
        this.note = data.note;
        var curTime = new Date().getTime();
        this.save = function(){
            fao.variables.db.execute("insert into activities " +
                " (id,userhash,sqriqi,dguojia,dgjpy,dgjspy,renwu,cfshijian,tltianshu,ztdanwei,yqdanwei,rwpihao,note,sync_state,created_at,updated_at) " +
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[this.id,fao.variables.userhash,this.sqriqi,this.dguojia,this.dgjpy,this.dgjspy,this.renwu,this.cfshijian,this.tltianshu,this.ztdanwei,this.yqdanwei,this.rwpihao,this.note,this.sync_state,curTime,curTime]);
        };
        this.update = function(){
            fao.variables.db.execute("update activities set " +
                "sqriqi =?,dguojia=?,dgjpy=?,dgjspy=?,renwu=?,cfshijian=?,tltianshu=?,ztdanwei=?,yqdanwei=?,rwpihao=?,note=?,sync_state=?,updated_at=? where id=? ",
                [this.sqriqi,this.dguojia,this.dgjpy,this.dgjspy,this.renwu,this.cfshijian,this.tltianshu,this.ztdanwei,this.yqdanwei,this.rwpihao,this.note,"changed",curTime,this.id]);
        };
      };
    fao.classes.DialogActivity = function(){
	// Define various event handlers for Dialog
        this.validate_pass = false;
	var handleSubmit = function() {
          this.submit();
          if(fao.variables.dialog_activity.validate_pass){
            this.hide();
          }
	};
        var handleAndHandle = function(){
          this.submit();
          if(fao.variables.dialog_activity.validate_pass){
            fao.variables.dialog_activity.clearData();
          }
        };
	var handleCancel = function() {
		this.cancel();
	};

	var handleSuccess = function(o) {
            alert("handle success");
	};
	var handleFailure = function(o) {
		alert("Submission failed: " + o.status);
	};
        this.clearData = function(oData){
            try{
              Dom.get("id_ay_dlg").value = "";
              Dom.get("sqriqi_ay_dlg").value = "";
              Dom.get("dguojia_ay_dlg").value = "";
              Dom.get("renwu_ay_dlg").value = "";
              Dom.get("cfshijian_ay_dlg").value = "";
              Dom.get("tltianshu_ay_dlg").value =  "";
              Dom.get("ztdanwei_ay_dlg").value =  "";
              Dom.get("yqdanwei_ay_dlg").value =  "";
              Dom.get("rwpihao_ay_dlg").value =  "";
              Dom.get("note_sf_dlg").value =  "";
            }
            catch(e){
                alert(e.message);
            }
        };

        this.setData = function(oData){
            try{
              Dom.get("id_ay_dlg").value = oData.id;
              Dom.get("sqriqi_ay_dlg").value = fao.utils.date2str(oData.sqriqi);
              Dom.get("dguojia_ay_dlg").value = oData.dguojia;
              Dom.get("renwu_ay_dlg").value = oData.renwu;
              Dom.get("cfshijian_ay_dlg").value = fao.utils.date2str(oData.cfshijian);
              Dom.get("tltianshu_ay_dlg").value = oData.tltianshu;
              Dom.get("ztdanwei_ay_dlg").value = oData.ztdanwei;
              Dom.get("yqdanwei_ay_dlg").value = oData.yqdanwei;
              Dom.get("rwpihao_ay_dlg").value = oData.rwpihao;
              Dom.get("note_sf_dlg").value = oData.note;
            }
            catch(e){
                alert(e.message);
            }
        };

	// Instantiate the Dialog
        try{
	this.dialog = new YAHOO.widget.Dialog("addActivityDialog",
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
        }catch(e){
            alert(e);
        }

        this.setButtons = function(){
            this.dialog.cfg.setProperty("buttons",[ { text:"编辑", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel } ]);
        }

	// Validate the entries in the form to require that both first and last name are entered

	this.dialog.validate = function() {
             fao.variables.dialog_activity.validate_pass = false;
            try{
		var data = this.getData();
		if (data.dguojia == "") {
			alert("出访国家必须填写！");
			return false;
		}
                //save new activity.
                 var activity = new fao.classes.Activity(data);
                 if(data.id)
                     activity.update();
                 else
                     activity.save();
                 fao.variables.activities_datatable.datasource.sendRequest(fao.variables.act_condi, fao.variables.activities_datatable.datatable.onDataReturnInitializeTable, fao.variables.activities_datatable.datatable);
                 fao.variables.manual_page = true;
                 fao.variables.activities_datatable.paginator.setPage(fao.variables.cur_page);
                 fao.variables.activities_datatable.paginator.render();
                 fao.variables.dialog_activity.validate_pass = true;
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
        var addActivityBtnClick = function(){
            Dom.get("id_ay_dlg").value = "";
            this.dialog.cfg.setProperty("buttons",[ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel },{ text:"添加继续", handler:handleAndHandle}]);
            this.dialog.show();
        };
	Event.addListener("addActivityBtn", "click", addActivityBtnClick , this, true);
//	Event.addListener("hide", "click", fao.addStaffDialog.hide, fao.addStaffDialog, true);
}

  fao.classes.ActivitiesDataTable = function(){
      this.datasource = null;
      this.datatable = null;
      this.paginator = new YAHOO.widget.Paginator({rowsPerPage:4});

      var columnDefs = [
          {key:"dguojia",label:"出访国家",sortable:true},
          {key:"sqriqi",label:"申请日期",sortable:true,formatter:fao.utils.formatDate},
          {key:"renwu",label:"任务",sortable:true},
          {key:"cfshijian",label:"出访时间",sortable:true,formatter:fao.utils.formatDate},
          {key:"tltianshu",label:"停留天数",sortable:true},
          {key:"ztdanwei",label:"组团单位",sortable:true},
          {key:"yqdanwei",label:"邀请单位",sortable:true},
          {key:"rwpihao",label:"任务批号",sortable:true},
          {key:"note",label:"备注",sortable:true},
          {key:"sc",label:"删除",formatter:"button"},
          {key:"ry",label:"人员",formatter:"button"}
      ];

        var dsfunc= function(condi){
          if(!condi){
            condi = {startIndex:0,results:4,sort:"dguojia",dir:"asc"};
          }

          var phrase = fao.doms.ac_input.value;
          var sqlstmts = fao.utils.sqldsl("activities",phrase,condi);

          var rs = fao.variables.db.execute(sqlstmts[0]);
          var results = {activities:[]};
          while(rs.isValidRow()) {
            results.activities.push({
                id:rs.fieldByName("id"),
                sqriqi:fao.utils.milliseconds2date(rs.fieldByName("sqriqi")),
                dguojia:rs.fieldByName("dguojia"),
                renwu:rs.fieldByName("renwu"),
                cfshijian:fao.utils.milliseconds2date(rs.fieldByName("cfshijian")),
                tltianshu:rs.fieldByName("tltianshu"),
                ztdanwei:rs.fieldByName("ztdanwei"),
                yqdanwei:rs.fieldByName("yqdanwei"),
                rwpihao:rs.fieldByName("rwpihao"),
                note:rs.fieldByName("note"),
                sc:"删除",
                ry:"参加人员",
                sync_state:rs.fieldByName("sync_state")
            });
            rs.next();
          }
          rs.close();
          var count = 0;
          rs = fao.variables.db.execute(sqlstmts[1]);
          if(rs.isValidRow())count = rs.field(0);
          rs.close();
          results.totalRecords = count;
          return results;
        };



        this.datasource = new YAHOO.util.DataSource(dsfunc);
        this.datasource.responseType = YAHOO.util.DataSource.TYPE_JSON;
        this.datasource.responseSchema = {
            resultsList:'activities',
            fields: [
                "id",
                "sqriqi",
                "dguojia",
                "renwu",
                "cfshijian",
                "tltianshu",
                "ztdanwei",
                "yqdanwei",
                "rwpihao",
                "note",
                "sc",
                "ry",
                "sync_state"
            ],
            metaFields :{totalRecords:"totalRecords"}
        };

        var buildQueryString = function(state,dt){
          if(fao.variables.manual_page){
            fao.variables.manual_page = false;
            return fao.variables.act_condi;
          }else{
            state = state || {pagination:null, sortedBy:null};
            var sort = (state.sortedBy) ? state.sortedBy.key : "dguojia";
            var dir = (state.sortedBy && state.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "";
            var startIndex = (state.pagination) ? state.pagination.recordOffset : 0;
            var results = (state.pagination) ? state.pagination.rowsPerPage : 4;
            var condi =  {startIndex:startIndex,results:results,sort:sort,dir:dir};
            fao.variables.cur_page = (state.pagination) ? state.pagination.page : 0;
            fao.variables.act_condi = condi;
            return condi;
          }
        };

        var dataTableConfig = {
//            initialRequest : "",
            initialLoad : false,
            dynamicData : true,
            paginator: this.paginator,
            generateRequest : buildQueryString,
            caption: fao.doms.ac_input.value ? "出访目的地包含 '" + fao.doms.ac_input.value + "' 的出行" : "所有出访国家列表"
//            paginationEventHandler : YAHOO.widget.DataTable.handleDataSourcePagination
//            paginationEventHandler : YAHOO.widget.DataTable.handleSimplePagination
        };

        this.datatable = new YAHOO.widget.DataTable("ActivityDataTable", columnDefs,
            this.datasource, dataTableConfig);
        this.datatable.set("selectionMode","single");

    var dsCallbackfn = function(sRequest,oResponse,oPayload){
      fao.variables.activities_datatable.datatable.onDataReturnInitializeTable(sRequest,oResponse,oPayload);
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
        try{
          var targetRow = oArgs.target;
          var targetRecordData = this.getRecord(targetRow).getData();
          fao.variables.dialog_activity.setData(targetRecordData);
          fao.variables.dialog_activity.setButtons();
//          var buttons = fao.variables.dialog_staff.dialog.cfg.setProperty("buttons",
//      [{ text:"添加", handler:handleSubmit, isDefault:true }, {text:"取消", handler:handleCancel }]);

          fao.variables.dialog_activity.dialog.show();
        }catch(e){
            alert(e.message);
        }
    }


//        this.datatable.selectRow(this.datatable.getTrEl(0));
    var onRowClick = function(oArgs){
        this.onEventSelectRow(oArgs);
        var targetRow = oArgs.target;
        var targetRecordData = this.getRecord(targetRow).getData();
        var targetEl = Event.getTarget(oArgs.event);
        if(targetEl.tagName.toUpperCase() == "BUTTON"){
            if(targetEl.innerHTML == "删除"){
              var answer =  confirm("真的要删除？");
              if(answer){
                  this.deleteRow(targetRow);
                  fao.variables.db.execute("update activities set sync_state = 'deleted' where id = ?", [targetRecordData.id]);
                  fao.variables.db.execute("update staffds set sync_state = 'deleted' where activity_id = ?", [targetRecordData.id]);
//                  fao.variables.db.execute("delete from activities where id = ?", [targetRecordData.id]);
              }
            }
            else if(targetEl.innerHTML == "参加人员"){
                fao.variables.curactivity = targetRecordData;
                fao.doms.staff_radio.click();
                fao.variables.staffds_datatable.datatable.set("caption",fao.utils.chDate(fao.variables.curactivity.cfshijian) + "出访 '" + fao.variables.curactivity.dguojia  + "' 的人员列表");
//                fao.variables.activities_datatable.datatable.render();
                fao.variables.staffds_datatable.datasource.sendRequest('', fao.variables.staffds_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffds_datatable.datatable);
                fao.doms.staff_panel_tab.style.display = "block";
                fao.variables.staff_panel.panel.show();
            }
            else{

            }
        }

        };
        this.datatable.subscribe('rowClickEvent', onRowClick,this.datatable,true);
        this.datatable.subscribe('rowDblclickEvent', onRowDblClick,this.datatable,true);
  }
