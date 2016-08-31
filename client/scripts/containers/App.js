import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Nav from '../components/Nav'
import * as indexActions from '../actions/index';
import classNames from 'classnames/bind';
import styles from '../../sass/main';

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

  componentDidUpdate() {
    const {
      toast, indexActions
    } = this.props;

    if (toast && toast.get('effect') === 'enter') {
      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId);
      }
      this.toastTimeoutId = setTimeout(() => {
        indexActions.clearToast();
        this.toastTimeoutId = null;
      }, 1500);
    }
  }


  // toast 组件
  renderToast() {
    const {
      toast
    } = this.props;
    const content = toast.get('content');
    const effect = toast.get('effect');

    return (
      <div className={cx('toast-panel', 'flex', 'flex-items-center', 'flex-items-middle', effect || '')}>
        <div className={cx('toast')}>{content}</div>
      </div>
    );
  }

  render() {
    const {
      children, location, indexActions
    } = this.props;

    return (
      <div className={cx('main')}>
        {this.renderToast()}
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
  return {
    toast: state.get('toast')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    indexActions: bindActionCreators(indexActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
