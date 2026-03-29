
import EducationTimeline from "./timeline"
import { useLang } from "../../App";
import "./education.css";

export default function Education() {
    const { t } = useLang();
    return (

        <>
            <div className="section-header">
                <div className="section-tag">{t("education.tag")}</div>
                <h2 className="section-title">
                    {t("education.title.part1")} <br />
                    <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--accent)" }}>
                        {t("education.title.part2")}
                    </em>
                </h2>
            </div>
            <div className="education">
                <EducationTimeline />
            </div>
        </>
    );
}