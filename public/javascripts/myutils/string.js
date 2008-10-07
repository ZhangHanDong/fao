String.prototype.strip = function(s){
  var mys = s;
  if(YAHOO.lang.isUndefined(mys)){
      mys =  "\s";
  }
  var re=new RegExp("^" + mys + "*(.*?)" + mys + "*$");
  var astr = this.replace(re, "$1");
  return astr;
};

var m3958={utils:{}};

m3958.utils.DisplayPropertyNames = function(obj){
    var names = "";
    for(var name in obj) names += name + "\n";
    alert(names);
}

