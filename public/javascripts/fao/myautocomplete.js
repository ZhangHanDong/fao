fao.classes.AutoComp = function(){
//  var textboxKeyHandler = function(sType,oArgs){
//    if(!fao.doms.ac_input.value && (oArgs[1] == 8 || oArgs[1] == 46)){
//      if(fao.variables.cur_table == 1)
//          fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
//      else
//          fao.variables.activities_datatable.datasource.sendRequest('',fao.variables.activities_datatable.datatable.onDataReturnInitializeTable, fao.variables.activities_datatable.datatable);
//      alert(oArgs[1]);
//    }
//  };

  var getResults = function(query) {
    if(fao.variables.cur_table == 1){
//        fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.datatable.onDataReturnInitializeTable, fao.variables.staffs_datatable.datatable);
//                for( name in fao.variables.staffs_datatable.dsRequestCallback){
//                  alert(name);
//                  alert(fao.variables.staffs_datatable.dsRequestCallback[name]);
//                }
//                               alert(fao.variables.staffs_datatable.dsRequestCallback.success);   
                fao.variables.staffs_datatable.datatable.set("caption",fao.doms.ac_input.value ? "人员名字中包含 '" + fao.doms.ac_input.value + "' 的人员列表" : "所有人员列表");
                 fao.variables.staffs_datatable.datasource.sendRequest('', fao.variables.staffs_datatable.dsRequestCallback);
                 
    }
    else{
        fao.variables.activities_datatable.datatable.set("caption",fao.doms.ac_input.value ? "出访国家名称包含 '" + fao.doms.ac_input.value  + "' 的出访列表" : "所有国家出访列表");
        fao.variables.activities_datatable.datasource.sendRequest('',fao.variables.activities_datatable.datatable.onDataReturnInitializeTable, fao.variables.activities_datatable.datatable);
    }
  };
//    var oACDS = new YAHOO.widget.DS_JSFunction(getResults);
  var oACDS = new YAHOO.util.FunctionDataSource(getResults); 
  var oAutoComp = new YAHOO.widget.AutoComplete("ac_input","dt_ac_container", oACDS);
  oAutoComp.minQueryLength = 0; 
  //key event subscribe
//  oAutoComp.textboxKeyEvent.subscribe(textboxKeyHandler);
}

fao.classes.StaffPanel = function(){
  this.panel = new YAHOO.widget.Panel("staff_panel", { visible:false,
                                                        constraintoviewport: true,
                                                        close:true,
                                                        draggable:true,
                                                        context:["staffDataTable","tl","tr"]});
                                                       //context,then panel's corner,then context corner.
  this.panel.render();
  var staffdHideHandler = function(){
      fao.doms.staff_panel_tab.style.display = "none";
      fao.doms.activity_radio.click();
  }
  this.panel.hideEvent.subscribe(staffdHideHandler);
};
