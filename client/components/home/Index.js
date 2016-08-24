import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/main';
const cx = classNames.bind(styles);

//首页
class Home extends Component {
  // 定义检查 props 属性
  static propTypes = {};
  // 默认属性值
  static defaultProps = {
    className: ''
  };
  //路由上下文
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={cx('home')}>
        <h1>react-webpack-node</h1>
        <h2>React Redux Router Immutable Webpack Gulp Express Cssnext Css Module etc.</h2>
      </div>
    );
  }
}

export default Home;
