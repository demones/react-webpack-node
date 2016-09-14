/* Create enhanced history object for router */
const createSelectLocationState = () => {
  let prevRoutingState = null, prevRoutingStateJS = null;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

export default createSelectLocationState;