import { useEffect, useRef, useState } from "react";
import "./timeline.css";

const timelineData = [
    {
        year: "2025",
        title: "Início da Graduação",
        role: "Ciência da Computação — IME-USP",
        description:
            "Ingresso no curso de Ciência da Computação, com foco no desenvolvimento de software, lógica de programação e fundamentos de sistemas.",
        tags: ["Algoritmos", "Programação", "Fundamentos"],
        color: "#C8FF00",
    },
    {
        year: "2025",
        title: "Experiência Prática",
        role: "Desenvolvedor — IMEJR",
        description:
            "Atuação em projetos reais dentro da empresa júnior, desenvolvendo soluções com foco em backend, automações e integração entre sistemas.",
        tags: ["Backend", "APIs", "Automação"],
        color: "#C8FF00",
    },
    {
        year: "2026",
        title: "Primeiro Freelance",
        role: "Desenvolvedor Fullstack",
        description:
            "Desenvolvimento de sistema de agendamento com gestão de agenda e automações via chatbot, incluindo integração com serviços externos.",
        tags: ["Next.js", "Node.js", "n8n", "MongoDB"],
        color: "#C8FF00",
    },
];

export default function Timeline() {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const [lineActive, setLineActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setLineActive(true); },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const items = containerRef.current?.querySelectorAll(".tl-item");
        if (!items) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
            },
            { threshold: 0.2 }
        );
        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="tl-root">
                <div className="tl-wrapper">


                    <div className="tl-container" ref={containerRef}>
                        <div className={`tl-line ${lineActive ? "active" : ""}`} ref={lineRef}>
                            <div className="tl-line-track" />
                            <div className="tl-line-fill" />
                        </div>

                        {timelineData.map((item, index) => {
                            const isMiddle = index === 1;
                            return (
                                <div
                                    key={index}
                                    className={`tl-item ${isMiddle ? "is-right" : "is-left"}`}
                                    style={{ color: item.color }}
                                >
                                    {/* Node always first in DOM — CSS order handles desktop positioning */}
                                    <div className="tl-node-col">
                                        <div className="tl-dot" style={{ borderColor: item.color }} />
                                    </div>

                                    {isMiddle ? (
                                        <>
                                            <div className="tl-empty" />
                                            <div className="tl-card tl-card-right">
                                                <div className="tl-year">{item.year}</div>
                                                <h2 className="tl-card-title">{item.title}</h2>
                                                <p className="tl-card-role">{item.role}</p>
                                                <p className="tl-card-desc">{item.description}</p>
                                                <div className="tl-tags">
                                                    {item.tags.map((tag) => <span className="tl-tag" key={tag}>{tag}</span>)}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="tl-card tl-card-left">
                                                <div className="tl-year">{item.year}</div>
                                                <h2 className="tl-card-title">{item.title}</h2>
                                                <p className="tl-card-role">{item.role}</p>
                                                <p className="tl-card-desc">{item.description}</p>
                                                <div className="tl-tags">
                                                    {item.tags.map((tag) => <span className="tl-tag" key={tag}>{tag}</span>)}
                                                </div>
                                            </div>
                                            <div className="tl-empty" />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}