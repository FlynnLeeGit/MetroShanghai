import React from 'react';

class LineNumber extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span className={`line-number line-${this.props.line}`}>
          {this.props.line}
        </span>
        <span style={{fontSize:'2em'}}>号线</span>
      </div>
    );
  }
}

export default LineNumber;
