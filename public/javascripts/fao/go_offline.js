// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Change this to set the name of the managed resource store to create.
// You use the name with the createManagedStore, and removeManagedStore,
// and openManagedStore APIs. It isn't visible to the user.
fao.classes.OffStore = function(){
  this.STORE_NAME = "fao_offline_docset";

  // Change this to set the URL of tha manifest file, which describe which
  // URLs to capture. It can be relative to the current page, or an
  // absolute URL.
  this.MANIFEST_FILENAME = "../../../faomanifest.json";
  this.localServer = google.gears.factory.create("beta.localserver");
  this.exe_onprogress = false;
  var offline_onprogress = function(details){
    var percent = Math.round(details.filesComplete/details.filesTotal*100);
    fao.variables.offstore.exe_onprogress = true;
    fao.doms.indicator.innerHTML = "离线下载完成" + percent + "%";
  };
   var offline_oncomplete = function(details){
     if(fao.variables.offstore.exe_onprogress){
       alert("系统已经自动升级到："+ details.newVersion + " 请按F5刷新浏览器。");
     }
   }

  //return null if no store exists.
  this.store = this.localServer.openManagedStore(this.STORE_NAME);
  if(this.store){
    this.store.onprogress = offline_onprogress;
    this.store.oncomplete = offline_oncomplete;
  }
//  // Called onload to initialize local server and store variables
  this.switch_state = function(){
    //if offline ,now start online.
    this.store.enabled = this.store.enabled ? false : true
//    alert("offline?" + this.store.enabled);
          if(fao.variables.offstore.store.enabled){
            fao.doms.switch_btn.innerHTML = "offline now,click to go online!";
          }else{
            fao.doms.switch_btn.innerHTML = "online now,click to go offline!";
          }
  };
  
//  var switch_state111 = function(){
//    var sqlstmt = 'select * from linestates'; 
//    var rs = fao.variables.db.execute(sqlstmt);
//    if(rs.isValidRow()) {
//      var curstate = rs.fieldByName("state");
//      if(curstate == "offline"){
//        offline_removeStore();
//        fao.variables.db.execute("update linestates set state='online'");
//        fao.doms.switch_btn.innerHTML="go offline!";
//      }else{
//        offline_createStore();
//        fao.variables.db.execute("update linestates set state='offline'");
//        fao.doms.switch_btn.innerHTML="go online!";
//      }
//    }else{
//      offline_createStore();
//      fao.variables.db.execute("insert into linestates (state) values (?)",["offline"]);
//      fao.doms.switch_btn.innerHTML="go offline!";
//    }
//    if(rs){
//      rs.close();
//    }
//  };
  // Create the managed resource store
  this.offline_createStore = function() {
    if (!window.google || !google.gears) {
      alert("You must install Gears first.");
      return;
    }
    fao.variables.db.execute("update settings set myvalue ='true' where mykey = ?",["offline"]);
    fao.variables.offline = true;
    fao.doms.switch_btn.innerHTML="now offline,click to go online!";
    this.store = this.localServer.createManagedStore(this.STORE_NAME);
    this.store.manifestUrl = this.MANIFEST_FILENAME;
    this.store.checkForUpdate();
    this.store.onprogress = offline_onprogress;
    this.store.oncomplete = offline_oncomplete;
// if download error occur,this function will display a note.
    var timerId = window.setInterval(function() {
      // When the currentVersion property has a value, all of the resources
      // listed in the manifest file for that version are captured. There is
      // an open bug to surface this state change as an event.
      if (fao.variables.offstore.store.currentVersion) {
        window.clearInterval(timerId);
        fao.variables.db.execute("update settings set myvalue = 'false' where mykey = ?",["firstrun"]);
        fao.doms.indicator.innerHTML = "";
        fao.doms.fao_version.innerHTML = "(" +fao.variables.offstore.store.currentVersion + ")";
      } else if (fao.variables.offstore.store.updateStatus == 3) {
        fao.variables.offstore.textOut("Error: " +fao.variables.offstore.store.lastErrorMessage);
      }
    }, 500);
  }
//   offline_createStore();
  // Remove the managed resource store.
  this.offline_removeStore=function() {
    if (!window.google || !google.gears) {
      alert("You must install Gears first.");
      return;
    }
        fao.variables.db.execute("update settings set myvalue ='false' where mykey = ?",["offline"]);
        fao.variables.offline = false;
        fao.doms.switch_btn.innerHTML="now online,click to go offline!";
    this.localServer.removeManagedStore(this.STORE_NAME);
    this.textOut("Done. The local store has been removed." +
            "You will now see online versions of the documents.");
  }

//  this.hardly_removeStore=function() {
//    if (!window.google || !google.gears) {
//      alert("You must install Gears first.");
//      return;
//    }
//    alert("remove local store now");
//    this.localServer.removeManagedStore(this.STORE_NAME);
//    alert("local store has moved");
//  };
//
  // Utility function to output some status text.
  this.textOut =function(s) {
   var elm = document.getElementById("textOut");
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
    elm.appendChild(document.createTextNode(s));
  }
};
