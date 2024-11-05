import { appState, dispatch } from '../../../store/index';
import { Actions } from '../../../types/store';
import { updateUserData } from '../../../utils/firebase';

export enum userSettingsFormAttribute {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    country = 'country',
    city = 'city',
    username = 'username',
    description = 'description',
    profileImage = 'profileImage',
}

class userSettingsForm extends HTMLElement {
    firstName?: string;
    lastName?: string;
    email?: string;
    country?: string;
    city?: string;
    username?: string;
    description?: string;
    profileImage?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(userSettingsFormAttribute);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.shadowRoot?.querySelector('form')?.addEventListener('submit', this.handleSubmit.bind(this));
        this.shadowRoot?.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', this.handleInputChange.bind(this));
        });
    }

    handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { id, value } = target;

        // Actualiza el valor localmente y en appState
        (this as any)[id] = value;
        
        dispatch({
            action: Actions.UPDATEUSER,
            payload: { [id]: value }
        });
    }

    async handleSubmit(event: Event) {
        event.preventDefault();

        const updatedData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            country: this.country,
            city: this.city,
            username: this.username,
            description: this.description,
            profileImage: this.profileImage,
        };

        if (appState.user?.uid) {
            await updateUserData(appState.user.uid, updatedData);
            console.log('User data updated successfully');
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    /* Estilos del formulario */
                </style>

                <div class="form-container">
                    <div class="form-title">Settings</div>
                    <div class="form-subtitle">Edit Profile</div>
                    <form>
                        <!-- Campos del formulario -->
                        <div class="input-group">
                            <div>
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" placeholder="First Name" value="${this.firstName || ''}">
                            </div>
                            <div>
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" placeholder="Last Name" value="${this.lastName || ''}">
                            </div>
                        </div>

                        <!-- Otros campos aquí -->

                        <div class="button-wrapper">
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            `;
        }
    }
}

customElements.define('user-settings-form', userSettingsForm);
export default userSettingsForm;
