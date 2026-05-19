import React from "react";
import styles from "../NavBarMainPage.module.css";
import CableCalculator from "../components/Calculators/CableCalculator.jsx";
import BatteryCalculator from "../components/Calculators/BatteryCalculator.jsx";
import VoltageDropCalculator from "../components/Calculators/VoltageDropCalculator.jsx";

export const getSectionsData = (
  calculateCableLength,
  calculateBattery,
  calculateVoltageDrop,
) => ({
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
                <span className={`${styles.colorSwatch} ${styles.red}`}></span>{" "}
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
                <span className={`${styles.colorSwatch} ${styles.blue}`}></span>{" "}
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
            <text x="75" y="60" textAnchor="middle" fontSize="8" fill="#64748b">
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
            Герметичный ввод кабелей через фундамент/стену: бронированные кабели
            (ВБШв, ПВБбШв) и небронированные — с применением гильз, сальников и
            гермопроходок.
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
    content: <CableCalculator onCalculate={calculateCableLength} />,
  },
  "battery-calc": {
    title: "Расчёт ёмкости АКБ (ПС)",
    icon: "🔋",
    description: "АКБ на 24 часа резервирования",
    content: <BatteryCalculator onCalculate={calculateBattery} />,
  },
  "voltage-drop": {
    title: "Падение напряжения на линии",
    icon: "⚡",
    description: "Для кабеля КСПВ, КВВГ (12В)",
    content: <VoltageDropCalculator onCalculate={calculateVoltageDrop} />,
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
            { term: "СОУЭ", def: "Система оповещения и управления эвакуацией" },
            { term: "АРМ", def: "Автоматизированное рабочее место" },
            { term: "ОРИОН", def: "Система ПКП (Болид)" },
            { term: "УО-4Р", def: "Устройство охранное на 4 релейных выхода" },
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
});
