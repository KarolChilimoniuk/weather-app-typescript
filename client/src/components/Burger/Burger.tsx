import React, {useState} from 'react';
import styles from './Burger.module.scss';

type Handler = {
    mobileHandler: Function
}

const Burger = ({mobileHandler}:Handler):JSX.Element => {
    const [current, newState] = useState(styles.defaultBurger);
    
    const burgerHandler = ():void => {
      mobileHandler();
      if(current === styles.defaultBurger) {
          newState(styles.xBurger);
      } else {
          newState(styles.defaultBurger);
      }
    }

    return (
        <div className={current}
        onClick={burgerHandler}></div>
    )
}

export default Burger;