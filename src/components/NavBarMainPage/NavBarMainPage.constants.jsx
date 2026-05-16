// NavBarMainPage.constants.js
import React from "react";

export const Icons = {
  Close: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
  MoreDots: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="5" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    </svg>
  ),
  User: () => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
    >
      <circle cx="13" cy="10" r="4" />
      <path d="M5 23c0-4.418 3.582-8 8-8s8 3.582 8 8" />
    </svg>
  ),
  
  // Иконки для пунктов меню (основные)
  Video: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="8" width="20" height="16" rx="2" />
      <path d="M22 12l8-4v16l-8-4" />
    </svg>
  ),
  Systems: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4v4M16 24v4M4 16H2M30 16h-2M8 8l-2-2M24 24l2 2M24 8l2-2M8 24l-2 2" />
      <circle cx="16" cy="16" r="4" />
      <path d="M16 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
    </svg>
  ),
  Calculators: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="24" height="24" rx="2" />
      <line x1="12" y1="10" x2="20" y2="10" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="18" x2="16" y2="18" />
      <line x1="18" y1="18" x2="20" y2="18" />
      <line x1="12" y1="22" x2="16" y2="22" />
      <line x1="18" y1="22" x2="20" y2="22" />
    </svg>
  ),
  Reference: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6h16v20H8z" />
      <line x1="12" y1="10" x2="20" y2="10" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="18" x2="18" y2="18" />
    </svg>
  ),
  Estimates: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h14l6 6v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <line x1="10" y1="14" x2="22" y2="14" />
      <line x1="10" y1="18" x2="22" y2="18" />
      <line x1="10" y1="22" x2="16" y2="22" />
    </svg>
  ),

  // Сохраняем старые иконки для обратной совместимости
  Lightbulb: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4a7 7 0 0 1 5 12c-1.5 1.5-3 3-3 5h-4c0-2-1.5-3.5-3-5a7 7 0 0 1 5-12z" />
      <line x1="14" y1="25" x2="18" y2="25" />
      <line x1="13" y1="28" x2="19" y2="28" />
    </svg>
  ),
  Clipboard: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 5h16a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="M12 2h8v4h-8V2z" />
      <line x1="12" y1="13" x2="20" y2="13" />
      <line x1="12" y1="18" x2="20" y2="18" />
      <line x1="12" y1="23" x2="16" y2="23" />
    </svg>
  ),
  Tools: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8l4-4" />
      <path d="M4 4l4-4" />
      <circle cx="20" cy="20" r="6" />
      <path d="M16 24l-4 4" />
      <path d="M24 16l4-4" />
      <line x1="8" y1="8" x2="16" y2="16" />
      <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
  ),
  Graduation: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12L16 6l12 6-12 6L4 12z" />
      <path d="M8 14v8c0 0 3 3 8 3s8-3 8-3v-8" />
      <line x1="28" y1="12" x2="28" y2="22" />
      <circle cx="28" cy="24" r="1" fill="white" />
    </svg>
  ),
  Gift: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="14" width="20" height="14" rx="1" />
      <path d="M16 14V28" />
      <path d="M4 14h24" />
      <path d="M16 14C16 14 10 8 10 6a3 3 0 1 1 6 1" />
      <path d="M16 14C16 14 22 8 22 6a3 3 0 1 0-6 1" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4L6 10l6 6" />
    </svg>
  ),
};

// ПРАВИЛЬНЫЙ menuItems для Базы знаний
export const menuItems = [
  { id: "video-intercom", label: "Видеодомофон", icon: "Video" },
  { id: "systems", label: "Технические системы", icon: "Systems" },
  { id: "calculators", label: "Калькуляторы", icon: "Calculators" },
  { id: "reference", label: "Справочники", icon: "Reference" },
  { id: "estimates", label: "Сметы", icon: "Estimates" },
];

export const containerVariants = {
  collapsed: {
    borderRadius: 24,
    padding: "8px 12px",
    height: 48,
    overflow: "hidden",
  },
  expanded: {
    borderRadius: 24,
    padding: "16px 24px",
    height: "auto",
    overflow: "hidden",
  },
};

export const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

export const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1, 
    x: 0,
    transition: { delay: index * 0.03 }
  }),
  exit: { opacity: 0, x: -20 },
};

export const logoutButtonVariants = {
  light: { backgroundColor: "#fff", color: "#e85d26" },
  dark: { backgroundColor: "rgba(0,0,0,0.15)", color: "#fff" },
};

export const topBarVariants = {
  collapsed: { borderBottom: "0px solid transparent", paddingBottom: 0 },
  expanded: {
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    paddingBottom: 16,
  },
};