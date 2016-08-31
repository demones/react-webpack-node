import {connect} from 'react-redux';
import Home from '../components/home';
import {bindActionCreators} from 'redux';
import * as homeAction from '../actions/home';

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    homeAction: bindActionCreators(homeAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
