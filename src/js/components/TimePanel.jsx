import React from 'react';
import ajax from '../ajax';
import LineSelect from './LineSelect.jsx';

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniquekey_id: 0,
      next: 0,
      value: 0,
      selectedStartLine: 1,
      selectedEndLine: 1
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    let [start,
      next,
      value] = [this.refs.start.value, this.refs.next.value, this.refs.value.value];

    ajax.timePut({
      uniquekey_id: start,
      next: next,
      value: value
    }, (result) => {
      this.props.updateTime();
    })

    e.preventDefault();
  }
 handleDeleteTime(e){
   e.preventDefault();
 }

  initSelectOption() {
    let s = this.props.sData;
    let _sList = {};
    let _lList = [];
    //生成以线路号为键名的对象
    for (var k in s) {
      if (!_sList[s[k].line]) {
        _sList[s[k].line] = [];
        _lList.push(s[k].line); //加入线路数组中
      }
      _sList[s[k].line].push(s[k]); //将站点信息加入以线路为键名的对象中
    }

    this.lineList = _lList.map((_line) => {
      return <option key={_line} value={_line} className={`line-font-${_line}`}>{_line}号线</option>
    })

    this.lineStartStations = _sList[this.state.selectedStartLine].map((station) => {
      return <option key={station.uniquekey} value={station.uniquekey}>{station.chsName}</option>
    });

    this.lineEndStations = _sList[this.state.selectedEndLine].map((station) => {
      return <option key={station.uniquekey} value={station.uniquekey}>{station.chsName}</option>
    });

  }

  initTimeList() {
    let [tData,
      sData,
      idMap] = [this.props.tData, this.props.sData, this.props.idMap];

    this.timeList = tData.map((t, index) => {
      let startRow = sData[idMap[t[0]]]; //起始数据
      let nextRow = sData[idMap[t[1]]]; //邻站数据
      return (
        <tr key={index}>
          <td style={{
            textAlign: 'center'
          }}>{t[0]}</td>
          <td>
            <button className={`btn btn-sm line-${startRow.line}`}>
              {startRow.line}
            </button>
            <span>
              {startRow.chsName}</span>
          </td>
          <td style={{
            textAlign: 'center'
          }}>{t[1]}</td>
          <td>
            <button className={`btn btn-sm line-${nextRow.line}`}>
              {nextRow.line}
            </button>
            <span>
              {nextRow.chsName}</span>
          </td>
          <td>{t[2]}
            分钟</td>
          <td>
            <button onClick={e=>this.handleDeleteTime(e)} className='btn btn-sm btn-danger'>删除</button>
          </td>
        </tr>
      );
    })
  }

  render() {
    if (!this.props.visible) {
      return null;
    } else {
      this.initSelectOption();
      this.initTimeList();

      return (
        <div className='modal-layer add-panel-layer'>
          <div onScroll={e => e.stopPropagation()} className={`panel-${this.props.theme} add-panel panel time-panel fadein col-xs-12 col-sm-10 col-md-8 col-lg-6`} onClick={e => e.stopPropagation()}>
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.title}
              </h3>
            </div>

            <div className='row' style={{
              marginTop: '10px'
            }}>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className='col-xs-1'>起始</div>
                <div className='col-xs-3'>
                  <select name='selectedStartLine' onChange={e => this.handleChange(e)} className='form-control' defaultValue={this.state.selectedStartLine}>
                    {this.lineList}
                  </select>
                  <select ref='start' name='uniquekey_id' onChange={e => this.handleChange(e)} className='form-control' defaultValue={this.lineStartStations[0].uniquekey}>
                    {this.lineStartStations}
                  </select>
                </div>
                <div className='col-xs-1'>邻站</div>
                <div className='col-xs-3'>
                  <select name='selectedEndLine' onChange={e => this.handleChange(e)} className='form-control' defaultValue={this.state.selectedEndLine}>
                    {this.lineList}
                  </select>
                  <select ref='next' name='next' onChange={e => this.handleChange(e)} className='form-control' defaultValue={this.lineEndStations[0].uniquekey}>
                    {this.lineEndStations}
                  </select>

                </div>
                <div className='col-xs-2'>
                  <input ref='value' onChange={(e) => this.handleChange(e)} type ='number' name='value' className='form-control input-sm' placeholder='时间' required/>
                </div>
                <div className='col-xs-2'>
                  <button type='submit' className='btn btn-info btn-sm'>插入</button>
                </div>
              </form>
            </div>

            <div className="panel-body" style={{
              height: '80%',
              overflow: 'auto'
            }}>
              <form method='post'>

                <table className='table table-striped table-hover table-condensed table-bordered'>
                  <thead>
                    <tr>
                      <th>起始号</th>
                      <th>起始名</th>
                      <th>邻站号</th>
                      <th>终止名</th>
                      <th>所需时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.timeList}
                  </tbody>
                </table>

              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TimePanel;
