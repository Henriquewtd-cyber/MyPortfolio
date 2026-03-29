
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import "./contact.css"
import { useLang } from "../../App";


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

const EMAILJS_SERVICE_ID = "service_c9l9rwh";
const EMAILJS_TEMPLATE_ID = "template_ijzohrj";
const EMAILJS_PUBLIC_KEY = "sy7aHcX3Mh0jx_7Jw";


export default function Contact() {

    const { t } = useLang();

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [formSent, setFormSent] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formRef: React.RefObject<HTMLFormElement>, setStatus: React.Dispatch<React.SetStateAction<"idle" | "sending" | "success" | "error">>) => {
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
        <div className="section-tag">{t("contact.tag")}</div>
        <h2 className="section-title">{t("contact.title.part1")} <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>{t("contact.title.part2")}</em></h2>
    </div><div className="contact-layout">
            <div className="contact-info">
                <p>{t("contact.description")}</p>
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
                        ✓ {t("contact.success.title")}<br />
                        <span style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, display: "block" }}>{t("contact.success.subtitle")}</span>
                    </div>
                ) : (


                    <form ref={formRef} onSubmit={(e) => handleSubmit(e, formRef as React.RefObject<HTMLFormElement>, setStatus)}>
                        <div className="contact-form">
                            <div className="form-group">
                                <label>{t("contact.form.name.label")}</label>
                                <input placeholder={t("contact.form.name.placeholder")} name="from_name" required />
                            </div>
                            <div className="form-group">
                                <label>{t("contact.form.email.label")}</label>
                                <input type="email" placeholder={t("contact.form.email.placeholder")} name="from_email" required />
                            </div>
                            <div className="form-group">
                                <label>{t("contact.form.message.label")}</label>
                                <textarea placeholder={t("contact.form.message.placeholder")} name="message" />
                            </div>
                            <button type="submit" className="btn-primary" disabled={status === "sending"}>{status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}</button>
                        </div>
                    </form >
                )}
            </div>
        </div></>
    );
}
