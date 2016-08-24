import React, {PropTypes} from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import Immutable from 'immutable';
import createRoutes from '../routes';
import configureStore from '../store'
import createSelectLocationState from '../routes/createSelectLocationState';

import DevTools from './DevTools';
import Perf from 'react-addons-perf';

const store = configureStore(browserHistory, Immutable.fromJS(window.__initialState__ || {}));

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState()
});


const Root = () => {
  const routes = createRoutes(store);
  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );
};

export default Root;

render(
  <Provider store={store}>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
);

/**
 * import Perf from 'react-addons-perf';
 * Perf.start()
 * Perf.stop()
 * Perf.printInclusive()
 */
if (typeof (window) !== 'undefined') {
  window.Perf = Perf;
}