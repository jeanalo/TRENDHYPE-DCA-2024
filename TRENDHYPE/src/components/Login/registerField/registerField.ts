
export enum RegisterFieldAttribute {
    'newintext' = 'newintext',
    'jointext' = 'jointext',
    'registerbutton' = 'registerbutton'
    
  }
  
  class registerCard extends HTMLElement {
    newintext?: string;
    jointext?: string;
    registerbutton?: string;
    
    
    constructor(){
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
  }
  
    static get observedAttributes() {
        return Object.values(RegisterFieldAttribute);
    }
  
    attributeChangedCallback(propName: RegisterFieldAttribute, oldValue: string | undefined, newValue: string | undefined) {
          this[propName] = newValue; // icon, img, input
          this.render();
      }
        
     /* <style>${styles}</style> */
     render() {
      if (this.shadowRoot) {
          this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="./src/components/loginField/loginField.css">
              <div id="newIn">
                  <p>New in ${this.newintext}</p>
                  <p>Join the community now ${this.jointext}</p>
                  <div>
                      <a href="register.html">${this.registerbutton}</a>
                  </div>
              </div>
          `;
      }
  }
  }  
  
  customElements.define('register-card-component', registerCard);
  export default registerCard;