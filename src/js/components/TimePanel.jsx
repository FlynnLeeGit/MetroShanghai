import React from 'react';
import ajax from '../ajax';
import LineSelect from './LineSelect.jsx';


class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniquekey_id: 0,
      next: 0,
      value:0,
      selectOption:{},
    }
  }
 componentDidMount() {
   ajax.selectGet((data)=>{
     this.setState({selectOption:data})
   })
 }
  handleSubmit(e) {
    e.preventDefault();

    let res1 = this.props.idMap[this.state.uniquekey_id]; //寻找起点数据索引
    let res2 = this.props.idMap[this.state.next]; //寻找终点数据索引
    console.log(res1, res2);

    ajax.timePut(this.state, (result) => {
      console.log(result);
      this.props.updateTime();
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
        </tr>
      );
    })
  }

  initSelectOption(){
    let oData=this.state.selectOption;
    console.log(oData);
    let ls=[];
    if(oData){
      for(let k in oData){
        ls.push[<option value={k}>k</option>]
        console.log(ls);
      }
    }

  }

  render() {
    if (!this.props.visible) {
      return null;
    } else {
      this.initTimeList();
      this.initSelectOption();

      return (
        <div className='modal-layer add-panel-layer'>
          <div onScroll={e => e.stopPropagation()} className={`panel-${this.props.theme} add-panel panel time-panel fadein col-xs-12 col-sm-10 col-md-8 col-lg-6`} onClick={e => e.stopPropagation()}>
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.title}
              </h3>
            </div>


            <div className='row' style={{marginTop:'10px'}}>
              <div className='col-xs-3 col-xs-offset-1'>
                <select name='uniquekey_id'>
                  {this.ls}
                </select>
              </div>
              <div className='col-xs-3'>
                <select>
                  <option>2</option>
                </select>
              </div>
              <div className='col-xs-3'>
                <input onChange={(e) => this.handleChange(e)} name='value' className='form-control input-sm' type='text' placeholder='输入时间' required/>
              </div>
              <div className='col-xs-2'>
                <button onClick={e => this.handleSubmit(e)} className='btn btn-info btn-sm'>插入</button>
              </div>
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
