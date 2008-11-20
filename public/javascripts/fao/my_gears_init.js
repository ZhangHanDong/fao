/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
fao.f.reset_sync_error = function(){
  fao.variables.db.execute("update staffs set sync_state='retry' where sync_state = 'sync_error'");
  fao.variables.db.execute("update activities set sync_state='retry' where sync_state = 'sync_error'");
  fao.variables.db.execute("update staffds set sync_state='retry' where sync_state = 'sync_error'");
};


fao.f.setsettings = function(){
    //init values,real value will get from db.
    var uuid =new UUID();
    var userhash = uuid.id.replace(/-/g,"").toLowerCase();
    var settings = {pinyindb:'false',
                    offline:'true',
                    firstrun:'true',
                    userhash:userhash,
                    bb_user:'false',
                    user_changed:"false",
                    pagetitle:"MiGuo Foreign Affairs Office",
                    pagefooter:"米国市政府外事办管理系统",
                    yaccount:""
    };

    for(ps in settings){
      fao.variables[ps] = settings[ps];
    }
    var rs = fao.variables.db.execute("select mykey,myvalue from settings");
    while(rs.isValidRow()){
      switch(rs.field(0)){
        case "pinyindb":
          fao.variables.pinyindb = rs.field(1) == "true" ? true :false
          settings.pinyindb = undefined;
          break;
        case "offline":
          fao.variables.offline= rs.field(1) == "true" ? true :false
          settings.offline = undefined;
          break;
        case "firstrun":
          fao.variables.firstrun= rs.field(1) == "true" ? true :false
          settings.firstrun= undefined;
          break;
        case "pagetitle":
          fao.variables.pagetitle= rs.field(1)
          settings.pagetitle= undefined;
          break;
        case "pagefooter":
          fao.variables.pagefooter= rs.field(1)
          settings.pagefooter = undefined;
          break;
        case "yaccount":
          fao.variables.yaccount= rs.field(1)
          settings.yaccount = undefined;
          break;
        case "userhash":
          fao.variables.userhash= rs.field(1)
          settings.userhash= undefined;
          break;
        case "bb_user":
          fao.variables.bb_user= rs.field(1) == "true" ? true :false
          settings.bb_user= undefined;
          break;
        case "user_changed":
          fao.variables.user_changed= rs.field(1) == "true" ? true :false
          settings.user_changed= undefined;
          break;
     }
      rs.next();
    }

    for(ps in settings){
      if(settings[ps] !== undefined){
        fao.variables.db.execute("insert into settings (mykey,myvalue) values (?,?)",[ps , settings[ps] + ""]);
      }
    }
    rs.close();
};


fao.f.my_gear_init = function() {
  if (window.google && google.gears) {
    try {
      fao.variables.db = google.gears.factory.create('beta.database');
      if (fao.variables.db) {
        fao.variables.db.open('database-fao');
        fao.variables.db.execute('create table if not exists staffs' +
                   ' (id varchar(255),' +
                   ' userhash varchar(255),' +
                   ' name varchar(255),' +
                   ' danwei varchar(255),' +
                   ' zhiwu varchar(255),' +
                   ' hzhaoma varchar(255),' +
                   ' hzfzriqi date,' +
                   ' hzyxq date,' +
                   ' hzghriqi date,' +
                   ' pyname varchar(255),' +
                   ' spyname varchar(255),' +
                   ' sex integer,' +
                   ' birthday date,' +
                   ' note text,' +
                   ' sync_state varchar(255),' +
                   ' created_at datetime,' +
                   ' updated_at datetime,' +
                   ' PRIMARY KEY (id))'
           );

        fao.variables.db.execute('create table if not exists staffds' +
                   ' (id varchar(255),'  +
                   ' userhash varchar(255),' +
                   ' staff_id varchar(255),'  +
                   ' activity_id varchar(255),'  +
                   ' danwei varchar(255),' +
                   ' zhiwu varchar(255),' +
                   ' isreturned integer,' +
                   ' note text,' +
                   ' hzhaoma varchar(255),' +
                   ' hzghriqi date,' +
                   ' sync_state varchar(255),' +
                   ' created_at datetime,' +
                   ' updated_at datetime,' +
                   ' PRIMARY KEY (id),' +
                   ' UNIQUE (activity_id, staff_id))'
        );
        fao.variables.db.execute('create table if not exists activities' +
                   ' (id varchar(255),' +
                   ' userhash varchar(255),' +
                   ' sqriqi date,' +
                   ' dguojia varchar(255),' +
                   ' dgjpy varchar(255),' +
                   ' dgjspy varchar(255),' +
                   ' renwu text,' +
                   ' cfshijian date,' +
                   ' tltianshu integer,' +
                   ' ztdanwei varchar(255),' +
                   ' yqdanwei varchar(255),' +
                   ' rwpihao varchar(255),' +
                   ' note text,' +
                   ' sync_state varchar(255),' +
                   ' created_at datetime,' +
                   ' updated_at datetime,' +
                   ' PRIMARY KEY (id))'
           );
        fao.variables.db.execute('create table if not exists pys' + 
            ' (id varchar(255),' +
            ' hanzi varchar(254),' +
            ' pys varchar(254),' +
            ' PRIMARY KEY (id))' 
            );
        fao.variables.db.execute('create table if not exists linestates' + 
            ' (id varchar(255),' +
            ' state varchar(254),' +
            ' PRIMARY KEY (id))' 
            );
        fao.variables.db.execute('create table if not exists settings' + 
            ' (mykey varchar(255),' +
            ' myvalue varchar(255),' +
            ' UNIQUE (mykey))'
            );
        fao.f.setsettings();
//        var rrs = fao.variables.db.execute("select myvalue from settings where mykey = 'userhash'");
//        var userhash = "";
//        if(rrs.isValidRow()){
//          userhash = rrs.fieldByName("myvalue");
//        }
//        rrs.close();
//        if(userhash){
//          fao.variables.db.execute("update staffs set userhash = ?",[userhash]);
//          fao.variables.db.execute("update staffds set userhash = ?",[userhash]);
//          fao.variables.db.execute("update activities set userhash = ?",[userhash]);
//        }
      }
    } catch (ex) {
      alert(ex.message);
    }
  }
};


