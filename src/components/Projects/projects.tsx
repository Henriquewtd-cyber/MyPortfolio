
import "./projects.css"
import { useLang } from "../../App";


function getProjects(t: (key: string) => string) {
    return [
        {
            emoji: "🧠",
            bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
            title: t("projects.neuropost.title"),
            desc: t("projects.neuropost.desc"),
            tags: ["MongoDB", "Express", "React", "Node.js"],
            demo: "https://youtu.be/iTvTdeK2C-Q",
            repo: "https://github.com/Henriquewtd-cyber/NeuroPost",
            links: t("projects.links.demo")
        },
        {
            emoji: "📅",
            bg: "linear-gradient(135deg,#0f2027,#203a43)",
            title: t("projects.clientmanager.title"),
            desc: t("projects.clientmanager.desc"),
            tags: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis"],
            demo: "https://github.com/Henriquewtd-cyber/Client-Manager",
            repo: "https://github.com/Henriquewtd-cyber/Client-Manager",
            links: t("projects.links.dev")
        },
        {
            emoji: "📁",
            bg: "linear-gradient(135deg,#1a0533,#2d0b5a)",
            title: t("projects.acervopet.title"),
            desc: t("projects.acervopet.desc"),
            tags: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
            demo: "https://youtu.be/NZLMlUFhGDM",
            repo: "https://github.com/acervopet/AcervoPet",
            links: t("projects.links.demo")
        },
        {
            emoji: "⚙️",
            bg: "linear-gradient(135deg,#232526,#414345)",
            title: t("projects.automation.title"),
            desc: t("projects.automation.desc"),
            tags: ["n8n", "Google Cloud", "Automação"],
            demo: "../../../n8n-model.webp",
            repo: "#",
            links: t("projects.links.viewPreview")
        },
    ];
}

export default function Projects() {
    const { t } = useLang();
    const PROJECTS = getProjects(t);
    return (
        <>
            <div className="section-header">
                <div className="section-tag">{t("projects.tag")}</div>
                <h2 className="section-title">{t("projects.title.part1")} <br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>{t("projects.title.part2")}</em></h2>
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
