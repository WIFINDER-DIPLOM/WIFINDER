import React, { useState, useEffect, useMemo } from "react";
import styles from "./DocumentsPage.module.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Toolbar from "./components/Toolbar/Toolbar";
import TemplateGrid from "./components/TemplateGrid/TemplateGrid";
import TemplateModal from "./components/TemplateModal/TemplateModal";
import Notification from "./components/Notification/Notification";
import Footer from "../../components/Footer/Footer";

const srcImges =
  "https://image.qwenlm.ai/public_source/559424e3-27f6-49c9-a03b-8bb67af6eaee/1353edecb-4215-40ef-b2eb-2f61ee626b59.png";

const TEMPLATES = [
  {
    id: 1,
    section: "Договоры",
    title: "Договор аренды",
    description:
      "Шаблон договора аренды недвижимого имущества с условиями оплаты и расторжения.",
    image: srcImges,
    tags: ["Аренда", "Недвижимость"],
    size: "240 КБ",
  },
  {
    id: 2,
    section: "Договоры",
    title: "Договор оказания услуг",
    description:
      "Типовой договор на оказание профессиональных услуг между заказчиком и исполнителем.",
    image: srcImges,
    tags: ["Услуги", "B2B"],
    size: "185 КБ",
  },
  {
    id: 3,
    section: "Отчёты",
    title: "Финансовый отчёт Q3",
    description:
      "Шаблон ежеквартального финансового отчёта с графиками и аналитикой.",
    image: srcImges,
    tags: ["Финансы", "Аналитика"],
    size: "1.2 МБ",
  },
  {
    id: 4,
    section: "Заявления",
    title: "Заявление на отпуск",
    description:
      "Форма заявления на предоставление ежегодного оплачиваемого отпуска.",
    image: srcImges,
    tags: ["HR", "Отпуск"],
    size: "120 КБ",
  },
  {
    id: 5,
    section: "Акты",
    title: "Акт выполненных работ",
    description: "Шаблон акта приёмки выполненных работ с подписями сторон.",
    image: srcImges,
    tags: ["Приёмка", "Работы"],
    size: "210 КБ",
  },
  {
    id: 6,
    section: "Отчёты",
    title: "Ежемесячный отчёт",
    description:
      "Стандартизированный шаблон для ежемесячного отчёта о проделанной работе.",
    image: srcImges,
    tags: ["Ежемесячно", "KPI"],
    size: "340 КБ",
  },
  {
    id: 7,
    section: "Договоры",
    title: "Трудовой договор",
    description: "Базовый шаблон трудового договора в соответствии с ТК РФ.",
    image: srcImges,
    tags: ["HR", "Труд"],
    size: "295 КБ",
  },
  {
    id: 8,
    section: "Заявления",
    title: "Заявление на увольнение",
    description:
      "Форма заявления работника об увольнении по собственному желанию.",
    image: srcImges,
    tags: ["HR", "Увольнение"],
    size: "95 КБ",
  },
];

const SECTIONS = ["Все", "Договоры", "Отчёты", "Заявления", "Акты", "Избранное"];

export default function DocumentsPage() {
  const [activeSection, setActiveSection] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const hrefs = [
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/400.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/500.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/600.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/700.css",
    ];
    const links = hrefs.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((l) => document.head.removeChild(l));
  }, []);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 2500);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesSection =
        activeSection === "Все" || t.section === activeSection;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesSection && matchesSearch;
    });
  }, [activeSection, searchQuery]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const useTemplate = (template) => {
    setNotification(`Шаблон "${template.title}" добавлен в работу`);
  };

  const showNotification = (msg) => setNotification(msg);

  return (
    <div className={styles.root}>
      <Header favoritesCount={favorites.length} />
      <Hero />
      <Toolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={SECTIONS}
        favorites={favorites}
        favoritesCount={favorites.length}
      />
      <TemplateGrid
        templates={filteredTemplates}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onUse={useTemplate}
        onSelect={setSelectedTemplate}
      />
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          isFavorite={favorites.includes(selectedTemplate.id)}
          onClose={() => setSelectedTemplate(null)}
          onToggleFavorite={() => {
            toggleFavorite(selectedTemplate.id);
            showNotification(
              favorites.includes(selectedTemplate.id)
                ? "Удалено из избранного"
                : "Добавлено в избранное",
            );
          }}
          onUse={() => {
            useTemplate(selectedTemplate);
            setSelectedTemplate(null);
          }}
        />
      )}
      {notification && <Notification message={notification} />}
      <Footer />;
    </div>
  );
}
