import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/login/login';
import './screens/register/register';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        console.log("Current appState:", appState);
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ''; // Limpiar contenido previo

            switch (appState.screen) {
                case Screens.REGISTER:
                    console.log("Rendering app-register");
                    const register = document.createElement('app-register');
                    this.shadowRoot.appendChild(register);
                    break;

                case Screens.LOGIN:
                    console.log("Rendering app-login");
                    const login = document.createElement('app-login');
                    this.shadowRoot.appendChild(login);
                    break;

                case Screens.DASHBOARD:
                    console.log("Rendering app-dashboard");
                    const dashboard = document.createElement('app-dashboard');
                    this.shadowRoot.appendChild(dashboard);
                    break;

                default:
                    console.log("No valid screen selected");
                    break;
            }
        }
    console.log('Pantalla actual', appState.screen);
    }
}

customElements.define('app-container', AppContainer);
