// registerField.ts
import './registerField.css';

export enum RegisterFieldAttribute {
    newintext = 'newintext',
    jointext = 'jointext',
    registerbutton = 'registerbutton'
}

class registerCard extends HTMLElement {
    newintext?: string;
    jointext?: string;
    registerbutton?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(RegisterFieldAttribute);
    }

    attributeChangedCallback(name: RegisterFieldAttribute, oldValue: string | null, newValue: string | null) {
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
   
                #newIn {
    background-color: #333333;
    border-radius: 20px;
    padding: 16px;
    text-align: left;
    width: 100%;
    max-width: 360px; /* Igual al ancho del formulario */
    margin: -200px auto 20px; /* Ajusta el valor negativo para subir el register field */
    height: 150px; /* Ajusta el valor para que coincida con el final del formulario */
    box-sizing: border-box;
}

/* Ajustes opcionales para el contenido dentro del #newIn */
#newIn p {
    margin: 0;
    font-size: 1.2rem;
    color: white;
}

#newIn div {
    text-align: right;
}

#newIn div a {
    display: inline-block;
    padding: 8px 16px;
    color: white;
    text-decoration: none;
    border: 1px solid #E2D34B;
    border-radius: 16px;
    cursor: pointer;
}


               </style>
                 <div id="newIn">
                    <p>${this.newintext || 'New in'}</p>
                    <p>${this.jointext || 'Join the community now'}</p>
                    <div>
                        <a href="register.html">${this.registerbutton || 'Register'}</a>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('register-card-component', registerCard);
export default registerCard;
