import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Nav from '../components/Nav'
import * as indexActions from '../actions/index';
import classNames from 'classnames/bind';
import styles from '../styles/main';

const cx = classNames.bind(styles);

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    indexActions: PropTypes.object,
  };
  // 默认属性值
  static defaultProps = {
    className: ''
  };

  render() {
    const {
      children, location, indexActions
    } = this.props;

    return (
      <div className={cx('main')}>
        <Nav />
        {children && React.cloneElement(children, {
          key: location.pathname,
          indexActions
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    indexActions: bindActionCreators(indexActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
