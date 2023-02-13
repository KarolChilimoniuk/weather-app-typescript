import styles from "./Error.module.scss";

const Error404 = (): JSX.Element => {
  return (
    <div className={styles.errorContainer}>
      <h2>Error 404 - Page not found</h2>
    </div>
  );
};

export default Error404;
