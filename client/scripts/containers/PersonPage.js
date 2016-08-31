import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Person from '../components/person';
import * as personActions from '../actions/person';

function mapStateToProps(state, ownProps) {
  const person = state.get('person');
  return {
    person
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);


