import { appState } from "../../store";
import { getFirebaseInstance, toggleFollowUser, toggleLike, toggleSavePost } from "../../utils/firebase";

export enum Attribute {
    "image" = "image",
    "description" = "description",
    "likes" = "likes",
    "postid" = "postid",
    "userid" = "userid"
}

class MyCard extends HTMLElement {
    isLiked: boolean = false;
    isSaved: boolean = false;
    isFollowed: boolean = false;
    image?: string;
    description?: string;
    likes: string = '0';
    postid?: string;
    userid?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (newValue !== oldValue) {
            this[propName] = newValue!;

            if (propName === Attribute.likes) {
                this.updateLikesCount(newValue ?? '0');
            }

            if (propName === Attribute.userid || propName === Attribute.postid) {
                this.checkIfUserLiked();
            }

            if (propName === Attribute.userid || propName === Attribute.postid) {
                this.checkIfPostIsSaved(); // Verifica si el post está guardado
            }

            if (propName === Attribute.userid) {
                this.checkIfFollowing(); // Verifica si el usuario ya está siguiendo al creador del post
            }

            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    async checkIfPostIsSaved() {
        if (!this.userid || !this.postid) return;

        const { db } = await getFirebaseInstance();
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", appState.user));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${appState.user}.`);
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const savedPosts = userData?.savedPosts ?? [];
        this.isSaved = savedPosts.includes(this.postid);

        this.updateSaveIcon(); // Actualiza el color del ícono
    }

    updateSaveIcon() {
        const saveIcon = this.shadowRoot?.querySelector<SVGElement>('#save-icon');
        const savePath = saveIcon?.querySelector('path');

        if (savePath) {
            savePath.setAttribute('fill', this.isSaved ? '#E2D54B' : '#FCF3E4'); // Amarillo si está guardado
        }
    }

    async checkIfUserLiked() {
        if (!this.postid || !this.userid) return;

        const { db } = await getFirebaseInstance();
        const { doc, getDoc } = await import('firebase/firestore');

        const postRef = doc(db, 'publications', this.postid);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
            const data = postSnapshot.data();
            const likesUsers = data?.likesUsers ?? [];
            this.isLiked = likesUsers.includes(this.userid);

            // Actualiza el ícono de like según el estado inicial
            this.updateLikeIcon();
        }
    }

    async checkIfFollowing() {
        if (!this.userid) return;

        const { db } = await getFirebaseInstance();
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", appState.user)); // UID del usuario actual
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.error(`No se encontró un documento para el usuario actual.`);
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const following = userData?.following ?? [];
        this.isFollowed = following.includes(this.userid); // Verifica si el usuario ya está siguiendo al creador del post

        this.updateFollowButton();
    }

    updateFollowButton() {
        const button = this.shadowRoot?.querySelector('.card-button');
        if (button) {
            button.innerHTML = `<span></span> ${this.isFollowed ? 'UnFollow' : 'Follow'}`;
        }
    }

    updateLikesCount(likes: string) {
        const likeCountElement = this.shadowRoot?.querySelector('.like');
        if (likeCountElement) {
            likeCountElement.innerHTML = likes === '0' ? '' : likes;
        }
    }

    updateLikeIcon() {
        const likeIcon = this.shadowRoot?.querySelector<SVGElement>('#like-icon');
        const likePath = likeIcon?.querySelector('path');
        if (likePath) {
            likePath.setAttribute('fill', this.isLiked ? '#C01919' : '#FCF3E4');
        }
    }

    addEventListeners() {
        const likeIcon = this.shadowRoot?.querySelector<SVGElement>('#like-icon');
        const saveIcon = this.shadowRoot?.querySelector<SVGElement>('#save-icon');
        const followButton = this.shadowRoot?.querySelector('.card-button');

        if (followButton) {
            followButton.addEventListener('click', async () => {
                if (!this.userid) {
                    console.error("El userID del creador del post no está definido.");
                    return;
                }

                const result = await toggleFollowUser(appState.user, this.userid); // `appState.user` es el UID del usuario actual

                if (result.success) {
                    this.isFollowed = result.following!;
                    this.updateFollowButton(); // Actualiza el texto del botón
                } else {
                    console.error("Error al manejar el seguimiento:", result.error || result.message);
                }
            });
        }

        if (likeIcon) {
            likeIcon.addEventListener('click', async () => {
                if (!this.postid || !this.userid) {
                    console.error('El ID del documento o el usuario no están definidos.');
                    return;
                }

                const result = await toggleLike(this.postid, this.userid);

                if (result.success) {
                    this.isLiked = result.liked!;
                    this.likes = result.likes.toString();

                    this.updateLikesCount(this.likes);
                    this.updateLikeIcon();
                } else {
                    console.error('Error actualizando likes:', result.message || result.error);
                }
            });
        }
        if (saveIcon) {
            saveIcon.addEventListener('click', async () => {
                console.log(this.userid, appState.user, this.postid);
                if (!this.postid || !this.userid) {
                    console.error("El ID del post o el usuario no están definidos.");
                    return;
                }

                const result = await toggleSavePost(this.userid, this.postid);

                if (result.success) {
                    const savePath = saveIcon.querySelector('path');
                    if (savePath) {
                        savePath.setAttribute('fill', result.saved ? '#E2D54B' : '#FCF3E4'); // Amarillo si está guardado
                    }
                } else {
                    console.error("Error actualizando el estado de guardado:", result.error || result.message);
                }
            });
        }

    }

    render() {
        if (this.shadowRoot) {
            const shouldHideFollowButton = appState.user === this.userid;

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/Card/card.css">
                <article class="card">
                    <div class="card-image-container">
                        <img src="${this.image}" alt="Image" /> 
                        <button class="card-button" style="display: ${shouldHideFollowButton ? 'none' : 'block'};">
                            <span></span> ${this.isFollowed ? 'UnFollow' : 'Follow'}
                        </button>
                    </div>
                    <div class="info">
                        <div class="icons-container">
                            <svg class="card-icons" id="like-icon" width="29" height="27" viewBox="0 0 29 27" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7109 26.0425L12.6761 24.1902C5.449 17.6367 0.677734 13.3005 0.677734 8.00997C0.677734 3.67373 4.07375 0.291748 8.39596 0.291748C10.8377 0.291748 13.1813 1.42843 14.7109 3.21064C16.2405 1.42843 18.584 0.291748 21.0258 0.291748C25.348 0.291748 28.744 3.67373 28.744 8.00997C28.744 13.3005 23.9727 17.6367 16.7457 24.1902L14.7109 26.0425Z" fill="#FCF3E4"/>
                            </svg>
                            <span class="like">${this.likes === '0' ? '' : this.likes}</span>
    
                            <svg class="card-icons" id="save-icon" width="17" height="31" viewBox="0 0 17 31" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2.65496V30.5035L8.31948 22.5475L16.6377 30.5035V2.65496C16.6306 1.9486 16.3452 1.27354 15.8433 0.776425C15.3414 0.279312 14.6637 0.0002998 13.9573 0L13.8594 0.00127092H13.8645H2.77443L2.68165 0C1.97547 0.000296297 1.29791 0.279133 0.796074 0.775973C0.294237 1.27281 0.00863388 1.94755 0.00127093 2.65369L0 2.65496Z" fill="#FCF3E4"/>
                            </svg>
                        </div>
                        <p>${this.description}</p>
                    </div>
                </article>
            `;
        }
    }
}

customElements.define('my-card', MyCard);
export default MyCard;

