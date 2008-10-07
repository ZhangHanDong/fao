/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
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
        fao.variables.db.execute('create table if not exists linestates' + 
            ' (id varchar(255),' +
            ' state varchar(254),' +
            ' PRIMARY KEY (id))' 
            );
      }
    } catch (ex) {
      alert(ex.message);
    }
  }
};


