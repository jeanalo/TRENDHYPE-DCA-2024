import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';
import userSettingsForm, { userSettingsFormAttribute } from '../../components/userSettings/userSettingsForm/userSettingsForm';
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
        this.fetchUserData()
    }

    async fetchUserData() {

        const userID = this.userid; // Obtener el UID del amigo desde el estado global

        if (!userID) {
            console.error('No se proporcionó el UID del amigo.');
            return;
        }

        const user = await getUserByUID(userID); // Obtener información del usuario desde Firebase

        if (user) {
            console.log(user);
            const userSideCard = new UserSideCard();
            userSideCard.setAttribute(UserSideCardAttribute.name, `${user.firstname} ${user.lastname}`);
            userSideCard.setAttribute(UserSideCardAttribute.username, user.username);
            userSideCard.setAttribute(UserSideCardAttribute.profileimage, user.profileImage );
            userSideCard.setAttribute(UserSideCardAttribute.description, user.description);
            userSideCard.setAttribute(UserSideCardAttribute.userid, this.userid!)

            const sidebar = this.shadowRoot?.querySelector('.sidebar');
            sidebar?.appendChild(userSideCard);

            // Crear y configurar el componente `UserSettingsForm`
            const userSettingsFormComponent = this.ownerDocument.createElement('user-settings-form') as userSettingsForm;
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.firstname, user.firstname);
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.lastname, user.lastname);
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.email, user.email);
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.username, user.username);
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.description, user.description);

            const mainContent = this.shadowRoot?.querySelector('.main-content');
            mainContent?.appendChild(userSettingsFormComponent);
            // Agregar `UserSettingsForm` al contenedor `#formContainer`
            // this.shadowRoot?.querySelector('.formContainer')?.appendChild(userSettingsFormComponent);
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
                      
                    }


                    .main-content {
                        flex: 3;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .settings-title {
                        font-size: 2rem;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: left;
                    }

                    /* Responsive adjustments */
                    @media (max-width: 768px) {
                        #user-settings-container {
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

                        .settings-title {
                            font-size: 1.5rem;
                            text-align: center;
                        }
                    }
                </style>
                
                <div id="user-settings-container">
        
                    <div class="sidebar">
                    </div>

                 
                    <div class="main-content">
                        
                    </div>
                </div>
            `;

        }
    }
}

customElements.define('user-settings-screen', UserSettingsScreen);
export default UserSettingsScreen;