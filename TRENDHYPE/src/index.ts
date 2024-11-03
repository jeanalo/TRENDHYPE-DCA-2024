// src/index.ts
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/login/login'
import './screens/register/register';
import './screens/dashboardForYou/dashboardForYou';

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
                    const dashboard = document.createElement('app-dashboardforyou');
                    this.shadowRoot.appendChild(dashboard);
                    break;

                case Screens.DASHBOARDFOllOWING:
                    const dashboardfollowing = document.createElement('app-dashboardfolllowing');;
                    this.shadowRoot.appendChild(dashboardfollowing);
                    break;    

                case Screens.QUESTIONOFTHEDAY:
                    const questionoftheday = document.createElement('app-questionoftheday');
                    this.shadowRoot.appendChild(questionoftheday);
                    break;

                case Screens.USERRPROFILE:
                    const userprofile = document.createElement('app-userprofile');
                    this.shadowRoot.appendChild(userprofile);
                    break;

                case Screens.MYFAVORITES:
                    const myfavorites = document.createElement('app-myfavorites');
                    this.shadowRoot.appendChild(myfavorites);
                    break;
                        
                case Screens.CREATEPOST:
                    const createpost = document.createElement('app-createpost');
                    this.shadowRoot.appendChild(createpost);
                    break;

                case Screens.USERSETTINGS:
                    const usersettings = document.createElement('app-usersettings');
                    this.shadowRoot.appendChild(usersettings);
                    break;



                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer);
