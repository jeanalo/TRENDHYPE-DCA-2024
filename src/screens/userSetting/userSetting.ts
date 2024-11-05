import { appState } from '../../store/index';
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
                    #settingsWrapper {
                        display: flex;
                        flex-direction: row;
                        gap: 20px;
                        padding: 20px;
                        background-color: #232106;
                        color: #FFFFFF;
                        width: 100vw;
                        height: 100vh;
                        overflow: hidden;
                    }

                    #sideCardContainer {
                        flex: 1;
                        max-width: 300px;
                        display: flex;
                        justify-content: center;
                        background-color: #3d3a0b;
                        border-radius: 10px;
                    }

                    #formContainer {
                        flex: 3;
                        border-radius: 10px;
                    }
                </style>

                <div id="settingsWrapper">
                    <div id="sideCardContainer"></div>
                    <div id="formContainer"></div>
                </div>
            `;

            const user = appState.user;

            // Crear y configurar `UserSideCard`
            const userSideCardComponent = new UserSideCard();
            userSideCardComponent.setAttribute(UserSideCardAttribute.name, user?.firstName || '');
            userSideCardComponent.setAttribute(UserSideCardAttribute.username, user?.username || '');
            userSideCardComponent.setAttribute(UserSideCardAttribute.description, user?.description || '');
            userSideCardComponent.setAttribute(UserSideCardAttribute.profileImage, user?.profileImage || 'path_to_default_image.jpg');
            
            this.shadowRoot.querySelector('#sideCardContainer')?.appendChild(userSideCardComponent);

            // Crear y configurar `UserSettingsForm`
            const userSettingComponent = new UserSettingsForm();
            userSettingComponent.setAttribute(userSettingsFormAttribute.firstName, user?.firstName || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.lastName, user?.lastName || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.email, user?.email || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.country, user?.country || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.city, user?.city || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.username, user?.username || '');
            userSettingComponent.setAttribute(userSettingsFormAttribute.description, user?.description || '');

            this.shadowRoot.querySelector('#formContainer')?.appendChild(userSettingComponent);
        }
    }
}

customElements.define('user-settings-screen', UserSettingsScreen);
export default UserSettingsScreen;
