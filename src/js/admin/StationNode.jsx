import React from 'react';

class StationNode extends React.Component {
  constructor(props) {
    super(props);
  }
 onNodeDragStart(e){
   e.dataTransfer.setData('Text','node');
    e.dataTransfer.setDragImage(this.refs.null,0,0);  //设置默认的浏览器样式不可见，拖动一个无宽高的元素
 }

  render() {
    let stationNodeClass = `s-node s-${this.props.nodeType=='normal'?'round':'ellipse'} line-node-${this.props.line}`;
      // let transformStyle=`translate(-50%,-50%) rotate(${this.props.nodeAngel}deg)`;
      let transformStyle=`rotate(${this.props.nodeAngel}deg)`;
    return (


      <div
          className={stationNodeClass}
        style={{
          borderColor:this.props.nodeType=='transfer'?'#000':'',
          transform:transformStyle,
          WebkitTransform:transformStyle,
          zIndex:this.props.pathNode||this.props.selected?4:3,
        }}
        onClick={this.props.handleClick}
        onContextMenu={this.props.handleContextMenu}
        draggable='true'
        onDrag={this.props.handleDrag}
        onDragStart={e=>this.onNodeDragStart(e)}
        onDragEnd={this.props.handleDragEnd}
        onWheel={this.props.handleWheel}>
        <span
          className='s-node-clicked'
          style={{display:this.props.selected && !this.props.pathNode ?'block':'none'}}>
        </span>
        <span
          className='s-node-path blink'
          style={{display:this.props.pathNode?'block':'none',animationDelay:'200ms'}}>
        </span>
        <span ref='null'></span>
      </div>
    );
  }
}



export default StationNode;
