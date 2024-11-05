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

                    /* Estilos específicos de UserSideCard */
                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background-size: cover;
                        background-position: center;
                        margin-bottom: 10px;
                    }

                    .name, .username, .description {
                        text-align: center;
                        margin: 5px 0;
                    }

                    /* Estilos del formulario en UserSettingsForm */
                    form {
                        color: #ffffff;
                    }

                    form > p {
                        font-size: 2rem;
                        margin: 40px 0 0 0;
                    }

                    form label {
                        display: block;
                        margin: 16px 0 4px 32px;
                        font-size: 2rem;
                    }

                    form input {
                        width: calc(100% - 64px);
                        border-radius: 32px;
                        border: none;
                        padding: 16px;
                        background-color: rgba(200, 200, 200, 0.4);
                        font-size: 1.5rem;
                        color: #fff;
                    }

                    form input::placeholder {
                        color: #ffffff;
                        opacity: 0.7;
                    }

                    #buttonWrapper {
                        text-align: center;
                        margin-top: 20px;
                    }

                    form > div > button {
                        width: 250px;
                        background-color: #E2D34B;
                        color: #990000;
                        border: none;
                        padding: 16px;
                        font-weight: bold;
                        border-radius: 32px;
                        cursor: pointer;
                        font-size: 1.5rem;
                    }
                </style>

                <div id="settingsWrapper">
                    <div id="sideCardContainer"></div>
                    <div id="formContainer"></div>
                </div>
            `;

            // Crear y configurar el componente `userSideCard`
            const userSideCardComponent = new UserSideCard();
            userSideCardComponent.setAttribute(UserSideCardAttribute.name, 'Jean Alomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.username, '@Jeanalomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.description, 'Chasing dreams and making memories');
            userSideCardComponent.setAttribute(UserSideCardAttribute.profileImage, 'path_to_profile_image.jpg');
            
            // Agregar `userSideCard` al contenedor `#sideCardContainer`
            this.shadowRoot.querySelector('#sideCardContainer')?.appendChild(userSideCardComponent);

            // Crear y configurar el componente `userSettingsForm`
            const userSettingComponent = new UserSettingsForm();
            userSettingComponent.setAttribute(userSettingsFormAttribute.firstName, 'First Name');
            userSettingComponent.setAttribute(userSettingsFormAttribute.lastName, 'Last Name');
            userSettingComponent.setAttribute(userSettingsFormAttribute.email, 'Email');
            userSettingComponent.setAttribute(userSettingsFormAttribute.country, 'Country');
            userSettingComponent.setAttribute(userSettingsFormAttribute.city, 'City');
            userSettingComponent.setAttribute(userSettingsFormAttribute.username, 'Username');
            userSettingComponent.setAttribute(userSettingsFormAttribute.description, 'Description');

            // Agregar `userSettingsForm` al contenedor `#formContainer`
            this.shadowRoot.querySelector('#formContainer')?.appendChild(userSettingComponent);
        }
    }
}

customElements.define('user-settings-screen', UserSettingsScreen);
export default UserSettingsScreen;
