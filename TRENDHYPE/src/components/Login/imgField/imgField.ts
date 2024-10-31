// imgField.ts
import './imgField.css';

export enum ImgBannerAttribute {
    img = 'img',
    trendtext = 'trendtext',
    opacitylayer = 'opacitylayer'
}

class imgBanner extends HTMLElement {
    img?: string;
    trendtext?: string;
    opacitylayer?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(ImgBannerAttribute);
    }

    attributeChangedCallback(name: ImgBannerAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
      
            /* Contenedor principal para el Trend Hype Photo */
#trendHypePhoto {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
    max-width: 360px; /* Ancho máximo definido para pantallas más grandes */
    height: auto; /* Ajuste automático para que coincida con el contenido */
    aspect-ratio: 3 / 3.7; /* Cambiado para hacer la imagen más alta */
    background: white url('https://github.com/jeanalo/IMG-assets/blob/main/image%2047.png?raw=true') no-repeat center center;
    background-size: cover;
    margin: -170px auto 0; /* Centrar horizontalmente */
}

/* Imagen de fondo */
.trend-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mantener la proporción adecuada sin distorsión */
}

/* Capa de opacidad que crea el efecto "glass" */
#photoOpacity {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(5px); /* Reducir el blur para evitar que sea demasiado opaco */
    border-radius: 16px;
    z-index: 0;
}

/* Texto superpuesto con rotación */
.text-overlay {
    font-family: "Times New Roman", serif;
    font-size: rem; /* Aumenta el tamaño del texto */
    font-style: italic;
    color: #B2D1EE;
    position: absolute;
    top: 40%; /* Para centrar verticalmente */
    left: -50px; /* Pega el texto al lado izquierdo */
    transform: translateY(-50%) rotate(-90deg); /* Centrado vertical y rotado */
    white-space: nowrap;
    z-index: 1; /* Mayor que #photoOpacity para que quede por encima */
}


/* Contenedor de imagen */
#trendHypeContainer {
    margin-top: 60px; /* Incremento para bajar la imagen */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Ajustes de media query para pantallas grandes */
@media (min-width: 768px) {
    #trendHypePhoto {
        max-width: 360px; /* Incrementar ligeramente el tamaño para pantallas más grandes */
    }

    .text-overlay {
        font-size: 3rem; /* Aumentar el tamaño del texto para pantallas más grandes */
    }

    /* Incrementa aún más el margen superior en pantallas grandes */
    #trendHypeContainer {
        margin-top: 80px; /* Aumenta el margen en pantallas grandes */
    }
}

/* Ajustes de media query para pantallas móviles */
@media (max-width: 480px) {
    #trendHypePhoto {
        max-width: 300px; /* Reducir tamaño en dispositivos móviles */
    }

    .text-overlay {
        font-size: 1rem; /* Reducir el tamaño del texto en pantallas pequeñas */
    }
}


                </style>
                <div id="trendHypeContainer">
                    <div id="trendHypePhoto">
                    <img id='blank' src="${this.img || 'https://github.com/jeanalo/IMG-assets/blob/main/image%2057.png?raw=true'}" alt="TrendHype Photo" class="trend-img">	
                        <div id="photoOpacity" style="opacity: ${this.opacitylayer || '0.4'};"></div>
                        <p class="text-overlay">${this.trendtext || 'TrendHype'}</p>
                    </div>
                </div>
            `;
        }
    }
}    

customElements.define('img-banner-component', imgBanner);
export default imgBanner;
