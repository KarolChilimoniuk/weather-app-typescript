import styles from "./Error.module.scss";

const Error404 = (): JSX.Element => {
  return (
    <div className={styles.error__container}>
      <h2 className={styles.error__header}>Error 404 - Page not found</h2>
    </div>
  );
};

export default Error404;
