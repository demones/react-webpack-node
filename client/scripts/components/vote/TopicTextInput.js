import React, {Component, PropTypes} from 'react';
const ENTER_KEY_CODE = 13;

class TopicTextInput extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  //保存
  onSave() {
    const {onEntrySave, newTopic} = this.props;

    onEntrySave(newTopic.get('content'));
  }

  // input change 时触发
  onChange(event) {
    const {onEntryChange} = this.props;
    onEntryChange(event.target.value);
  }

  /*
   * @param  {object} event
   */
  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSave();
    }
  }

  render() {
    const {className, placeholder, newTopic} = this.props;

    return (
      <input className={className}
             placeholder={placeholder}
             onChange={this.onChange}
             onKeyDown={this.onKeyDown}
             value={newTopic.get('content')}
             autoFocus/>
    );
  }
}

TopicTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  newTopic: PropTypes.object,
  onEntrySave: PropTypes.func,
  onEntryChange: PropTypes.func
};

export default TopicTextInput;