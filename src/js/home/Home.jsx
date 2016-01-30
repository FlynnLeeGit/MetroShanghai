import React from 'react';

import StationWrapper from './StationWrapper';
import Alert from '../common/Alert';
import LineNumber from '../common/LineNumber';
import Dij from '../common/Dij';
import ajax from '../common/ajax';
import {findIndex} from '../common/Common';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, //数据是否在loading中

      stationsData: [], //所有站点信息的数据集合
      timeData: [],

      path: [], //包含经过路径的集合
      lastSelected: 0, //之前选择节点
      nowSelected: 0, //现在选择节点

      showAlert: false,
      alertText: '',
      alertTheme: 'success',
      alertAutoClose: true,

      langCN:true,
    }
    this.dij = new Dij(380);
  }

  componentDidMount() {
    this.initStationsData();
    this.initTimeData();
  }
  initStationsData() {
    ajax.stationGet((result) => {
      this.setState({stationsData: result, loading: false}); //保存至idMap
    })
  }
  initTimeData() {
    ajax.timeGet((timeResult) => {
      this.dij.initSource(timeResult); //dij实例初始化数据
      this.setState({timeData: timeResult});
    })
  }

  onClickLayer() {
    this.setState({
      lastSelected: this.state.nowSelected,
      nowSelected: 0,
      path: [],
      showAlert: false,
      showTime: false
    });
  }

  onDismissAlert() {
    this.setState({showAlert: false});
  }

  changeLang(e){
    this.setState({langCN:!this.state.langCN})

  }
  selectStation(endKey) {
    let [start,
      end,path] = [this.state.nowSelected, endKey,this.state.path];

      if (start && end && start != end && path.length==0) { //上一次点击与本次点击都有值且不相等，进入算法计算
        let {result, path} = this.dij.getMin(start, end); //dij算法的获得最短时间距离和节点
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
          }else{


          this.setState({lastSelected: this.state.nowSelected, nowSelected: endKey,path:[]});
          }
        }

        render() {
          if (this.state.loading) {
            return <h1>渲染中...</h1>
          } else {
            let stations = this.state.stationsData.map((station, index) => {
              return <StationWrapper
                key={station.id} index={index}
                {...station}
                lastSelected={this.state.lastSelected == station.uniquekey}
                selected={this.state.nowSelected == station.uniquekey}
                pathNode={findIndex(this.state.path, station.uniquekey) != -1}
                langCN={this.state.langCN}
                selectStation={this.selectStation.bind(this)} />
            })
              let lines=[1,2,3,4,5,6,7,8,9,10,11,12,13,16].map((num)=>{
              return <LineNumber key={num} line={num} />
            })

            return (
              <div>
                <div className='fixed-bar header'>
                  <Alert
                    text={this.state.alertText}
                    visible={this.state.showAlert}
                    theme={this.state.alertTheme}
                    autoClose={this.state.alertAutoClose}
                    onDismiss={this.onDismissAlert.bind(this)}/>
                </div>
                <div
                  className='main-container'
                  onClick={() => this.onClickLayer()}>
                  <h1>上海地铁网络交通示意图</h1>
                  {lines}
                  {stations}
                </div>

                <div className='fixed-bar footer'>
                  <button
                    className="btn btn-lg btn-warning change-lang"
                    onClick={e=>this.changeLang(e)}>切换语言</button>
                </div>
              </div>
            );
          }
        }
      }

      export default Home;
