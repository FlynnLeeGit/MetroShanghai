import React from 'react';
import ajax from '../ajax';
class EditPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  handleConfirm(e){
    this.props.onConfirmBtn(e);
  }
  render() {

    if (!this.props.visible) {
      return null;
    } else {
      return (
        <div className='modal-layer add-panel-layer'>
          <div
            className={`add-panel panel panel-${this.props.theme} fadein col-xs-12 col-sm-10 col-md-8 col-lg-6`}
            onClick={e => e.stopPropagation()}>
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.title}
              </h3>
            </div>
            <div className="panel-body">
              <form ref='addForm'>
                <div className='form-group'>
                  <div className='col-xs-6'>


                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>站点唯一编号</strong>
                      </span>
                      <input
                        className='form-control'
                        defaultValue={Number(this.props.maxKey)+1}
                        disabled/>
                    </div>
                  </div>



                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>线路</strong>
                      </span>
                      <input
                        onChange={this.props.handleChange}
                        name='line'
                        className={`form-control line-font-${this.props.line}`}
                        type='number'
                        min={1}
                        max={16}
                        defaultValue={1}
                        required/>
                    </div>
                  </div>


                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>中文名</strong>
                      </span>
                      <input
                        onChange={this.props.handleChange}
                        name='chsName'
                        className='form-control'
                        type='text'
                        placeholder='站点中文名称'
                        defaultValue='上海'
                        required/>
                    </div>
                  </div>

                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>
                        <strong>英文名</strong>
                      </span>
                      <input
                        onChange={this.props.handleChange}
                        name='engName'
                        className='form-control'
                        type='text'
                        placeholder='站点英文名称'
                        defaultValue='SH'
                        required/>
                    </div>
                  </div>
                  <div className='col-xs-6'>
                    <div className='input-group'>
                      <span className='input-group-addon'>站点类型</span>
                      <select
                        onChange={this.props.handleChange}
                        name='nodeType'
                        className='form-control'>
                        <option value='normal'>普通站点</option>
                        <option value='transfer'>换乘站点</option>
                      </select>
                    </div>
                  </div>


                  <div className="btn-group pull-right">
                    <input
                      onClick={e=>this.handleConfirm(e)}
                      type="submit"
                      className={`btn btn-${this.props.theme}`}
                      defaultValue="确认"/>
                    <button
                      onClick={this.props.onClose}
                      type="button"
                      className="btn btn-default">取消</button>
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
