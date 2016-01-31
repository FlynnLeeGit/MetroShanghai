import React from 'react';
class StationName extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nameLeft:this.props.nameLeft,
      nameTop:this.props.nameTop,
      nameAngel:this.props.nameAngel,
    }
  }

  render() {
    if(!Number(this.props.nameVisible)){
      return null;
    }else{
      let style={left:this.state.nameLeft,top:this.state.nameTop,
        transform:`rotate(${this.state.nameAngel}deg)`,
        WebkitTransform:`rotate(${this.state.nameAngel}deg)`}
        return (
          <div
            className='s-name-area'
            style={style}
            onClick={this.props.handleClick}>
            <span style={{fontSize:this.props.langCN?'0.9em':'0.6em'}}>
              {this.props.langCN?this.props.chsName:this.props.engName}
            </span>
            <span className='subicon-area'>
              <i
                className='subicon icon-assist'
                style={{
                  background: Number(this.props.assist)
                  ? '#009300'
                  : '#666',
                }}>
              </i>
              <i
                className='subicon icon-wc'
                style={{
                  background: Number(this.props.wc)
                  ? '#009300'
                  : '#666',
                }}>
              </i>
            </span>
          </div>
        );
      }
    }
  }

  export default StationName;
