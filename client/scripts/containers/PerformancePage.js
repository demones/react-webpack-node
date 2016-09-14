import React, {Component, PropTypes} from 'react';

/*eslint-disable react/no-multi-comp*/
class NumberDiv extends Component {
  static propTypes = {
    number: PropTypes.number,
    chosedNumber: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    }
  }

  /**
   * 用 react-addons-perf 来分析性能
   * Perf.start()
   * Perf.stop()
   * Perf.printInclusive()
   */
  shouldComponentUpdate(nextProps) {
    //通过判断是否需要重新渲染来提高性能
    return nextProps.render
  }

  render() {
    const style = {
      height: '100px',
      width: '100px',
      float: 'left',
      margin: '10px',
      backgroundColor: 'gray',
    };
    const chosedStyle = {
      height: '100px',
      width: '100px',
      float: 'left',
      margin: '10px',
      backgroundColor: 'red',
    }
    return (
      <div style={this.props.chosedNumber === this.state.number ? chosedStyle : style}>
        {this.state.number}
      </div>
    );
  }
}

class ChooseNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumber: -1, //当前选中的
      lastNumber: -1 //上一次选中的
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (parseInt(e.target.value, 10) !== this.state.inputNumber) {
      this.setState({
        inputNumber: parseInt(e.target.value, 10),
        lastNumber: this.state.inputNumber
      })
    }
  }

  render() {
    const inputStyle = {
      display: 'block',
      clear: 'both',
      width: '200px',
      marginBottom: '10px',
    }
    const children = [];
    for (let i = 0; i < 1000; i++) {
      children.push(<NumberDiv key={i} render={i === this.state.inputNumber || i === this.state.lastNumber}
                               chosedNumber={this.state.inputNumber} number={i}/>)
    }
    return (
      <div style={{textAlign: 'text'}}>
        <input type="text" style={inputStyle} placeholder="请输入一个数字" onChange={this.handleChange}/>
        {children}
      </div>
    );
  }
}


export default ChooseNumber;