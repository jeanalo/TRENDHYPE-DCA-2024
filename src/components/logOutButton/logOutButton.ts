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
        localStorage.clear();  // Limpia el almacenamiento local
        sessionStorage.clear(); // Limpia el almacenamiento de sesión

        dispatch(setUserCredentials('')); // Limpia las credenciales de usuario
        dispatch(navigate(Screens.LOGIN)); // Navega a la pantalla de registro

        location.reload(); 
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
    .logout-button {
        background-color: transparent; /* Fondo transparente similar a "For You" y "Following" */
        color: #E2D54B; /* Color de texto similar */
        padding: 5px 15px; /* Reduce el padding para un tamaño más compacto */
        border: 1px solid #E2D54B; /* Borde similar al estilo del header */
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.6rem; /* Tamaño de fuente más pequeño */
        margin: 5px;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* Cambia el fondo y el color del texto al pasar el mouse */
    .logout-button:hover {
        background-color: #E2D54B; /* Fondo similar al hover del header */
        color: #232106; /* Cambia el color del texto para un mejor contraste */
    }
</style>
                <button class="logout-button" id="logout-button">Log out</button>
            `;

            const button = this.shadowRoot.querySelector('#logout-button');
            button?.addEventListener('click', () => this.handleLogout());
        }
    }

    handleLogout() {
        this.logOutUser(); 
    }
}

customElements.define('logout-button', LogoutButton);
export default LogoutButton;