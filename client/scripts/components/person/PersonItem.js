import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import callApi from '../../utils/fetch';
import style from '../../../sass/modules/person'
const cx = classNames.bind(style);

class PersonItem extends Component {
  static propTypes = {
    personActions: PropTypes.object,
    person: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      person: this.props.person
    };

    this.personDefault = this.props.person;
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editing: true
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      editing: false,
      person: this.personDefault
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const {personActions} = this.props;
    const url = 'person';
    const body = this.state.person.toJSON();
    delete body.createdDate;
    delete body.updatedDate;

    callApi({
      url, body, options: {
        method: 'post'
      }
    }).then(
      (json) => {
        personActions.updatePerson(this.state.person);
        this.setState({
          editing: false
        }, () => {
          this.personDefault = this.state.person;
        });
      },
      (error) => {

      }
    );
  };

  handleDelete = (_id) => {
    return (e) => {
      e.preventDefault();
      const {personActions} = this.props;
      const url = 'person';
      callApi({
        url, body: {
          _id
        }, options: {
          method: 'delete'
        }
      }).then(
        (json) => {
          personActions.deletePerson(_id);
        },
        (error) => {

        }
      );
    }
  };

  textOrInput(field, val) {
    const editing = this.state.editing;
    if (editing) {
      // 这里使用可控输入框组件
      return (
        <input type="text" value={val} onChange={this.handleChange(field)}/>
      );
    }
    return (
      <span>{val}</span>
    );
  }

  handleChange = (field) => {
    return (event) => {
      const person = this.state.person;
      const val = event.target.value;
      this.setState({
        person: person.set(field, val)
      });
    }
  };

  render() {
    const {editing, person} = this.state;
    const _id = person.get('_id');
    const firstName = person.get('firstName');
    const lastName = person.get('lastName');

    return (
      <tr>
        <th>{_id}</th>
        <td>{this.textOrInput('firstName', firstName)}</td>
        <td>{this.textOrInput('lastName', lastName)}</td>
        <td>{firstName + lastName}</td>
        <td className={cx('link-group')}>
          <a href="" style={{display: !editing ? 'inline' : 'none'}}
             onClick={this.handleEdit}>编辑</a>
          <a href="" style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleCancel}>取消</a>
          <a href="" style={{display: editing ? 'inline' : 'none'}}
             onClick={this.handleSave}>保存</a>
          <a href="" onClick={this.handleDelete(_id)}>删除</a>
        </td>
      </tr>
    );
  }
}


export default PersonItem;
