fao.f.psf =  function(){
  var pagetitle = "";
  var pagefooter = "";
  var rs = fao.variables.db.execute("select myvalue from settings where mykey = ?",["pagetitle"]);
  if(rs.isValidRow()){
    pagetitle = rs.field(0);
  }
  rs = fao.variables.db.execute("select myvalue from settings where mykey = ?",["pagefooter"]);
  if(rs.isValidRow()){
    pagefooter = rs.field(0);
  }
  rs.close();
  Dom.get("pagetitle").innerHTML= pagetitle;
  Dom.get("pagefooter").innerHTML  = pagefooter;
 }

