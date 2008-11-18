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
      default:
        fao.doms.textout.innerHTML = message.body[2].text;
    }
  };
  if(!fao.variables.pinyindb){
    this.insertpyWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/insert_pys.js');
    this.workerPool.sendMessage(["3..2..", 1, {}],this.insertpyWorkerId);
  }

  this.syncDataWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/sync_data_worker.js');
  this.downSyncDataWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/down_sync_data_worker.js');
  this.authenticityWorkerId = this.workerPool.createWorkerFromUrl('/javascripts/fao/authenticity_token_worker.js');
  this.workerPool.sendMessage(["3..2..", 1, {syncWorkerId: this.syncDataWorkerId}], this.authenticityWorkerId);

  this.down_sync_data = function(){
    fao.variables.db.execute("delete from staffs");
    fao.variables.db.execute("delete from staffds");
    fao.variables.db.execute("delete from activities");

    fao.variables.mysync.workerPool.sendMessage(["3..2..", 1, {limit:5,offset:0,orderby:"id",tables:["staffs","staffds","activities"],cur_table:0}], fao.variables.mysync.downSyncDataWorkerId);
  }
};
