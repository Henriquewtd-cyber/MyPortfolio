import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { t as translate } from "./i8n/i8n";

import Hero from "./components/Hero/hero";
import AboutMe from "./components/AboutMe/aboutme";
import Techs from "./components/Techs/techs";
import Projects from "./components/Projects/projects";
import Education from "./components/Education/education";
import Contact from "./components/Contact/contact";

import navigate from "./services/navigate";
import { Link, Element } from "react-scroll";

import "./App.css";

export const LangContext = createContext("pt");

export function useLang() {
  const lang = useContext(LangContext);
  return { lang, t: (key) => translate(key, lang) };
}

// ─── Páginas ─────────────────────────────────────────────────────────────────
const PAGES = [
  { key: "nav.home", id: "início" },
  { key: "nav.about", id: "sobre" },
  { key: "nav.tech", id: "tecnologias" },
  { key: "nav.projects", id: "projetos" },
  { key: "nav.education", id: "educação" },
  { key: "nav.contact", id: "contato" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function getInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;
  const browserLang = navigator.language || navigator.userLanguage || "pt";
  return browserLang.startsWith("pt") ? "pt" : "en";
}

export default function Portfolio() {
  const [activePage, setActivePage] = useState("início");
  const [lang, setLang] = useState(getInitialLang);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = (key) => translate(key, lang);

  const menuRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function toggleLang() {
    setLang((l) => (l === "pt" ? "en" : "pt"));
  }

  return (
    <LangContext.Provider value={lang}>
      <div className="portfolio">
        <motion.div
          key={lang}
          initial={isFirstRender.current ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <nav ref={menuRef}>
            <div className="nav-logo">{"<Henrique />"}</div>

            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {PAGES.map((p) => (
                <Link
                  key={p.id}
                  to={p.id}
                  smooth
                  offset={-80}
                  spy
                  onSetActive={(id) => setActivePage(id)}
                >
                  <button
                    className={`nav-link ${activePage === p.id ? "active" : ""}`}
                    onClick={() => navigate(p.id)}
                  >
                    {t(p.key)}
                  </button>
                </Link>
              ))}

              <div className="lang-wrapper">
                <button className="nav-lang-switch" onClick={toggleLang}>
                  {lang === "pt" ? "🇺🇸 EN" : "🇧🇷 PT"}
                </button>

                <span className="lang-tooltip">
                  {lang === "pt" ? "Switch to English" : "Mudar para Português"}
                </span>
              </div>
            </div>
          </nav>

          <div className="fade-in">
            <Element name="início">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Hero />
              </motion.section>
            </Element>

            <Element name="sobre">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <AboutMe />
              </motion.section>
            </Element>

            <Element name="tecnologias">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Techs />
              </motion.section>
            </Element>

            <Element name="projetos">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Projects />
              </motion.section>
            </Element>

            <Element name="educação">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Education />
              </motion.section>
            </Element>

            <Element name="contato">
              <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Contact />
              </motion.section>
            </Element>
          </div>

          <footer>
            <span>{t("footer.text")}</span>
            <span style={{ color: "var(--accent)" }}>
              {t("footer.available")}
            </span>
          </footer>
        </motion.div>
      </div>
    </LangContext.Provider>
  );
}