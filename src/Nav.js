import React, { useState, useEffect } from 'react';

import logo from './assets/images/logo.svg';
import avatar from './assets/images/avatar.jpg';

import './Nav.css';

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img className="nav__logo" src={logo} alt="Netflix User Logo" />
      <img className="nav__avatar" src={avatar} alt="Avatar Logo" />
    </div>
  );
};

export default Nav;
