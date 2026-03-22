
import { useEffect, useRef } from "react";
import "./aboutme.css"

const facts = [
    { value: "Stack principal", label: "Python | Node.js" },
    { value: "Especialidades", label: "APIs e Automação" },
    { value: "1+ Ano", label: "Como dev na IME-Jr" },
];

export default function AboutMe() {
    const bioRef = useRef(null);

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
                <div className="section-tag">Sobre</div>
            </div>
            <section className="ab-root">
                <div className="ab-wrapper">
                    <div className="ab-bio" ref={bioRef}>

                        <h3 className="ab-name">Henrique W. T. Dias</h3>
                        <p className="ab-role-tag">Desenvolvedor de Sistemas</p>

                        <p className="ab-bio-text">
                            Sou desenvolvedor focado em <strong>backend</strong>, criando APIs,
                            automações e integrações entre sistemas. Trabalho com{" "}
                            <strong>Python, Node.js e banco de dados</strong>, desenvolvendo
                            soluções que resolvem problemas reais — como fluxos automatizados,
                            comunicação entre serviços e manipulação de dados.
                            <br /><br />
                        </p><p className="ab-bio-text">
                            Tenho interesse em <strong>arquitetura de sistemas, escalabilidade e inteligência artificial</strong>,
                            e estou evoluindo continuamente na construção de aplicações robustas.
                            Busco minha primeira oportunidade como desenvolvedor para aplicar na
                            prática o que venho construindo.
                        </p>

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