import React from 'react';

class StationNode extends React.Component {
  constructor(props) {
    super(props);
  }
 onNodeDragStart(e){
    e.dataTransfer.setDragImage(this.refs.null,0,0);  //设置默认的浏览器样式不可见，拖动一个无宽高的元素
 }

  render() {
    let stationNodeClass = `s-node s-${this.props.nodeType=='normal'?'round':'ellipse'} line-node-${this.props.line}`;
    let transfromStyle=`translateX(-50%) translateY(-50%) rotateZ(${this.props.nodeAngel}deg)`;
    return (
      <div
        ref='node'
        className={stationNodeClass}
        style={{
          borderColor:this.props.nodeType=='transfer'?'#000':'',
          transform:transfromStyle,
          MozTransform:transfromStyle,
          WebkitTransfrom:transfromStyle,
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

StationNode.defaultProps = {
  nodeType: 'normal'
};

StationNode.propTypes = {
  nodeType: React.PropTypes.oneOf(['normal', 'transfer'])
};

export default StationNode;
