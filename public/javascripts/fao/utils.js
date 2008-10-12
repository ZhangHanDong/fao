/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    fao.utils = {
      convertDate : function(date_str){
        var ymd = /(\d{4})[^\d](\d{1,2})[^\d](\d{1,2})/;
        var result = date_str.match(ymd);
        if(!result){
          result = date_str.match(/(\d{4})(\d{2})(\d{2})/);
        }
        if(result){
            var date = new Date(result[1],result[2],result[3],1,1,1,1);
            return date.getTime();
        }
        else{
            return 0;
        }
      },
      convertAge : function(nDatetimes){
          var date = new Date(nDatetimes);
          var thisyear = new Date();
          return(thisyear.getFullYear() - date.getFullYear());
      },
      formatDate : function(elCell, oRecord, oColumn, oData){
          var date =oData;
          var y = date.getFullYear();
          var m = date.getMonth();
          var d = date.getDate();
          m = m < 10 ? "0"+ m : m;
          d = d < 10 ? "0"+ d : d;
          elCell.innerHTML = y + "-" + m + "-" + d;
      },
      formatDeleteButton : function(el, oRecord, oColumn, oData) {
        el.innerHTML = "<button type=\"button\">删除</button>";
      },
      formatStaffsButton : function(el, oRecord, oColumn, oData) {
          el.innerHTML = "<button type=\"button\">人员</button>";
      },
      chDate : function(oDate){
          var date =oDate;
          var y = date.getFullYear();
          var m = date.getMonth();
          var d = date.getDate();
          m = m < 10 ? "0"+ m : m;
          d = d < 10 ? "0"+ d : d;
          return(y + "年" + m + "月" + d + "日");
      }
    };

    fao.utils.ch2py = new function(){
      this.pya = [];  
      this.pyb = [];
      this.pyc = [];
      this.pyd = [];

      this.find_pinyin111= function(c){
        for(var i=0;i<pinyin_ary.length;i++){
          var py = pinyin_ary[i].split(",");
          if(py[0] == c){
            return py[1];
          }else{
            false;
          }
        }
      };
     this.find_pinyin = function(c){
       var rs = fao.variables.db.execute("select pys from pys where hanzi=?",[c]);
       if(rs.isValidRow()){
         return rs.field(0);
       }else{
         return false;
       }
       if(rs)rs.close();
     }; 

      this.find_pystr = function(str){
        try{
          this.pya = [""];
          this.pyc = [""];
          for(var i=0;i<str.length;i++){
            var py = this.find_pinyin(str.charAt(i));
            if(py){
              var pys = py.split(/\s/);
              for(var j=0;j<pys.length;j++){
                for(var k=0;k<this.pya.length;k++){
                  this.pyb.push(this.pya[k] + pys[j]);
                  this.pyd.push(this.pyc[k] + pys[j].charAt(0));
                }
              }
              this.pya = this.pyb;
              this.pyc = this.pyd;
              this.pyb = [];
              this.pyd = [];
            }
          }
          return [this.pya,this.pyc];
        }catch(e){
          alert("from fao.utils.ch2py:" + e.message);
        }
      };
    };
