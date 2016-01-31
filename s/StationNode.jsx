import React from 'react';

class StationNode extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let stationNodeClass = `s-node s-${this.props.nodeType=='normal'?'round':'ellipse'} line-node-${this.props.line}`;
    return (
      <div
        className={stationNodeClass}
        style={{
          borderColor:this.props.nodeType=='transfer'?'#000':'',
          transform:`translate(-50%,-50%) rotate(${this.props.nodeAngel}deg)`,
          WebkitTransform:`translate(-50%,-50%) rotate(${this.props.nodeAngel}deg)`,
          zIndex:this.props.pathNode||this.props.selected?4:3,
        }}
        onClick={this.props.handleClick}>
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
