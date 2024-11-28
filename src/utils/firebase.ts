import { appState } from '../store';

let db: any;
let auth: any;
let storage: any;



export const getFirebaseInstance = async () => {
    if (!db) {
        const { getFirestore } = await import('firebase/firestore');
        const { initializeApp } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');
        const { getStorage } = await import('firebase/storage');

        const firebaseConfig = {
            apiKey: "AIzaSyD-u3jetStWs47fMyfvAGsF5X4ggGwej4A",
            authDomain: "trendhype.firebaseapp.com",
            projectId: "trendhype",
            storageBucket: "trendhype.firebasestorage.app",
            messagingSenderId: "128542655290",
            appId: "1:128542655290:web:452dd40b18fa84b4cc4603",
            measurementId: "G-8LGLM4JT81"
        };

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
    }
    return { db, auth, storage };
};

// Función para agregar publicaciones
export const addPosts = async (publication: any) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import('firebase/firestore');

        const publicationWithDefaults = {
            ...publication,
            likes: 0, 
        };

        const postsCollection = collection(db, 'publications');
        await addDoc(postsCollection, publicationWithDefaults);

        console.log('Publicación añadida con éxito:', publicationWithDefaults);
    } catch (error) {
        console.error('Error añadiendo el documento:', error);
    }
};

// Función para obtener publicaciones
export const getPosts = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs } = await import('firebase/firestore');

        const postsCollection = collection(db, 'publications');
        const querySnapshot = await getDocs(postsCollection);
        const data: any[] = [];

        querySnapshot.forEach((doc) => {
            const post = doc.data()
            post.id = doc.id;
            data.push(post);
        });

        return data;
    } catch (error) {
        console.error('Error obteniendo los documentos:', error);
        return [];
    }
};

export const getPostByUser = async (userID: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const postsCollection = collection(db, "publications");
        const userPostsQuery = query(postsCollection, where("userID", "==", userID));
        const querySnapshot = await getDocs(userPostsQuery);

        const posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        console.log(`Found ${posts.length} posts for user: ${userID}`);
        return posts;
    } catch (error) {
        console.error("Error obteniendo publicaciones del usuario:", error);
        return [];
    }
};

export const toggleLike = async (postId: string, userId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { doc, updateDoc, arrayUnion, arrayRemove, getDoc } = await import('firebase/firestore');

        const postRef = doc(db, 'publications', postId);
        const postSnapshot = await getDoc(postRef);

        if (!postSnapshot.exists()) {
            console.error(`El documento con ID ${postId} no existe.`);
            return { success: false, message: 'Documento no encontrado' };
        }

        const data = postSnapshot.data();

        // Inicializa los campos si no existen
        const likesUsers = data?.likesUsers ?? [];
        const likes = data?.likes ?? 0;

        // Verifica si el usuario ya dio like
        const hasLiked = likesUsers.includes(userId);

        if (hasLiked) {
            console.log(`Eliminando usuario ${userId} de likesUsers`);
            await updateDoc(postRef, {
                likesUsers: arrayRemove(userId),
                likes: likes > 0 ? likes - 1 : 0,
            });
            console.log(`Usuario ${userId} eliminado de likesUsers`);
            return { success: true, liked: false, likes: likes - 1 };
        } else {
            console.log(`Agregando usuario ${userId} a likesUsers`);
            await updateDoc(postRef, {
                likesUsers: arrayUnion(userId),
                likes: likes + 1,
            });
            console.log(`Usuario ${userId} agregado a likesUsers`);
            return { success: true, liked: true, likes: likes + 1 };
        }
    } catch (error) {
        console.error('Error al manejar el like:', error);
        return { success: false, error };
    }
};

export const toggleSavePost = async (userID: string, postId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, query, getDocs, where, updateDoc, arrayUnion, arrayRemove } = await import('firebase/firestore');

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", userID));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${userID}.`);
            return { success: false, message: "Usuario no encontrado" };
        }

        // Debe haber solo un documento que coincida con el `uid`
        const userDoc = querySnapshot.docs[0];
        const userRef = userDoc.ref;
        const userData = userDoc.data();

        // Verifica si el campo `savedPosts` existe, y si no, inicialízalo
        if (!userData?.savedPosts) {
            await updateDoc(userRef, { savedPosts: [] });
        }

        const savedPosts = userData?.savedPosts ?? [];
        const isAlreadySaved = savedPosts.includes(postId);

        if (isAlreadySaved) {
            await updateDoc(userRef, {
                savedPosts: arrayRemove(postId),
            });
            console.log(`Post ${postId} eliminado de los guardados.`);
            return { success: true, saved: false };
        } else {
            await updateDoc(userRef, {
                savedPosts: arrayUnion(postId),
            });
            console.log(`Post ${postId} guardado.`);
            return { success: true, saved: true };
        }
    } catch (error) {
        console.error("Error al manejar el post guardado:", error);
        return { success: false, error };
    }
};

export const getPostsFromFollowing = async (currentUserID: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, query, where, getDocs } = await import("firebase/firestore");

        // Paso 1: Encuentra el documento del usuario actual por su UID
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", currentUserID));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${currentUserID}.`);
            return [];
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // Paso 2: Obtén el arreglo de following
        const following = userData?.following ?? [];
        if (following.length === 0) {
            console.log("El usuario no sigue a nadie.");
            return [];
        }

        // Paso 3: Consulta los posts de los usuarios seguidos
        const postsCollection = collection(db, "publications");
        const postsQuery = query(postsCollection, where("userID", "in", following));
        const postsSnapshot = await getDocs(postsQuery);

        const posts = postsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return posts;
    } catch (error) {
        console.error("Error obteniendo los posts de los usuarios seguidos:", error);
        return [];
    }
};

export const getFollowingUsers = async (currentUserID: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, query, where, getDocs} = await import("firebase/firestore");


        // Paso 1: Encuentra el documento del usuario actual por `uid`
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", currentUserID));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${currentUserID}.`);
            return [];
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // Paso 2: Obtén el arreglo `following`
        const following = userData?.following ?? [];
        if (following.length === 0) {
            console.log("El usuario no sigue a nadie.");
            return [];
        }

        const followedUsers = [];
        for (const followedUserID of following) {
            const followedUserQuery = query(usersCollection, where("uid", "==", followedUserID));
            const followedUserSnapshot = await getDocs(followedUserQuery);

            if (!followedUserSnapshot.empty) {
                const followedUserDoc = followedUserSnapshot.docs[0];
                const followedUserData = followedUserDoc.data();
            
                followedUsers.push({
                    id: followedUserData.uid || "UID no disponible", // Usa el campo uid del documento
                    firstname: followedUserData.firstname || "Desconocido", // Asigna un valor por defecto si falta
                    profileimage : followedUserData.profileImage
                });
            } else {
                console.warn(`No se encontró un documento para el usuario con UID ${followedUserID}.`);
            }
        }

        return followedUsers;
    } catch (error) {
        console.error("Error obteniendo los usuarios seguidos:", error);
        return [];
    }
};

export const getSavedPosts = async (userID: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const {collection,query,where,getDocs, getDoc, doc} = await import('firebase/firestore');

        // Busca el documento en la colección `users` donde `uid` sea igual a `userID`
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", userID));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${userID}.`);
            return [];
        }

        // Debe haber solo un documento que coincida con el `uid`
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Obtén el arreglo de IDs de posts guardados
        const savedPostIds = userData?.savedPosts ?? [];

        // Consulta Firestore para obtener los detalles de cada post
        const savedPosts = [];
        for (const postId of savedPostIds) {
            const postDoc = await getDoc(doc(db, "publications", postId));
            if (postDoc.exists()) {
                savedPosts.push({ id: postDoc.id, ...postDoc.data() });
            } else {
                console.warn(`El post con ID ${postId} no existe en Firestore.`);
            }
        }

        return savedPosts;
    } catch (error) {
        console.error("Error obteniendo los posts guardados:", error);
        return [];
    }
};

export const toggleFollowUser = async (userID: string, targetUserID: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const {collection,query,where,getDocs, updateDoc, arrayRemove, arrayUnion} = await import('firebase/firestore');


        // Encuentra el documento del usuario actual basado en `uid`
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("uid", "==", userID));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.error(`No se encontró un documento para el usuario con UID ${userID}.`);
            return { success: false, message: "Usuario no encontrado" };
        }

        const userDoc = querySnapshot.docs[0];
        const userRef = userDoc.ref;
        const userData = userDoc.data();

        // Verifica si el campo `following` existe, y si no, inicialízalo
        if (!userData?.following) {
            await updateDoc(userRef, { following: [] });
        }

        const following = userData?.following ?? [];
        const isAlreadyFollowing = following.includes(targetUserID);

        if (isAlreadyFollowing) {
            // Si ya está siguiendo, lo eliminamos
            await updateDoc(userRef, {
                following: arrayRemove(targetUserID),
            });
            console.log(`Dejó de seguir al usuario ${targetUserID}.`);
            return { success: true, following: false };
        } else {
            // Si no está siguiendo, lo agregamos
            await updateDoc(userRef, {
                following: arrayUnion(targetUserID),
            });
            console.log(`Ahora sigue al usuario ${targetUserID}.`);
            return { success: true, following: true };
        }
    } catch (error) {
        console.error("Error al manejar el seguimiento del usuario:", error);
        return { success: false, error };
    }
};

// Función para registrar usuario
export const registerUser = async (credentials: any) => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const { createUserWithEmailAndPassword } = await import('firebase/auth');
        const { collection, addDoc } = await import('firebase/firestore');

        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        const usersCollection = collection(db, 'users');
        const userDoc = {
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            email: credentials.email,
            uid: userCredential.user.uid,
            description : 'Write something about you',
            username : 'username123',
            profileImage : ''
        };

        await addDoc(usersCollection, userDoc);
        return userCredential.user.uid;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return null;
    }
};

// Función para obtener datos del usuario desde Firebase
export const getUserData = async (uid: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            console.error("No se encontró el usuario con el UID especificado.");
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo los datos del usuario:", error);
        return null;
    }
};

export const getUserByUID = async (uid: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('uid', '==', uid));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.warn(`No se encontró un documento para el usuario con UID ${uid}.`);
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        return {
            id: userDoc.id, // ID del documento
            firstname : userData.firstname,
            lastname : userData.lastname,
            email : userData.email,
            userID : userData.uid,
            profileImage: userData.profileImage,
            username : userData.username,
            description : userData.description,
            ...userData,    // Datos del usuario
        };
    } catch (error) {
        console.error('Error obteniendo la información del usuario:', error);
        return null;
    }
};

// Función para actualizar datos del usuario
export const updateUserData = async (uid: string, userData: Record<string, any>): Promise<void> => {
    try {
        const { db } = await getFirebaseInstance();
        const { doc, updateDoc } = await import('firebase/firestore');

        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, userData);
        console.log('User data updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

// Función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
    try {
        const { auth } = await getFirebaseInstance();
        const { signInWithEmailAndPassword } = await import('firebase/auth');

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario logueado:', userCredential.user);
        return true;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false;
    }
};

// Función para cerrar sesión
export const logOut = async (): Promise<void> => {
    try {
        const { auth } = await getFirebaseInstance();
        const { signOut } = await import('firebase/auth');

        await signOut(auth);
        console.log("Usuario deslogueado exitosamente");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

// Function to get the download URL for a post image
export const getPostImage = async (id: string): Promise<string | null> => {
    const { storage } = await getFirebaseInstance();
    const { ref, getDownloadURL } = await import('firebase/storage');

    const storageRef = ref(storage, 'imagesPosts/' + id);
    return getDownloadURL(storageRef).catch((error) => {
        console.error("Error fetching image URL:", error);
        return null;
    });
};

// Function to upload an image for a post and return the file identifier
export const uploadPostImage = async (file: File, id: string): Promise<string> => {
    const { storage } = await getFirebaseInstance();
    const { ref, uploadBytes } = await import('firebase/storage');

    const storageRef = ref(storage, 'imagesPosts/' + id);
    // Use `await` to handle the upload and then return the ID
    await uploadBytes(storageRef, file);
    console.log('File uploaded successfully');
    return id; // Return the ID which can be used to retrieve the image URL later
};

export const updateUserProfile = async (userId: string, updatedData: any) => {
    const {db} = await getFirebaseInstance();
    const {collection, query, where, getDocs, updateDoc } = await import('firebase/firestore');

    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('uid', '==', userId));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
        throw new Error(`No user found with ID: ${userId}`);
    }

    const userDoc = querySnapshot.docs[0].ref;

    await updateDoc(userDoc, updatedData);
    console.log('User profile updated successfully:', updatedData);
};


export const uploadUserProfileImage = async (file: File, path: string) => {
    const { storage } = await getFirebaseInstance();
    const { ref, uploadBytes } = await import('firebase/storage');

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    console.log('Image uploaded successfully:', path);
};

export const getUserProfileImage = async (path: string) => {
    const { storage } = await getFirebaseInstance();
    const { ref, getDownloadURL } = await import('firebase/storage');

    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
};

export const deleteProfileImage = async (imageUrl: string) => {
    const { storage } = await getFirebaseInstance();
    const { ref, deleteObject } = await import('firebase/storage');

    const storageRef = ref(storage, imageUrl);

    try {
        await deleteObject(storageRef);
        console.log('Previous profile image deleted successfully:', imageUrl);
    } catch (error) {
        console.error('Error deleting profile image:', error);
    }
};