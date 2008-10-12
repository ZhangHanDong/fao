/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

fao.f.setsettings = function(){
    var settings = {pinyindb:false,
                    offline:false
    };

    for(ps in settings){
      fao.variables[ps] = settings[ps];
    }
    var rs = fao.variables.db.execute("select mykey,myvalue from settings");
    while(rs.isValidRow()){
      switch(rs.field(0)){
        case "pinyindb":
          if(rs.field(1) == "true")fao.variables.pinyindb=true;
          settings.pinyindb = undefined;
          break;
        case "offline":
          if(rs.field(1) == "true")fao.variables.offline=true;
          settings.offline = undefined;
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



fao.f.setsettings1 = function(){
    var ary_extra = function(ary,ele){
      var new_ary = [];
      for(var i=0;i<ary.length;i++){
        if(ary[i] != ele)new_ary.unshift(ele);
      }
      return new_ary;
    };
    //every key in keys,must have an fao.varaibles.
    var all_keys= ["pinyindb","offline"];
    var exist_keys = [];
    fao.variables.pinyindb = false;
    fao.variables.offline = false;

    var rs = fao.variables.db.execute("select mykey,myvalue from settings");
    while(rs.isValidRow()){
      switch(rs.field(0)){
        case "pinyindb":
          if(rs.field(1) == "true")fao.variables.pinyindb=true;
          exist_keys.unshift("pinyindb"); 
          break;
        case "offline":
          if(rs.field(1) == "true")fao.variables.offline=true;
          exist_keys.unshift("offline"); 
          break;
      }
      rs.next();
    }

    for(var i=0;i<all_keys.length;i++){
      var ye = false;
      for(var j=0;j<exist_keys.length;j++){
        if(all_keys[i] == exist_keys[j]){
          ye = true;
          break;
        }
      }
      if(!ye)fao.variables.db.execute("insert into settings (mykey,myvalue) values (?,?)",[all_keys[i],"false"]);
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
                   ' name varchar(255),' +
                   ' danwei varchar(255),' +
                   ' zhiwu varchar(255),' +
                   ' hzhaoma varchar(255),' +
                   ' hzghriqi varchar(255),' +
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
            ' myvalue varchar(255))' 
            );
        fao.f.setsettings();
      }
    } catch (ex) {
      alert(ex.message);
    }
  }
};


