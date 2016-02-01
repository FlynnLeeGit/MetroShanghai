import orm from 'orm';

import opts from '../conf/dbSetting';  //引入数据库配置



const db=orm.connect(opts,(err,db)=>{
	if (err) throw err;
	return db;
})

const model={};

model.station=db.define('station',{
	uniquekey:Number,
  line:Number,
  chsName:String,
  engName:String,

  left:Number,
  top:Number,

  nodeType:String,
	nodeAngel:Number,

  nameAngel:Number,
	nameVisible:Number,

	nameLeft:Number,
	nameTop:Number,
	assist:Number,
  wc:Number,

  lineAngel:Number,
  lineWidth:Number,
  lineOffset:Number,

	line2Visible:Number,
	line2Angel:Number,
	line2Width:Number,
	line2Offset:Number,
})

model.time=db.define('time',{
	uniquekey_id:Number,
	next:Number,
	value:Number,
})

model.time.hasOne('uniquekey',model.station,{  //拥有者的字段为key,被拥有的字段为key_id
	autoFetch:true,     //被拥有的表查询是加入一个键名key扩展对象
	//reverse:'time',   //此项填写后拥有者的表查询加入一个timeData键名的扩展数组
})


export default model;
