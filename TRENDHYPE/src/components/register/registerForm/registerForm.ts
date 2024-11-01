
import styles from './registerForm.css';
import { dispatch } from '../../../store/index';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';
import { registerUser } from '../../../utils/firebase';


const credentials = {
    email: '',
    password: '',
    firstname: '',
    lastname: ''
};

class Register extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeEmail(e: Event) {
        const target = e.target as HTMLInputElement;
        credentials.email = target.value;
    }

    changePassword(e: Event) {
        const target = e.target as HTMLInputElement;
        credentials.password = target.value;
    }

    changeFirstName(e: Event) {
        const target = e.target as HTMLInputElement;
        credentials.firstname = target.value;
    }

    changeLastName(e: Event) {
        const target = e.target as HTMLInputElement;
        credentials.lastname = target.value;
    }

    async submitForm(e: Event) {
        e.preventDefault();
        const resp = await registerUser(credentials);
        resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('No se pudo crear el usuario');
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
             <link rel="stylesheet" href="../src/components/register/registerForm.ts">

                <form>
                    <p>Sign up</p>

                    <label for="firstname">First Name</label>
                    <input id="firstname" type="text" placeholder="First name">

                    <label for="lastname">Last Name</label>
                    <input id="lastname" type="text" placeholder="Last name">

                    <label for="email">E-mail address</label>
                    <input id="email" type="email" placeholder="E-mail address">

                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Password">

                    <button type="submit">Register</button>
                </form>
            `;

            // Añadir listeners a cada campo de entrada
            this.shadowRoot.querySelector('#firstname')?.addEventListener('input', this.changeFirstName.bind(this));
            this.shadowRoot.querySelector('#lastname')?.addEventListener('input', this.changeLastName.bind(this));
            this.shadowRoot.querySelector('#email')?.addEventListener('input', this.changeEmail.bind(this));
            this.shadowRoot.querySelector('#password')?.addEventListener('input', this.changePassword.bind(this));

            // Listener para el botón de envío
            const form = this.shadowRoot.querySelector('form');
            form?.addEventListener('submit', this.submitForm.bind(this));
        }
    }
}

customElements.define('app-register', Register);
export default Register;
