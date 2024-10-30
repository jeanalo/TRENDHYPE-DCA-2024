
export enum RegisterAttribute {
    'utittle' = 'utittle',
    'firstname' = 'firstname',
    'lastname' = 'lastname',
    'email' = 'email',
    'password' = 'password',
    'singupbutton' = 'singupbutton'
    
  }
  
  class registerform extends HTMLElement {
    utittle?: string;
    firstname?: string;
    lastname?:string;
    email?: string;
    password?: string;
    singupbutton?: string
    
    constructor(){
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
  }
  
    static get observedAttributes() {
        return Object.values(RegisterAttribute);
    }
  
    attributeChangedCallback(propName: RegisterAttribute, oldValue: string | undefined, newValue: string | undefined) {
          this[propName] = newValue; // icon, img, input
          this.render();
      }
        
     /* <style>${styles}</style> */
    render() {
        if (this.shadowRoot) {
          
            this.shadowRoot.innerHTML = `
               
                <link rel="stylesheet" href="./src/components/loginField/loginField.css">
                <form>
                      <p>Sign up </p>

                      <label for="name"> First Name </label>
                      <input id="firstname" type="name" placeholder="First name " ${this.firstname}>

                      <label for="lastname"> Last Name </label>
                      <input id="lastname" type="name" placeholder="Last name" ${this.lastname}>

                      <label for="email">e-mail address</label>
                      <input id="email" type="email" placeholder="e-mail address" ${this.email}>
  
                      <label for="password">Password</label>
                      <input id="password" type="password" placeholder="password"${this.password}>
  
                      <button>Log in${this.singupbutton}</button>
  
                  </form>
            `;
        }
    }
  
    
  }
  
  customElements.define('register-component', registerform);
  export default registerform;