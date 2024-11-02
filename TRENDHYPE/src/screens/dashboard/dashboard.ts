import LogoutButton from '../../components/logOutButton/logOutButton';

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        console.log('Dashboard screen loaded');
    }

    render() {
        if (this.shadowRoot) {
            // Limpiar contenido existente y definir los estilos y estructura
            this.shadowRoot.innerHTML = `
               
                
                <div id="dashboardWrapper">
                    <div class="content">
                        <h1>Welcome to the Dashboard</h1>
                    
                    </div>
                </div>
            `;

            // Instanciar el componente LogoutButton y añadirlo al DOM
            const logoutButton = new LogoutButton();
            this.shadowRoot.querySelector('.content')?.appendChild(logoutButton);
        }
    }
}

customElements.define('app-dashboard', Dashboard);
export default Dashboard;
