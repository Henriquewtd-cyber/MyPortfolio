
import { useLang } from "../../App";
import { useEffect, useRef, useState } from "react";
import "./timeline.css";

function getTimelineData(t: (key: string) => string) {
    return (
        [
            {
                year: "2025",
                title: t("timeline.item1.title"),
                role: t("timeline.item1.role"),
                description: t("timeline.item1.description"),
                tags: t("timeline.item1.tags").split(",").map(tag => tag.trim()),
                color: "#C8FF00",
            },
            {
                year: "2025",
                title: t("timeline.item2.title"),
                role: t("timeline.item2.role"),
                description: t("timeline.item2.description"),
                tags: t("timeline.item2.tags").split(",").map(tag => tag.trim()),
                color: "#C8FF00",
            },
            {
                year: "2026",
                title: t("timeline.item3.title"),
                role: t("timeline.item3.role"),
                description: t("timeline.item3.description"),
                tags: t("timeline.item3.tags").split(",").map(tag => tag.trim()),
                color: "#C8FF00",
            },
        ]);
}

export default function Timeline() {
    const { t } = useLang();
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef(null);
    const [lineActive, setLineActive] = useState(false);

    const timelineData = getTimelineData(t);

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
        items.forEach((item: any) => observer.observe(item));
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