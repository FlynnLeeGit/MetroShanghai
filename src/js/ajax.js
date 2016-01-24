import $ from 'jquery';
const host = 'http://192.168.2.101:3000';

const ajax = {
  stationGet(fnDone) {
      $.ajax({
        url: `${host}/station`,
        type: 'get',
        success: (result) => {
          fnDone(result);
        },
        error: (err) => console.log(err)
      })
    },
    stationPost(data, fnDone) {
      $.ajax({
        url: `${host}/station`,
        method: 'post',
        data: data,
        success: (result) => {
          if (result == 'ok') {
            fnDone();
          }
        }
      })
    },
    stationPut(data, fnDone) {
      $.ajax({
        url: `${host}/station`,
        method: 'put',
        data: data,
        success: (result) => {
          if(result){
            fnDone(result);
          }
        }
      })
    },
    stationDel(id, fnDone) {
      $.ajax({
        url: `${host}/station`,
        method: 'delete',
        data: {
          id: id
        },
        success: (result) => {
          if (result == 'ok') {
            fnDone();
          }
        }
      })
    },
    maxKeyGet(fnDone){
      $.ajax({
        url:`${host}/maxkey`,
        method:'get',
        success:(data)=>{
          if(data.result=='ok'){
            fnDone(data.maxkey);
          }
        }
      })
    },
    timeGet(fnDone) {
      $.ajax({
        url: `${host}/time`,
        type: 'get',
        success: (result) => {
          fnDone(result);
        },
        error: (err) => console.log(err)
      })
    },

  timePut(data,fnDone){
   $.ajax({
     url: `${host}/time`,
     type:'put',
     data:data,
     success:(result)=>{
       if(result){
         console.log(3);
         fnDone(result);
       }
     },
     error:(err)=>console.log(err)
   })
 },
 timeDel(id,fnDone){
   $.ajax({
     url: `${host}/time`,
     method: 'delete',
     data: {
       id: id
     },
     success: (result) => {
       if (result == 'ok') {
         fnDone();
       }
     }
   })

 },



    transferGet(fnDone) {
      $.ajax({
        url: `${host}/transfer`,
        type: 'get',
        success: (result) => {
          fnDone(result);
        },
        error: (err) => console.log(err)
      })
    },
    transferPut(data, fnDone) {
      $.ajax({
        url: `${host}/transfer`,
        type: 'put',
        data: data,
        success: (result) => {
          if (result == 'ok') {
            fnDone();
          }
        },
        error: (err) => console.log(err)
      })
    }


}

export default ajax;
