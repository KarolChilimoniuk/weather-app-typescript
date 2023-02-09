import React, { useState } from "react";
import { FormProps } from "../../types/types";
import { submitHandler } from "../../utils/Form";
import styles from "./Form.module.scss";

const Form = ({ appMethod, cityName }: FormProps): JSX.Element => {
  const [userCity, changeCity] = useState<string>("");

  return (
    <form
      onSubmit={(e) => submitHandler(e, appMethod, userCity)}
      className={styles.form}
    >
      <div className={styles.labelInputContainer}>
        <label className={styles.formLabel}>Check weather in:</label>
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
        value="check"
        className={styles.formInput}
      />
    </form>
  );
};

export default Form;
