import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from '../styles/components/nav';
const cx = classNames.bind(styles);

const Nav = () => {
  return (
    <nav className={cx('nav')}>
      <Link to="/"
            className={cx('nav-item')}>Perfect</Link>
      <Link to="/film"
            className={cx('nav-item')}
            activeClassName={cx('nav-item-active')}>Film</Link>
      <Link to="/vote"
            className={cx('nav-item')}
            activeClassName={cx('nav-item-active')}>Vote</Link>
      <Link to="/performance"
            className={cx('nav-item')}
            activeClassName={cx('nav-item-active')}>Performance</Link>
      <Link to="/about" className={cx('nav-item')}
            activeClassName={cx('nav-item-active')}>About</Link>
    </nav>
  );
};

export default Nav;