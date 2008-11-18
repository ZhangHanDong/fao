/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
  fao.f.event_handlers = function(){
    var staff_radio_handler = function(ev){
      if(fao.variables.cur_table == 1){
          return;
      }
      else{
        fao.variables.pre_activity_phase = fao.doms.ac_input.value;
        fao.doms.ac_input.value = fao.variables.pre_staff_phase;
        fao.variables.cur_table = 1;
        fao.doms.activity_tab.style.display="none";
        fao.doms.staff_tab.style.display="block";
        var condi = {
            offset:fao.variables.staffs_datatable.datatable.get("paginator").get("recordOffset"),
            rowspp:fao.variables.staffs_datatable.datatable.get("paginator").get("rowsPerPage")
        }
        fao.variables.staffs_datatable.datatable.get("paginator").setPage(fao.variables.staffs_datatable.datatable.get("paginator").getCurrentPage());
      }
    };
    Event.addListener(fao.doms.staff_radio,"click",staff_radio_handler);

    var activity_radio_handler = function(ev){
      try{
        if(fao.variables.cur_table == 2){
            return;
        }
        else{
          fao.variables.pre_staff_phase = fao.doms.ac_input.value;
          fao.doms.ac_input.value = fao.variables.pre_activity_phase;
          fao.variables.cur_table = 2;
          fao.doms.activity_tab.style.display="block";
          fao.doms.staff_tab.style.display="none";
          fao.variables.activities_datatable.datatable.get("paginator").setPage(fao.variables.activities_datatable.datatable.get("paginator").getCurrentPage(),false);
          fao.variables.activities_datatable.datatable.render();
        }
      }
      catch(e){
          alert(e.message);
      }
    };
    Event.addListener(fao.doms.activity_radio,"click",activity_radio_handler);

    var my_gear_desktop = function(){
      var desktop = google.gears.factory.create('beta.desktop');
      try{
        desktop.createShortcut('FengHua fao',
                           '/index.html',
                           {'128x128': '/images/geardesk/128x128.png',
                              '48x48': '/images/geardesk/48x48.png',
                              '32x32': '/images/geardesk/32x32.png',
                              '16x16': '/images/geardesk/16x16.png'},
                           'An application at http://m.m3958.com/index.html');
      
      }catch(e){
        alert(e.message);
      }
    };
    Event.addListener("gear_desktop","click",my_gear_desktop);

    var my_switch_btn= function(){
      fao.variables.offstore.switch_state(); 
    };
    Event.addListener("switch_btn","click",my_switch_btn);

    var my_dbl_switch_btn = function(){
      fao.variables.offstore.offline_removeStore();
    }
    Event.addListener("switch_btn","dblclick",my_dbl_switch_btn);

    var lt_menu_login = function(){
      var message = '请点击右边的Install按钮开始安装。';
      var url = 'http://gears.google.com/?action=install'
          + '&message=' + encodeURIComponent(message)
          + '&return=' + encodeURIComponent(window.location.href);
      var g_message = innerHTML = '<a href="' + url + '">要使用本系统需要安装来自Google(谷歌)的Gears </a>';

      var g_panel = new YAHOO.widget.Panel("g_panel", {fixedcenter: true, width:"320px", visible:true, constraintoviewport:true } );
          g_panel.setHeader("需要安装");
          g_panel.setBody(g_message);
          g_panel.render(document.body);
    }
    Event.addListener("lt_menu_login","click",lt_menu_login);

    fao.variables.data_restore_panel = new YAHOO.widget.Panel("data_restore_panel",{
	width:"320px", 
	fixedcenter: true, 
	constraintoviewport: true, 
	underlay:"shadow", 
	close:true, 
	visible:false, 
	draggable:true} );
    fao.variables.data_restore_panel.render();
//    data_restore_panel.show();

    var lt_menu_data = function(){
      fao.variables.data_restore_panel.show();
    }

    Event.addListener("lt_menu_data","click",lt_menu_data);
    

    var a_data_restore = function(){
      fao.variables.mysync.down_sync_data();
      fao.variables.data_restore_panel.hide();
    }
    Event.addListener("a_data_restore","click",a_data_restore);

  };
