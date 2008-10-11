var x = new function(){
  this.message = "";
  var wp = google.gears.workerPool;
  this.formauthenticitytoken = "";

  var sy = function(){
    var request = google.gears.factory.create('beta.httprequest');
    request.open('GET', '/javascripts/pinyin_ary.js');
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        //console.write(request.responseText);
        var pinyin_ary = request.responseText;
        wp.sendMessage({text:pinyin_ary.length}, x.message.sender);
      }
    };
    request.send();
  }

  wp.onmessage = function(a, b, message) {
    //message obtain all arguments.a b is just for compact.
    x.message = message;
//    var reply = message.body[0] + message.body[1] + "... " + message.body[2].helloWorld;
    sy();
  }
};

