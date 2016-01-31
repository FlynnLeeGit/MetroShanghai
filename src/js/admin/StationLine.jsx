import React from 'react';

class StationLine extends React.Component {
  constructor(props) {
    super(props);
  }
  onLineDragStart(e) {
    e.dataTransfer.setData('Text', 'line');
    e.dataTransfer.setDragImage(this.refs.null, 0, 0);  //使用空元素去除浏览器默认移动时的图像
  }

  //计算线路偏移函数 实现任意角度的线路偏移功能
  calcLinePosition() {
    const {sin, cos, abs, PI} = Math; //提取数学函数和pi
    let [angel,
      offset] = [
      Number(this.props.nodeAngel),
      Number(this.props.offset)
    ];  //获取线路的角度，输入的偏移值
    if (offset) { //偏移量不为0时计算线路的起点坐标
      let θ = angel / 180 * PI; //将角度转为弧度计算
      let r = offset; //半径
      let [x,
        y] = [
        r / cos(θ),
        r / sin(θ)
      ]; //通过半径和角度计算
      if (abs(x) > 1000) {
        x = 0;
      }
      if (abs(y) > 1000) {
        y = 0;
      }[this.x, this.y] = [x, y]; //设定线路的偏移量
    } else {
      [this.x, this.y] = [0, 0]; //没有偏移量起点坐标直接为0,0
    }
  }

  render() {
    this.calcLinePosition();

    if (!this.props.visible) {
      return null;
    } else {
      let transformStyle = `translateY(-50%) rotateZ(${this.props.angel}deg)`;
      let lineStyle = {  //计算样式
        WebkitTransform: transformStyle,
        MozTransform: transformStyle,
        transform: transformStyle,
        left: this.x,
        top: this.y,
        width: `${this.props.len}em`
      }
      let lineEvents={  //响应事件
        onWheel:this.props.handleWheel,
        onContextMenu:this.props.handleContextMenu,
        onDragStart:e=>this.onLineDragStart(e),
        onDrag:this.props.handleDrag,
        onDragEnd:this.props.handleDragEnd,
      }
      return (
        <div draggable='true' style={lineStyle} {...lineEvents} className={`s-line angel-right line-${this.props.lineNum}`}>
          <span ref='null'></span>
          <span style={{
            fontSize: '0.5em'
          }}>{this.props.uniquekey}</span>
        </div>
      );
    }
  }
}

export default StationLine;
