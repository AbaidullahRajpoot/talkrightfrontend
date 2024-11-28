import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_ApiKey,
    authDomain: process.env.NEXT_AuthDomain,
    projectId: process.env.NEXT_ProjectId,
    storageBucket: process.env.NEXT_StorageBucket,
    messagingSenderId: process.env.NEXT_MessagingSenderId,
    appId: process.env.NEXT_AppId,
    measurementId: process.env.NEXT_MeasurementId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
