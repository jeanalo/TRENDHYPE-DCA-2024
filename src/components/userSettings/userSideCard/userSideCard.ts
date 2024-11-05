import { appState, addObserver } from '../../../store/index';

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
        addObserver(this); // Registra UserSideCard como observador de appState
    }

    connectedCallback() {
        this.updateAttributes();
        this.render();
    }

    updateAttributes() {
        const user = appState.user;
        if (user) {
            this.name = user.firstName;
            this.username = user.username;
            this.description = user.description;
            this.profileImage = user.profileImage;
        }
    }

    render() {
        this.updateAttributes(); // Actualiza atributos antes de renderizar
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .side-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 20px;
                        background-color: #3d3a0b;
                        color: #fff;
                        border-radius: 10px;
                        width: 100%;
                        box-sizing: border-box;
                        text-align: center;
                    }

                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background-image: url('${this.profileImage || ''}');
                        background-size: cover;
                        background-position: center;
                        margin-bottom: 10px;
                    }

                    .name {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 10px 0 5px;
                    }

                    .username {
                        font-size: 1.2rem;
                        color: #9A5311;
                        margin: 5px 0;
                    }

                    .description {
                        font-size: 1rem;
                        color: #ccc;
                        margin-bottom: 20px;
                    }
                </style>
                
                <div class="side-card">
                    <div class="profile-image"></div>
                    <p class="name">${this.name || ''}</p>
                    <p class="username">${this.username || ''}</p>
                    <p class="description">${this.description || ''}</p>
                </div>
            `;
        }
    }
}

customElements.define('user-side-card', UserSideCard);
export default UserSideCard;
