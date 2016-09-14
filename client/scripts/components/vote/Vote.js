import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import EntryBox from './EntryBox';
import MainSection from './MainSection';
import Scoreboard from './Scoreboard';
import styles from '../../../sass/modules/vote/index';
import bootstrap from '../../bootstrapCss';

const cx = classNames.bind(styles);

class Vote extends Component {

  static propTypes = {
    topics: PropTypes.object.isRequired,
    enterTopic: PropTypes.func.isRequired,
    fetchTopics: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    newTopic: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchTopics();
  }

  render() {
    const {newTopic, topics, enterTopic, createTopic, destroyTopic, incrementCount, decrementCount} = this.props;
    return (
      <div className={`${cx('vote')} ${bootstrap('container', 'm-t-2')}`}>
        <EntryBox newTopic={newTopic}
                  onEntryChange={enterTopic}
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

export default Vote;