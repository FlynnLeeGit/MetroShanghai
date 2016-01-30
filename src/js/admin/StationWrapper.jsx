import React from 'react';

//引入函数
import ajax from '../common/ajax';
import {calcAngel,compare,findIndex} from '../common/Common';

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
  onNodeDrag(e) {
  if(e.altKey){
    let [x,  y] = [e.pageX, e.pageY];
      this.setState({left: x, top: y});
    }
  }

    onNodeDragEnd(e) {
      //数据更新
        let data = {
          id: this.props.id,
          left: this.state.left,
          top: this.state.top
        };
        ajax.stationPost(data, () => {
          this.props.updateStation('站点位置信息已更新！');
        })
    }
    onNodeWheel(e) {
      if(e.altKey){
        e.preventDefault();
        let newAngel = this.state.nodeAngel + Math.sign(e.deltaY) * 45; //根据滚轮的上下切换旋转角度
        //数据更新
        let data = {
          id: this.props.id,
          nodeAngel: newAngel%360
        }
        ajax.stationPost(data, () => {
          this.setState({nodeAngel: newAngel%360})

          this.props.updateStation('站点角度值已更新！');
        })
      }
    }
    onNodeClick(e) {
      e.stopPropagation();
      this.props.selectStation(this.props.uniquekey); //传递给父组件站点编号
    }
    onNodeContext(e) {
      e.preventDefault();
      this.props.openEditPanel(this.props.index);
    }

    onNameClick(e){
      e.stopPropagation();
      this.props.selectStation(this.props.uniquekey);
    }


    onNameContext(e) {
      e.preventDefault();
      this.props.openEditPanel(this.props.index);
    }

    onLineDrag(e, isLine2) {
      let newAngel = calcAngel(e);
      !isLine2 //判定是更新原始线还是第二线
      ? this.setState({lineAngel: newAngel})
      : this.setState({line2Angel: newAngel});
    }
    onLineDragEnd(e, isLine2) {
      //线路角度数据更新
      let lineAngelNum = !isLine2
      ? 'lineAngel'
      : 'line2Angel'; //判定是更新原始线还是第二线
      let data = {
        id: this.props.id,
        [lineAngelNum]: this.state[lineAngelNum]
      };
      ajax.stationPost(data, () => {
        this.props.updateStation('线路角度值已更新！');
      })
    }
    onLineWheel(e, isLine2) {
      if(e.altKey){
        e.preventDefault();
        let lineWidthNum = !isLine2
        ? 'lineWidth'
        : 'line2Width'; //判定是更新原始线还是第二线
        let newLineWidth = this.state[lineWidthNum] - Math.sign(e.deltaY) * 0.25 //Math.sign返回正数1或负数-1
        this.setState({
          [lineWidthNum]: newLineWidth < 1.5
          ? 1.5
          : newLineWidth
        });
        //线路长度数据更新
        let data = {
          id: this.props.id,
          [lineWidthNum]: newLineWidth
        }
        ajax.stationPost(data, () => {
          this.props.updateStation('线路长度值已更新！');
        })
      }
    }
    onLineContext(e) {
      e.preventDefault();
      this.props.openEditPanel(this.props.index);
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
        id:this.props.id,
        nameLeft:this.props.nameLeft,
        nameTop:this.props.nameTop,
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
        nodeAngel: this.state.nodeAngel,
      }

      this.line2Option = {
        angel: this.state.line2Angel,
        len: this.state.line2Width,
        nodeAngel: this.state.nodeAngel,

        lineNum: this.props.line,
        offset: this.props.line2Offset,
        visible: parseInt(this.props.line2Visible), //是否显示第二线
        uniquekey: this.props.uniquekey,
      }
    }

    render() {
      this.initConfig();

      return (
        <div
          style={{
            left: this.state.left,
            top: this.state.top,
          }}
          className='station-wrapper fadein'>


          <StationNode
            {...this.nodeOption}
            handleDragEnd={e => this.onNodeDragEnd(e)}
            handleDrag={e => this.onNodeDrag(e)}
            handleClick={e => this.onNodeClick(e)}
            handleContextMenu={e => this.onNodeContext(e)}
            handleWheel={e => this.onNodeWheel(e)}/>


          <StationName
            {...this.nameOption}
            handleClick={e=>this.onNameClick(e)}
            handleDragEnd={() => this.onNameDragEnd()}
            handleDrag={e => this.onNameDrag(e)}
            handleWheel={e => this.onNameWheel(e)}
            handleContextMenu={e => this.onNameContext(e)}/>


          <StationLine
            {...this.lineOption}
            handleDragEnd={e => this.onLineDragEnd(e)}
            handleDrag={e => this.onLineDrag(e)}
            handleWheel={e => this.onLineWheel(e)}
            handleContextMenu={e => this.onLineContext(e)}/>


          <StationLine
            {...this.line2Option}
            handleDragEnd={e => this.onLineDragEnd(e, true)}
            handleDrag={e => this.onLineDrag(e, true)}
            handleWheel={e => this.onLineWheel(e, true)}
            handleContextMenu={e => this.onLineContext(e)}/>

        </div>
      );
    }
  }

  export default StationWrapper;
