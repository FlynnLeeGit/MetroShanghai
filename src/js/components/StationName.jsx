import React from 'react';
import ajax from '../ajax';
class StationName extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nameLeft:this.props.nameLeft,
      nameTop:this.props.nameTop,
      nameAngel:this.props.nameAngel,
    }
  }
  handleDragStart(e) {
    e.dataTransfer.setDragImage(this.refs.null,0,0);
    let [l,t]=[e.target.offsetLeft,e.target.offsetTop];
    [this.offsetX,this.offsetY]=[e.pageX-l,e.pageY-t];  //拖动开始时记录下鼠标相对于当前容器的相对位置
  }
  handleDrag(e){  //
    let [x,y]=[e.pageX-this.offsetX,e.pageY-this.offsetY];
    let [w,h]=[e.target.offsetWidth,e.target.offsetHeight];

    if(Math.hypot(x+w/2,y+h/2)<w){  //圆形公式 名称在名称容器长度范围的的半径限制内移动 Math.hypot为平方根
      this.setState({
        nameLeft:x,
        nameTop:y,
      })
    }
  }
  handleDragEnd(e){
    let ajaxData={
      id:this.props.id,
      nameLeft:this.state.nameLeft,
      nameTop:this.state.nameTop,
    }
    ajax.stationPost(ajaxData, () => {
      console.log('名称位置更新完毕！');
    });
  }
  handleWheel(e){
    if(e.altKey){
      e.preventDefault();
      let θ=this.state.nameAngel+Math.sign(e.deltaY)*45;
      this.setState({
        nameAngel:θ%360
      })
      ajax.stationPost({id:this.props.id,nameAngel:θ%360},()=>{
        console.log('角度更新完毕！');
      })
    }
  }
  componentDidMount() {

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
            ref='name'
            className='s-name-area'
            draggable='true'
            style={style}
            onWheel={e=>this.handleWheel(e)}
            onContextMenu={this.props.handleContextMenu}
            onDragOver={e=>e.preventDefault()}
            onDragStart={e=>this.handleDragStart(e)}
            onDrag={e=>this.handleDrag(e)}
            onDragEnd={e=>this.handleDragEnd(e)}

            onClick={this.props.handleClick}>
            <span>
              {this.props.chsName}
              <i
                className='subicon icon-assist'
                style={{
                  background: Number(this.props.assist)
                  ? '#009300'
                  : '#666'
                }}>
              </i>
              <i
                className='subicon icon-wc'
                style={{
                  background: Number(this.props.wc)
                  ? '#009300'
                  : '#666'
                }}>
              </i>
            </span>
            <span className="s-name-eng">
              {this.props.engName}
              <span ref='null'>
              </span>
            </span>


          </div>
        );


      }


    }
  }

  export default StationName;
