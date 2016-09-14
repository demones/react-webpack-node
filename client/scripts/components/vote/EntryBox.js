import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import TopicTextInput from './TopicTextInput';
import styles from '../../../sass/modules/vote/entrybox';

const cx = classNames.bind(styles);

const EntryBox = ({onEntryChange, onEntrySave, newTopic}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Vote for your top hack idea</h1>
      <TopicTextInput
        className={cx('input')}
        newTopic={newTopic}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  newTopic: PropTypes.object,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
