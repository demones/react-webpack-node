import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../../sass/modules/vote/scoreboard';

const cx = classNames.bind(styles);

const Scoreboard = ({topics}) => {
  const topicListItems = topics.map((topic, key) => {
    return (
    <li className={cx('item')} key={key}>
      <span className={cx('topic')}>{topic.get('content')}</span>
      <span className={cx('count')}>{topic.get('count')}</span>
    </li>);
  });
  return (
    <div className={cx('scoreboard')}>
      <h3 className={cx('header')}>Vote count</h3>
      <ul className={cx('list')}>
        {topicListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  topics: PropTypes.object.isRequired
};

export default Scoreboard;
