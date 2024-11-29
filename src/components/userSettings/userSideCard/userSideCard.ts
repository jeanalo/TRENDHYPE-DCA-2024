import { appState, dispatch } from "../../../store";
import { Actions, Screens } from "../../../types/store";

export enum UserSideCardAttribute {
    name = 'name',
    username = 'username',
    description = 'description',
    profileimage = 'profileimage',
    userid = 'userid',
}

class UserSideCard extends HTMLElement {
    name?: string;
    username?: string;
    description?: string;
    profileimage?: string;
    userid?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(UserSideCardAttribute);
    }

    attributeChangedCallback(propName: UserSideCardAttribute, oldValue: string | undefined, newValue: string | undefined) {
        if (newValue !== oldValue) {
            this[propName] = newValue;

            if (propName === UserSideCardAttribute.userid) {
                console.log(newValue);

            }

        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        if (!this.shadowRoot) return;
        console.log(this.profileimage);
        
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

                    color: #FCF3E4;
                    padding-top: 20px;
                    text-align: center;
                    transition: width 0.3s ease;
                    z-index: 1000;
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
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-top: 30px;
                }

                .menu-item {
                    cursor: pointer;
                    color: #FCF3E4;
                    font-size: 0.9rem;
                    margin: 5px 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .logout-container {
                    margin-top: 15px;
                    width: 100%;
                    display: flex;
                    padding-left: 20px;
                }

                /* Responsividad para pantallas pequeñas */
                @media (max-width: 768px) {
                    .side-card {
                        width: 100%; /* Ocupa todo el ancho */
                        height: auto; /* Ajusta la altura */
                        position: relative; /* No fija la posición */
                        padding: 10px 20px;
                    }

                    .dashboard-logo {
                        top: 10px;
                        left: 10px;
                        width: 60px;
                    }

                    .profile-image {
                        width: 80px;
                        height: 80px;
                        margin-top: 40px;
                    }

                    .name {
                        font-size: 1.2rem;
                    }

                    .username {
                        font-size: 0.9rem;
                    }

                    .description {
                        font-size: 0.8rem;
                    }

                    .menu-container {
                        padding-left: 0;
                        align-items: center;
                    }

                    .menu-item {
                        font-size: 0.9rem;
                    }

                    .logout-container {
                        justify-content: center;
                        padding-left: 0;
                    }
                }

                /* Ajustes para pantallas muy pequeñas (<480px) */
                @media (max-width: 480px) {
                    .side-card {
                        padding: 5px;
                    }

                    .profile-image {
                        width: 70px;
                        height: 70px;
                        margin-top: 20px;
                    }

                    .name {
                        font-size: 1rem;
                    }

                    .username {
                        font-size: 0.8rem;
                    }

                    .menu-item {
                        font-size: 0.8rem;
                    }
                }
            </style>
            
            <div class="side-card">
                <img id="dashboardLogo" class="dashboard-logo" src="https://raw.githubusercontent.com/jeanalo/IMG-assets/refs/heads/main/TrendHypeLOGO.png" alt="TrendHype Logo">
               <img 
            id="profileImage" 
            class="profile-image" 
             src="${this.profileimage === "" ? 'https://i.pinimg.com/564x/ec/0f/a7/ec0fa7e18612c6a5239742cfd9dd6c46.jpg' : this.profileimage }" alt="User Profile Image"/>
            <p class="name">${this.name }</p>
            <p class="username">@${this.username }</p>
            <p class="description">${this.description }</p>
                <div class="menu-container">
                    <div id="settingsLink" class="${appState.user !== this.userid ? 'hidden' : ''}">
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
}

customElements.define('user-side-card', UserSideCard);
export default UserSideCard;
