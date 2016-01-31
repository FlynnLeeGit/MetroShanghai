import React from 'react';



class StationLine extends React.Component {
  constructor(props) {
    super(props);
  }

calcLinePosition(){
  const {sin,cos,abs,PI}=Math;  //提取数学函数和pi
  let [angel,offset]=[Number(this.props.nodeAngel),Number(this.props.offset)];
  if(offset){  //偏移量不为0时计算线路的起点坐标
    let θ=angel/180*PI;  //将角度转为弧度计算
    let r=offset;   //半径
    let [x,y]=[r/cos(θ),r/sin(θ)];  //通过半径和角度计算
    if(abs(x)>1000){
      x=0;
    }
    if(abs(y)>1000){
      y=0;
    }
    [this.x,this.y]=[x,y];   //设定线路的偏移量
  }else{
    [this.x,this.y]=[0,0];  //没有偏移量起点坐标直接为0,0
  }
}


  render() {
    this.calcLinePosition();
    if (!this.props.visible) {
      return null;
    } else {
      let transformStyle = `translateY(-50%) rotateZ(${this.props.angel}deg)`;
      let lineStyle = {
        WebkitTransform: transformStyle,
        MozTransform: transformStyle,
        transform: transformStyle,
        left:this.x,
        top:this.y,
        width: `${this.props.len}em`,
      }
      return (
        <div
          className={`s-line angel-right line-${this.props.lineNum}`}
          style={lineStyle}>
        </div>
      );
    }
  }
}

export default StationLine;
