import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from '../components/vote/EntryBox';
import MainSection from '../components/vote/MainSection';
import Scoreboard from '../components/vote/Scoreboard';
import {
  createTopic, typing, incrementCount,
  decrementCount, destroyTopic, fetchTopics
} from '../actions/vote';
import styles from '../styles/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchTopics
  ]

  render() {
    const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount} = this.props;
    return (
      <div className={cx('vote')}>
        <EntryBox topic={newTopic}
                  onEntryChange={typing}
                  onEntrySave={createTopic}/>
        <MainSection topics={topics}
                     onIncrement={incrementCount}
                     onDecrement={decrementCount}
                     onDestroy={destroyTopic}/>
        <Scoreboard topics={topics}/>
      </div>
    );
  }
}

Vote.propTypes = {
  topics: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newTopic: PropTypes.string
};

function mapStateToProps(state) {
  const {topics, newTopic} = state.vote;
  return {
    topics,
    newTopic
  };
}

export default connect(mapStateToProps, {
  createTopic,
  typing,
  incrementCount,
  decrementCount,
  destroyTopic
})(Vote);
