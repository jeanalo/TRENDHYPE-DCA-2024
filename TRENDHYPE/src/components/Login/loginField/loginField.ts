
export enum LoginAttribute {
  'logintittle' = 'logintittle',
  'emailinput' = 'emailinput',
  'passwordinput' = 'passwordinput',
  'resetpassword' = 'resetpassword',
  'loginbutton' = 'loginbutton'
  
}

class loginForm extends HTMLElement {
  logintittle?: string;
  emailinput?: string;
  passwordinput?: string;
  resetpassword?: string;
  loginbutton?: string
  
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
}

  static get observedAttributes() {
      return Object.values(LoginAttribute);
  }

  attributeChangedCallback(propName: LoginAttribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue; // icon, img, input
        this.render();
    }
      
   /* <style>${styles}</style> */
  render() {
      if (this.shadowRoot) {
        
          this.shadowRoot.innerHTML = `
             
              <link rel="stylesheet" href="./src/components/loginField/loginField.css">
              <form>
                    <p>Log in</p>

                    <label for="email">e-mail address</label>
                    <input id="email" type="email" placeholder="e-mail address" ${this.emailinput}>

                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="password"${this.passwordinput}>

                    <button>Log in${this.loginbutton}</button>

                </form>
          `;
      }
  }

  
}

customElements.define('login-component', loginForm);
export default loginForm;