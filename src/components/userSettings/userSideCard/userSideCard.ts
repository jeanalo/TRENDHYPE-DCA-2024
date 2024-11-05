import { appState, dispatch } from '../../../store/index';
import { Actions } from '../../../types/store';
import { updateUserData } from '../../../utils/firebase';


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
    }

    render() {
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

                    .stats {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                        font-size: 1rem;
                    }

                    .stat {
                        text-align: center;
                    }

                    .stat-value {
                        font-weight: bold;
                        font-size: 1.2rem;
                    }
                </style>
                
                <div class="side-card">
                    <div class="profile-image"></div>
                    <p class="name">${this.name || ''}</p>
                    <p class="username">${this.username || ''}</p>
                    <p class="description">${this.description || ''}</p>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('user-side-card', UserSideCard);
export default UserSideCard;
