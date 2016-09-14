import React, {PropTypes} from 'react';
import TopicItem from './TopicItem';
import classNames from 'classnames/bind';
import styles from '../../../sass/modules/vote/main-section';

const cx = classNames.bind(styles);

const MainSection = ({topics, onIncrement, onDecrement, onDestroy}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <TopicItem
        id={topic.get('id')}
        key={topic.get('id')}
        content={topic.get('content')}
        incrementCount={onIncrement}
        decrementCount={onDecrement}
        destroyTopic={onDestroy}/>);
  });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Vote for your favorite hack day idea</h3>
      <ul className={cx('list')}>{topicItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  topics: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default MainSection;
