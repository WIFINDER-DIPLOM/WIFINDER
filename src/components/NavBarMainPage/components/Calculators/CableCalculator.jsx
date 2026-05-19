import React from "react";
import styles from "../../NavBarMainPage.module.css";

const CableCalculator = ({ onCalculate }) => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.calculatorCard}>
        <h3>Расчёт максимальной длины сегмента СКС</h3>
        <div className={styles.calcForm}>
          <div className={styles.formGroup}>
            <label>Скорость передачи</label>
            <select id="cableSpeed">
              <option value="100">100 Мбит/с</option>
              <option value="1000" selected>1 Гбит/с</option>
              <option value="2500">2.5 Гбит/с</option>
              <option value="10000">10 Гбит/с</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Кол-во коннекторов (по 0.5 м потерь)</label>
            <input
              type="number"
              id="cableConnectors"
              defaultValue="4"
              min="2"
              max="10"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Кол-во патч-панелей (по 1 м потерь)</label>
            <input
              type="number"
              id="cablePanels"
              defaultValue="2"
              min="1"
              max="6"
            />
          </div>
        </div>
        <button className={styles.calcBtn} onClick={onCalculate}>
          Рассчитать
        </button>
        <div id="cableResult" className={styles.calcResult}></div>
      </div>
    </div>
  );
};

export default CableCalculator;