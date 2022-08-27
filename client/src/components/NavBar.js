import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import music from '../pages/Player/music/believer.mp3'

import styles from './NavBar.module.scss';

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <NavLink to="/" className={styles.navbar_logo}>Logo</NavLink>
        <ul className={styles.navbar_list}>
          <li className={styles.navbar_item}>
            <NavLink to='/create'>Create</NavLink>
          </li>
          <li className={styles.navbar_item}>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li className={styles.navbar_item}>
            <a href="/" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;