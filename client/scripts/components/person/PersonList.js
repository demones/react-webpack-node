import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import PersonItem from './PersonItem';
import bootstrap from '../../bootstrapCss';
import style from '../../../sass/modules/person'
//图片
import noItems from '../../../images/no_items.png';

const cx = classNames.bind(style);

class PersonList extends Component {
  static propTypes = {
    personActions: PropTypes.object,
    person: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    // 如果 reducer 把 dispatch 放到了 props 中，可以采用以下方式调用
    // import {getPersonList} from '../actions/person';
    // const {dispatch} = this.props;
    // dispatch(getPersonList());
    // 直接用以下方式处理，效果和上面是一样的
    const {personActions, person} = this.props;
    // 如果第一次需加载列表
    const entities = person.get('entities');
    if (!entities) {
      personActions.getPersonList();
    }
  }

  loadMore() {
    const {person, personActions} = this.props;
    const isFetching = person.get('isFetching');
    const entities = person.get('entities');
    const lastPage = entities.get('lastPage');
    if (!isFetching && !lastPage) {
      personActions.getPersonList();
    }
  }

  //箭头函数写法，这样不用绑定 this
  refresh = (e) => {
    const {personActions} = this.props;
    personActions.getPersonList(true);
  }

  renderList() {
    const {person, personActions} = this.props;
    const isFetching = person.get('isFetching');
    const entities = person.get('entities');

    if (!entities) {
      return (
        <div className={cx('page-loading')}>载入中，请稍后 ...</div>
      );
    }

    const lastPage = entities.get('lastPage');
    const items = entities.get('items');

    if (items.size === 0) {
      return (
        <div className={bootstrap('m-t-3')}>
          <img className={cx('no-items')} src={noItems}/>
          <p className={bootstrap('m-t-2', 'text-xs-center', 'text-muted')}>暂无记录</p>
        </div>
      );
    }

    return (
      <div>
        <table className={bootstrap('table')}>
          <thead className={bootstrap('thead-inverse')}>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            items ? items.map((person) => {
              return (
                <PersonItem key={person.get('_id')} person={person} personActions={personActions}/>
              );
            }) : null
          }
          </tbody>
        </table>
        <div className={cx('person-btn-group')}>
          <button type="button" className={bootstrap('btn', 'btn-primary')} disabled={lastPage}
                  onClick={this.loadMore}>Load More
          </button>
          <button type="button" className={bootstrap('btn', 'btn-info')}
                  onClick={this.refresh}>Refresh
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={bootstrap('m-b-1')}>
          <Link className={bootstrap('btn', 'btn-primary')} to="/person/create">Add Person</Link>
        </div>
        {this.renderList()}
      </div>
    );
  }
}

export default PersonList;
