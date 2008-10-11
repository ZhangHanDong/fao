var x = new function(){
  this.message = "";
  var wp = google.gears.workerPool;
  var sy = function(){
    var db = google.gears.factory.create('beta.database');
    db.open('database-fao');
    var rs = db.execute("select * from linestates");
    if(rs.isValidRow()){
      var state = rs.fieldByName("state");
      if(state == "online"){
        wp.sendMessage({text: "online"}, this.message.sender);
      }else{
        wp.sendMessage({text: "offline"}, this.message.sender);
      }
    }
    if(rs){
      rs.close();
    }
  };
  wp.onmessage = function(a, b, message) {
    //message obtain all arguments.a b is just for compact.
    this.message = message;
    var reply = message.body[0] + message.body[1] + "... " + message.body[2].helloWorld;
    var timer = google.gears.factory.create('beta.timer');
    timer.setInterval(sy,10000);
  }
};
