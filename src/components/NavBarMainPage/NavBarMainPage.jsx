import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NavBarMainPage.module.css";
import {
  Icons,
  menuItems,
  containerVariants,
  menuVariants,
  menuItemVariants,
  logoutButtonVariants,
  topBarVariants,
} from "./NavBarMainPage.constants";

import News from "../News/News.jsx";
import ProfileEditLink from "../ProfileEditLink/ProfileEditLink.jsx";

// Компонент боковой панели
const SidePanel = ({
  isOpen,
  onClose,
  activeMenuItem,
  sections,
  onSelectSection,
}) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isOpen ? 380 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={styles.sidePanelContainer}
    >
      <div className={styles.sidePanel}>
        <div className={styles.sidePanelHeader}>
          <h3>{activeMenuItem?.label || "Разделы"}</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            <Icons.Close />
          </button>
        </div>
        <div className={styles.sidePanelContent}>
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className={`${styles.sectionItem} ${section.active ? styles.activeSection : ""}`}
              onClick={() => onSelectSection(section)}
              whileHover={{ x: 4, backgroundColor: "rgba(59, 130, 246, 0.08)" }}
            >
              <div className={styles.sectionIcon}>{section.icon}</div>
              <div className={styles.sectionInfo}>
                <span className={styles.sectionTitle}>{section.title}</span>
                <span className={styles.sectionDesc}>
                  {section.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SectionContent = ({ section }) => {
  if (!section) return <News />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={styles.sectionContent}
    >
      <div className={styles.contentHeader}>
        <div className={styles.contentIcon}>{section.icon}</div>
        <h2>{section.title}</h2>
      </div>
      <div className={styles.contentBody}>{section.content}</div>
    </motion.div>
  );
};

const NavBarMainPage = ({ userName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [currentSections, setCurrentSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  // --- Состояние для профиля и модалки ---
  const [userProfile, setUserProfile] = useState({
    name: userName,
    email: "user@example.com", // заглушка
    phone: "+7 (999) 123-45-67", // заглушка
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });

  // Открыть модалку с формой
  const handleOpenEdit = () => {
    setEditForm({ ...userProfile });
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setUserProfile(editForm);
    setIsEditModalOpen(false);
  };

  // Функции калькуляторов
  const calculateCableLength = () => {
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
  };

  const calculateBattery = () => {
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
  };

  const calculateVoltageDrop = () => {
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
  };

  // Данные разделов
  const sectionsData = {
    "video-intercom": {
      title: "Видеодомофон (4 провода)",
      icon: "📹",
      description: "Схема подключения и таблица цветов",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.infoCard}>
            <h3>Типовая схема подключения видеодомофона</h3>
            <p>
              Стандартная схема аналогового видеодомофона с 4-проводным
              подключением: видео (+), аудио (+), общий (−) и вызов (+). Питание
              панели — 12В DC.
            </p>
          </div>
          <div className={styles.diagramCard}>
            <svg
              width="100%"
              height="300"
              viewBox="0 0 700 380"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="30"
                y="80"
                width="140"
                height="200"
                rx="8"
                fill="#f8fafc"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <rect
                x="50"
                y="100"
                width="100"
                height="70"
                rx="4"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <text
                x="100"
                y="140"
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
                fontWeight="600"
              >
                КАМЕРА
              </text>
              <rect
                x="65"
                y="185"
                width="70"
                height="25"
                rx="4"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              <text
                x="100"
                y="202"
                textAnchor="middle"
                fontSize="9"
                fill="#1e40af"
                fontWeight="600"
              >
                ВЫЗОВ
              </text>
              <text
                x="100"
                y="270"
                textAnchor="middle"
                fontSize="10"
                fill="#1e293b"
                fontWeight="700"
              >
                ПАНЕЛЬ ВЫЗОВА
              </text>
              <rect
                x="500"
                y="60"
                width="180"
                height="240"
                rx="8"
                fill="#f8fafc"
                stroke="#10b981"
                strokeWidth="2"
              />
              <rect
                x="515"
                y="80"
                width="150"
                height="100"
                rx="4"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <text
                x="590"
                y="135"
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
                fontWeight="600"
              >
                ДИСПЛЕЙ
              </text>
              <text
                x="590"
                y="280"
                textAnchor="middle"
                fontSize="10"
                fill="#1e293b"
                fontWeight="700"
              >
                МОНИТОР
              </text>
              <path
                d="M170 120 C 250 120, 420 120, 500 120"
                stroke="#ef4444"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M170 160 C 250 160, 420 160, 500 160"
                stroke="#f59e0b"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M170 200 C 250 200, 420 200, 500 200"
                stroke="#1e293b"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M170 240 C 250 240, 420 240, 500 240"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <p className={styles.diagramCaption}>
              Рис. 1 — Схема подключения видеодомофона (4-проводная)
            </p>
          </div>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Провод</th>
                <th>Цвет</th>
                <th>Назначение</th>
                <th>Сечение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.red}`}
                  ></span>{" "}
                  Красный
                </td>
                <td>Видеосигнал (+)</td>
                <td>0.75 мм²</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.yellow}`}
                  ></span>{" "}
                  Жёлтый
                </td>
                <td>Аудиосигнал (+)</td>
                <td>0.75 мм²</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.black}`}
                  ></span>{" "}
                  Чёрный
                </td>
                <td>Общий (−) / GND</td>
                <td>0.75 мм²</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.blue}`}
                  ></span>{" "}
                  Синий
                </td>
                <td>Сигнал вызова</td>
                <td>0.5 мм²</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    "aps-scheme": {
      title: "АПС — радиальные шлейфы",
      icon: "🔥",
      description: "Схема АПС с радиальными лучами",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={`${styles.infoCard} ${styles.warning}`}>
            <p>
              Радиальная топология шлейфа: каждый извещатель подключён отдельной
              линией от приёмно-контрольного прибора. Обеспечивает адресность и
              простоту диагностики.
            </p>
          </div>
          <div className={styles.diagramCard}>
            <svg
              width="100%"
              height="350"
              viewBox="0 0 700 420"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="280"
                y="160"
                width="140"
                height="100"
                rx="8"
                fill="#fee2e2"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x="350"
                y="195"
                textAnchor="middle"
                fontSize="12"
                fill="#dc2626"
                fontWeight="800"
              >
                ПКП
              </text>
              <text
                x="350"
                y="212"
                textAnchor="middle"
                fontSize="9"
                fill="#991b1b"
              >
                Приёмно-контрольный прибор
              </text>
              <path
                d="M350 160 L350 50 L120 50"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,3"
              />
              <rect
                x="30"
                y="30"
                width="90"
                height="40"
                rx="6"
                fill="#f8fafc"
                stroke="#ef4444"
                strokeWidth="1"
              />
              <text
                x="75"
                y="48"
                textAnchor="middle"
                fontSize="8"
                fill="#dc2626"
                fontWeight="600"
              >
                ИП 212-41
              </text>
              <text
                x="75"
                y="60"
                textAnchor="middle"
                fontSize="8"
                fill="#64748b"
              >
                Дымовой
              </text>
              <path
                d="M370 160 L480 50 L620 50"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,3"
              />
              <rect
                x="580"
                y="30"
                width="90"
                height="40"
                rx="6"
                fill="#f8fafc"
                stroke="#ef4444"
                strokeWidth="1"
              />
              <text
                x="625"
                y="48"
                textAnchor="middle"
                fontSize="8"
                fill="#dc2626"
                fontWeight="600"
              >
                ИП 212-41
              </text>
              <text
                x="290"
                y="300"
                textAnchor="middle"
                fontSize="9"
                fill="#ef4444"
                fontWeight="600"
              >
                Кабель: КСПВ 2×0.5
              </text>
            </svg>
            <p className={styles.diagramCaption}>
              Рис. 2 — Радиальная схема шлейфов АПС
            </p>
          </div>
        </div>
      ),
    },
    skud: {
      title: "СКУД — Система контроля доступа",
      icon: "🔐",
      description: "Контроллер + Считыватель + Кнопка",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.infoCard}>
            <h3>Схема подключения СКУД</h3>
            <p>
              Контроллер Z-5R: считыватель (Wiegand), кнопка выхода,
              электромеханический замок
            </p>
          </div>
          <div className={styles.diagramCard}>
            <svg
              width="100%"
              height="300"
              viewBox="0 0 700 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="260"
                y="140"
                width="180"
                height="120"
                rx="10"
                fill="#dcfce7"
                stroke="#10b981"
                strokeWidth="2"
              />
              <text
                x="350"
                y="175"
                textAnchor="middle"
                fontSize="13"
                fill="#166534"
                fontWeight="800"
              >
                КОНТРОЛЛЕР
              </text>
              <text
                x="350"
                y="195"
                textAnchor="middle"
                fontSize="10"
                fill="#166534"
              >
                Z-5R / Matrix II
              </text>
              <rect
                x="40"
                y="120"
                width="120"
                height="100"
                rx="8"
                fill="#f8fafc"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x="100"
                y="200"
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                fontWeight="600"
              >
                СЧИТЫВАТЕЛЬ
              </text>
              <rect
                x="560"
                y="130"
                width="100"
                height="80"
                rx="8"
                fill="#f8fafc"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text
                x="610"
                y="195"
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
                fontWeight="600"
              >
                КНОПКА EXIT
              </text>
              <rect
                x="560"
                y="260"
                width="100"
                height="70"
                rx="8"
                fill="#f8fafc"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x="610"
                y="318"
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
              >
                Электрозамок
              </text>
              <path
                d="M160 170 L260 170"
                stroke="#3b82f6"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M560 170 L440 170"
                stroke="#f59e0b"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M440 230 L560 295"
                stroke="#ef4444"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
            <p className={styles.diagramCaption}>
              Рис. 3 — Схема подключения СКУД
            </p>
          </div>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Компонент</th>
                <th>Модель</th>
                <th>Кабель</th>
                <th>Примечание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Контроллер</td>
                <td>IronLogic Z-5R</td>
                <td>—</td>
                <td>До 5000 ключей</td>
              </tr>
              <tr>
                <td>Считыватель</td>
                <td>Matrix II / CP-Z</td>
                <td>UTP 4×0.5</td>
                <td>Wiegand 26, 12В</td>
              </tr>
              <tr>
                <td>Кнопка выхода</td>
                <td>ASK-200</td>
                <td>КСПВ 2×0.5</td>
                <td>НО контакт</td>
              </tr>
              <tr>
                <td>Замок</td>
                <td>ML-180K</td>
                <td>КВВГ 2×0.75</td>
                <td>12В, 500мА</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    workplace: {
      title: "Организация рабочего места",
      icon: "💻",
      description: "Блок розеток оператора",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.infoCard}>
            <p>
              Типовой блок розеток для рабочего места оператора/инженера: RJ-45
              (сеть) + RJ-12 (телефон) + 220В (питание) в едином корпусе.
            </p>
          </div>
          <div className={styles.diagramCard}>
            <svg
              width="100%"
              height="250"
              viewBox="0 0 600 280"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="100"
                y="40"
                width="400"
                height="180"
                rx="12"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              <rect
                x="130"
                y="70"
                width="100"
                height="120"
                rx="6"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
              <text
                x="180"
                y="155"
                textAnchor="middle"
                fontSize="10"
                fill="#1e40af"
                fontWeight="700"
              >
                RJ-45
              </text>
              <rect
                x="280"
                y="80"
                width="100"
                height="100"
                rx="6"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              <text
                x="330"
                y="155"
                textAnchor="middle"
                fontSize="10"
                fill="#92400e"
                fontWeight="700"
              >
                RJ-12
              </text>
              <rect
                x="420"
                y="70"
                width="60"
                height="120"
                rx="6"
                fill="#fee2e2"
                stroke="#ef4444"
                strokeWidth="1.5"
              />
              <text
                x="450"
                y="180"
                textAnchor="middle"
                fontSize="9"
                fill="#dc2626"
                fontWeight="700"
              >
                220В
              </text>
            </svg>
            <p className={styles.diagramCaption}>
              Рис. 4 — Блок розеток рабочего места
            </p>
          </div>
        </div>
      ),
    },
    "entry-nodes": {
      title: "Узлы ввода в здание",
      icon: "🏢",
      description: "Броня, переходники, гермовводы",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.infoCard}>
            <h3>Типовые решения для ввода кабелей</h3>
            <p>
              Герметичный ввод кабелей через фундамент/стену: бронированные
              кабели (ВБШв, ПВБбШв) и небронированные — с применением гильз,
              сальников и гермопроходок.
            </p>
          </div>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Тип ввода</th>
                <th>Применение</th>
                <th>Герметизация</th>
                <th>Кабель</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Гильза + лента</td>
                <td>Стена/фундамент</td>
                <td>Гермонить, бентонит</td>
                <td>Любой</td>
              </tr>
              <tr>
                <td>Сальник PG/M</td>
                <td>Металлический щит</td>
                <td>Резиновая манжета</td>
                <td>КСПВ, КВВГ</td>
              </tr>
              <tr>
                <td>Бронированная муфта</td>
                <td>Переход с брони</td>
                <td>Эпоксидная смола</td>
                <td>ВБШв</td>
              </tr>
              <tr>
                <td>Гермоввод Roxtec</td>
                <td>Мультикабельный</td>
                <td>Модульный уплотнитель</td>
                <td>Любой (до IP68)</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    "cable-calc": {
      title: "Калькулятор длины кабеля СКС",
      icon: "📐",
      description: "Расчёт максимальной длины сегмента",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.calculatorCard}>
            <h3>Расчёт максимальной длины сегмента СКС</h3>
            <div className={styles.calcForm}>
              <div className={styles.formGroup}>
                <label>Скорость передачи</label>
                <select id="cableSpeed">
                  <option value="100">100 Мбит/с</option>
                  <option value="1000" selected>
                    1 Гбит/с
                  </option>
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
            <button className={styles.calcBtn} onClick={calculateCableLength}>
              Рассчитать
            </button>
            <div id="cableResult" className={styles.calcResult}></div>
          </div>
        </div>
      ),
    },
    "battery-calc": {
      title: "Расчёт ёмкости АКБ (ПС)",
      icon: "🔋",
      description: "АКБ на 24 часа резервирования",
      content: (
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
            <button className={styles.calcBtn} onClick={calculateBattery}>
              Рассчитать
            </button>
            <div id="batteryResult" className={styles.calcResult}></div>
          </div>
        </div>
      ),
    },
    "voltage-drop": {
      title: "Падение напряжения на линии",
      icon: "⚡",
      description: "Для кабеля КСПВ, КВВГ (12В)",
      content: (
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
            <button className={styles.calcBtn} onClick={calculateVoltageDrop}>
              Рассчитать
            </button>
            <div id="dropResult" className={styles.calcResult}></div>
          </div>
        </div>
      ),
    },
    colors: {
      title: "Цвета жил TIA/EIA 568B",
      icon: "🎨",
      description: "Стандарт обжимки витой пары",
      content: (
        <div className={styles.sectionWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Контакт</th>
                <th>Цвет жилы (568B)</th>
                <th>Назначение</th>
                <th>Пара</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.whiteOrange}`}
                  ></span>{" "}
                  Бело-оранжевый
                </td>
                <td>TX+</td>
                <td>Пара 2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.orange}`}
                  ></span>{" "}
                  Оранжевый
                </td>
                <td>TX−</td>
                <td>Пара 2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.whiteGreen}`}
                  ></span>{" "}
                  Бело-зелёный
                </td>
                <td>RX+</td>
                <td>Пара 3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.blue2}`}
                  ></span>{" "}
                  Синий
                </td>
                <td>BI_D+</td>
                <td>Пара 1</td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.whiteBlue}`}
                  ></span>{" "}
                  Бело-синий
                </td>
                <td>BI_D−</td>
                <td>Пара 1</td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.green}`}
                  ></span>{" "}
                  Зелёный
                </td>
                <td>RX−</td>
                <td>Пара 3</td>
              </tr>
              <tr>
                <td>7</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.whiteBrown}`}
                  ></span>{" "}
                  Бело-коричневый
                </td>
                <td>BI_C+</td>
                <td>Пара 4</td>
              </tr>
              <tr>
                <td>8</td>
                <td>
                  <span
                    className={`${styles.colorSwatch} ${styles.brown}`}
                  ></span>{" "}
                  Коричневый
                </td>
                <td>BI_C−</td>
                <td>Пара 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    abbrevs: {
      title: "Справочник аббревиатур",
      icon: "📖",
      description: "ОПС, СОУЭ, АРМ, ОРИОН, УО-4Р, БИС",
      content: (
        <div className={styles.sectionWrapper}>
          <div className={styles.abbrevGrid}>
            {[
              { term: "ОПС", def: "Охранно-пожарная сигнализация" },
              {
                term: "СОУЭ",
                def: "Система оповещения и управления эвакуацией",
              },
              { term: "АРМ", def: "Автоматизированное рабочее место" },
              { term: "ОРИОН", def: "Система ПКП (Болид)" },
              {
                term: "УО-4Р",
                def: "Устройство охранное на 4 релейных выхода",
              },
              { term: "БИС", def: "Блок индикации и сигнализации" },
              { term: "СКУД", def: "Система контроля доступа" },
              { term: "АПС", def: "Автоматическая пожарная сигнализация" },
              { term: "ПКП", def: "Приёмно-контрольный прибор" },
              { term: "PoE", def: "Power over Ethernet" },
            ].map((ab) => (
              <div key={ab.term} className={styles.abbrevItem}>
                <span className={styles.abbrevTerm}>{ab.term}</span>
                <span className={styles.abbrevDef}>{ab.def}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    "estimate-ipcam": {
      title: "Смета на монтаж IP-камеры",
      icon: "📊",
      description: "Камера + кронштейн + короб + кабель",
      content: (
        <div className={styles.sectionWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование работ/материалов</th>
                <th>Кол-во</th>
                <th>Ед.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Камера IP (Full HD, уличная)</td>
                <td>1</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Кронштейн настенный (регулируемый)</td>
                <td>1</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Кабель UTP Cat.5e (внешний)</td>
                <td>50</td>
                <td>м</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Короб пластиковый 40×20 мм</td>
                <td>5</td>
                <td>м</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Гофра ПНД 20 мм</td>
                <td>50</td>
                <td>м</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Блок питания 12В / 1А</td>
                <td>1</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Монтаж и настройка (работы)</td>
                <td>1</td>
                <td>компл</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    "estimate-cable-tray": {
      title: "Прокладка 100 м кабеля в лотке",
      icon: "📐",
      description: "Лоток + кабель + крепёж",
      content: (
        <div className={styles.sectionWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование работ/материалов</th>
                <th>Кол-во</th>
                <th>Ед.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Лоток перфорированный 100×50 мм</td>
                <td>100</td>
                <td>м</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Кабель силовой (ВВГнг-LS 3×1.5)</td>
                <td>100</td>
                <td>м</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Подвес для лотка (кронштейн)</td>
                <td>20</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Соединитель для лотка</td>
                <td>10</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Заземляющая перемычка</td>
                <td>5</td>
                <td>шт</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Протяжка кабеля, крепёж (работы)</td>
                <td>1</td>
                <td>компл</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  };

  const getSectionsForMenuItem = (itemId) => {
    const sectionsMap = {
      "video-intercom": ["video-intercom"],
      systems: ["aps-scheme", "skud", "workplace", "entry-nodes"],
      calculators: ["cable-calc", "battery-calc", "voltage-drop"],
      reference: ["colors", "abbrevs"],
      estimates: ["estimate-ipcam", "estimate-cable-tray"],
    };

    const sectionIds = sectionsMap[itemId] || [];
    return sectionIds.map((id) => ({
      id,
      ...sectionsData[id],
      active: selectedSection?.id === id,
    }));
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item.id);
    const sections = getSectionsForMenuItem(item.id);
    setCurrentSections(sections);

    if (sections.length > 0) {
      setSelectedSection(sections[0]);
    }

    setIsSidePanelOpen(true);
    setIsExpanded(false); // Автоматически сворачиваем меню
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setIsSidePanelOpen(false);
    setCurrentSections((prev) =>
      prev.map((s) => ({
        ...s,
        active: s.id === section.id,
      })),
    );
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.navBarWrapper}>
        <div
          className={`${styles.navBarContainer} ${isExpanded ? styles.expandedBg : styles.collapsedBg}`}
        >
          <motion.div
            variants={containerVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${styles.navBarCard} ${isExpanded ? styles.expandedCard : styles.collapsedCard}`}
          >
            <motion.div
              variants={topBarVariants}
              initial="collapsed"
              animate={isExpanded ? "expanded" : "collapsed"}
              className={`${styles.topBar} ${isExpanded ? styles.expandedTopBar : styles.collapsedTopBar}`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`${styles.moreDotsBtn} ${isExpanded ? styles.expandedDotsBtn : styles.collapsedDotsBtn}`}
              >
                <Icons.MoreDots />
              </motion.button>
              <div
                className={`${styles.userIcon} ${isExpanded ? styles.expandedUserIcon : styles.collapsedUserIcon}`}
              >
                <Icons.User />
              </div>
              {/* Кликабельное имя пользователя */}
              <span
                className={`${styles.userName} ${isExpanded ? styles.expandedUserName : styles.collapsedUserName}`}
                onClick={handleOpenEdit}
                style={{ cursor: "pointer" }}
              >
                {userProfile.name}
              </span>
              <div style={{ flex: 1 }} />
              <motion.button
                variants={logoutButtonVariants}
                initial="light"
                animate={isExpanded ? "dark" : "light"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className={styles.logoutBtn}
              >
                Выйти
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={styles.menuItemsContainer}
                >
                  {menuItems.map((item, index) => {
                    const IconComponent = Icons[item.icon];
                    return (
                      <motion.div
                        key={item.id}
                        variants={menuItemVariants}
                        custom={index}
                        whileHover={{
                          x: 8,
                          backgroundColor: "rgba(255,255,255,0.12)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMenuItemClick(item)}
                        className={`${styles.menuItem} ${activeItem === item.id ? styles.activeMenuItem : ""}`}
                      >
                        <div className={styles.menuItemIcon}>
                          <IconComponent />
                        </div>
                        <span className={styles.menuItemLabel}>
                          {item.label}
                        </span>
                        {activeItem === item.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className={styles.activeIndicator}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <SidePanel
          isOpen={isSidePanelOpen}
          onClose={closeSidePanel}
          activeMenuItem={menuItems.find((item) => item.id === activeItem)}
          sections={currentSections}
          onSelectSection={handleSelectSection}
        />
        <div className={styles.mainContentArea}>
          <SectionContent section={selectedSection} />
        </div>
      </div>

      {/* Кастомное модальное окно редактирования профиля */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseEdit}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Редактирование профиля</h3>
            <div className={styles.editForm}>
              <label>Имя</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Имя"
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
              />
              <label>Телефон</label>
              <input
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Телефон"
              />
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handleCloseEdit} className={styles.cancelBtn}>
                Отмена
              </button>
              <button onClick={handleSaveEdit} className={styles.saveBtn}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarMainPage;
