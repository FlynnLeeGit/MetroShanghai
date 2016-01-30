const calcAngel = (e, direction = 'right') => {
    let parentNode = e.target.parentNode;  //获得父节点
    let [nodeX, nodeY, x, y] = [parentNode.offsetLeft, parentNode.offsetTop, e.pageX, e.pageY];

    let [a, b] = [x - nodeX, y - nodeY]; //获得鼠标点相对于站点组件的横纵坐标
    let c = Math.hypot(a, b); //获得斜边值
    let sinVal = b / c; //得出余弦值
    let newAngel = Math.asin(sinVal) * 180 / Math.PI; //使用反正弦函数获得角度

    switch (direction) {   //判断方向
        case 'right':
            x < nodeX ? newAngel = 180 - newAngel : newAngel;
            break;
        case 'left':
            newAngel = -newAngel;
            x > nodeX ? newAngel = 180 - newAngel : -newAngel;
            break;
    }
    for (let i = -2; i <= 6; i++) { //磁性吸附直角 -45*2 -45*1。。。-45*6
        Math.abs(newAngel / 45 - i) < 0.10 ? newAngel = i * 45 : newAngel;
    }
    return newAngel;
}



const findIndex = (obj,target,child) => {  //寻找target元素是否存在于对象obj中,child参数用于二维对象下的某个下标值
  for (let k in obj) {
    if(child){
        if (obj[k][child] == target) {
           return Number(k);
          }

    }else{
       if (obj[k] == target) {
          return Number(k);
        }
     }
  }
  return -1;
}


//浅比较两个对象属性相等函数
function compare(obj1, obj2) {
  for (var k in obj1) {
    if (typeof obj1[k] !== 'function' && typeof obj1[k] !== 'object') {
      if (obj1[k] !== obj2[k]) {
        return false;
      }
    }
  }
  return true;
}
export default {calcAngel,findIndex,compare};
