import React from "react";
import styles from "../../NavBarMainPage.module.css";

const VoltageDropCalculator = ({ onCalculate }) => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.calculatorCard}>
        <h3>Падение напряжения на длинной линии (12В)</h3>
        <div className={styles.calcForm}>
          <div className={styles.formGroup}>
            <label>Длина линии (м)</label>
            <input type="number" id="dropLength" placeholder="200" />
          </div>
          <div className={styles.formGroup}>
            <label>Ток нагрузки (А)</label>
            <input
              type="number"
              id="dropCurrent"
              step="0.1"
              placeholder="0.5"
            />
          </div>
        </div>
        <button className={styles.calcBtn} onClick={onCalculate}>
          Рассчитать
        </button>
        <div id="dropResult" className={styles.calcResult}></div>
      </div>
    </div>
  );
};

export default VoltageDropCalculator;