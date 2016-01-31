import React from 'react';

//引入函数
import {findIndex,compare} from './Common';

//引入子组件
import StationNode from './StationNode.jsx';
import StationName from './StationName.jsx';
import StationLine from './StationLine.jsx';

class StationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: this.props.left,
      top: this.props.top,

      nodeType: this.props.nodeType,
      nodeAngel: this.props.nodeAngel,

      lineAngel: this.props.lineAngel,
      lineWidth: this.props.lineWidth,

      line2Angel: this.props.line2Angel,
      line2Width: this.props.line2Width
    }
  }
  shouldComponentUpdate(nextProps, nextState) { //渲染判定
    let res=compare(nextProps,this.props);//浅比较react属性
    let res2=compare(nextState,this.state);//浅比较react状态
    let shouldRender=!(res && res2); //返回false表示有不同的属性值，需要重新渲染
    return shouldRender;
  }

  onNodeClick(e) {
    e.stopPropagation();
    this.props.selectStation(this.props.uniquekey); //传递给父组件站点编号
  }

  onNameClick(e) {
    e.stopPropagation();
    this.props.selectStation(this.props.uniquekey);
  }

  initConfig() {

    this.nodeOption = {
      nodeAngel: this.state.nodeAngel,

      line: this.props.line,
      nodeType: this.props.nodeType,
      selected: this.props.selected,
      pathNode: this.props.pathNode
    }

    this.nameOption = {
      id: this.props.id,
      nameLeft: this.props.nameLeft,
      nameTop: this.props.nameTop,
      nameAngel: this.props.nameAngel,
      nameVisible: this.props.nameVisible,
      assist: this.props.assist,
      wc: this.props.wc,
      chsName: this.props.chsName,
      engName: this.props.engName,
      langCN:this.props.langCN,
    }

    this.lineOption = {
      angel: this.state.lineAngel,
      len: this.state.lineWidth,

      lineNum: this.props.line,
      offset: this.props.lineOffset,
      visible: true,
      uniquekey: this.props.uniquekey,
      nodeAngel: this.state.nodeAngel
    }

    this.line2Option = {
      angel: this.state.line2Angel,
      len: this.state.line2Width,
      nodeAngel: this.state.nodeAngel,

      lineNum: this.props.line,
      offset: this.props.line2Offset,
      visible: parseInt(this.props.line2Visible), //是否显示第二线
      uniquekey: this.props.uniquekey
    }
  }

  render() {
    this.initConfig();

    return (
      <div style={{
        left: this.state.left,
        top: this.state.top
      }} className='station-wrapper fadein'>
        <StationNode {...this.nodeOption} handleClick={(e) => this.onNodeClick(e)}/>
        <StationName {...this.nameOption} handleClick={(e) => this.onNameClick(e)}/>
        <StationLine {...this.lineOption}/>
        <StationLine {...this.line2Option}/>
      </div>
    );
  }
}

export default StationWrapper;
