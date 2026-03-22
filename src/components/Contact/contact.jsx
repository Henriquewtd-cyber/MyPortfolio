
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import "./contact.css"

const socialLinks = [
    {
        label: "GitHub",
        icon: "⌥",
        link: "https://github.com/Henriquewtd-cyber",
    },
    {
        label: "LinkedIn",
        icon: "in",
        link: "https://www.linkedin.com/in/henrique-wagner",
    },
    {
        label: "Email",
        icon: "✉",
        link: "mailto:henriquewt.dev@gmail.com?subject=Contato pelo portfólio",
    },
];

const EMAILJS_SERVICE_ID = "service_c9l9rwh";   // ex: "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_ijzohrj";  // ex: "template_xyz456"
const EMAILJS_PUBLIC_KEY = "sy7aHcX3Mh0jx_7Jw";   // ex: "aBcDeFgHiJkLmNoP"

export default function Contact() {

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [formSent, setFormSent] = useState(false);

    const formRef = useRef(null);
    const [status, setStatus] = useState("idle");

    status: "idle" | "sending" | "success" | "error"


    const handleSubmit = async (e, formRef, setStatus) => {
        e.preventDefault();

        setStatus("sending");
        setFormSent(true);
        setTimeout(() => {
            setFormSent(false);
        }, 5000);

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            setStatus("success");

        } catch (error) {
            console.error("Erro ao enviar email:", error);
            setStatus("error");
        }
    };

    return (<><div className="section-header">
        <div className="section-tag">Contato</div>
        <h2 className="section-title">Vamos <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>conversar</em></h2>
    </div><div className="contact-layout">
            <div className="contact-info">
                <p>Estou aberto a novas oportunidades, projetos freelance ou apenas uma boa conversa sobre tecnologia. Me manda uma mensagem!</p>
                <div className="social-links">
                    {socialLinks.map((s) => (
                        <a
                            key={s.label}
                            className="social-btn"
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{s.icon}</span>
                            {s.label}
                        </a>
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


                    < form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef, setStatus)}>
                        <div className="contact-form">
                            <div className="form-group">
                                <label>Nome</label>
                                <input placeholder="Seu nome" name="from_name" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="seu@email.com" name="from_email" />
                            </div>
                            <div className="form-group">
                                <label>Mensagem</label>
                                <textarea placeholder="Conta sobre o seu projeto..." name="message" />
                            </div>
                            <button type="submit" className="btn-primary" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Enviar mensagem →"}</button>
                        </div>
                    </form >
                )}
            </div>
        </div></>
    );
}