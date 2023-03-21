export const submitHandler = (
  e: React.SyntheticEvent,
  appMethod: Function,
  userCity: string
): void => {
  userCity === "" && alert("Write city name");
  e.preventDefault();
  appMethod(userCity);
};
