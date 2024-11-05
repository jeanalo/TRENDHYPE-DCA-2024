import { dispatch } from '../../../store';
import { navigate, setUser } from '../../../store/actions';
import { Actions, Screens } from '../../../types/store';
import { registerUser, getUserData } from '../../../utils/firebase';

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
        const uid = await registerUser(credentials);
        
        if (uid) {
            const userData = await getUserData(uid);

            if (userData) {
                dispatch({
                    action: Actions.SETUSER,
                    payload: userData
                });
                
                dispatch(navigate(Screens.USERSETTINGS));
            }
        } else {
            alert('Error al registrar el usuario');
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
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

            this.shadowRoot.querySelector('#firstname')?.addEventListener('input', this.changeFirstName.bind(this));
            this.shadowRoot.querySelector('#lastname')?.addEventListener('input', this.changeLastName.bind(this));
            this.shadowRoot.querySelector('#email')?.addEventListener('input', this.changeEmail.bind(this));
            this.shadowRoot.querySelector('#password')?.addEventListener('input', this.changePassword.bind(this));
            this.shadowRoot.querySelector('form')?.addEventListener('submit', this.submitForm.bind(this));
        }
    }
}

customElements.define('app-register', Register);
export default Register;
