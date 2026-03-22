
import { scroller } from "react-scroll";

const PAGE_TO_ELEMENT = {
    "Início": "início",
    "Sobre": "sobre",
    "Tecnologias": "tecnologias",
    "Projetos": "projetos",
    "Educação": "educação",
    "Contato": "contato",
};

const navigate = (pageName) => {
    const elementName = PAGE_TO_ELEMENT[pageName];
    if (!elementName) return;

    scroller.scrollTo(elementName, {
        smooth: true,
        duration: 1000,
        offset: -70,
    });
};

export default navigate;