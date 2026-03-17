import { useState, useEffect, useRef } from "react";
import { SiReact, SiJavascript, SiPython, SiNextdotjs, SiRedis, SiMongodb, SiPostgresql, SiCss, SiHtml5, SiNodedotjs, SiN8N, SiTypescript, SiDocker } from "react-icons/si"
import { motion } from "framer-motion";
import { Link, Element, scroller } from "react-scroll";

import "./App.css";

const TECHS_MAIN = [
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Redis", icon: <SiRedis /> },
];

const TECHS_FAMILIAR = [
  { name: "Python", icon: <SiPython /> },
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "HTML", icon: <SiHtml5 /> },
  { name: "CSS", icon: <SiCss /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "N8N", icon: <SiN8N /> },
];

const PROJECTS = [
  {
    emoji: "🛒",
    bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
    title: "E-Commerce Platform",
    desc: "Plataforma completa de e-commerce com pagamentos integrados, painel admin e gestão de estoque em tempo real.",
    tags: ["React", "Node.js", "PostgreSQL"],
    demo: "#", repo: "#",
  },
  {
    emoji: "📊",
    bg: "linear-gradient(135deg,#0f2027,#203a43)",
    title: "Dashboard Analytics",
    desc: "Dashboard interativo para visualização de métricas de negócio com gráficos em tempo real e relatórios exportáveis.",
    tags: ["TypeScript", "D3.js", "REST API"],
    demo: "#", repo: "#",
  },
  {
    emoji: "💬",
    bg: "linear-gradient(135deg,#1a0533,#2d0b5a)",
    title: "Chat em Tempo Real",
    desc: "Aplicação de mensagens instantâneas com WebSockets, autenticação JWT e suporte a múltiplas salas.",
    tags: ["Socket.io", "React", "Redis"],
    demo: "#", repo: "#",
  },
];

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

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Portfolio() {
  const [activePage, setActivePage] = useState("Início");
  const [lang, setLang] = useState("pt");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const navigate = (pageName) => {
    const elementName = PAGE_TO_ELEMENT[pageName];
    if (!elementName) return;
    setActivePage(pageName);
    scroller.scrollTo(elementName, { smooth: true, duration: 500, offset: -70 });
  };

  const handleSend = () => {
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="portfolio">

      <nav>
        <div className="nav-logo">{"<Henrique />"}</div>
        <div className="nav-links">
          {PAGES.map(p => {
            const elementName = PAGE_TO_ELEMENT[p];
            return (
              <Link
                key={p}
                to={elementName}
                smooth={true}
                offset={-70}
                spy={true}

                onSetActive={(id) => setActivePage(ELEMENT_TO_PAGE[id])}
              >
                <button
                  className={`nav-link${activePage === p ? " active" : ""}`}
                  onClick={() => navigate(p)}
                >
                  {p}
                </button>
              </Link>
            );
          })}

          {/* Language switcher — implement the logic here */}
          <button
            className="nav-lang-switch"
            onClick={() => setLang(l => l === "pt" ? "en" : "pt")}
            title="Switch language"
          >
            {lang === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button>
        </div>
      </nav>

      <div className="fade-in">

        {/* HERO */}
        <Element name="início">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="hero">
              <div>
                <div className="hero-tag">Disponível para projetos</div>
                <h1 className="hero-name">Olá, eu me chamo<br /><em>Henrique</em></h1>
                <p className="hero-desc">
                  Backend Developer focused on building APIs, automation and scalable systems. I turn ideas into clean, efficient and reliable code.
                </p>
                <div className="hero-ctas">
                  <button className="btn-primary" onClick={() => navigate("Projetos")}>Ver Projetos →</button>
                  <button className="btn-secondary" onClick={() => navigate("Contato")}>Entre em contato</button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="avatar-wrap">
                  <div className="avatar-frame" />
                  <div className="avatar-img">
                    <span className="avatar-placeholder">👨‍💻</span>
                  </div>
                  <div className="avatar-badge">
                    <span className="badge-num">1+</span>
                    anos de experiência
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </Element>

        {/* SOBRE */}
        <Element name="sobre">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="section-header">
              <div className="section-tag">Sobre</div>
              <h2 className="section-title">Quem sou<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>eu</em></h2>
            </div>
            <div className="about-layout">
              <div className="about-text">
                <p>Sou um desenvolvedor backend apaixonado por construir sistemas escaláveis e eficientes. Com foco em Node.js e TypeScript, gosto de resolver problemas complexos com código limpo e bem estruturado.</p>
                <p>Atualmente estou focado em APIs REST, automações e integrações com bancos de dados relacionais e não-relacionais. Busco constantemente aprender e evoluir como profissional.</p>
              </div>
              <div className="about-stats">
                <div className="about-stat"><span className="about-stat-num">1+</span><span className="about-stat-label">Anos de experiência</span></div>
                <div className="about-stat"><span className="about-stat-num">10+</span><span className="about-stat-label">Projetos entregues</span></div>
                <div className="about-stat"><span className="about-stat-num">5+</span><span className="about-stat-label">Tecnologias</span></div>
              </div>
            </div>
          </motion.section>
        </Element>

        {/* TECH */}
        <Element name="tecnologias">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="section-header">
              <div className="section-tag">Stack</div>
              <h2 className="section-title">Tecnologias que<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>domino</em></h2>
            </div>
            <div className="tech-group">
              <div className="tech-group-label main">Main Stack</div>
              <motion.div className="tech-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {TECHS_MAIN.map((t) => (
                  <motion.div className="tech-card" key={t.name} variants={item}>
                    <div className="tech-icon">{t.icon}</div>
                    <div className="tech-name">{t.name}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="tech-group">
              <div className="tech-group-label">Familiar With</div>
              <div className="tech-grid">
                {TECHS_FAMILIAR.map((t, i) => (
                  <div className="tech-card familiar" key={t.name} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className="tech-icon">{t.icon}</div>
                    <div className="tech-name">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </Element>

        {/* PROJECTS */}
        <Element name="projetos">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="section-header">
              <div className="section-tag">Portfólio</div>
              <h2 className="section-title">Projetos em<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>destaque</em></h2>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((proj, i) => (
                <div className="project-card" key={proj.title} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="project-thumb" style={{ background: proj.bg }}>
                    <span style={{ fontSize: 64 }}>{proj.emoji}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-tags">{proj.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}</div>
                    <div className="project-title">{proj.title}</div>
                    <p className="project-desc">{proj.desc}</p>
                    <div className="project-links">
                      <a className="proj-link" href={proj.demo}>Demo →</a>
                      <a className="proj-link" href={proj.repo} style={{ color: "var(--text-muted)" }}>GitHub →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </Element>

        {/* EDUCAÇÃO */}
        <Element name="educação">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="section-header">
              <div className="section-tag">Formação</div>
              <h2 className="section-title">Minha<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>educação</em></h2>
            </div>
            <div className="education-timeline">
              <div className="edu-item">
                <div className="edu-dot" />
                <div className="edu-content">
                  <div className="edu-period">2022 – Presente</div>
                  <div className="edu-degree">Análise e Desenvolvimento de Sistemas</div>
                  <div className="edu-school">Nome da Instituição</div>
                  <p className="edu-desc">Descrição breve do curso e principais aprendizados.</p>
                </div>
              </div>
              <div className="edu-item">
                <div className="edu-dot" />
                <div className="edu-content">
                  <div className="edu-period">2023</div>
                  <div className="edu-degree">Curso / Certificação</div>
                  <div className="edu-school">Plataforma / Instituição</div>
                  <p className="edu-desc">Descrição breve.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </Element>

        {/* CONTACT */}
        <Element name="contato">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="section-header">
              <div className="section-tag">Contato</div>
              <h2 className="section-title">Vamos <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>conversar</em></h2>
            </div>
            <div className="contact-layout">
              <div className="contact-info">
                <p>Estou aberto a novas oportunidades, projetos freelance ou apenas uma boa conversa sobre tecnologia. Me manda uma mensagem!</p>
                <div className="social-links">
                  {[{ label: "GitHub", icon: "⌥" }, { label: "LinkedIn", icon: "in" }, { label: "Email", icon: "✉" }, { label: "Twitter", icon: "✗" }].map(s => (
                    <a key={s.label} className="social-btn" href="#"><span>{s.icon}</span>{s.label}</a>
                  ))}
                </div>
              </div>
              <div>
                {formSent ? (
                  <div className="form-success">
                    ✓ Mensagem enviada!<br />
                    <span style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, display: "block" }}>Responderei em breve.</span>
                  </div>
                ) : (
                  <div className="contact-form">
                    <div className="form-group">
                      <label>Nome</label>
                      <input placeholder="Seu nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="seu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Mensagem</label>
                      <textarea placeholder="Conta sobre o seu projeto..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button className="btn-primary" onClick={handleSend}>Enviar mensagem →</button>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </Element>

      </div>

      <footer>
        <span>© 2025 Henrique.</span>
        <span style={{ color: "var(--accent)" }}>Disponível para trabalho</span>
      </footer>
    </div>
  );
}