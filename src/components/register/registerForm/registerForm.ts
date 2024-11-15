
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
        
        // Llama a `registerUser` con `credentials`
        const resp = await registerUser(credentials);
        
        if (resp) {
            alert("Usuario creado exitosamente. Redirigiendo al login...");
            dispatch(navigate(Screens.LOGIN));
        } else {
            alert('No se pudo crear el usuario. Por favor, intente nuevamente.');
        }
    }
    


    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            

            <style>
             

                form {
                    background-color: rgba(255,255,255, 0.3);
                    border-radius: 20px;
                    padding: 20px;
                    text-align: left;
                    flex: 1 1 50%;
                    width: 80%;
                    margin: auto;
                }

                form > p {
                    font-size: 1.6rem;
                }

                label {
                    display: block;
                    margin: 12px 0 4px 20px;
                }

                input {
                    width: calc(100% - 20px);
                    border-radius: 20px;
                    border: none;
                    padding: 12px 0 12px 20px;
                    background-color: rgba(200,200,200, 0.3);
                    color: white;
                }

                input::placeholder {
                    color: white;
                }

                button {
                    width: 100%;
                    background-color: #E2D34B;
                    color: #990000;
                    border: none;
                    padding: 12px;
                    font-weight: bold;
                    margin-top: 24px;
                    border-radius: 20px;
                    cursor: pointer;
                }
            </style>

             
             

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