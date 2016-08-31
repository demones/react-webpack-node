import React, {Component, PropTypes} from 'react';

class Index extends Component {
  render() {
    const {
      children, location, personActions, person
    } = this.props;

    return (
      <div>
        {children && React.cloneElement(children, {
          key: location.pathname,
          personActions,
          person
        })}
      </div>
    );
  }
}

Index.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  personActions: PropTypes.object,
  person: PropTypes.object
};

export default Index;
