import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import bootstrap from '../../bootstrapCss';
import styles from '../../../sass/main';
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
        <h1 className={bootstrap("m-t-3")}>react-webpack-node</h1>
        <h2 className={bootstrap("m-t-3")}>React Redux Router Immutable Webpack Gulp Express Mongodb Sass Css Module etc.</h2>
      </div>
    );
  }
}

export default Home;
