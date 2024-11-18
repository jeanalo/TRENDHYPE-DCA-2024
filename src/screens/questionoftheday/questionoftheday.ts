import BannerComponent, { BannerAttribute } from '../../components/QuestionOfTheDay/BannerComponent/BannerComponent';
import FormComponent, { FormAttribute } from '../../components/QuestionOfTheDay/FormComponent/FormComponent';
import './QuestionOfTheDay.css';

class SurveyScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        console.log('Survey screen loaded');
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./QuestionOfTheDay.css">
                <style>
                    :host {
                        display: block;
                        height: 100vh; /* Ocupa toda la altura de la ventana */
                        overflow-y: auto;
                        /* Estilo para ocultar el scroll en navegadores compatibles */
                        scrollbar-width: none; /* Firefox */
                    }
                    
                    :host::-webkit-scrollbar {
                        display: none; /* Chrome, Safari y Opera */
                    }

                    /* Estilos generales */
                    html, body {
                        height: 100%;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #232106;
                        color: #FFFFFF;
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                    }

                    .container {
                        width: 800px;
                        max-width: 1000px;
                        text-align: center;
                        padding: 20px;
                        box-sizing: border-box;
                        
                       
                    }

                    @media (max-width: 600px) {
    .container {
        width: 100%;
        padding: 10px;
    }

    .banner {
        position: relative;
        height: auto;
    }

    .banner img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .banner-text {
        position: absolute;
        top: 70%; /* Baja el contenedor un poco más */
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 6px 12px; /* Tamaño reducido del padding */
        max-width: 70%;
        background: rgba(255, 255, 255, 0.2); /* Efecto de vidrio */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        text-align: center;
    }

    /* Texto reducido */
    .banner-text p {
        font-size: 12px; /* Tamaño de fuente más pequeño */
        visibility: hidden;
        position: relative;
    }

    .banner-text p::after {
        content: "READY TO DISCOVER YOUR STYLE VIBE FOR THE DAY?";
        visibility: visible;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
    }

    .question {
        max-width: 100%;
    }

    .question h2 {
        font-size: 16px;
        padding: 8px;
    }

    .option {
        width: 90%;
        padding: 8px;
        font-size: 14px;
    }

    .submit-button {
        width: 40%;
        margin: 10px auto;
    }

    .submit-button::before {
        font-size: 16px;
    }
}

                </style>
                
                <div class="container"></div>
            `;

            // Instancia y configuración de los componentes
            const bannerComponent = new BannerComponent();
            bannerComponent.setAttribute(BannerAttribute.bannerText, 'READY TO DISCOVER YOUR STYLE VIBE FOR THE DAY?');
            
            const formCompo = new FormComponent();
            formCompo.setAttribute(FormAttribute.question1, 'WHAT COLORS DO YOU PREFER TO WEAR TODAY?');
            formCompo.setAttribute(FormAttribute.question2, 'WHAT TYPE OF CLOTHING INSPIRES YOU TODAY?');
            formCompo.setAttribute(FormAttribute.question3, 'WHAT ACCESSORY IS A MUST FOR YOUR LOOK TODAY?');

            // Agregar los componentes al contenedor
            this.shadowRoot.querySelector('.container')?.append(bannerComponent, formCompo);
        }
    }
}

customElements.define('app-questionoftheday', SurveyScreen);
export default SurveyScreen;
