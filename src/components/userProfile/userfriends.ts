import { dispatch } from "../../store";
import { navigate, setFriend } from "../../store/actions";
import { Screens } from "../../types/store";

export enum FriendCardAttribute {
    image = 'image',
    username = 'username',
    userid = 'userid'
}

class FriendCard extends HTMLElement {
    image?: string;
    username?: string;
    userid ? : string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(FriendCardAttribute);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners()
    }

    addEventListeners() {
        const friendCard = this.shadowRoot?.querySelector('.friend-card');
    
        friendCard?.addEventListener('click', () => {
            if (!this.userid) {
                console.error('El ID del usuario no está disponible.');
                return;
            }
            console.log('Friend card with id:', this.userid, 'clicked');
            
            // Almacenar el userid en el estado global antes de navegar
            dispatch(setFriend(this.userid));
    
            dispatch(navigate(Screens.FRIENDPROFILE));
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

                    .friend-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100px;
                        margin: 10px;
                        color: #FCF3E4;
                    }

                    .friend-image {
                        width: 80px;
                        height: 80px;
                        border-radius: 20%;
                        object-fit: cover;
                        border: 2px solid #FCF3E4;
                        margin-bottom: 8px;
                    }

                    .friend-username {
                        font-size: 0.8rem;
                        color: #FCF3E4;
                        text-align: center;
                    }
                </style>

                <div class="friend-card">
                    <img class="friend-image" src="${this.image === "" ? 'https://i.pinimg.com/564x/ec/0f/a7/ec0fa7e18612c6a5239742cfd9dd6c46.jpg' : this.image }" alt="Friend Image">
                    <p class="friend-username">@${this.username || 'username'}</p>
                </div>
            `;
        }
    }
}

customElements.define('friend-card', FriendCard);
export default FriendCard;