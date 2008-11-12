var x = new function(){
  this.message = "";
  this.syncWorkerId = null;
  var wp = google.gears.workerPool;
  this.formauthenticitytoken = "";

  var sy = function(){
    var request = google.gears.factory.create('beta.httprequest');
    request.open('GET', '/ceshi/formauthenticitytoken');
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        //console.write(request.responseText);
        wp.sendMessage(["a","b",{authenticity_token:request.responseText,fatherWorkerId:x.message.sender}], x.syncWorkerId);
      }
    };
    request.send();
  }

  wp.onmessage = function(a, b, message) {
    //message obtain all arguments.a b is just for compact.
    x.message = message;
    x.syncWorkerId = message.body[2].syncWorkerId;
//    var reply = message.body[0] + message.body[1] + "... " + message.body[2].helloWorld;
    var timer = google.gears.factory.create('beta.timer');
//    timer.setInterval(sy,10000);
    sy();
  }
};

