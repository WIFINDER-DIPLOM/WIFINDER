import React from "react";

import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <>
      <div className={styles.footerOuter}>
        <div className={styles.footerMain}>
          <div className={styles.footerInner}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <div className={styles.footerLogo}>
                  <img src="../../public/images/Logo.svg" alt="logo" />
                  <span className={styles.footerBrandName}>WIFINDER</span>
                </div>
                <span className={styles.footerTagline}>
                  Ваш проводник в мир высоких технологий
                </span>
              </div>

              <div className={styles.footerSocial}>
                <span className={styles.footerSocialLabel}>Мы в соцсетях</span>
                <div className={styles.footerSocialIcons}>
                  <a
                    href="#"
                    className={styles.footerSocialBtn}
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className={styles.footerSocialBtn}
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24">
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className={styles.footerSocialBtn}
                    aria-label="YouTube"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                      <polygon
                        points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                        fill="#e8a47e"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.footerCopy}>© 2019–2026 ООО «ВАЙФАНДЕР»</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
