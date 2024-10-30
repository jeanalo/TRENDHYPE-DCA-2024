import imgBanner, { ImgSideAttribute } from '../../components/imgSide/imgSide';
import registerform, { RegisterAttribute } from '../../components/register/registerForm';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

const credentials = {
    email: '',
    password: '',
    firstname: '',
    lastname: ''

};

class register extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeEmail(e: any) {
        credentials.email = e.target.value;
    }

    changePassword(e: any) {
        credentials.password = e.target.value;
    }

    changeFirstName(e: any) {
		credentials.firstname = e.target.value;
	}

    changeLastName(e: any) {
		credentials.lastname = e.target.value;
	}

    async submitForm() {
        const resp = await registerUser(credentials);
        resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('No se pudo crear el usuario');
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ''; // Clear existing content

            // Crear e instanciar el componente imgBanner
            const title = new imgBanner();
            title.setAttribute(ImgSideAttribute.img, 'path/to/image.jpg');
            title.setAttribute(ImgSideAttribute.trendtext, 'Welcome to TrendHype');
            title.setAttribute(ImgSideAttribute.opacitylayer, '0.5');
            this.shadowRoot.appendChild(title);

            // Crear e instanciar el componente loginForm
            const registerForComponent = new registerform();
            registerForComponent.setAttribute(RegisterAttribute.utittle, 'Sing Up');
            registerForComponent.setAttribute(RegisterAttribute.email, '');
            registerForComponent.setAttribute(RegisterAttribute.password, '');
            registerForComponent.setAttribute(RegisterAttribute.firstname, '');
            registerForComponent.setAttribute(RegisterAttribute.lastname, '');
            registerForComponent.setAttribute(RegisterAttribute.singupbutton, 'Register');
            this.shadowRoot.appendChild(registerForComponent);

         
        }
    }
}

customElements.define('app-register', register);
export default register;