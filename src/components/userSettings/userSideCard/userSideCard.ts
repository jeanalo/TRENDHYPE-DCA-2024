import { appState, dispatch } from '../../../store/index';
import { Actions, Screens } from '../../../types/store';
import '../../logOutButton/logOutButton';

export enum UserSideCardAttribute {
    name = 'name',
    username = 'username',
    description = 'description',
    profileImage = 'profileImage',
}

class UserSideCard extends HTMLElement {
    name?: string;
    username?: string;
    description?: string;
    profileImage?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(UserSideCardAttribute);
    }

    attributeChangedCallback(name: UserSideCardAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const dashboardLogo = this.shadowRoot?.querySelector('#dashboardLogo');
        const favoritesLink = this.shadowRoot?.querySelector('#favoritesLink');
        const settingsLink = this.shadowRoot?.querySelector('#settingsLink');
        const profileImage = this.shadowRoot?.querySelector('#profileImage');

        dashboardLogo?.addEventListener('click', () => {
            dispatch({ action: Actions.NAVIGATE, payload: Screens.DASHBOARD });
        });

        profileImage?.addEventListener('click', () => {
            dispatch({ action: Actions.NAVIGATE, payload: Screens.USERPROFILE });
        });

        favoritesLink?.addEventListener('click', () => {
            dispatch({ action: Actions.NAVIGATE, payload: Screens.MYFAVORITES });
        });

        settingsLink?.addEventListener('click', () => {
            dispatch({ action: Actions.NAVIGATE, payload: Screens.USERSETTINGS });
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }

                    .side-card {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        width: 250px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background-color: #3d3a0b;
                        color: #FCF3E4;
                        padding-top: 20px;
                        text-align: center;
                        transition: width 0.3s ease;
                    }

                    .dashboard-logo {
                        position: absolute;
                        top: 20px;
                        left: 20px;
                        width: 80px;
                        cursor: pointer;
                    }

                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-top: 80px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }

                    .name {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 10px 0 5px;
                    }

                    .username {
                        font-size: 0.8rem;
                        color: #ccc;
                        margin-bottom: 20px;
                    }

                    .description {
                        font-size: 0.8rem;
                        color: #ccc;
                        margin-bottom: 20px;
                        padding: 0 10px;
                    }

                    .menu-container {
                        width: 100%;
                        padding-left: 20px; /* Align menu to the left */
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start; /* Left align items */
                        margin-top: 30px; /* Adds space to move menu lower */
                    }

                    .menu-item {
                        cursor: pointer;
                        color: #FCF3E4;
                        font-size: 0.9rem;
                        margin: 5px 0; /* Reduced spacing */
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .logout-container {
                        margin-top: 15px;
                        width: 100%;
                        display: flex;
                        padding-left: 20px; /* Align button to the left */
                    }

                    /* Responsive styles */
                    @media (max-width: 768px) {
                        .side-card {
                            position: relative; /* Change to relative for small screens */
                            width: 100%;
                            height: auto;
                            padding-top: 10px;
                            padding-bottom: 20px;
                        }

                        .dashboard-logo {
                            width: 60px;
                            top: 10px;
                            left: 10px;
                        }

                        .profile-image {
                            width: 80px;
                            height: 80px;
                            margin-top: 20px;
                            margin-bottom: 8px;
                        }

                        .name {
                            font-size: 1.2rem;
                        }

                        .username, .description, .menu-item {
                            font-size: 0.75rem;
                        }

                        .menu-container {
                            padding-left: 10px;
                            margin-top: 10px;
                        }

                        .logout-container {
                            padding-left: 10px;
                        }
                    }

                    @media (max-width: 480px) {
                        .side-card {
                            width: 100%;
                            padding: 10px;
                        }

                        .dashboard-logo {
                            width: 50px;
                            top: 5px;
                            left: 5px;
                        }

                        .profile-image {
                            width: 60px;
                            height: 60px;
                        }

                        .name {
                            font-size: 1rem;
                        }

                        .username, .description {
                            font-size: 0.7rem;
                        }

                        .menu-item {
                            font-size: 0.8rem;
                            gap: 5px;
                        }

                        .logout-container {
                            padding-left: 5px;
                        }
                    }
                </style>
                
                <div class="side-card">
                    <img id="dashboardLogo" class="dashboard-logo" src="https://raw.githubusercontent.com/jeanalo/IMG-assets/refs/heads/main/TrendHypeLOGO.png" alt="TrendHype Logo">
                    
                    <img id="profileImage" class="profile-image" src="${this.profileImage || 'https://i.pinimg.com/564x/ec/0f/a7/ec0fa7e18612c6a5239742cfd9dd6c46.jpg'}" alt="User Profile Image">
                    
                    <p class="name">${this.name || 'Nombre no disponible'}</p>
                    <p class="username">${this.username || ''}</p>
                    <p class="description">${this.description || ''}</p>

                    <div class="menu-container">
                        <div id="settingsLink" class="menu-item">
                            <span>⚙️ Settings</span>
                        </div>
                        <div id="favoritesLink" class="menu-item">
                            <span>⭐ My Favorites</span>
                        </div>
                    </div>

                    <div class="logout-container">
                        <logout-button></logout-button>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('user-side-card', UserSideCard);
export default UserSideCard;
