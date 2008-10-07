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
        this.sqriqi = fao.utils.convertDate(data.sqriqi);
        this.dguojia = data.dguojia;
        this.dgjpy = fao.utils.ch2py.find_pystr(this.dguojia)[0].join(",");
        this.dgjspy = fao.utils.ch2py.find_pystr(this.dguojia)[1].join(",");
        this.renwu = data.renwu;
        this.cfshijian = fao.utils.convertDate(data.cfshijian);
        this.tltianshu = data.tltianshu;
        this.ztdanwei = data.ztdanwei;
        this.yqdanwei = data.yqdanwei;
        this.rwpihao = data.rwpihao;
        this.sync_state = 'new';
        this.note = data.note;
        var curTime = new Date().getTime();
        this.save = function(){
            fao.variables.db.execute("insert into activities " +
                " (id,sqriqi,dguojia,dgjpy,dgjspy,renwu,cfshijian,tltianshu,ztdanwei,yqdanwei,rwpihao,note,sync_state,created_at,updated_at) " +
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[this.id,this.sqriqi,this.dguojia,this.dgjpy,this.dgjspy,this.renwu,this.cfshijian,this.tltianshu,this.ztdanwei,this.yqdanwei,this.rwpihao,this.note,this.sync_state,curTime,curTime]);
        };
        this.update = function(){
            fao.variables.db.execute("update activities set " +
                "sqriqi =?,dguojia=?,dgjpy=?,dgjspy=?,renwu=?,cfshijian=?,tltianshu=?,ztdanwei=?,yqdanwei=?,rwpihao=?,note=?,sync_state=?,updated_at=? where id=? ",
                [this.sqriqi,this.dguojia,this.dgjpy,this.dgjspy,this.renwu,this.cfshijian,this.tltianshu,this.ztdanwei,this.yqdanwei,this.rwpihao,this.note,"changed",curTime,this.id]);
        };
      }
    fao.classes.DialogActivity = function(){
	// Define various event handlers for Dialog
	var handleSubmit = function() {
//            alert("submit");
            this.submit();
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
        this.setData = function(oData){
            try{
              Dom.get("id_ay_dlg").value = oData.id;
              var sqriqi = oData.sqriqi;
              Dom.get("sqriqi_ay_dlg").value = sqriqi.getFullYear() + "-" + sqriqi.getMonth() +  "-" + sqriqi.getDate();
              Dom.get("dguojia_ay_dlg").value = oData.dguojia;
              Dom.get("renwu_ay_dlg").value = oData.renwu;
              var cfshijian = oData.cfshijian;
              Dom.get("cfshijian_ay_dlg").value = cfshijian.getFullYear() + "-" + cfshijian.getMonth() +  "-" + cfshijian.getDate();
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
							  buttons : [ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel } ]
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
//            alert("validate");

            try{
		var data = this.getData();
//                alert(data.sqriqi);
		if (data.dguojia == "") {
			alert("请输入完整的资料.");
			return false;
		}
                var ymd = /(\d{4})[^\d](\d{1,2})[^\d](\d{1,2})/;
                var result = data.sqriqi.match(ymd);
                if(!result){
                  result = data.sqriqi.match(/\d{8}/);
                }
                if(!result){
                    alert("申请日期的格式是：2008-08-08.");
                    return false;
                }
//                else{
//                    data.sqriqi = result[1] + "-" + result[2] + "-" +result[3];
//                    alert(data.sqriqi);
//                }

                result = data.cfshijian.match(ymd);
                if(!result){
                  result = data.cfshijian.match(/\d{8}/);
                }
                if(!result){
                    alert("出访日期的格式是：2008-08-08.");
                    return false;
                }
//                else{
//                    data.cfshijian = result[1] + "-" + result[2] + "-" +result[3];
//                }

                //save new staff.
                 var activity = new fao.classes.Activity(this.getData());
                 if(data.id)
                     activity.update();
                 else
                     activity.save();
                 fao.variables.activities_datatable.datasource.sendRequest('', fao.variables.activities_datatable.datatable.onDataReturnInitializeTable, fao.variables.activities_datatable.datatable);
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
	Event.addListener("addActivityBtn", "click", this.dialog.show, this.dialog, true);
//	Event.addListener("hide", "click", fao.addStaffDialog.hide, fao.addStaffDialog, true);
}

  fao.classes.ActivitiesDataTable = function(){
      this.datasource = null;
      this.datatable = null;
      var columnDefs = [
          { key:"dguojia",label:"出访国家"},
          { key:"sqriqi",label:"申请日期",formatter:fao.utils.formatDate},
          {key:"renwu",label:"任务"},
          {key:"cfshijian",label:"出访时间",formatter:fao.utils.formatDate},
          {key:"tltianshu",label:"停留天数"},
          {key:"ztdanwei",label:"组团单位"},
          {key:"yqdanwei",label:"邀请单位"},
          {key:"rwpihao",label:"任务批号"},
          {key:"note",label:"备注"},
          {key:"id",label:"删除",formatter:fao.utils.formatDeleteButton},
          {key:"id",label:"人员",formatter:fao.utils.formatStaffsButton}
      ];

        var dsfunc= function(condi){
//          alert("argument one:" + arguments[0]);
//          alert("staffsfunc is called!");
          var offset = condi ? (condi.offset || 0) : 0;
          var rowspp = condi ? (condi.rowspp || 4) : 4;
          var phrase = "%" + fao.doms.ac_input.value + "%";
          var sqlstmt = 'select * from activities where dguojia like ? or dgjpy like ? or dgjspy like ? order by created_at desc limit ? offset ?';
          var rs = fao.variables.db.execute(sqlstmt,[phrase,phrase,phrase,rowspp,offset]);
          var results = {activities:[]};
          while(rs.isValidRow()) {
            results.activities.push({
                id:rs.fieldByName("id"),
                sqriqi:new Date(rs.fieldByName("sqriqi")),
                dguojia:rs.fieldByName("dguojia"),
                renwu:rs.fieldByName("renwu"),
                cfshijian:new Date(rs.fieldByName("cfshijian")),
                tltianshu:rs.fieldByName("tltianshu"),
                ztdanwei:rs.fieldByName("ztdanwei"),
                yqdanwei:rs.fieldByName("yqdanwei"),
                rwpihao:rs.fieldByName("rwpihao"),
                note:rs.fieldByName("note"),
                sync_state:rs.fieldByName("sync_state")
            });
            rs.next();
          }
          rs.close();
          var count = 0;
          rs = fao.variables.db.execute("select count(*) from activities where dguojia like ?",[phrase]);
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
                "sync_state"
            ],
            metaFields :{totalRecords:"totalRecords"}
        };

        var buildQueryString = function(state,dt){
//            alert("paged");
            return {offset:state.pagination.recordOffset,rowspp:state.pagination.rowsPerPage};
        };

        var dataTableConfig = {
            initialRequest:"",
            paginator: new YAHOO.widget.Paginator({
                rowsPerPage:4
            }),
            generateRequest : buildQueryString,
            paginationEventHandler : YAHOO.widget.DataTable.handleDataSourcePagination
//            paginationEventHandler : YAHOO.widget.DataTable.handleSimplePagination
        };

        this.datatable = new YAHOO.widget.DataTable("ActivityDataTable", columnDefs,
            this.datasource, dataTableConfig);
        this.datatable.set("selectionMode","single");

    var onRowDblClick = function(oArgs){
//        alert("dbl");
        try{
          var targetRow = oArgs.target;
          var targetRecordData = this.getRecord(targetRow).getData();
//          alert(targetRecordData.birthday);
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
//        alert(m3958.utils.DisplayPropertyNames(oArgs));
//        alert(Event.getTarget(oArgs.event).tagName + "kkk");
        this.onEventSelectRow(oArgs);
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
                  fao.variables.db.execute("delete from activities where id = ?", [targetRecordData.id]);
              }
            }
            else if(targetEl.innerHTML == "人员"){
//                alert(targetRecordData.id);
                fao.variables.curactivity = targetRecordData;
                fao.doms.staff_radio.click();
                fao.variables.staffds_datatable.datatable.set("caption",fao.utils.chDate(fao.variables.curactivity.cfshijian) + "出访" + fao.variables.curactivity.dguojia  + "的人员列表");
//                fao.variables.activities_datatable.datatable.render();
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
