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
  }
  
    static get observedAttributes() {
        return Object.values(ImgSideAttribute
        
        );
    }
  
    attributeChangedCallback(propName: ImgSideAttribute
    , oldValue: string | undefined, newValue: string | undefined) {
          this[propName] = newValue; // icon, img, input
          this.render();
      }
        
     /* <style>${styles}</style> */
     render() {
      if (this.shadowRoot) {
          this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="./src/components/imgSide/imgSide.css">
              <img id="trendHypePhoto" src="${this.img}" alt="">
              <p>TrendHype ${this.trendtext}</p>
              <div id="photoOpacity" style="opacity:${this.opacitylayer};"></div>
          `;
      }
  }
  }  
  
  customElements.define('img-banner-component', imgSideBanner
  );
  export default imgSideBanner;