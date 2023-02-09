export const burgerHandler = (
  mobileHandler: Function,
  newState: Function,
  current: any,
  styles: any
): void => {
  mobileHandler();
  if (current === styles.defaultBurger) {
    newState(styles.xBurger);
  } else {
    newState(styles.defaultBurger);
  }
};
