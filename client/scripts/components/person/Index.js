import React, {PropTypes} from 'react';
import bootstrap from '../../bootstrapCss';

const Index = ({children, location, personActions, person}) => {

  return (
    <div className={bootstrap('container', 'm-t-2')}>
      {children && React.cloneElement(children, {
        key: location.pathname,
        personActions,
        person
      })}
    </div>
  );

};

Index.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  personActions: PropTypes.object,
  person: PropTypes.object
};

export default Index;
