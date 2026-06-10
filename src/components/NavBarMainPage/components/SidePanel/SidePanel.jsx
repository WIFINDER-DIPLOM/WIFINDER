import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../NavBarMainPage.module.css";
import { Icons } from "../../NavBarMainPage.constants";

const SidePanel = ({
  isOpen,
  onClose,
  onToggle,
  activeMenuItem,
  sections,
  onSelectSection,
}) => {
  return (
    <>
      <AnimatePresence>
        {!isOpen && onToggle && (
          <motion.button
            key="sidePanelTab"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className={styles.sidePanelTab}
            title="Открыть панель"
          >
            <Icons.ChevronRight />
          </motion.button>
        )}
      </AnimatePresence>
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
            <button
              onClick={onClose}
              className={styles.closeBtn}
              title="Закрыть"
            >
              <Icons.Close />
            </button>
          </div>
          <div className={styles.sidePanelContent}>
            {sections?.map((section) => (
              <motion.div
                key={section.id}
                className={`${styles.sectionItem} ${section.active ? styles.activeSection : ""}`}
                onClick={() => onSelectSection(section)}
                whileHover={{
                  x: 4,
                  backgroundColor: "rgba(59, 130, 246, 0.08)",
                }}
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
    </>
  );
};

export default SidePanel;