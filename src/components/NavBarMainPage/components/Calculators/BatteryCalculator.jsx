import React from "react";
import styles from "../../NavBarMainPage.module.css";

const BatteryCalculator = ({ onCalculate }) => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.calculatorCard}>
        <h3>Расчёт ёмкости аккумулятора для пожарной сигнализации</h3>
        <div className={styles.calcForm}>
          <div className={styles.formGroup}>
            <label>Ток потребления в дежурном режиме (А)</label>
            <input
              type="number"
              id="batteryCurrent"
              step="0.01"
              placeholder="0.15"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Время резервирования (часов)</label>
            <input
              type="number"
              id="batteryHours"
              defaultValue="24"
              step="1"
            />
          </div>
        </div>
        <button className={styles.calcBtn} onClick={onCalculate}>
          Рассчитать
        </button>
        <div id="batteryResult" className={styles.calcResult}></div>
      </div>
    </div>
  );
};

export default BatteryCalculator;