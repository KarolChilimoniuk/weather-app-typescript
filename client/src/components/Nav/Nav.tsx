import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Burger from "../Burger/Burger";
import styles from "./Nav.module.scss";

const Nav = (): JSX.Element => {
  const [mobileNavVisibility, changeVisibility] = useState<boolean>(false);

  const mobileNavHandler = (): void => {
    if (mobileNavVisibility === false) {
      changeVisibility(true);
    } else {
      changeVisibility(false);
    }
  };

  return (
    <div className={styles.nav__container}>
      <Burger mobileHandler={mobileNavHandler} />
      <nav className={styles.nav__desktopNavigation}>
        <div className={styles.desktopNavigation__background}></div>
        <ul className={styles.desktopNavigation__list}>
          <li className={styles.desktopNavigation__element}>
            <NavLink to="/" className={styles.desktopNavigation__link}>
              Home
            </NavLink>
          </li>
          <li className={styles.desktopNavigation__element}>
            <NavLink
              to="/requiredForecast"
              className={styles.desktopNavigation__link}
            >
              Forecast
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav
        className={
          mobileNavVisibility === false
            ? styles.nav__mobileNavigation
            : `${styles.nav__mobileNavigation} ${styles.visible}`
        }
      >
        <div className={styles.mobileNavigation__background}></div>
        <ul className={styles.mobileNavigation__list}>
          <li className={styles.mobileNavigation__element}>
            <NavLink to="/" className={styles.mobileNavigation__link}>
              Home
            </NavLink>
          </li>
          <li className={styles.mobileNavigation__element}>
            <NavLink
              to="/requiredForecast"
              className={styles.mobileNavigation__link}
            >
              Forecast
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
