import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';
import UserSettingsForm, { userSettingsFormAttribute } from '../../components/userSettings/userSettingsForm/userSettingsForm';

class UserSettingsScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
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
                        <user-settings-form></user-settings-form> 
                    </div>
                </div>
            `;

            const userSideCardComponent = new UserSideCard();
            userSideCardComponent.setAttribute(UserSideCardAttribute.name, 'Jean Alomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.username, '@Jeanalomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.description, 'Chasing dreams and making memories');

            const sidebar = this.shadowRoot.querySelector('.sidebar');
            sidebar?.appendChild(userSideCardComponent);

            // Crear y configurar el componente `UserSettingsForm`
            const userSettingsFormComponent = new UserSettingsForm();
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.firstName, 'Jean');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.lastName, 'Alomia');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.email, 'jean.alomia@example.com');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.country, 'Country');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.city, 'City');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.username, 'jeanalomia');
            userSettingsFormComponent.setAttribute(userSettingsFormAttribute.description, 'Chasing dreams and making memories');

            // Agregar `UserSettingsForm` al contenedor `#formContainer`
            this.shadowRoot.querySelector('#formContainer')?.appendChild(userSettingsFormComponent);
        }
    }
}

customElements.define('user-settings-screen', UserSettingsScreen);
export default UserSettingsScreen;