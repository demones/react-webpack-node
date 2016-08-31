import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Film from '../components/film';
import * as filmActions from '../actions/film';

function mapStateToProps(state, ownProps) {
  const film = state.get('film');
  return {
    allFilmList: film.get('allFilmList'),
    popularityFilmList: film.get('popularityFilmList')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filmActions: bindActionCreators(filmActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);
