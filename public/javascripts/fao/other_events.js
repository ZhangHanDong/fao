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
      alert("ya");
      var desktop = google.gears.factory.create('beta.desktop');
      alert(desktop);
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
  };
