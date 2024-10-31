import './loginField.css';
import { dispatch } from '../../../store/index';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';
import { loginUser } from '../../../utils/firebase';

const credentials = {
    email: '',
    password: '',
};

export enum LoginAttribute {
    logintittle = 'logintittle',
    emailinput = 'emailinput',
    passwordinput = 'passwordinput',
    loginbutton = 'loginbutton'
}

class loginForm extends HTMLElement {
    logintittle?: string;
    emailinput?: string;
    passwordinput?: string;
    loginbutton?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(LoginAttribute);
    }

    attributeChangedCallback(name: LoginAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    attachEvents() {
        if (this.shadowRoot) {
            // Capturar eventos para actualizar el email y password
            const emailInput = this.shadowRoot.querySelector('#email');
            const passwordInput = this.shadowRoot.querySelector('#password');
            const form = this.shadowRoot.querySelector('form');

            emailInput?.addEventListener('input', (e: Event) => {
                const target = e.target as HTMLInputElement;
                credentials.email = target.value;
            });

            passwordInput?.addEventListener('input', (e: Event) => {
                const target = e.target as HTMLInputElement;
                credentials.password = target.value;
            });

            form?.addEventListener('submit', async (e: Event) => {
                e.preventDefault(); // Evitar el envío estándar del formulario
                await this.submitForm(); // Ejecutar la función de envío personalizado
            });
        }
    }

    async submitForm() {
        const resp = await loginUser(credentials.email, credentials.password);
        if (resp) {
            dispatch(navigate(Screens.DASHBOARD));
        } else {
            alert('Incorrect credentials or user does not exist');
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                form {
                    background-color: rgba(255, 255, 255, 0.4);
                    border-radius: 16px;
                    padding: 32px;
                    text-align: left;
                    width: 100%;
                    max-width: 360px; /* Igual que #trendHypePhoto para tener la misma anchura */
                    margin: 100px auto 20px; /* Ajuste de margen superior para alinear con imgfield.ts */
                    aspect-ratio: 3 / 6; /* Ajuste de aspecto para mantener la misma altura que imgfield.ts */
                    box-sizing: border-box;
                }

                form p {
                    font-size: 2rem;
                    margin: 0;
                    color: #333;
                }

                form label {
                    display: block;
                    margin: 16px 0 4px 32px;
                    color: white;
                }

                form input {
                    width: calc(100% - 32px);
                    border-radius: 32px;
                    border: none;
                    padding: 16px 0 16px 32px;
                    background-color: rgba(200, 200, 200, 0.4);
                    color: white;
                }

                form input::placeholder {
                    color: white;
                }

                form button {
                    width: 100%;
                    background-color: #E2D34B;
                    color: #990000;
                    border: none;
                    padding: 16px;
                    font-weight: bold;
                    margin-top: 32px;
                    border-radius: 32px;
                    cursor: pointer;
                }
            </style>	
               
            <form>
                <p>${this.logintittle || 'Log in'}</p>
                <label for="email">e-mail address</label>
                <input id="email" type="email" placeholder="e-mail address" value="${this.emailinput || ''}">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="password" value="${this.passwordinput || ''}">
                <button type="submit">${this.loginbutton || 'Log In'}</button>
            </form>
            `;
        }
    }
}

customElements.define('login-component', loginForm);
export default loginForm;
