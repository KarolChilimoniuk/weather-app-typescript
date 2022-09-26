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
    <div className={styles.navContainer}>
      <Burger mobileHandler={mobileNavHandler} />
      <nav className={styles.desktopNavigation}>
        <div className={styles.background}></div>
        <ul className={styles.navigationList}>
          <li className={styles.navigationElement}>
            <NavLink to="/" className={styles.navigationLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.navigationElement}>
            <NavLink to="/requiredForecast" className={styles.navigationLink}>
              Forecast
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav
        className={
          mobileNavVisibility === false
            ? styles.mobileNavigation
            : `${styles.mobileNavigation} ${styles.visible}`
        }
      >
        <div className={styles.background}></div>
        <ul className={styles.navigationList}>
          <li className={styles.navigationElement}>
            <NavLink to="/" className={styles.navigationLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.navigationElement}>
            <NavLink to="/requiredForecast" className={styles.navigationLink}>
              Forecast
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
