import React from 'react';

class LineSelect extends React.Component{
constructor(props){
  super(props)
}
handleChange(e){
  this.props.onStationSelect(e.target.name,e.target.value);
  console.log(e.target.value);
}
render(){
  let lineStations=this.props.lineData.map((station)=>{

    return <option key={station.uniquekey} value={station.uniquekey}>{station.chsName}</option>
  })
  return (
    <select name={this.props.name} onChange={e=>this.handleChange(e)} className='form-control' defaultValue={this.props.lineData[0].uniquekey}>
        {lineStations}
    </select>
  );
}

}
export default LineSelect;
