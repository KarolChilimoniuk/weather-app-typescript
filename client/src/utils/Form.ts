export const submitHandler = (
  e: React.SyntheticEvent,
  appMethod: Function,
  userCity: string
): void => {
  e.preventDefault();
  appMethod(userCity);
};
