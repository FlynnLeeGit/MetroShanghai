import React from 'react';
import ajax from '../ajax';

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
  }


  initTimeData() {
    if (this.props.time) { //time有定义 因为异步加载的问题此处可能是undefined 所以要判断下
      this.timeList = this.props.time.map((timeSingle, index) => {
        return (
          <div key={index}>

            <div className='input-group'>
              <span className='input-group-addon'>
                  到{timeSingle.next}号站点时间
              </span>
              <span className='input-group-addon'>{timeSingle.value}分钟</span>
            </div>
          </div>
        );
      })
    }
  }

  render() {
    this.initTimeData();
    if (!this.props.visible) {
      return null;
    } else {
      return (
        <div className='modal-layer edit-panel-layer'>
          <div
            className={`panel-${this.props.theme} edit-panel panel fadein`}
            onClick={e => e.stopPropagation()}>
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.title}
              </h3>
            </div>
            <div className="panel-body">
              <form method='post'>
                <div className='form-group'>
                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>站点唯一编号</strong>
                    </span>
                    <input
                      onChange={this.props.onEditChange}
                      name='uniquekey'
                      className='form-control'
                      defaultValue={this.props.uniquekey}
                      disabled/>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>线路</strong>
                    </span>
                    <input
                      onChange={this.props.onEditChange}
                      name='line'
                      className={`form-control line-font-${this.props.line}`}
                      type='number'
                      min={1}
                      max={16}
                      defaultValue={this.props.line}
                      required/>
                    <span className='input-group-btn'>
                      <button className={`btn line-${this.props.line}`}>
                        {this.props.line}
                      </button>
                    </span>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>中文名</strong>
                    </span>
                    <input
                      onChange={this.props.onEditChange}
                      name='chsName'
                      className='form-control'
                      type='text'
                      placeholder='站点中文名称'
                      defaultValue={this.props.chsName}
                      required/>
                  </div>



                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>英文名</strong>
                    </span>
                    <input
                      onChange={this.props.onEditChange}
                      name='engName'
                      className='form-control'
                      type='text'
                      placeholder='站点英文名称'
                      defaultValue={this.props.engName}
                      required/>
                  </div>



                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>残疾电梯</strong>
                    </span>
                    <select
                      onChange={this.props.onEditChange}
                      name='assist'
                      className='form-control'
                      defaultValue={this.props.assist}>
                      <option value={1}>有</option>
                      <option value={0}>无</option>
                    </select>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>
                      <strong>站内厕所</strong>
                    </span>
                    <select
                      onChange={this.props.onEditChange}
                      name='wc'
                      className='form-control'
                      defaultValue={this.props.wc}>
                      <option value={1}>有</option>
                      <option value={0}>无</option>
                    </select>
                  </div>



                  <div className='input-group'>
                    <span className='input-group-addon'>站点类型</span>
                    <select
                      onChange={this.props.onEditChange}
                      name='nodeType'
                      className='form-control'
                      defaultValue={this.props.nodeType}>
                      <option value='normal'>普通站点</option>
                      <option value='transfer'>换乘站点</option>
                    </select>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>名称可见</span>
                    <select
                      onChange={this.props.onEditChange}
                      name='nameVisible'
                      className='form-control'
                      defaultValue={this.props.nameVisible}>
                      <option value={1}>可见</option>
                      <option value={0}>不可见</option>
                    </select>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>主线偏移</span>
                    <input
                      onChange={this.props.onEditChange}
                      name='lineOffset'
                      className='form-control'
                      type='range'
                      min={-15}
                      max={15}
                      defaultValue={this.props.lineOffset}/>
                    <span className='input-group-addon'>{this.props.lineOffset}px</span>
                  </div>


                  <div className='input-group'>
                    <span className='input-group-addon'>需要同线辅助线</span>
                    <select
                      onChange={this.props.onEditChange}
                      name='line2Visible'
                      className='form-control'
                      defaultValue={this.props.line2Visible}>
                      <option value={1}>是</option>
                      <option value={0}>否</option>
                    </select>

                  </div>



                  <div className='input-group'>
                    <span className='input-group-addon'>辅助偏移</span>
                    <input
                      onChange={e=>this.handleChange(e)}
                      name='line2Offset'
                      className='form-control'
                      type='range'
                      min={-15}
                      max={15}
                      defaultValue={this.props.line2Offset}/>
                    <span className='input-group-addon'>{this.props.line2Offset}px</span>
                  </div>


                  {this.timeList}
                  <div className='btn-group pull-left'>
                    <button
                      onClick={this.props.onEditDelete}
                      type='button'
                      className="btn btn-danger">删除此站点</button>
                  </div>

                  <div className="btn-group pull-right">
                    <input
                      onClick={this.props.onEditConfirm}
                      type="submit"
                      className={`btn btn-${this.props.theme}`}
                      defaultValue="确认"/>
                    <button
                      onClick={this.props.onEditClose}
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
