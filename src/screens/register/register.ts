import imgSideBanner, { ImgSideAttribute } from '../../components/register/imgSide/imgSide';
import '../../components/register/registerForm/registerForm';

class RegisterScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        console.log('REGISTER screen loaded');
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                html, body {
                    height: 100%;
                    width: 100%;
                    font-family: Calibri, Arial, sans-serif;
                    color: white;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                }
                #loginWrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                }

                #background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                    background: url('https://github.com/jeanalo/IMG-assets/blob/main/image%2053.png?raw=true');
                    background-size: cover;
                    filter: blur(10px);
                    -webkit-filter: blur(10px);
                    backdrop-filter: blur(10px);
                    transform: scale(1.03);
                    z-index: -1;
                }
            </style>
            <div id="background"></div>
            <div id="loginWrapper">
            
            </div>
            `;

            // Agregar el banner decorativo
            const title = new imgSideBanner();

                title.setAttribute(ImgSideAttribute.img, 'https://github.com/jeanalo/IMG-assets/blob/main/image%2054.png?raw=true'); // Define la ruta de imagen si es necesario
                title.setAttribute(ImgSideAttribute.trendtext, 'TrendHype'); // Texto del banner
                title.setAttribute(ImgSideAttribute.opacitylayer, '0.5'); // Ajuste de opacidad
                this.shadowRoot.getElementById('loginWrapper')?.appendChild(title);

            const registerForm = document.createElement('app-register');
            this.shadowRoot.getElementById('loginWrapper')?.appendChild(registerForm);

            
        }
    }
}

customElements.define('register-screen', RegisterScreen);
export default RegisterScreen;
            // <app-register></app-register>
            // <imgbanner-component2></imgbanner-component2>