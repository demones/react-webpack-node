import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import PersonItem from './PersonItem';
import bootstrap from '../../bootstrapCss';
import style from '../../../sass/modules/person'

const cx = classNames.bind(style);

class PersonList extends Component {
  constructor(props){
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    // 如果 reducer 把 dispatch 放到了 props 中，可以采用以下方式调用
    // import {getPersonList} from '../actions/person';
    // const {dispatch} = this.props;
    // dispatch(getPersonList());
    // 直接用以下方式处理，效果和上面是一样的
    const {personActions} = this.props;
    personActions.getPersonList();
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

  refresh() {
    const {personActions} = this.props;
    personActions.cleanPersonList();
    personActions.getPersonList();
  }

  render() {
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
        <div>
          <p>无记录</p>
        </div>
      );
    }

    return (
      <div>
        <div className="m-b-1">
          <Link className="btn btn-primary" to="/example/person/create">Add Person</Link>
        </div>

        <table className="table">
          <thead className="thead-inverse">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            items ? items.map((person) => {
              return (
                <PersonItem key={person.get('id')} person={person} personActions={personActions}/>
              );
            }) : null
          }
          </tbody>
        </table>
        <div className="examples-btn-group">
          <button type="button" className="btn btn-primary" disabled={lastPage}
                  onTouchTap={this.loadMore}>Load More
          </button>
          <button type="button" className="btn btn-info"
                  onTouchTap={this.refresh}>Refresh
          </button>
        </div>
      </div>
    );
  }
}

PersonList.propTypes = {
  personActions: PropTypes.object,
  person: PropTypes.object,
};

export default PersonList;
