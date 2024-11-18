import { appState, dispatch } from '../../../store/index';
import { Actions } from '../../../types/store';

// src/components userSettingsForm.ts
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

            .form-container {
            
                display: flex;
                flex-direction: column;
                padding: 40px;
                border-radius: 15px;
                max-width: 800px;
                width: 100%;
            }

            .form-title {
                font-size: 2rem;
                color: #ffffff;
                margin-bottom: 10px;
            }

            .form-subtitle {
                font-size: 1rem;
                color: #cccccc;
                margin-bottom: 20px;
            }

            .form-section-title {
                font-size: 1rem;
                font-weight: bold;
                color: #ffffff;
                margin: 20px 0 10px;
            }

            .input-group {
                display: flex;
                gap: 20px;
                margin-bottom: 15px;
            }

            .input-group > div {
                flex: 1;
            }

            label {
                font-size: 0.9rem;
                font-weight: bold;
                color: #ffffff;
                margin-bottom: 5px;
                display: block;
            }

            input[type="text"],
            input[type="email"],
            input[type="password"] {
                width: 100%;
                padding: 10px; /* Reduced padding */
                border-radius: 20px;
                background-color: #46410B; /* New background color */
                color: #ffffff;
                font-size: 0.9rem;
            }

            input::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }

            .button-wrapper {
                text-align: right;
                margin-top: 30px;
            }

            button {
                width: 150px;
                padding: 10px;
                background-color: #b3572f;
                color: #ffffff;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1rem;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #993a26;
            }

            @media (max-width: 768px) {
                .input-group {
                    flex-direction: column;
                }

                .form-container {
                    padding: 20px;
                }

                button {
                    width: 100%;
                }
            }
        </style>

        <div class="form-container">
            <div class="form-title">Settings</div>
            <div class="form-subtitle">Edit Profile</div>
            <form>
                <!-- Sección para First Name y Last Name en dos columnas -->
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
                
                <label for="email">e-mail address</label>
                <input type="email" id="email" placeholder="e-mail address" value="${this.email || ''}">
                
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Change your password">
                
                <div class="form-section-title">Personal Address</div>
                <div class="input-group">
                    <div>
                        <label for="country">Country</label>
                        <input type="text" id="country" placeholder="Country" value="${this.country || ''}">
                    </div>
                    <div>
                        <label for="city">City</label>
                        <input type="text" id="city" placeholder="City" value="${this.city || ''}">
                    </div>
                </div>
                
                <div class="form-section-title">Profile Info</div>
                <div class="input-group">
                    <div>
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Username" value="${this.username || ''}">
                    </div>
                    <div>
                        <label for="description">Description</label>
                        <input type="text" id="description" placeholder="Description" value="${this.description || ''}">
                    </div>
                </div>
                
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