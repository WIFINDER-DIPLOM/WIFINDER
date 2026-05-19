import { useCallback } from "react";
import styles from "../NavBarMainPage.module.css";

export const useCalculators = () => {
  const calculateCableLength = useCallback(() => {
    const speed = parseInt(
      document.getElementById("cableSpeed")?.value || 1000,
    );
    const connectors = parseInt(
      document.getElementById("cableConnectors")?.value || 4,
    );
    const panels = parseInt(document.getElementById("cablePanels")?.value || 2);
    let baseLength = speed <= 1000 ? 100 : speed <= 2500 ? 55 : 30;
    const loss = connectors * 0.5 + panels * 1;
    const maxLength = Math.max(10, baseLength - loss);
    const resultDiv = document.getElementById("cableResult");
    if (resultDiv) {
      resultDiv.innerHTML = `
        <strong>Максимальная длина сегмента:</strong> ${maxLength.toFixed(1)} метров<br>
        <small>(С учётом ${connectors} коннектор(-ов) и ${panels} патч-панелей)</small>
      `;
    }
  }, []);

  const calculateBattery = useCallback(() => {
    const current = parseFloat(
      document.getElementById("batteryCurrent")?.value || 0,
    );
    const hours = parseFloat(
      document.getElementById("batteryHours")?.value || 24,
    );
    const capacityAh = (current * hours) / 0.8;
    const recommendedAh = Math.ceil(capacityAh / 7) * 7;
    const resultDiv = document.getElementById("batteryResult");
    if (resultDiv) {
      resultDiv.innerHTML = `
        <strong>Необходимая ёмкость АКБ:</strong> ${capacityAh.toFixed(1)} Ач<br>
        <strong>Рекомендуемая (стандарт):</strong> ${recommendedAh} Ач (12В)<br>
        <small>Формула: (ток_потребления × время) / 0.8</small>
      `;
    }
  }, []);

  const calculateVoltageDrop = useCallback(() => {
    const length = parseFloat(
      document.getElementById("dropLength")?.value || 0,
    );
    const current = parseFloat(
      document.getElementById("dropCurrent")?.value || 0,
    );
    const resistance = 12.7;
    const Rtotal = (resistance * length) / 1000;
    const drop = 2 * Rtotal * current;
    const percent = (drop / 12) * 100;
    let status = "";
    if (percent > 10)
      status = "⚠️ Превышение (>10%) — требуется увеличение сечения";
    else if (percent > 5)
      status = "⚠️ На грани (5-10%) — возможно, но нежелательно";
    else status = "✅ Допустимое падение (<5%)";
    const resultDiv = document.getElementById("dropResult");
    if (resultDiv) {
      resultDiv.innerHTML = `
        <strong>Падение напряжения:</strong> ${drop.toFixed(2)} В (${percent.toFixed(1)}%)<br>
        <strong>Нагрузка на конце линии:</strong> ${(12 - drop).toFixed(2)} В<br>
        <span class="${styles.calcStatus}">${status}</span>
      `;
    }
  }, []);

  return {
    calculateCableLength,
    calculateBattery,
    calculateVoltageDrop,
  };
};