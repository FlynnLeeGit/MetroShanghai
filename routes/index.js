var express = require('express');
var router = express.Router();

var model = require('../model/db');

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  next();
})

//地铁站点路由
router.route('/station')
  .get(function(req, res, next) {
    model.station.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  })
  .post(function(req, res, next) {
    console.log(req.body);
    model.station.get(req.body.id, function(err, data) {
      if (err) throw err;
      data.save(req.body, function(err) {
        if (err) throw err;
        res.status(200);
        res.send('ok');
      })
    })
  })
  .put(function(req, res, next) {
    model.station.create(req.body, function(err, data) {
      if (err) throw err;
       res.json(data);
    })
  })
  .delete(function(req, res, next) {
    model.station.find({
      id: req.body.id
    }).remove(function(err) {
      if (err) throw err;
      res.status(200);
      res.send('ok');
    })
  });

router.get('/maxkey',function(req,res,next){
model.station.aggregate().max('uniquekey').get(function(err,max){
  res.status(200);
  res.json({result:'ok',msg:'取最大key值',maxkey:max});
})
})
// router.get('/station/key/:key',function(req,res,next){
//   model.station.find({uniquekey:req.params.key},function(err,data){
//        if (err) throw err;
//        console.log(data[0]);
//     res.json(data[0]);
//   })
// })
router.get('/stationselect',function(req,res,next){
 model.station.find(['line','A']).only('uniquekey','line','chsName').run(function(err,data){
    var optionObj={};
    for(var k in data){
      if(!optionObj[data[k].line]){
        optionObj[data[k].line]=[];
      }else{
         optionObj[data[k].line].push(data[k]);
      }
    }
    res.json(optionObj);  //生成以线路号为键名的对象
 })

})




//站点的间隔时间的路由
router.route('/time')
  .get(function(req, res, next) {
    model.time.find(['id','Z'],function(err, data) {
      var dataArray = [];
      for (var k in data) {
        dataArray[k] = [];
        dataArray[k][0] = data[k]['uniquekey_id'];
        dataArray[k][1] = data[k]['next'];
        dataArray[k][2] = data[k]['value'];
      }
      //格式化为二维数组dataArray输出 以便dij算法调用
      if (err) throw err;
      res.json(dataArray);
    })
  })

.post(function(req, res, next) {
  console.log(req.body);
  model.time.create(req.body, function(err, data) {
    res.status(200);
    res.send('ok')
  })
})

.put(function(req, res, next) {
  console.log(req.body);
  model.time.create(req.body, function(err, data) {
    if (err) throw err;
    res.json(data);
  })
})
.delete(function(req, res, next) {
  model.time.find({
    id: req.body.id
  }).remove(function(err) {
    if (err) throw err;
    res.status(200);
    res.send('ok');
  })
})


router.route('/transfer')
  .get(function(req, res, next) {
    model.transfer.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  })
  .put(function(req, res, next) {
    model.transfer.create(req.body, function(err) {
      if (err) throw err;
      res.status(200);
      res.send('ok');
    })
  });




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Metro Shanghai'
  });
});

module.exports = router;
