import { appState, addObserver, dispatch } from "../../store/index";
import { Screens } from "../../types/store";
import LogoutButton from '../logOutButton/logOutButton';
import { navigate } from "../../store/actions"; // Asegúrate de importar la función `navigate`

class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();

        // Agregar eventos de clic para navegación
        const followingTab = this.shadowRoot?.querySelector('#following');
        if (followingTab) {
            followingTab.addEventListener('click', () => {
                // Despachar la acción para navegar a la pantalla de Following
                dispatch(navigate(Screens.DASHBOARDFOllOWING));
            });
        }

        const forYouTab = this.shadowRoot?.querySelector('#for-you');
        if (forYouTab) {
            forYouTab.addEventListener('click', () => {
                // Despachar la acción para navegar a la pantalla de For You
                dispatch(navigate(Screens.DASHBOARD));
            });
        }
    }

    render() {
        const actualScreen = appState.screen;
        console.log(actualScreen);
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/Header/header.css">
            <header class="header-component">
                <div class="header-wrapper">
                    <img src="https://github.com/jeanalo/IMG-assets/blob/main/TrendHypeLOGO.png?raw=true" alt='TrendHypeLogo'>
                    <nav>
                        <ul>
                            <li class="${actualScreen === Screens.DASHBOARD ? 'active' : ''}" id="for-you">For you</li>
                            <li class="${actualScreen === Screens.DASHBOARDFOllOWING ? 'active' : ''}" id="following">Following</li>
                        </ul>
                     </nav>
                </div>
            </header>
            `;
            // Instanciar el componente LogoutButton y añadirlo al DOM
            const logoutButton = new LogoutButton();
            this.shadowRoot.querySelector('.header-component')?.appendChild(logoutButton);
        }
    }
}

customElements.define('header-component', Header);
export default Header;
