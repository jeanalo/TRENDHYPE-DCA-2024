import './imgSide.css';

export enum ImgSideAttribute {
    'img' = 'img',
    'trendtext' = 'trendtext',
    'opacitylayer' = 'opacitylayer'
}

class imgSideBanner extends HTMLElement {
    img?: string;
    trendtext?: string;
    opacitylayer?: string

    constructor(){
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      console.log('imgSideBanner');
    }

    static get observedAttributes() {
        return Object.values(ImgSideAttribute);
    }

    attributeChangedCallback(propName: ImgSideAttribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    render() {
      if (this.shadowRoot) {
          this.shadowRoot.innerHTML = `
          <style>
              /* Contenedor principal que ocupa toda la altura disponible */
              #trendHypePhoto {
                  width: 20rem; /* Ocupa el mismo ancho que el formulario */
                  height: 29.6rem; /* Ocupa la altura completa */
                  margin: auto;
                  background-color: rgba(255, 255, 255, 0.3); /* Fondo blanco con transparencia */
                  border-radius: 20px;
                  position: relative;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                 
              }
    
              /* Imagen de fondo que cubre el contenedor */
              #trendHypePhoto::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-image: url('${this.img || "https://github.com/jeanalo/IMG-assets/blob/main/image%2047.png?raw=true"}');
                  background-size: cover;
                  background-position: center;
                  border-radius: 20px;
                  z-index: 1;
                  
              }
    
              /* Capa de opacidad que cubre la mitad del contenedor */
              #photoOpacity {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 50%; /* Ocupa la mitad del ancho del contenedor */
                  height: 100%;
                  background-color: black;
                  opacity: ${this.opacitylayer || '0.5'};
                  border-radius: 20px;
                  z-index: 2;
              }
    
              /* Texto en orientación vertical sobre la imagen */
              p {
                position: absolute; /* Cambia a absolute para poder ajustar la posición */
                top: 20%; /* Centra el texto verticalmente */
                left: -4rem; /* Alinea el texto al borde izquierdo del contenedor */
                transform: translateY(-50%) rotate(-90deg); /* Centra el texto verticalmente y rota */
                z-index: 3; /* Colocado encima de la capa de opacidad */
                font-family: "Times New Roman", serif;
                font-size: 3rem;
                font-style: italic;
                color: #E2D34B;
                white-space: nowrap; /* Asegura que el texto no se envuelva */
            }
                /* Media query para pantallas más pequeñas (768px o menos) */
          @media (max-width: 768px) {
              #trendHypePhoto {
                  width: 16rem; /* Reduce el ancho */
                  height: 24rem; /* Ajusta proporcionalmente la altura */
              }

              p {
                  font-size: 2rem; /* Reduce el tamaño de la fuente */
                  left: -3rem; /* Ajusta la posición horizontal */
              }
          }

          </style>
          
          <!-- Estructura HTML del componente -->
          <div id="trendHypePhoto">
              <p>${this.trendtext || 'TrendHype'}</p>
              <div id="photoOpacity"></div>
          </div>
          `;
      }
  }
  
  
      
  

}  

customElements.define('imgbanner-component2', imgSideBanner);
export default imgSideBanner;
