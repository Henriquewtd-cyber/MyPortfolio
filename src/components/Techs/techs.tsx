
import { motion } from "framer-motion";
import { SiReact, SiJavascript, SiPython, SiNextdotjs, SiRedis, SiMongodb, SiPostgresql, SiCss, SiHtml5, SiNodedotjs, SiN8N, SiTypescript, SiDocker } from "react-icons/si"
import "./techs.css"

const TECHS_MAIN = [
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Python", icon: <SiPython /> },
    { name: "N8N", icon: <SiN8N /> },
    { name: "Javascript", icon: <SiJavascript /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "MongoDB", icon: <SiMongodb /> },
];

const TECHS_FAMILIAR = [
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Redis", icon: <SiRedis /> },
    { name: "React", icon: <SiReact /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss /> },
    { name: "Docker", icon: <SiDocker /> },
];

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
};

export default function Tecs() {

    return (
        <>
            <div className="section-header">
                <div className="section-tag">Stack</div>
                <h2 className="section-title">Tecnologias e<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>ferramentas</em></h2>
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
        </>
    );
}