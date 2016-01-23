 class Dij {
   constructor(n) {
     this.n = n;  //n为顶点数量
     let [M, U, P] = [
       [],
       [],
       [],
     ]; //创建n*n二维数组M，创建个数为n的标记数组U，创建跳跃节点记录的数组P

     for (let i = 0; i < this.n; i++) { //M的每行为空数组,
       M[i] = [];
       P[i] = []; //P的每行为空数组
       M[i][i] = Infinity; //横纵下标相同的元素为Infinity
       U.push(false); //U标记数组的每个元素为false
     }

     this.M = M; //二维矩阵数组
     this.U = U; //标记数组
     this.P = P; //路径跃点数组
   }
   initSource(data) { //数据初始化 将data数据导入
     /*通过传入的数据判定顶点数量*/
     //将数据传入数组
     let _i, _j, _val;
     for (let k in data) {
       [_i, _j, _val] = [data[k][0], data[k][1], data[k][2]]; //从数据源[1,3,4]标识从第2个节点到第4个节点距离为4
       if (_i >= this.n || _j >= this.n) {
         throw new Error('传参错误，输入的节点下标超过了顶点数量！');
       }
       this.M[_i][_j] = this.M[_j][_i] = _val; //赋值
     }
   }



   setStart(start, end) { //设定需要计算的起点与终点
     this.clonePath = this.P.concat([]); //需要克隆出Path数组以供多次计算，此为二维数据需进行深拷贝
     for (let _k = 0; _k < this.clonePath.length; _k++) {
       if(this.clonePath[_k].length == 0) continue;  //已经是空数组的不用理会
       this.clonePath[_k] = [];
     }
     this.cloneUnion = this.U.concat([]); //需要克隆初始Union集合以供多次运算,此为一维数组

     this.opposite=false;
     if (end < start) {
       [start, end] = [end, start]; //如果终点比起点小 互换起终点查询
       this.opposite=true;   //相反的变量标记
     }

     [this.start, this.end] = [start, end];

     this.checkNum(); //验证合法性

     this.D = this.M[start]; // 缓存需要操作的行
     for (let i = start; i < this.n; i++) {
       if (!this.D[i]) this.D[i] = Infinity;
     }

     this.D[start] = 0; //将起点到起点的距离设置为0
   }

   checkNum() { //检查输入数字的合法性
     if (this.end >= this.n) {
       throw new Error('起点或终点参数错误  原因:超过节点数！');
     }
     if (this.start < 0) {
       throw new Error('起点或终点参数错误 原因:节点下标为负！')
     }
     if((typeof this.start)=='string' || (typeof this.end)=='string'){
       throw new Error('传入的起点终点数据不为数字')
     }
   }

   getMin(start, end) {
     this.setStart(start, end);
     /*主循环开始-----*/
     for (let i = this.start; i < this.n; i++) {
       var _minPreVal = Infinity;
       this.w = -1;

       for (let v = this.start; v < this.n; v++) { //获取中继节点
         console.log(typeof this.start);
         if (!this.cloneUnion[v] && this.D[v] < _minPreVal) { //该节点不在U集合中
           _minPreVal = this.D[v]; //更新最小值
           this.w = v; //更新中继点节点
         }
       }
       if (this.w == -1) {
         console.error(`无${!this.opposite?this.start:this.end}到${!this.opposite?this.end:this.start}节点之间的路径!请重新查看参数`);
         return {
           result: false,
           path: this.clonePath[this.end]
         }; //没有路径时的返回值
       }
       this.cloneUnion[this.w] = true; //更新节点标记
       this.clonePath[this.w].push(this.w); //更新终点路径节点


       this.getNextNode(); //获取下一节点方法

       if (this.w == this.end) { //找到终点时
         return {
           result: this.D[this.end],
           path: this.opposite?this.clonePath[this.end].reverse():this.clonePath[this.end],
         }; //返回终点最小权值与到终点的路径 退出主循环
       };
     };
   }

   getNextNode() {
     for (let v = this.start; v < this.n; v++) { //通过中继节点到下一节点
       if (!this.D[v]) { //忽略下一节点所在行中undefined的值
         continue;
       }

       if (!this.cloneUnion[v] && this.D[v] >= this.D[this.w] + this.M[this.w][v]) { //不在U集合中遍历  并且（源节点到中继点+中继点到下一节点的值)<=下一节点当前权值
         this.D[v] = this.D[this.w] + this.M[this.w][v]; //更新下一节点权值
         this.clonePath[v] = [...this.clonePath[this.w]]; //更新下一节点的路径
       }
     }
   }
 }

 export default Dij;
