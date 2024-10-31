import './login.css';
import imgBanner, { ImgBannerAttribute } from '../../components/Login/imgField/imgField';
import loginForm, { LoginAttribute } from '../../components/Login/loginField/loginField';
import registerCard, { RegisterFieldAttribute } from '../../components/Login/registerField/registerField';


class Login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        console.log('Login screen loaded');
    }


    render() {
        if (this.shadowRoot) {
            // Limpiar contenido existente
            this.shadowRoot.innerHTML = `
                <style>
                /* Fondo general */
html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: Calibri, Arial, sans-serif;
    color: white;
    overflow: hidden;
    text-align: center;
}

/* Fondo difuminado */
#background {
    position: absolute;
    background-color: #4be2bf;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('https://github.com/jeanalo/IMG-assets/blob/main/image%2057.png?raw=true');
    background-size: cover; 
    filter: blur(10px);
    -webkit-filter: blur(10px);
    backdrop-filter: blur(10px);
    transform: scale(1.03);
    z-index: -1;
}

/* Wrapper principal */
#loginWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Contenedor general de los componentes */
#login {
    width: 100%;
    max-width: 500px;
    max-height: 700px;	
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: center;
}

/* Estilo del título principal */
#login h1 {
    grid-column: span 2;
    font-family: "Times New Roman", serif;
    font-size: 4rem;
    font-style: italic;
    color: #4be2bf;
    text-align: center;
}

                </style>
                <div id="background"></div>
                <div id="loginWrapper">
                    <section id="login">
                        
                    </section>
                </div>
            `;

            // Instanciar y configurar el componente imgBanner
            const title = new imgBanner();
            title.setAttribute(ImgBannerAttribute.img, 'https://github.com/jeanalo/IMG-assets/blob/main/image%2047.png?raw=true');
            title.setAttribute(ImgBannerAttribute.trendtext, 'TrendHype');
            title.setAttribute(ImgBannerAttribute.opacitylayer, '0.5');
            this.shadowRoot.getElementById('login')?.appendChild(title);
            

            // Instanciar y configurar el componente loginForm
            const loginFormComponent = new loginForm();
            loginFormComponent.setAttribute(LoginAttribute.logintittle, 'Login');
            loginFormComponent.setAttribute(LoginAttribute.emailinput, '');
            loginFormComponent.setAttribute(LoginAttribute.passwordinput, '');
            loginFormComponent.setAttribute(LoginAttribute.loginbutton, 'Log In');
            this.shadowRoot.querySelector('#login')?.appendChild(loginFormComponent);

            // Instanciar y configurar el componente registerCard
            const registerCardComponent = new registerCard();
            registerCardComponent.setAttribute(RegisterFieldAttribute.newintext, 'New here?');
            registerCardComponent.setAttribute(RegisterFieldAttribute.jointext, 'Join now');
            registerCardComponent.setAttribute(RegisterFieldAttribute.registerbutton, 'Register');
            this.shadowRoot.querySelector('#login')?.appendChild(registerCardComponent);
        }
    }
}

customElements.define('app-login', Login);
export default Login;
