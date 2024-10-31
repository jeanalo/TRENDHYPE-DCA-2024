// src/index.ts
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/login/login'



// import './screens/REGISTER/REGISTER';
// import './screens/LOGIN/LOGIN';
// import './screens/DASHBOARD/DASHBOARD';

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
        console.log(appState);
        console.log('hello');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {
                case Screens.REGISTER:
                    const register = document.createElement('app-register');
                    this.shadowRoot.appendChild(register);
                    break;

                case Screens.LOGIN:
                    const login = document.createElement('app-login');
                    this.shadowRoot.appendChild(login);
                    break;

                case Screens.DASHBOARD:
                    const dashboard = document.createElement('app-dashboard');
                    this.shadowRoot.appendChild(dashboard);
                    break;

                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer);
