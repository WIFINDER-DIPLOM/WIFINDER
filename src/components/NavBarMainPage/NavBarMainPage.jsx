import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import SidePanel from "./components/SidePanel/SidePanel.jsx";
import SectionContent from "./components/SectionContent/SectionContent.jsx";
import ProfileEditModal from "./components/ProfileEditModal/ProfileEditModal.jsx";
import { useCalculators } from "./hooks/useCalculators.js";
import { getSectionsData } from "./data/sectionsData.jsx";

const NavBarMainPage = ({ userName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [currentSections, setCurrentSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    name: userName,
    email: "user@example.com",
    phone: "+7 (999) 123-45-67",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });

  const { calculateCableLength, calculateBattery, calculateVoltageDrop } =
    useCalculators();
  const sectionsData = getSectionsData(
    calculateCableLength,
    calculateBattery,
    calculateVoltageDrop,
  );

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
    setIsExpanded(false);
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
          className={`${styles.navBarContainer} ${isExpanded ? styles.expandedBg : styles.collapsedBg} ${isSidePanelOpen ? styles.navBarShifted : ""}`}
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
              <span
                onClick={() => navigate("/messenger")}
                style={{ cursor: "pointer" }}
              >
                <img
                  width="30"
                  height="30"
                  src="../../public/images/chatWhite.png"
                  alt="chat"
                />
              </span>

              <span
                onClick={() => navigate("/documents")}
                style={{ cursor: "pointer" }}
              >
                <img
                  width="30"
                  height="30"
                  src="../../public/images/documentsWhite.png"
                  alt="chat"
                />
              </span>

              <div
                className={`${styles.userIcon} ${isExpanded ? styles.expandedUserIcon : styles.collapsedUserIcon}`}
              >
                <Icons.User />
              </div>
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
          onToggle={() => {
            if (!isSidePanelOpen && !activeItem) {
              const firstItem = menuItems[0];
              setActiveItem(firstItem.id);
              setCurrentSections(getSectionsForMenuItem(firstItem.id));
            }
            setIsSidePanelOpen(!isSidePanelOpen);
          }}
          activeMenuItem={menuItems.find((item) => item.id === activeItem)}
          sections={currentSections}
          onSelectSection={handleSelectSection}
        />
        <div className={styles.mainContentArea}>
          <SectionContent section={selectedSection} />
        </div>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        form={editForm}
        onChange={handleEditChange}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default NavBarMainPage;
