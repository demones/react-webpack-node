import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames/bind';
import Immutable from 'immutable';
import bootstrap from '../../bootstrapCss';
import filmStyle from '../../../sass/modules/film'
const cx = classNames.bind(filmStyle);

class Film extends Component {
  static propTypes = {
    filmActions: PropTypes.object,
    allFilmList: PropTypes.object,
    popularityFilmList: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'all'
    };

    this.name = '';
    this.animations = ['example-opacity', 'example-fade-in', 'example-burst-in'];
  }

  componentWillMount() {
    this.switchTab('all')();
  }

  // https://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710581&idx=1&sn=4f1d6594439ef59c00a6ae02b8b2a8ee&scene=0&uin=MTM4MDEzMzQxMw%3D%3D&key=1a6dc58b177dc62684c4d35441a1ece9fae7c32fd287bc4ee392ad381e23b83f382f5bd7a4720c828268d80c2f208aa0&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G1004)&version=11020113&lang=zh_CN&pass_ticket=D5FbIwwfJDVO%2FZY8dAdnoE5N4hN5zzu1HnU1wNa7ZnPSCdUqrPt63rJWiM6fh5xo
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeTab !== nextState.activeTab ||
      !Immutable.is(this.props.allFilmList, nextProps.allFilmList) ||
      !Immutable.is(this.props.popularityFilmList, nextProps.popularityFilmList);
  }

  switchTab = (type) => {
    return (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const {
        filmActions
      } = this.props;

      //切换之前先清空
      filmActions.cleanFilmList(this.state.type);

      this.setState({
        activeTab: type
      });

      filmActions.getFilmList(type);
    };
  };

  renderList() {
    const {
      allFilmList, popularityFilmList
    } = this.props;

    const {activeTab} = this.state;
    const film = activeTab === 'all' ? allFilmList : popularityFilmList;
    const entities = film.get('entities');

    if (!entities) {
      return (
        <div className={cx('page-loading')}>载入中，请稍后 ...</div>
      );
    } else if (entities.size === 0) {
      return (
        <div>
          <p>无记录</p>
        </div>
      );
    }

    return (
      <ul className={bootstrap('list-group')}>
        {
          //item 是每条记录，index 下标值，list 所有数据
          entities.map((item, index, list) => {
            return (
              <li key={item.get('id')} className={bootstrap('list-group-item')}>
                <a href={item.get('link')} target="_blank">{item.get('name')}</a>
              </li>
            );
          })
        }
      </ul>
    )
  }

  render() {
    const {activeTab} = this.state;

    const random = Math.ceil(Math.random() * 10);
    let index = 0;
    if (random > 4 && random < 8) {
      index = 1;
    } else if (random >= 8) {
      index = 2;
    }
    const transitionName = this.animations[index];

    /**
     * react 动画结合 css Module，解决的方法有两种，利用 :global 设置全局 css
     * 指定 transitionName 为 对象 Object prop。详见
     * https://github.com/css-modules/css-modules/issues/84
     */
    return (
      <div className={bootstrap('container')}>
        <ul className={bootstrap('nav', 'nav-pills')}>
          <li className={bootstrap('nav-item')}>
            <a className={bootstrap('nav-link', activeTab === 'all' ? 'active' : '')}
               onClick={this.switchTab('all')}>全部</a>
          </li>
          <li className={bootstrap('nav-item')}>
            <a className={bootstrap('nav-link', activeTab === 'popularity' ? 'active' : '')}
               onClick={this.switchTab('popularity')}>人气</a>
          </li>
        </ul>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={transitionName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={200}>
          <div className={bootstrap('tab-content', 'm-t-1')} key={activeTab}>
            {this.renderList()}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Film;
