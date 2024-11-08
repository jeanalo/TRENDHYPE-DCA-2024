import { appState } from '../store';

let db: any;
let auth: any;
let storage: any;

export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');
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
        storage = getStorage();
    }
    return { db, auth, storage };
};

// Función para agregar publicaciones
export const addPosts = async (publication: any) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import('firebase/firestore');

        const postsCollection = collection(db, 'publications');
        await addDoc(postsCollection, publication);
        console.log('Publicación añadida con éxito');
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
            data.push(doc.data());
        });

        return data;
    } catch (error) {
        console.error('Error obteniendo los documentos:', error);
        return [];
    }
};

// Función para obtener publicaciones por usuario
export const getPostByUser = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const ref = collection(db, 'publications');
        const q = query(ref, where('userUid', '==', appState.user));
        const querySnapshot = await getDocs(q);
        const data: any[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    } catch (error) {
        console.error('Error obteniendo documentos del usuario:', error);
        return [];
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
            uid: userCredential.user.uid
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

