var argv = process.argv.splice(2); //得到所有node命令的参数带--
var args = {};
for (var i in argv) {
  var key = argv[i].substr(2); //将去掉--的参数放入args对象
  args[key] = true;
}
module.exports = args; //导出args对象
