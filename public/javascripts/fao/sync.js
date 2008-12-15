fao.classes.MySync = function(){
  this.workerPool = google.gears.factory.create('beta.workerpool');
  this.workerPool.onmessage = function(a, b, message) {
//    alert('Received message from worker ' + message.sender + ': \n' + message.body);
    switch(message.body[2].action){
      case 'popup':
        alert(message.body[2].text);
        break;
      case 'indicator':
        fao.doms.indicator.innerHTML =  message.body[2].text;
        break;
      case 'downsync':
        var t = message.body[2].msg.offset + "/" + message.body[2].msg.total + " of " + message.body[2].msg.tables[message.body[2].msg.cur_table] + " completed! ";
        fao.doms.indicator.innerHTML =  t;
        fao.variables.mysync.workerPool.sendMessage(["3..2..", 1, message.body[2].msg], message.sender);
        break;
      case 'upsync':
        fao.variables.mysync.workerPool.sendMessage(["3..2..", 1, {}], message.sender);
        break;
      default:
        fao.doms.textout.innerHTML = message.body[2].text;
    }
  };

  this.start_insert_py = function(){
    if(!fao.variables.pinyindb){
      this.insertpyWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/insert_pys.js');
      this.workerPool.sendMessage(["3..2..", 1, {}],this.insertpyWorkerId);
    }
  }

  this.syncDataWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/sync_data_worker.js');
  this.downSyncDataWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/down_sync_data_worker.js');
  this.authenticityWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/authenticity_token_worker.js');
  this.workerPool.sendMessage(["3..2..", 1, {syncWorkerId: this.syncDataWorkerId}], this.authenticityWorkerId);

  this.down_sync_data = function(){
    fao.variables.db.execute("delete from staffs");
    fao.variables.db.execute("delete from staffds");
    fao.variables.db.execute("delete from activities");
    fao.variables.mysync.workerPool.sendMessage(["3..2..", 1, {userhash:fao.variables.userhash,limit:5,offset:0,orderby:"id",tables:["staffs","staffds","activities"],cur_table:0}], fao.variables.mysync.downSyncDataWorkerId);
  }
};
