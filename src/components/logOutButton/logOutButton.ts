import { appState, dispatch } from "../../store";
import { navigate, setUserCredentials } from "../../store/actions";
import { Screens } from "../../types/store";

class LogoutButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    logOutUser() {
        // Limpia el almacenamiento local y de sesión
        localStorage.clear();  
        sessionStorage.clear();

        // Limpia las credenciales de usuario y navega a la pantalla de login
        dispatch(setUserCredentials('')); 
        dispatch(navigate(Screens.LOGIN)); 

        // Recarga la página
        location.reload(); 
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .logout-button {
                        padding: 10px 20px;
                        font-size:0.8rem;
                        color: #FCF3E4;
                        background-color: #E2D54B;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    
                    .logout-button:hover {
                        background-color: #5a4c24;
                    }
                </style>
                
                <button class="logout-button" id="logout-button">Log out</button>
            `;

            const button = this.shadowRoot.querySelector('#logout-button');
            button?.addEventListener('click', () => this.logOutUser());
        }
    }
}

customElements.define('logout-button', LogoutButton);
export default LogoutButton;
