import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';
import userSettingsForm from '../../components/userSettings/userSettingsForm/userSettingsForm';
import { getUserByUID } from '../../utils/firebase';

class UserSettingsScreen extends HTMLElement {
    userid?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ["userid"];
    }

    attributeChangedCallback(name: string, oldValue: string | undefined, newValue: string | undefined) {
        if (name === "userid" && newValue !== oldValue) {
            this.userid = newValue;
        }
    }

    connectedCallback() {
        this.render();
        this.fetchUserData();
    }

    async fetchUserData() {
        const userID = this.userid;

        if (!userID) {
            console.error('No se proporcionó el UID del usuario.');
            return;
        }

        const user = await getUserByUID(userID);

        if (user) {
            // Crear y configurar `UserSideCard`
            const userSideCard = new UserSideCard();
            userSideCard.setAttribute(UserSideCardAttribute.name, `${user.firstname} ${user.lastname}`);
            userSideCard.setAttribute(UserSideCardAttribute.username, user.username);
            userSideCard.setAttribute(UserSideCardAttribute.profileimage, user.profileImage);
            userSideCard.setAttribute(UserSideCardAttribute.description, user.description);
            userSideCard.setAttribute(UserSideCardAttribute.userid, this.userid!);

            const sidebar = this.shadowRoot?.querySelector('.sidebar');
            sidebar?.appendChild(userSideCard);

            // Configurar y agregar `userSettingsForm`
            const userSettingsFormComponent = new userSettingsForm();
            userSettingsFormComponent.setAttribute("firstname", user.firstname);
            userSettingsFormComponent.setAttribute("lastname", user.lastname);
            userSettingsFormComponent.setAttribute("email", user.email);
            userSettingsFormComponent.setAttribute("username", user.username);
            userSettingsFormComponent.setAttribute("description", user.description);

            const formContainer = this.shadowRoot?.querySelector('.form-container');
            formContainer?.appendChild(userSettingsFormComponent);
        }
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

                    #user-settings-container {
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
                        flex-shrink: 0;
                    }

                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .form-container {
                        width: 100%;
                        max-width: 600px;
                    }

                    /* Responsividad */
                    @media (max-width: 768px) {
                        #user-settings-container {
                            flex-direction: column;
                        }

                        .sidebar {
                            width: 100%;
                            margin-bottom: 20px;
                        }

                        .main-content {
                            padding: 10px;
                        }

                        .form-container {
                            max-width: 100%;
                        }
                    }

                    @media (max-width: 480px) {
                        .form-container {
                            padding: 10px;
                        }
                    }
                </style>
                
                <div id="user-settings-container">
                    <div class="sidebar"></div>
                    <div class="main-content">
                        <div class="form-container">
                            <!-- Se inyectará el componente userSettingsForm aquí -->
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('user-settings-screen', UserSettingsScreen);
export default UserSettingsScreen;
