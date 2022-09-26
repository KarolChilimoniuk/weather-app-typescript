import { useState } from "react";
import { BurgerProps } from "../../services/types/types";
import styles from "./Burger.module.scss";

const Burger = ({ mobileHandler }: BurgerProps): JSX.Element => {
  const [current, newState] = useState<any>(styles.defaultBurger);

  const burgerHandler = (): void => {
    mobileHandler();
    if (current === styles.defaultBurger) {
      newState(styles.xBurger);
    } else {
      newState(styles.defaultBurger);
    }
  };

  return <div className={current} onClick={burgerHandler}></div>;
};

export default Burger;
