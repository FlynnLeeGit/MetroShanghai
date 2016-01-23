import React from 'react';

class Alert extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
    let ele= document.getElementById('alert');
    ele.addEventListener('webkitAnimationEnd',()=>{
      this.props.onDismiss();  //执行父组件函数修改visible状态
    })
  }

  render(){
    let ani=this.props.autoClose?'fadeout':'';
    return(
      <div className='modal-layer alert-layer' style={{display:this.props.visible?'block':'none'}}>
      <button
        id='alert'
        className={`btn-${this.props.theme} ${ani} btn alert-btn`}>
        {this.props.text}
      </button>
      </div>
    );
  }
}

export default Alert;
