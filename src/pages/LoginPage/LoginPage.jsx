import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === "Владимир Румянцев" && password === "vova") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userLogin", login);
      navigate("/main");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoCont}>
        <img
          src="./public/images/Logo.svg"
          alt="LOGO"
          className={styles.logo}
        />
        <h1>WIFINDER</h1>
      </div>

      <h2 className={styles.pageTitle}>Вход</h2>
      <div className={styles.containerInner}>
        <div className={styles.formInner}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Логин</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Логин"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Пароль</label>
              <input
                type="password"
                className={styles.formInput}
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              <button className={styles.btnSubmit} type="submit">
                Войти
              </button>
              {error && <p className={styles.errorMsg}>{error}</p>}
            </div>
          </form>

          <button className={styles.btnBack} onClick={handleBack}>
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
