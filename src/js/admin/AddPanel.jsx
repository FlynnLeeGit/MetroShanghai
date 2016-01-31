import React from 'react';
import ajax from '../common/ajax';
class EditPanel extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state={
      maxKey:0,
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let [l,t] = [
      e.pageX - e.clientX + 100,
      e.pageY - e.clientY + 100
    ];
     ajax.maxKeyGet((max) => {
       let addData={
          left:l,
         top:t,
         uniquekey:max+1,
         line:this.refs.line.value,
        chsName:this.refs.chsName.value,
         engName:this.refs.engName.value,
         nodeType:this.refs.nodeType.value,
      };
      ajax.stationPut(addData,()=>{
           this.props.updateStation('添加站点成功');
          })
 
      
    })

    


}
  handleClose(e){
    this.props.onClose(e);  //使用父组件的关闭方法
  }

  componentDidMount(){
   
  }
=======
    this.state = {
      maxKey: 0
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let [l,
      t] = [
      e.pageX - e.clientX + 100,
      e.pageY - e.clientY + 100
    ];
    ajax.maxKeyGet((max) => {
      let addData = {
        left: l,
        top: t,
        uniquekey: max + 1,
        line: this.refs.line.value,
        chsName: this.refs.chsName.value,
        engName: this.refs.engName.value,
        nodeType: this.refs.nodeType.value
      };
      ajax.stationPut(addData, () => {
        this.props.updateStation('添加站点成功');
      })

    })

  }
  handleClose(e) {
    this.props.onClose(e); //使用父组件的关闭方法
  }

  componentDidMount() {}
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d

  render() {
    if (!this.props.visible) {
      return null;
    } else {
      return (
        <div className='modal-layer add-panel-layer'>
          <div className={`add-panel panel panel-${this.props.theme} fadein col-xs-12 col-sm-10 col-md-8 col-lg-6`} onClick={e => e.stopPropagation()}>
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.title}
              </h3>
            </div>
            <div className="panel-body">

<<<<<<< HEAD
              <form id='add' onSubmit={e=>this.handleSubmit(e)}>
=======
              <form id='add' onSubmit={e => this.handleSubmit(e)}>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d

                <div className='form-group'>
                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>线路</strong>
                      </span>
<<<<<<< HEAD
                      <input
                        className='form-control'
                        type='number'
                        ref='line'
                        min={1}
                        max={16}
                        defaultValue={1}
                        required/>
=======
                      <input className='form-control' type='number' ref='line' min={1} max={16} defaultValue={1} required/>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d
                    </div>
                  </div>

                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>中文名</strong>
                      </span>
<<<<<<< HEAD
                      <input

                        ref='chsName'
                        className='form-control'
                        type='text'
                        placeholder='站点中文名称'
                        defaultValue='上海'
                        required/>
=======
                      <input ref='chsName' className='form-control' type='text' placeholder='站点中文名称' defaultValue='上海' required/>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d
                    </div>
                  </div>

                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>英文名</strong>
                      </span>
<<<<<<< HEAD
                      <input
                        ref='engName'
                        className='form-control'
                        type='text'
                        placeholder='站点英文名称'
                        defaultValue='SH'
                        required/>
=======
                      <input ref='engName' className='form-control' type='text' placeholder='站点英文名称' defaultValue='SH' required/>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d
                    </div>
                  </div>
                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>站点类型</span>
<<<<<<< HEAD
                      <select
                        ref='nodeType'
                        className='form-control'
                        defaultValue='normal'>
=======
                      <select ref='nodeType' className='form-control' defaultValue='normal'>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d
                        <option value='normal'>普通站点</option>
                        <option value='transfer'>换乘站点</option>
                      </select>
                    </div>
                  </div>

                  <div className="btn-group pull-right">
<<<<<<< HEAD
                    <input onClick={e=>this.handleSubmit(e)} type='button' className={`btn btn-${this.props.theme}`} defaultValue='确认'/>
                    <button onClick={e=>this.handleClose(e)} type="button" className="btn btn-default">取消</button>
=======
                    <input onClick={e => this.handleSubmit(e)} type='button' className={`btn btn-${this.props.theme}`} defaultValue='确认'/>
                    <button onClick={e => this.handleClose(e)} type="button" className="btn btn-default">取消</button>
>>>>>>> 74a26ae0eedc7c36215ac9bcae36465a2ed5e07d
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default EditPanel;
