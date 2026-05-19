import React from "react";
import { motion } from "framer-motion";
import styles from "../../NavBarMainPage.module.css";
import News from "../../../News/News.jsx";

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

export default SectionContent;