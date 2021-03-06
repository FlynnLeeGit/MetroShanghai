import React from 'react';

class StationNode extends React.Component {
  constructor(props) {
    super(props);
  }
  handleDrag(e){
    console.log(e.pageX,e.pageY)
  }
  handleDragOver(e){
    e.preventDefault();
    console.log(e.target);
  }
  render() {
    let stationNodeClass = `s-node s-${this.props.nodeType=='normal'?'round':'ellipse'} line-node-${this.props.line}`;
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
        onDrag={e=>this.handleDrag(e)}>
        <span
          className='s-node-clicked'
          style={{display:this.props.selected && !this.props.pathNode ?'block':'none'}}>
        </span>
        <span
          className='s-node-path blink'
          style={{display:this.props.pathNode?'block':'none',animationDelay:'200ms'}}>
        </span>
      </div>
    );
  }
}

export default StationNode;
