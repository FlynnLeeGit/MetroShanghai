var express = require('express');
var router = express.Router();

var model = require('../model/db');

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//     res.header('X-Powered-By', '3.2.1');
    next();
})

//地铁站点路由

router.route('/test')
    .get(function(req, res) {
        console.log(req.body);
        res.status(200);
        res.send('get');
    })
    .put(function(req, res) {
        console.log(req.body);
        res.status(200);
        res.send('put');
    })
    .post(function(req, res) {
        console.log(req.body);
        model.station.find({id:req.body.id},function(err,data){
          res.json(data);
        })
        res.status(200);
        res.json(req.body);
    })
    .delete(function(req, res) {
        console.log(req.body);
        res.status(200);
        res.send('delete');
    });


router.route('/station')
    .get(function(req, res, next) {
        model.station.find(['line', 'A'], function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    })
    .post(function(req, res, next) {
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

router.get('/maxkey', function(req, res, next) {
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
    .get(function(req, res, next) {
        model.time.find(['id', 'Z'], function(err, data) {
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


router.route('/transfer/:chsName')
    .get(function(req, res, next) {
        console.log(req.params);
        model.station.find({
            nodeType: 'transfer',
            chsName: req.params.chsName
        }).only('uniquekey', 'line', 'chsName').run(function(err, data) {
            res.json(data);
        })
    })




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Metro Shanghai'
    });
});

module.exports = router;
