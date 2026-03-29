
import { useLang } from "../../App";
import navigate from "../../services/navigate.jsx"
import "./hero.css"

export default function () {
    const { t } = useLang();
    return (
        <>
            <div className="hero">
                <div>
                    <div className="hero-tag">{t("hero.tag")}</div>
                    <h1 className="hero-name">Henrique<br /><em> Dias</em></h1>
                    <p className="hero-desc">
                        {t("hero.desc")}
                    </p>
                    <div className="hero-ctas">
                        <button className="btn-primary" onClick={() => navigate("Projetos")}>{t("hero.cta.projects")}</button>
                        <button className="btn-secondary" onClick={() => navigate("Contato")}>{t("hero.cta.contact")}</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="avatar-wrap">
                        <div className="avatar-frame" />
                        <div className="avatar-img">
                            <img src="./profilepicture.jpeg" alt="Henrique Dias" />
                        </div>
                        <div className="avatar-badge">
                            <span className="badge-num">1+</span>
                            {t("hero.badge.text")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}