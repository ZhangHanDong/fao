var x = new function(){

  this.message = "";
  var wp = google.gears.workerPool;

  this.sy = function(){
    var request = google.gears.factory.create('beta.httprequest');
    request.open('POST', '/ceshi/testpost');
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        //console.write(request.responseText);
        wp.sendMessage({text:request.responseText},x.message.body.fatherWorkerId);
      }
    };
    request.send("a=4&b=5");
//    request.send("a=4&b=5&authenticity_token=" + x.message.body.authenticity_token);
//    var db = google.gears.factory.create('beta.database');
//    db.open('database-fao');
//    var rs = db.execute("select * from linestates");
//    if(rs.isValidRow()){
//      var state = rs.fieldByName("state");
//      if(state == "online"){
//        wp.sendMessage({text: "online"}, x.message.sender);
//      }else{
//        wp.sendMessage({text: "offline"}, x.message.sender);
//      }
//    }
//    if(rs){
//      rs.close();
//    }
  };

  wp.onmessage = function(a, b, message) {
    //message obtain all arguments.a b is just for compact.
    x.message = message;
    x.sy();
  }
};
