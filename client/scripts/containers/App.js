import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Nav from '../components/Nav'
import * as indexActions from '../actions/index';
import * as cacheActions from '../actions/cache';
import classNames from 'classnames/bind';
import styles from '../../sass/main';

const cx = classNames.bind(styles);

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    toast: PropTypes.object,
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
      }, 3000);
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
        <Helmet
          title="React Webpack Node - Example App"
          titleTemplate="%s - React Webpack Node - Example App"
          meta={[
            { charset: 'UTF-8' },
            {
              'http-equiv': 'Cache-Control',
              content: 'no-cache',
            },
            {
              'http-equiv': 'Pragma',
              content: 'no-cache',
            },
            {
              'http-equiv': 'Expires',
              content: '0',
            },
            {
              name: 'keywords',
              content: 'React Webpack Node',
            },
            {
              name: 'description',
              content: 'React Webpack Node',
            },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1,user-scalable=no',
            }
          ]}
        />
        {this.renderToast()}
        <Nav />
        <hr/>
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
    toast: state.get('toast'),
    cache: state.get('cache'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    indexActions: bindActionCreators(indexActions, dispatch),
    cacheActions: bindActionCreators(cacheActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
