import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c28;
    --border: rgba(255,255,255,0.07);
    --accent: #c9f542;
    --accent2: #7b5ea7;
    --text: #e8e8f0;
    --text-muted: #7a7a96;
    --font-display: 'Playfair Display', serif;
    --font-mono: 'DM Mono', monospace;
    --font-sans: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }

  .portfolio { min-height: 100vh; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .nav-links { display: flex; gap: 8px; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-muted); padding: 8px 16px; border-radius: 40px;
    transition: all 0.25s;
  }
  .nav-link:hover { color: var(--text); background: var(--surface2); }
  .nav-link.active { color: var(--bg); background: var(--accent); }

  /* SECTIONS */
  section { min-height: 100vh; padding: 120px 48px 80px; }

  /* HERO */
  .hero {
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 80px;
  }
  .hero-tag {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
  }
  .hero-tag::before {
    content: ''; width: 32px; height: 1px; background: var(--accent);
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(48px, 6vw, 88px);
    line-height: 1.0;
    margin-bottom: 24px;
    color: var(--text);
  }
  .hero-name em { color: var(--accent); font-style: italic; }
  .hero-desc {
    font-size: 16px; line-height: 1.7;
    color: var(--text-muted); max-width: 440px;
    margin-bottom: 40px;
  }
  .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--accent); color: var(--bg);
    border: none; cursor: pointer;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 4px;
    transition: all 0.25s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,245,66,0.25); }
  .btn-secondary {
    background: transparent; color: var(--text);
    border: 1px solid var(--border); cursor: pointer;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 4px;
    transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

  /* AVATAR */
  .hero-visual {
    display: flex; justify-content: center; align-items: center;
  }
  .avatar-wrap {
    position: relative; width: 340px; height: 380px;
  }
  .avatar-frame {
    position: absolute; inset: 0; border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%;
    background: linear-gradient(135deg, var(--accent2) 0%, var(--accent) 100%);
    animation: morph 8s ease-in-out infinite;
    opacity: 0.15;
  }
  .avatar-img {
    position: absolute; inset: 16px;
    border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%;
    background: var(--surface2);
    overflow: hidden;
    animation: morph 8s ease-in-out infinite;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
  }
  .avatar-placeholder {
    font-size: 100px; line-height: 1;
    user-select: none;
  }
  .avatar-badge {
    position: absolute; bottom: 20px; right: -16px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 12px 16px;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--text-muted);
    backdrop-filter: blur(8px);
  }
  .badge-num { font-size: 22px; color: var(--accent); display: block; font-weight: 500; }
  @keyframes morph {
    0%, 100% { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; }
    50% { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; }
  }

  /* SECTION HEADERS */
  .section-header { margin-bottom: 64px; }
  .section-tag {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-tag::before { content: ''; width: 24px; height: 1px; background: var(--accent); }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 52px);
    line-height: 1.1;
  }

  /* TECH */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }
  .tech-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px 16px;
    text-align: center; cursor: default;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .tech-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--accent) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .tech-card:hover { border-color: var(--accent); transform: translateY(-4px); }
  .tech-card:hover::before { opacity: 0.05; }
  .tech-icon { font-size: 32px; margin-bottom: 10px; }
  .tech-name {
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.08em; color: var(--text);
    margin-bottom: 6px;
  }
  .tech-level {
    font-size: 10px; color: var(--text-muted);
    font-family: var(--font-mono);
  }
  .tech-bar-wrap {
    margin-top: 10px; height: 2px;
    background: var(--border); border-radius: 2px; overflow: hidden;
  }
  .tech-bar {
    height: 100%; background: var(--accent);
    border-radius: 2px; transition: width 1s ease;
  }

  /* PROJECTS */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }
  .project-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    transition: all 0.3s; position: relative;
  }
  .project-card:hover { border-color: rgba(201,245,66,0.3); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .project-thumb {
    height: 180px; display: flex; align-items: center; justify-content: center;
    font-size: 56px; position: relative; overflow: hidden;
  }
  .project-body { padding: 24px; }
  .project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .project-tag {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    background: var(--surface2); color: var(--text-muted);
    padding: 4px 10px; border-radius: 4px; border: 1px solid var(--border);
  }
  .project-title {
    font-family: var(--font-display); font-size: 20px;
    margin-bottom: 10px; color: var(--text);
  }
  .project-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }
  .project-links { display: flex; gap: 12px; }
  .proj-link {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--accent); text-decoration: none;
    background: none; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    transition: gap 0.2s;
  }
  .proj-link:hover { gap: 10px; }

  /* CONTACT */
  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .contact-info p {
    font-size: 15px; color: var(--text-muted); line-height: 1.8; margin-bottom: 32px;
  }
  .social-links { display: flex; gap: 12px; flex-wrap: wrap; }
  .social-btn {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); padding: 12px 20px; border-radius: 8px;
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.08em; text-decoration: none;
    transition: all 0.25s; cursor: pointer;
  }
  .social-btn:hover { border-color: var(--accent); color: var(--accent); }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  label {
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted);
  }
  input, textarea {
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); font-family: var(--font-sans); font-size: 14px;
    padding: 12px 16px; border-radius: 8px; outline: none;
    transition: border-color 0.25s; resize: vertical;
  }
  input:focus, textarea:focus { border-color: var(--accent); }
  textarea { min-height: 120px; }
  .form-success {
    text-align: center; padding: 32px;
    font-family: var(--font-mono); color: var(--accent); font-size: 14px;
  }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 32px 48px;
    display: flex; align-items: center; justify-content: space-between;
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.08em; color: var(--text-muted);
  }

  /* FADE ANIMATION */
  .fade-in { animation: fadeUp 0.6s ease both; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 2px; }

  @media (max-width: 768px) {
    nav { padding: 16px 20px; }
    .nav-links { gap: 4px; }
    .nav-link { padding: 6px 10px; font-size: 11px; }
    section { padding: 100px 20px 60px; }
    .hero { grid-template-columns: 1fr; gap: 40px; }
    .hero-visual { order: -1; }
    .avatar-wrap { width: 240px; height: 280px; }
    .contact-layout { grid-template-columns: 1fr; gap: 48px; }
    footer { flex-direction: column; gap: 8px; text-align: center; }
  }
`;

const TECHS = [
    { name: "React", icon: "⚛️", level: "Avançado", pct: 90 },
    { name: "TypeScript", icon: "𝑇𝑆", level: "Avançado", pct: 85 },
    { name: "Node.js", icon: "🟢", level: "Avançado", pct: 82 },
    { name: "Python", icon: "🐍", level: "Intermediário", pct: 70 },
    { name: "PostgreSQL", icon: "🐘", level: "Intermediário", pct: 68 },
    { name: "Docker", icon: "🐳", level: "Intermediário", pct: 65 },
    { name: "AWS", icon: "☁️", level: "Básico", pct: 50 },
    { name: "Figma", icon: "🎨", level: "Intermediário", pct: 72 },
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

const PAGES = ["Início", "Tecnologias", "Projetos", "Contato"];

export default function Portfolio() {
    const [page, setPage] = useState("Início");
    const [animKey, setAnimKey] = useState(0);
    const [formSent, setFormSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const techBarsRef = useRef(false);

    const navigate = (p) => {
        setPage(p);
        setAnimKey(k => k + 1);
        window.scrollTo(0, 0);
    };

    const handleSend = () => {
        if (form.name && form.email && form.message) setFormSent(true);
    };

    return (
        <div className="portfolio">
            <style>{style}</style>

            <nav>
                <div className="nav-logo">{"<seu_nome />"}</div>
                <div className="nav-links">
                    {PAGES.map(p => (
                        <button key={p} className={`nav-link${page === p ? " active" : ""}`} onClick={() => navigate(p)}>
                            {p}
                        </button>
                    ))}
                </div>
            </nav>

            <div key={animKey} className="fade-in">

                {/* HERO */}
                {page === "Início" && (
                    <section>
                        <div className="hero">
                            <div>
                                <div className="hero-tag">Disponível para projetos</div>
                                <h1 className="hero-name">
                                    Olá, eu sou<br /><em>Seu Nome</em>
                                </h1>
                                <p className="hero-desc">
                                    Desenvolvedor full-stack apaixonado por criar experiências digitais elegantes e produtos que fazem a diferença. Transformo ideias em código limpo e interfaces intuitivas.
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
                                        <span className="badge-num">3+</span>
                                        anos de experiência
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* TECH */}
                {page === "Tecnologias" && (
                    <section>
                        <div className="section-header">
                            <div className="section-tag">Stack</div>
                            <h2 className="section-title">Tecnologias que<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>domino</em></h2>
                        </div>
                        <div className="tech-grid">
                            {TECHS.map((t, i) => (
                                <div className="tech-card" key={t.name} style={{ animationDelay: `${i * 0.06}s` }}>
                                    <div className="tech-icon">{t.icon}</div>
                                    <div className="tech-name">{t.name}</div>
                                    <div className="tech-level">{t.level}</div>
                                    <div className="tech-bar-wrap">
                                        <div className="tech-bar" style={{ width: `${t.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS */}
                {page === "Projetos" && (
                    <section>
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
                                        <div className="project-tags">
                                            {proj.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                                        </div>
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
                    </section>
                )}

                {/* CONTACT */}
                {page === "Contato" && (
                    <section>
                        <div className="section-header">
                            <div className="section-tag">Contato</div>
                            <h2 className="section-title">Vamos <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>conversar</em></h2>
                        </div>
                        <div className="contact-layout">
                            <div className="contact-info">
                                <p>Estou aberto a novas oportunidades, projetos freelance ou apenas uma boa conversa sobre tecnologia. Me manda uma mensagem!</p>
                                <div className="social-links">
                                    {[
                                        { label: "GitHub", icon: "⌥" },
                                        { label: "LinkedIn", icon: "in" },
                                        { label: "Email", icon: "✉" },
                                        { label: "Twitter", icon: "✗" },
                                    ].map(s => (
                                        <a key={s.label} className="social-btn" href="#">
                                            <span>{s.icon}</span>{s.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                {formSent ? (
                                    <div className="form-success">
                                        ✓ Mensagem enviada!<br />
                                        <span style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, display: "block" }}>
                                            Responderei em breve.
                                        </span>
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
                    </section>
                )}

            </div>

            <footer>
                <span>© 2025 Seu Nome. Feito com ☕</span>
                <span style={{ color: "var(--accent)" }}>Disponível para trabalho</span>
            </footer>
        </div>
    );
}