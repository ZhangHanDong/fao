fao.classes.DialogPageSetting = function() {
	// Define various event handlers for Dialog
        // this is a button handler,wheater validation passed or not,it will be called any way.
        // so we must set a flag to refection the validate results.

	var handleSubmit = function() {
          this.submit();
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
              Dom.get("hzfzriqi_sf_dlg").value = fao.utils.date2str(oData.hzfzriqi);
              Dom.get("hzyxq_sf_dlg").value = fao.utils.date2str(oData.hzyxq);
              Dom.get("hzghriqi_sf_dlg").value = fao.utils.date2str(oData.hzghriqi);
//              Dom.get("pyname_sf_dlg").value = oData.pyname;
//              Dom.get("spyname_sf_dlg").value = oData.spyname;
              var birthday = oData.birthday;
              Dom.get("birthday_sf_dlg").value =  fao.utils.date2str(oData.birthday);
//              alert(oData.birthday instanceof Date);
              Dom.get("sex_sf_dlg").checked = oData.sex == "false" ? false : true;
              Dom.get("note_sf_dlg").value = oData.note;
            }
            catch(e){
                alert("from staff.js" + e.message);
            }
        };

	// Instantiate the Dialog
	this.dialog = new YAHOO.widget.Dialog("pageSettingDialog",
							{ width : "20em",
                                                          zIndex : 10,
							  fixedcenter : true,
							  visible : false,
							  constraintoviewport : true,
                                                          postmethod: "none",
							  buttons : [ { text:"添加", handler:handleSubmit, isDefault:true },
								      { text:"取消", handler:handleCancel }]
							});

	// Validate the entries in the form to require that both first and last name are entered
	this.dialog.validate = function() {
            try{
		var data = this.getData();
                if(!data.title || !data.footer){
                  alert("请输入页面标题和页脚内容。");
                  return false;
                }
                fao.variables.db.execute("update settings set myvalue = ? where mykey = ?",[data.title,"pagetitle"]);
                Dom.get("pagetitle").innerHTML = data.title;
                fao.variables.db.execute("update settings set myvalue = ? where mykey = ?",[data.footer,"pagefooter"]);
                Dom.get("pagefooter").innerHTML = data.footer;
                fao.variables.db.execute("update settings set myvalue = ? where mykey = ?",[data.yaccount,"yaccount"]);
//                Dom.get("pagefooter").innerHTML = data.footer;
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
        var  pageSettingClick = function(){
            this.dialog.show();
        };
	Event.addListener("lt_menu_setting", "click", pageSettingClick, this, true);
};
