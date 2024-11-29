import { appState } from '../../../store/index';
import { deleteProfileImage, getFirebaseInstance, getUserProfileImage, updateUserProfile, uploadUserProfileImage } from '../../../utils/firebase';

export enum userSettingsFormAttribute {
    firstname = 'firstname',
    lastname = 'lastname',
    email = 'email',
    username = 'username',
    description = 'description',
    profileImage = 'profileImage',
}

class userSettingsForm extends HTMLElement {
    firstname?: string;
    lastname?: string;
    email?: string;
    username?: string;
    description?: string;
    profileImage?: string;
    file?: File;

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
        this.setupEventListeners();
    }

    async handleSaveChanges(e: Event) {
        e.preventDefault();
        const userId = appState.user;

        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        const updatedData: Record<string, any> = {
            firstname: this.shadowRoot?.querySelector<HTMLInputElement>('#firstName')?.value || this.firstname,
            lastname: this.shadowRoot?.querySelector<HTMLInputElement>('#lastName')?.value || this.lastname,
            email: this.shadowRoot?.querySelector<HTMLInputElement>('#email')?.value || this.email,
            username: this.shadowRoot?.querySelector<HTMLInputElement>('#username')?.value || this.username,
            description: this.shadowRoot?.querySelector<HTMLInputElement>('#description')?.value || this.description,
        };

        if (this.file) {
            updatedData.profileImage = await this.uploadImage(this.file);
        }

        try {
            await updateUserProfile(userId, updatedData);
            alert('Profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('There was an error updating your profile.');
        }
    }

    async uploadImage(file: File) {
        const userId = appState.user;

        if (!userId) {
            throw new Error("User ID is not available.");
        }

        const { db } = await getFirebaseInstance()
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const currentImageUrl = userDoc.data().profileImage;

            if (currentImageUrl) {
                await deleteProfileImage(currentImageUrl);
            }
        }

        const uniqueFileName = `imageUsers/${userId}_${Date.now()}_${file.name}`;
        await uploadUserProfileImage(file, uniqueFileName);
        return await getUserProfileImage(uniqueFileName);
    }

    setupEventListeners() {
        const saveButton = this.shadowRoot?.querySelector('button');
        const fileInput = this.shadowRoot?.querySelector<HTMLInputElement>('#profileImageInput');

        saveButton?.addEventListener('click', this.handleSaveChanges.bind(this));
        fileInput?.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            this.file = target.files ? target.files[0] : undefined;
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
                    <form>
                        <div class="input-group">
                            <div>
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" placeholder="${this.firstname}" value="">
                            </div>
                            <div>
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" placeholder="${this.lastname}" value="">
                            </div>
                        </div>
                        <label for="email">e-mail address</label>
                        <input type="email" id="email" placeholder="${this.email}" value="">
                        
                        <label for="profileImageInput">Profile Image</label>
                        <input type="file" id="profileImageInput">
                        
                        <div class="input-group">
                            <div>
                                <label for="username">Username</label>
                                <input type="text" id="username" placeholder=${this.username} value="">
                            </div>
                            <div>
                                <label for="description">Description</label>
                                <input type="text" id="description" placeholder=${this.description} value="">
                            </div>
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            `;
        }
    }
}

customElements.define('user-settings-form', userSettingsForm);
export default userSettingsForm;
