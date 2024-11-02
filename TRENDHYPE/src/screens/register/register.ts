import imgSideBanner, { ImgSideAttribute } from '../../components/register/imgSide/imgSide';
import styles from './register.css';
import  '../../components/register/registerForm/registerForm';

class RegisterScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../screens/register/register.css">
                <div id="background"></div>
                <div id="loginWrapper">
                <div id="banner-container">
                <img-banner-component></img-banner-component>
                 <app-register></app-register>
        </div>
    </div>
            `;

            // Agregar el banner decorativo
            const bannerContainer = this.shadowRoot.getElementById('banner-container');
            if (bannerContainer) {
                const title = new imgSideBanner();
                title.setAttribute(ImgSideAttribute.img, ''); // Define la ruta de imagen si es necesario
                title.setAttribute(ImgSideAttribute.trendtext, 'Register'); // Texto del banner
                title.setAttribute(ImgSideAttribute.opacitylayer, '0.5'); // Ajuste de opacidad
                bannerContainer.appendChild(title);
            }
        }
    }
}

customElements.define('register-screen', RegisterScreen);
export default RegisterScreen;
