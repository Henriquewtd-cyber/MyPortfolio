
import navigate from "../../services/navigate.jsx"
import "./hero.css"

export default function () {
    return (
        <>
            <div className="hero">
                <div>
                    <div className="hero-tag">Disponível para projetos</div>
                    <h1 className="hero-name">Henrique<br /><em> Dias</em></h1>
                    <p className="hero-desc">
                        Sou um desenvolvedor backend focado em transformar processos manuais em sistemas automatizados, integrando APIs e criando soluções escaláveis que geram resultados reais.
                    </p>
                    <div className="hero-ctas">
                        <button className="btn-primary" onClick={() => navigate("Projetos")}>Ver Projetos →</button>
                        <button className="btn-secondary" onClick={() => navigate("Contato")}>Entre em contato</button>
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
                            ano de experiência
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}