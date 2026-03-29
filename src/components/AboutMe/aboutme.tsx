
import { useLang } from "../../App";

import { useEffect, useRef } from "react";
import "./aboutme.css"

function getFacts(t: (key: string) => string) {
    return [
        { value: t("about.facts.stack.value"), label: t("about.facts.stack.label") },
        { value: t("about.facts.specialties.value"), label: t("about.facts.specialties.label") },
        { value: t("about.facts.experience.value"), label: t("about.facts.experience.label") },
    ];
}


export default function AboutMe() {
    const { t } = useLang();
    const bioRef = useRef<HTMLDivElement>(null);
    const facts = getFacts(t);
    useEffect(() => {
        const el = bioRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="section-header">
                <div className="section-tag">{t("about.tag")}</div>
            </div>
            <section className="ab-root">
                <div className="ab-wrapper">
                    <div className="ab-bio" ref={bioRef}>

                        <h3 className="ab-name">Henrique W. T. Dias</h3>
                        <p className="ab-role-tag">{t("about.role")}</p>

                        <p className="ab-bio-text" dangerouslySetInnerHTML={{ __html: t("about.bio.part1") }}>

                        </p><p className="ab-bio-text" dangerouslySetInnerHTML={{ __html: t("about.bio.part2") }}></p>

                        <div className="ab-facts">
                            {facts.map((f) => (
                                <div className="ab-fact" key={f.label}>
                                    <span className="ab-fact-value">{f.value}</span>
                                    <span className="ab-fact-label">{f.label}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section></>
    );
}