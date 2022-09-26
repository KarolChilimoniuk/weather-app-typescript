import React, { useState } from "react";
import styles from "./Form.module.scss";

type FormProps = {
  appMethod: Function;
  cityName: string;
};

const Form = ({ appMethod, cityName }: FormProps): JSX.Element => {
  const [userCity, changeCity] = useState<string>("");

  const submitHandler = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    appMethod(userCity);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.labelInputContainer}>
        <label className={styles.formLabel}>Search weather:</label>
        <input
          name="weather"
          type="text"
          id="weather"
          placeholder="city"
          onChange={(e) => changeCity(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <input
        id={styles.submit}
        type="submit"
        value="search"
        className={styles.formInput}
      />
    </form>
  );
};

export default Form;
