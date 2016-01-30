import React from 'react';

import StationWrapper from './StationWrapper';
import EditPanel from './EditPanel';
import AddPanel from './AddPanel';
import TimePanel from './TimePanel';

import Alert from '../common/Alert';



import Dij from '../common/Dij';
import ajax from '../common/ajax';

import {findIndex} from '../common/Common';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, //数据是否在loading中
      maxRender: 1,

      stationsData: [], //所有站点信息的数据集合
      timeData: [],
      transferData: [],
      idMap: {},

      path: [], //包含经过路径的集合
      lastSelected: 0, //之前选择节点
      nowSelected: 0, //现在选择节点

      showEdit: false, //是否显示编辑框
      editIndex: 0, //编辑站点的索引

      showAdd: false, //是否显示添加面板
      maxKey: 0,

      showTime: false,

      langCN:true,

      showAlert: false,
      alertText: '',
      alertTheme: 'success',
      alertAutoClose: true
    }

    this.addData = {
      uniquekey: 0,

      line: 1,
      lineWidth: 3,
      lineAngel: 0,
      lineOffset: 0,

      chsName: '上海',
      engName: 'SH',
      nameAngel: 0,
      nameLeft: 30,
      nameTop: 10,
      nameVisible: 1,
      assist: 0,
      wc: 0,

      nodeType: 'normal',
      nodeAngel: 0,

      line2Visible: 0,
      line2Angel: 0,
      line2Width: 3,
      line2Offset: 0
    };
    this.dij = new Dij(380);

  }

  componentDidMount() {
    this.initStationsData();
    this.initTimeData();
    this.getMaxKey();
    this.timer1=setInterval(() => {
          this.setState({
            maxRender: this.state.maxRender + 20
          })
        }, 1);
  }
  initStationsData() {
    ajax.stationGet((result) => {
      let tmpObj = {};
      for (let k in result) {
        tmpObj[result[k].uniquekey] = k;
      } //生成节点编号与数组索引的map表
      this.setState({idMap: tmpObj, stationsData: result, loading: false}); //保存至idMap
    })
  }
  initTimeData() {
    ajax.timeGet((timeResult) => {
      this.dij.initSource(timeResult); //dij实例初始化数据
      this.setState({timeData: timeResult});
    })
  }
  getMaxKey() {
    ajax.maxKeyGet((max) => {
      this.setState({maxkey: max});
    })
  }

  openEditPanel(index) {
    let newState = {
      showEdit: true, //打开编辑窗口
      editIndex: index, //编辑的站点索引号
    };
    this.setState(newState);
  }

  onEditChange(e, index) {
    let newStationsData = this.state.stationsData.concat([]);

    newStationsData[index][e.target.name] = e.target.value; //对应索引站点数据的
    this.setState({stationsData: newStationsData});
  }
  onEditConfirm(e, index) {
    e.preventDefault();
    let editData = this.state.stationsData[index];
    ajax.stationPost(editData, () => {
      this.setState({showEdit: false, showAlert: true, alertText: '更新站点成功！', alertTheme: 'success', alertAutoClose: true});
    })
  }

  onEditClose(e) {
    this.setState({showEdit: false});
  }
  onEditDelete(e, index) {
    console.log('delete');
    let id = this.state.stationsData[index].id;
    ajax.stationDel(id, (result) => {
      this.setState({showEdit: false, showAlert: true, alertText: '删除站点成功！', alertTheme: 'danger', alertAutoClose: true})
      this.initStationsData();
    })
  }

  onClickLayer() {
    this.setState({
      lastSelected: this.state.nowSelected,
      nowSelected: 0,
      showEdit: false,
      showAdd: false,
      path: [],
      showAlert: false,
      showTime: false
    });
  }

  openAddPanel(e) {
    e.stopPropagation();
    this.setState({showAdd: true});

  }
  changeAddValue(e) {
    let [sData,
      ele] = [this.state.stationsData, e.target];
    this.addData[ele.name] = e.target.value;
  }
  confirmAdd(e) {
    e.preventDefault();
    let [l,
      t] = [
      e.pageX - e.clientX + 100,
      e.pageY - e.clientY + 100
    ];
    this.addData.left = l;
    this.addData.top = t;
    this.addData.uniquekey = this.state.maxkey + 1;
    ajax.stationPut(this.addData, () => {
      this.initStationsData();
      this.setState({showAdd: false, showAlert: true, alertText: '添加站点完成', alertTheme: 'success', alertAutoClose: true});
    })
  }
  onCloseAdd() {
    this.setState({showAdd: false})
  }

  openTimePanel(e) {
    e.stopPropagation();
    this.setState({showTime: true})

  }

  updateStation(msg) {
    this.setState({showAlert: true, alertText: msg, alertTheme: 'success', alertAutoClose: true});
    this.initStationsData();
  }

  updateTime() {
    console.log('更新完成');
    this.initStationsData();
    this.initTimeData();

  }

  onDismissAlert() {
    this.setState({showAlert: false});
  }

  selectStation(endKey) {
    let [start,
      end] = [this.state.nowSelected, endKey];

    if (start && end && start != end) { //上一次点击与本次点击都有值且不相等，进入算法计算
      let {result, path} = this.dij.getMin(start, end); //dij算法的获得最短时间距离和节点
      console.log(result, path);
      if (result) {
        let sData = this.state.stationsData;
        let [startIndex,
          endIndex] = [
          findIndex(sData, start, 'uniquekey'),
          findIndex(sData, end, 'uniquekey')
        ];
        let [startName,
          endName] = [sData[startIndex].chsName, sData[endIndex].chsName];
        this.setState({
          path: path,
          showAlert: true,
          alertTheme: 'info',
          alertAutoClose: false,
          alertText: `从 ${startName} 到 ${endName} 途径${path.length}站,预计${result}分钟到达`
        })
      }
    }
    this.setState({lastSelected: this.state.nowSelected, nowSelected: endKey});
  }

changeLang(e){
  this.setState({langCN:!this.state.langCN})

}

  render() {
    if (this.state.loading) {
      return <h1>渲染中...</h1>
    } else {

      let progress=this.state.maxRender/this.state.stationsData.length*100>100?100:this.state.maxRender/this.state.stationsData.length*100;

      if(this.state.maxRender>this.state.stationsData.length){  //当加载完毕后清除定时器
        clearInterval(this.timer1);
       }

      let stations = this.state.stationsData.map((station, index) => {
        if (index < this.state.maxRender) {
          return <StationWrapper key={station.id} {...station} index={index} langCN={this.state.langCN} lastSelected={this.state.lastSelected == station.uniquekey} selected={this.state.nowSelected == station.uniquekey} pathNode={findIndex(this.state.path, station.uniquekey) != -1} openEditPanel={this.openEditPanel.bind(this)} selectStation={this.selectStation.bind(this)} updateStation={this.updateStation.bind(this)}/>
        }
      })


      return (

        <div>
          <div className='fixed-bar header'>
                    <Alert text={this.state.alertText} visible={this.state.showAlert} theme={this.state.alertTheme} autoClose={this.state.alertAutoClose} onDismiss={this.onDismissAlert.bind(this)}/>
              </div>

<div className='main-container' onClick={() => this.onClickLayer()} onDragOver={e => e.preventDefault()} onDrop={e => e.preventDefault()}>
          <h1>载入站点中{parseInt(progress)}%</h1>
        <EditPanel theme='info' title='编辑' {...this.state.stationsData[this.state.editIndex]} visible={this.state.showEdit} onEditChange={e => this.onEditChange(e, this.state.editIndex)} onEditConfirm={e => this.onEditConfirm(e, this.state.editIndex)} onEditDelete={e => this.onEditDelete(e, this.state.editIndex)} onEditClose={e => this.onEditClose(e)} updateStation={this.updateStation.bind(this)}/>
          <AddPanel theme='warning' title='添加站点' maxKey={this.state.maxkey} visible={this.state.showAdd} handleChange={e => this.changeAddValue(e)} onConfirmBtn={this.confirmAdd.bind(this)} onClose={e => this.onCloseAdd(e)}/>
          <TimePanel theme='success' title='时间管理列表' visible={this.state.showTime} updateTime={this.updateTime.bind(this)} tData={this.state.timeData} sData={this.state.stationsData} idMap={this.state.idMap}/>
          {stations}
        </div>


 <div className='fixed-bar footer'>
                <button className="btn btn-lg btn-warning change-lang" onClick={e=>this.changeLang(e)}>切换语言</button>
            <button onClick={(e) => this.openAddPanel(e)} className='btn btn-lg btn-info add-btn'>添加站点</button>
          <button onClick={(e) => this.openTimePanel(e)} className='btn btn-lg btn-success time-btn'>时间管理</button>


              </div>   

        </div>
        
      );
    }
  }
}

export default Admin;
