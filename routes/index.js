import express from 'express';
import model from '../model/db';

const router = express.Router();

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
  res.header('X-Powered-By', '3.2.1');
  next();
})

//地铁站点路由



router.route('/station') //获取站点表信息 以线路号排序
  .get((req, res, next) => {

    model.station.find(['line', 'A'], function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  })
  .post((req, res, next) => { //更新数据
    model.station.get(req.body.id, function(err, data) {
      if (err) throw err;
      data.save(req.body, function(err) {
        if (err) throw err;
        res.status(200);
        res.send('ok');
      })
    })
  })
  .put((req, res, next) => {
    var add = {
        uniquekey: req.body.uniquekey,
        line: req.body.line,
        chsName: req.body.chsName,
        engName: req.body.engName,
        nodeType: req.body.nodeType,
        left: req.body.left,
        top: req.body.top,
        nodeAngel: 0,

        nameAngel: 0,
        nameVisible: 1,

        nameLeft: 30,
        nameTop: 30,
        assist: 0,
        wc: 0,

        lineAngel: 0,
        lineWidth: 3,
        lineOffset: 0,

        line2Visible: 0,
        line2Angel: 0,
        line2Width: 3,
        line2Offset: 0,
      }
      //添加站点的获得值与默认值

    model.station.create(add, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  })
  .delete((req, res, next) => {
    model.station.find({
      id: req.body.id
    }).remove(function(err) {
      if (err) throw err;
      res.status(200);
      res.send('ok');
    })
  });

router.get('/maxkey', (req, res, next) => {
  model.station.aggregate().max('uniquekey').get(function(err, max) {
    res.status(200);
    res.json({
      result: 'ok',
      msg: '取最大key值',
      maxkey: max
    });
  })
})


//站点的间隔时间的路由
router.route('/time')
  .get((req, res, next) => {
    model.time.find(['id', 'Z'], (err, data) => {
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

.post((req, res, next) => {
  console.log(req.body);
  model.time.create(req.body, function(err, data) {
    res.status(200);
    res.send('ok')
  })
})

.put((req, res, next) => {
  model.time.create(req.body, function(err, data) {
    if (err) throw err;
    res.json(data);
  })
})

.delete((req, res, next) => {
  console.log(req.body);

  model.time.find(req.body).remove((err) => {
    if (err) throw err;
    res.status(200);
    res.send('ok');
  })
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Metro Shanghai',
  });
});




module.exports = router;
