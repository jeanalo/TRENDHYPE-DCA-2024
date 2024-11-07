import { dispatch, appState } from "../../store/index";
import { Screens } from "../../types/store";
import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';

class favoritePosts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        console.log('Favorite screen loaded');
    }

    render() {
        if (this.shadowRoot) {
            console.log('Rendering favoritePosts component...');
            this.shadowRoot.innerHTML = `
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }

                    #my-favorites-container {
                        display: flex;
                        flex-direction: row;
                        width: 100vw;
                        height: 100vh;
                        background-color: #232106;
                        color: #FCF3E4;
                    }

                    .sidebar {
                        width: 250px;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background-color: #3d3a0b;
                        margin-right: 20px;
                    }

                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .feed-title {
                        font-size: 2rem;
                        font-weight: bold;
                        margin: 20px 0;
                    }

                    #posts-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        gap: 16px;
                        padding-left: 10px;
                    }

                    @media (max-width: 768px) {
                        #my-favorites-container {
                            flex-direction: column;
                        }

                        .sidebar {
                            width: 100%;
                            padding: 10px;
                            align-items: center;
                        }

                        .main-content {
                            padding: 10px;
                        }

                        .feed-title {
                            font-size: 1.5rem;
                            text-align: center;
                        }

                        #posts-container {
                            gap: 10px;
                            justify-content: center;
                        }
                    }
                </style>
                
                <div id="my-favorites-container">
                    <div class="sidebar"></div>
                    <div class="main-content">
                        <button class="add-button" id="add-button">Add</button>

                        <div class="friends-container">
                            <div class="friends-title">Friends</div>
                            <div id="friends-list"></div>
                        </div>

                        <div class="feed-title">Feed</div>
                        <section id="posts-container"></section>
                    </div>
                </div>
            `;

            // Agregar UserSideCard en la barra lateral
            const userSideCardComponent = new UserSideCard();
            userSideCardComponent.setAttribute(UserSideCardAttribute.name, 'Jean Alomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.username, '@Jeanalomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.description, 'Chasing dreams and making memories');

            const sidebar = this.shadowRoot.querySelector('.sidebar');
            if (sidebar) {
                sidebar.appendChild(userSideCardComponent);
                console.log('UserSideCard component appended to sidebar');
            } else {
                console.error('Sidebar not found');
            }
        }
    }
}

customElements.define("my-favorites-screen", favoritePosts);
export default favoritePosts;
