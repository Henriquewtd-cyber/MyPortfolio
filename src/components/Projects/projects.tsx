
import "./projects.css"


const PROJECTS = [
    {
        emoji: "🧠",
        bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
        title: "NeuroPost",
        desc: "Plataforma fullstack com autenticação, armazenamento de arquivos por usuário e geração de imagens com IA. Inclui API REST estruturada e integração com banco NoSQL.",
        tags: ["MongoDB", "Express", "React", "Node.js"],
        demo: "https://youtu.be/iTvTdeK2C-Q",
        repo: "https://github.com/Henriquewtd-cyber/NeuroPost",
        links: "Assistir demo"
    },
    {
        emoji: "📅",
        bg: "linear-gradient(135deg,#0f2027,#203a43)",
        title: "ClientManager",
        desc: "Sistema de agendamento de consultas com gestão de agenda e automações via chatbot. Integra n8n, Redis e WhatsApp para comunicação automatizada com clientes.",
        tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis"],
        demo: "#",
        repo: "https://github.com/Henriquewtd-cyber/Client-Manager",
        links: "Em desenvolvimento"
    },
    {
        emoji: "📁",
        bg: "linear-gradient(135deg,#1a0533,#2d0b5a)",
        title: "Acervo Pet",
        desc: "Plataforma de acervo digital desenvolvida em parceria com a empresa júnior IME-Jr. Sistema com autenticação e armazenamento de documentos, utilizando banco relacional.",
        tags: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
        demo: "https://youtu.be/NZLMlUFhGDM",
        repo: "https://github.com/acervopet/AcervoPet",
        links: "Assistir demo"
    },

    {
        emoji: "⚙️",
        bg: "linear-gradient(135deg,#232526,#414345)",
        title: "Automação Empresarial",
        desc: "Sistema interno de automação que envia atualizações semanais para membros da empresa. Utiliza n8n e Google Cloud para orquestração de workflows.",
        tags: ["n8n", "Google Cloud", "Automação"],
        demo: "../../../public/n8n-model.webp",
        repo: "#",
        links: "Preview"
    },
];

export default function Projects() {

    return (
        <>
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
                                {
                                    proj.links != "Preview" && (
                                        <>
                                            <a
                                                className="proj-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={proj.demo}
                                            >
                                                {proj.links + " →"}
                                            </a>

                                            <a
                                                className="proj-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={proj.repo}
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                GitHub →
                                            </a>
                                        </>
                                    )
                                }
                                {
                                    proj.links == "Preview" && (
                                        <>
                                            <a
                                                className="proj-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={proj.demo}
                                            >
                                                Ver preview →
                                            </a>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}