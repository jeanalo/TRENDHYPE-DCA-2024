import './BannerComponent.css';

export enum BannerAttribute {
    bannerText = 'bannerText',
    img = 'img'
}

class BannerComponent extends HTMLElement {
    bannerText?: string;
    img?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(BannerAttribute);
    }

    attributeChangedCallback(name: BannerAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./src/components/QuestionOfTheDay/BannerComponent/BannerComponent.css">

                <style>
                                    * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, sans-serif;
                }

                body {
                    background-color: #232106;
                    color: #FFFFFF;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    height: 100vh;
                    padding-top: 40px;
                }

                .banner {
                    position: relative;
                    margin: 20px auto;
                    margin-bottom: 50px;
                    border: solid white
                    width: 800px;
                }

                .banner-image {
                    width: 100%;
                    border-radius: 10px;
                }

                .banner-text {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 10px 30px;
                    border-radius: 10px;
                    max-width: 80%;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .banner-text p {
                    font-size: 16px;
                    line-height: 1.5;
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
                <div class="banner">
                    <img src="${this.img || 'https://github.com/jeanalo/IMG-assets/blob/main/imgColorfulBanner.png?raw=true'}" alt="Banner" class="banner-image">
                    <div class="banner-text">
                        <p>${this.bannerText || 'READY TO DISCOVER YOUR STYLE VIBE FOR THE DAY? ANSWER THESE QUICK QUESTIONS TO UNLOCK YOUR UNIQUE FASHION MOOD. LET YOUR OUTFIT SPEAK FOR YOU!'}</p>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('banner-component', BannerComponent);
export default BannerComponent;
