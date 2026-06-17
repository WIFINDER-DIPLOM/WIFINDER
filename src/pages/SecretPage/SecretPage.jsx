import React, { useState } from "react";

import styles from "../SecretPage/SecretPage.module.css";

const SecretPage = () => {
  const [isActive, setActive] = useState("home");

  return (
    <>
      <div className={styles.container}>
        <button
          type="submit"
          className={isActive === "home" ? styles.active : styles.secretBtn}
          onClick={() => {
            setActive("home");
          }}
        >
          HOME
        </button>
        <button
          type="submit"
          className={isActive === "about" ? styles.active : styles.secretBtn}
          onClick={() => {
            setActive("about");
          }}
        >
          ABOUT US
        </button>
      </div>
    </>
  );
};

export default SecretPage;
