import React from "react";

import styles from "./ContactsSections.module.css";

const ContactsSections = () => {
  const partnerLogos = {
    Ростех: "#e84d0f",
    Транснефть: "#1a5276",
    Газпромстрой: "#148f77",
    Мосинжпроект: "#7d3c98",
    Стройгазконсалтинг: "#d4ac0d",
    Каскад: "#2e86c1",
    Энергопром: "#e67e22",
    Спецстрой: "#566573",
    Монолит: "#b03a2e",
    Атомстройэкспорт: "#1b4f72",
    Волгастрой: "#0b7a75",
    Инжстрой: "#4a235a",
  };

  const initials = {
    Ростех: "РТ",
    Транснефть: "ТН",
    Газпромстрой: "ГС",
    Мосинжпроект: "МП",
    Стройгазконсалтинг: "СГ",
    Каскад: "КС",
    Энергопром: "ЭП",
    Спецстрой: "СС",
    Монолит: "МЛ",
    Атомстройэкспорт: "АС",
    Волгастрой: "ВС",
    Инжстрой: "ИС",
  };

  const partners = [
    "Ростех",
    "Транснефть",
    "Газпромстрой",
    "Мосинжпроект",
    "Стройгазконсалтинг",
    "Каскад",
    "Энергопром",
    "Спецстрой",
    "Монолит",
    "Атомстройэкспорт",
    "Волгастрой",
    "Инжстрой",
  ];
  return (
    <>
      <div className={styles.containerMain}>
        <section className={styles.section} id="contacts">
          <div className={styles.contactTitle}>
            <h2 className={styles.sectionTitle}>Контакты</h2>
          </div>
          <div className={styles.contactsGrid}>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Адрес</span>
              <span className={styles.contactValue}>
                г. Москва, ул. Примерная, д. 12, офис 301
              </span>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Телефон</span>
              <span className={styles.contactValue}>
                <a href="tel:+74951234567">+7 (495) 123-45-67</a>
              </span>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>
                <a href="mailto:info@wififinder.ru">info@wififinder.ru</a>
              </span>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Режим работы</span>
              <span className={styles.contactValue}>Пн–Пт: 09:00 – 18:00</span>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Генеральный директор</span>
              <span className={styles.contactValue}>Воронцов Д. А.</span>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Юридический адрес</span>
              <span className={styles.contactValue}>127055, г. Москва</span>
            </div>
          </div>
          <div className={styles.contactMap}>
            <iframe
              src="https://www.google.com/maps?q=44.581265,38.074285&output=embed"
              width="100%"
              height="400"
              frameBorder="0"
              className={styles.contactMapIframe}
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className={styles.section}>
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
          <h2 className={styles.sectionTitle}>Наши партнёры</h2>
          <div className={styles.partnersGrid}>
            {partners.map((name) => {
              const color = partnerLogos[name] || "#999";
              const letter =
                initials[name] || name.substring(0, 2).toUpperCase();
              return (
                <div className={styles.partnerCard} key={name}>
                  <div className={styles.partnerLogo}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <text
                        x="50%"
                        y="54%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill={color}
                        fontFamily="-apple-system, sans-serif"
                        fontSize="16"
                        fontWeight="600"
                      >
                        {letter}
                      </text>
                    </svg>
                  </div>
                  <span className={styles.partnerName}>{name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactsSections;
