import React, { useState, useEffect, Children } from "react";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

const NavBar = ({
  onAboutClick,
  onContactClick,
  onMainClick,
  childs,
  children,
  otherstyle,
  to,
}) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["main", "about", "contact"];
      let foundActive = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const position = element.getBoundingClientRect();
          if (position.top <= 100 && position.bottom >= 100) {
            setActiveSection(section);
            foundActive = true;
            break;
          }
        }
      }

      if (!foundActive) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <button
            className={`${styles.buttonNav} ${activeSection === "about" ? styles.active : ""}`}
            onClick={onAboutClick}
          >
            О нас
          </button>

          <button
            className={`${styles.buttonNav} ${activeSection === "main" ? styles.active : ""}`}
            onClick={onMainClick}
          >
            Главная
          </button>
          <button
            className={`${styles.buttonNav} ${activeSection === "contact" ? styles.active : ""}`}
            onClick={onContactClick}
          >
            Контакты
          </button>
        </div>
        <div className={styles.right}>
          <Link to={to}>
            <button className={styles.buttonNavLogin} style={otherstyle}>
              {childs}
              {children}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
