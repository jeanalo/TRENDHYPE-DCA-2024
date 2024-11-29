// src/index.ts
import { addObserver, appState } from './store/index';
import { Screens } from './types/store';
import './screens/login/login'
import './screens/register/register';
import './screens/dashboardForYou/dashboardForYou';
import './screens/dashboardFollowing/dashboardFollowing';
import './screens/questionoftheday/questionoftheday';
import './screens/userProfile/userProfile';
import './screens/friendProfile/friendProfile';
import './screens/createPost/createPost';
import './screens/userSettings/userSettings'
import './screens/myFavorites/myFavorites';


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
        console.log(appState.screen);
        console.log(appState);
        console.log('hello');
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {
                case Screens.REGISTER:
                    const register = document.createElement('register-screen');
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
                    const dashboardfollowing = document.createElement('app-dashboardfollowing');;
                    this.shadowRoot.appendChild(dashboardfollowing);
                    break;    

                case Screens.QUESTIONOFTHEDAY:
                    const questionoftheday = document.createElement('app-questionoftheday');
                    this.shadowRoot.appendChild(questionoftheday);
                    break;

                case Screens.USERPROFILE:
                    const userprofile = document.createElement('user-feed-screen');
                    userprofile.setAttribute('userid', appState.user)
                    this.shadowRoot.appendChild(userprofile);
                    break;

                case Screens.FRIENDPROFILE:
                    const friendprofile = document.createElement('friend-feed-screen');
                    this.shadowRoot.appendChild(friendprofile);
                    break;

                case Screens.MYFAVORITES:
                    const myfavorites = document.createElement('my-favorites-screen');
                    myfavorites.setAttribute('userid', appState.user)
                    this.shadowRoot.appendChild(myfavorites);
                    break;
                        
                case Screens.CREATEPOST:
                    const createpost = document.createElement('create-post-screen');
                    this.shadowRoot.appendChild(createpost);
                    break;

                case Screens.USERSETTINGS:
                    const usersettings = document.createElement('user-settings-screen');
                    usersettings.setAttribute('userid', appState.user)
                    this.shadowRoot.appendChild(usersettings);
                    break;



                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer);
