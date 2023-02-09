import { useState } from "react";
import { BurgerProps } from "../../types/types";
import { burgerHandler } from "../../utils/Burger";
import styles from "./Burger.module.scss";

const Burger = ({ mobileHandler }: BurgerProps): JSX.Element => {
  const [current, newState] = useState<any>(styles.defaultBurger);

  return (
    <div
      className={current}
      onClick={() => burgerHandler(mobileHandler, newState, current, styles)}
    ></div>
  );
};

export default Burger;
