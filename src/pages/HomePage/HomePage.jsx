import { React, useRef, useState } from "react";

import NavBar from "../../components/NavBar/NavBar.jsx";

import styles from "./HomePage.module.css";
import ContactsSections from "../../components/ContactsSections/ContactsSections.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const HomePage = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const mainRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [activeTab, setActiveTab] = useState("finance");

  const tabs = [
    { id: "finance", label: "Финансы" },
    { id: "legal", label: "Юридическая активность" },
    { id: "reliability", label: "Надёжность" },
    { id: "connections", label: "Связи и лицензии" },
  ];

  return (
    <>
      <NavBar
        to="/login"
        childs="Войти"
        children={
          <img
            className={styles.imgNaLogin}
            src="././public/images/iconamoon_profile.svg"
            alt=""
          />
        }
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
        onMainClick={() => scrollToSection(mainRef)}
      />
      <div className={styles.containerTop}>
        <div className={styles.containerGlass}>
          <h1 className={styles.mainLogoTitle}>WIFINDER</h1>
          <p>Ваш проводник в мир высоких технологий</p>
        </div>

        <section className={styles.containerVideo} id="main" ref={mainRef}>
          <div className={styles.containerGray}></div>
          <video
            className={styles.backVideo}
            autoPlay
            muted
            playsInline
            loop
            src="./public/video/Multi-Shot_Video_-_Cinematic_loopable_close-up_video,_static_Wi-Fi_router_with_two_antennas_in_the_c.mp4"
          ></video>
        </section>
      </div>
      <div className={styles.containerMain}>
        <section id="about" ref={aboutRef}>
          <div className={styles.containerAbout}>
            <div className={styles.decorateStick}>
              <svg
                width="493"
                height="14"
                viewBox="0 0 493 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svg}
              >
                <rect
                  width="493"
                  height="14"
                  rx="7"
                  transform="matrix(1 0 0 -1 0 14)"
                  fill="#e84d0f96"
                />
              </svg>
            </div>

            <h2>О нас</h2>

            <div className={styles.heroInfo}>
              <div className={styles.heroText}>
                <h1>ООО «Вайфайндер»</h1> — действует с декабря 2003 года и
                работает в сфере строительного монтажа, включая электромонтажные
                и санитарно-технические работы. Компания работает из Москвы, не
                имеет филиалов.
                <br />
                <br />
                Генеральный директор — Дмитрий Анатольевич Воронцов,
                единственный владелец компании.
              </div>
              <div className={styles.heroStats}>
                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Выручка 2025</div>
                  <div className={styles.statValue}>
                    203,2 <small className={styles.statSmall}>млн ₽</small>
                  </div>
                  <div className={`${styles.statSub} ${styles.down}`}>
                    ↓ 44% к 2024 году
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Чистая прибыль</div>
                  <div className={styles.statValue}>
                    4,6 <small className={styles.statSmall}>млн ₽</small>
                  </div>
                  <div className={`${styles.statSub} ${styles.up}`}>
                    ↑ рост при падении оборота
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Сотрудники</div>
                  <div className={styles.statValue}>143</div>
                  <div className={styles.statSub}>пик: 169 в 2023 г.</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statLabel}>Рейтинг</div>
                  <div className={styles.statValue}>3 504</div>
                  <div className={styles.statSub}>место в России</div>
                </div>
              </div>
            </div>
            <div className={styles.tabs}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "finance" && (
              <div className={styles.panel}>
                <div className={styles.panelGrid}>
                  <div className={styles.panelCard}>
                    <h3>Финансовая устойчивость</h3>
                    <ul>
                      <li>
                        Коэффициент автономии <span>0,02</span>
                      </li>
                      <li>
                        Текущая ликвидность <span>1,05</span>
                      </li>
                      <li>
                        Абсолютная ликвидность <span>0,01</span>
                      </li>
                      <li>
                        Рентабельность <span>Низкая</span>
                      </li>
                      <li>
                        Долговая нагрузка <span>Значительная</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.panelCard}>
                    <h3>Сравнение с отраслью</h3>
                    <ul>
                      <li>
                        Выручка по Москве <span>1 394 место</span>
                      </li>
                      <li>
                        Выручка по России <span>3 504 место</span>
                      </li>
                      <li>
                        Среднее по отрасли <span>~81 млн ₽</span>
                      </li>
                      <li>
                        Платёжеспособность{" "}
                        <span>
                          <span className={`${styles.badge} ${styles.red}`}>
                            Риски
                          </span>
                        </span>
                      </li>
                      <li>
                        Абсолютная ликвидность{" "}
                        <span>
                          <span className={`${styles.badge} ${styles.red}`}>
                            Практически отсутствует
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className={`${styles.panelCard} ${styles.fullWidth}`}>
                    <h3>Оценка</h3>
                    <p>
                      В 2025 году выручка составила 203,2 млн рублей, что на 44%
                      ниже уровня 2024 года. Чистая прибыль выросла до 4,6 млн
                      рублей на фоне значительного падения оборота. Коэффициент
                      автономии всего 0,02 — крайне высокая зависимость от
                      заёмного капитала. Ликвидность формально на минимально
                      допустимом уровне (1,05), но абсолютная ликвидность
                      практически отсутствует (0,01). Финансовая модель
                      демонстрирует низкую рентабельность и значительную
                      долговую нагрузку.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "legal" && (
              <div className={styles.panel}>
                <div className={styles.panelGrid}>
                  <div className={styles.panelCard}>
                    <h3>Арбитражные дела</h3>
                    <ul>
                      <li>
                        Количество дел <span>61</span>
                      </li>
                      <li>
                        Общая сумма <span>&gt; 513 млн ₽</span>
                      </li>
                      <li>
                        В производстве <span>9 дел</span>
                      </li>
                      <li>
                        Истец / Ответчик <span>≈ поровну</span>
                      </li>
                      <li>
                        Основная категория{" "}
                        <span>Неисполнение обязательств</span>
                      </li>
                      <li>
                        Пик активности <span>2018 год</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.panelCard}>
                    <h3>Исполнительные производства</h3>
                    <ul>
                      <li>
                        Всего производств <span>95</span>
                      </li>
                      <li>
                        Открыто <span>21</span>
                      </li>
                      <li>
                        Текущая задолженность <span>133,5 млн ₽</span>
                      </li>
                      <li>
                        Общая сумма взысканий <span>~150 млн ₽</span>
                      </li>
                    </ul>
                  </div>
                  <div className={`${styles.panelCard} ${styles.fullWidth}`}>
                    <h3>Налоговая задолженность</h3>
                    <p>
                      По данным ФНС на 10 февраля 2026 года, у компании имеется
                      налоговая задолженность в размере{" "}
                      <strong>140,8 млн рублей</strong>. В 2018–2019 годах
                      проведено 5 внеплановых проверок, во всех случаях выявлены
                      нарушения.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reliability" && (
              <div className={styles.panel}>
                <div className={styles.panelCard}>
                  <h3>Оценка надёжности</h3>
                  <div className={styles.riskGrid}>
                    <div className={styles.riskItem}>
                      <p>Риски неисполнения обязательств</p>
                      <span className={`${styles.badge} ${styles.red}`}>
                        Значительные
                      </span>
                    </div>
                    <div className={styles.riskItem}>
                      <p>Признаки однодневки</p>
                      <span className={`${styles.badge} ${styles.green}`}>
                        Отсутствуют
                      </span>
                    </div>
                    <div className={styles.riskItem}>
                      <p>Налоговые риски</p>
                      <span className={`${styles.badge} ${styles.red}`}>
                        Значительные
                      </span>
                    </div>
                    <div className={styles.riskItem}>
                      <p>Финансовое положение</p>
                      <span className={`${styles.badge} ${styles.gray}`}>
                        Нормальное
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "connections" && (
              <div className={styles.panel}>
                <div className={styles.panelGrid}>
                  <div className={styles.panelCard}>
                    <h3>Учредители</h3>
                    <ul>
                      <li>
                        Тип <span>Физическое лицо</span>
                      </li>
                      <li>
                        Количество <span>1</span>
                      </li>
                      <li>
                        Имя <span>Д. А. Воронцов</span>
                      </li>
                      <li>
                        Доля <span>100%</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.panelCard}>
                    <h3>Связи</h3>
                    <p>
                      Компания имеет <strong>4 действующие связи</strong> с
                      другими юридическими лицами, преимущественно через
                      директора и учредителя. Филиалов нет.
                    </p>
                  </div>
                  <div className={styles.panelCard}>
                    <h3>Лицензии</h3>
                    <p>
                      Последняя лицензия получена в{" "}
                      <strong>марте 2025 года</strong>. Подтверждает ведение
                      регулируемой деятельности, связанной с монтажом систем
                      пожарной безопасности, перевозками и работой с ядерными
                      установками.
                    </p>
                  </div>
                  <div className={styles.panelCard}>
                    <h3>Товарные знаки</h3>
                    <p>
                      Активных товарных знаков у компании <strong>нет</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.conclusion}>
              <h3>Выводы</h3>
              <p>
                ООО «Вайфайндер» — компания с длительной историей,
                специализирующаяся на лицензируемых строительно-монтажных
                работах, под полным контролем одного лица. Ключевыми рисками
                являются существенное ухудшение финансовых показателей,
                выраженная зависимость от заёмных средств, а также значительная
                судебная и исполнительная нагрузка, включая крупную налоговую
                задолженность. При рассмотрении компании для взаимодействия
                рекомендуется детально изучить актуальную бухгалтерскую
                отчётность, предмет текущих судебных споров, причины
                исполнительных производств и состояние расчётов с бюджетом.
              </p>
            </div>
          </div>
        </section>
        <section id="contact" ref={contactRef}>
          <div className={styles.containerContacts}>
            <svg
              width="493"
              height="14"
              viewBox="0 0 493 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.svg}
            >
              <rect
                width="493"
                height="14"
                rx="7"
                transform="matrix(1 0 0 -1 0 14)"
                fill="#e84d0f96"
              />
            </svg>
              
            <ContactsSections />
          </div>
        </section>
        <Footer/>
      </div>
      
    </>
  );
};

export default HomePage;
