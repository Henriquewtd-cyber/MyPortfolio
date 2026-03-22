
import EducationTimeline from "./timeline"

export default function Education() {

    return (
        <>
            <div className="section-header">
                <div className="section-tag">Formação</div>
                <h2 className="section-title">
                    Minha<br />
                    <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>
                        educação
                    </em>
                </h2>
            </div>
            <div className="education">
                <EducationTimeline />
            </div>
        </>
    );
}