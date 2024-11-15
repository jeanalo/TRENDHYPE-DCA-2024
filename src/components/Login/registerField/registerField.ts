// registerField.ts
import './registerField.css';
import { dispatch } from '../../../store/index';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';

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
        this.attachEvents(); // Agrega los eventos después de renderizar
    }

    attachEvents() {
        const button = this.shadowRoot?.querySelector('#registerButton');
        button?.addEventListener('click', () => {
            // Despacha la acción de navegación a la pantalla de DASHBOARD
            dispatch(navigate(Screens.REGISTER));
        });
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
                       max-width: 360px;
                       margin: -200px auto 20px;
                       height: 150px;
                       box-sizing: border-box;
                   }

                   #newIn p {
                       margin: 0;
                       font-size: 1.2rem;
                       color: white;
                   }

                   #newIn div {
                       text-align: right;
                   }

                   #registerButton {
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
                        <span id="registerButton">${this.registerbutton || 'Register'}</span>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('register-card-component', registerCard);
export default registerCard;
