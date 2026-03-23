
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Hero from "./components/Hero/hero"
import AboutMe from "./components/AboutMe/aboutme";
import Techs from "./components/Techs/techs"
import Projects from "./components/Projects/projects";
import Education from "./components/Education/education";
import Contact from "./components/Contact/contact"

import navigate from "./services/navigate"
import { Link, Element, scroller } from "react-scroll";

import "./App.css";

const PAGES = ["Início", "Sobre", "Tecnologias", "Projetos", "Educação", "Contato"];

const PAGE_TO_ELEMENT = {
  "Início": "início",
  "Sobre": "sobre",
  "Tecnologias": "tecnologias",
  "Projetos": "projetos",
  "Educação": "educação",
  "Contato": "contato",
};

const ELEMENT_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_ELEMENT).map(([page, el]) => [el, page])
);

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Portfolio() {
  const [activePage, setActivePage] = useState("Início");
  const [lang, setLang] = useState("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="portfolio">
      <nav ref={menuRef}>
        <div className="nav-logo">{"<Henrique />"}</div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >

          {PAGES.map((p) => {
            const elementName = PAGE_TO_ELEMENT[p];

            return (
              <Link
                key={p}
                to={elementName}
                smooth={true}
                offset={-80}
                spy={true}
                onSetActive={(id) => setActivePage(ELEMENT_TO_PAGE[id])}
              >
                <button
                  className={`nav-link ${activePage === p ? "active" : ""}`}
                  onClick={() => navigate(p)}
                >
                  {p}
                </button>
              </Link>
            );
          })}

          {/* <button 
            className="nav-lang-switch"
            onClick={() => setLang(l => (l === "pt" ? "en" : "pt"))}
          >
            {lang === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button> */}

        </div>
      </nav>

      <div className="fade-in">

        {/* HERO */}
        <Element name="início">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <Hero />
          </motion.section>
        </Element>

        {/* SOBRE */}
        <Element name="sobre">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <AboutMe />
          </motion.section>
        </Element>

        {/* TECH */}
        <Element name="tecnologias">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <Techs />
          </motion.section>
        </Element>

        {/* PROJECTS */}
        <Element name="projetos">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <Projects />
          </motion.section>
        </Element>

        {/* EDUCAÇÃO */}
        <Element name="educação">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <Education />
          </motion.section>
        </Element>

        {/* CONTACT */}
        <Element name="contato">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <Contact />
          </motion.section>
        </Element>

      </div>

      <footer>
        <span>© 2025 Henrique.</span>
        <span style={{ color: "var(--accent)" }}>Disponível para trabalho</span>
      </footer>
    </div >
  );
}