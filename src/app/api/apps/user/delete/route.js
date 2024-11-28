import { NextResponse } from 'next/server';

import admin from 'firebase-admin';
import { deleteDoc, doc, getDoc, getDocs, collection } from 'firebase/firestore';

import { db } from '@/firebase/config';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "mytalkright-d6289"
    });
}

export async function DELETE(req) {
    try {
        // Parse request data
        const { data } = await req.json();
        const userId = data?.userId;

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Reference to Firestore user document
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Delete user from Firebase Authentication
        await admin.auth().deleteUser(userId);

        // Delete user document from Firestore
        await deleteDoc(userDocRef);

        //=================================================Get All Data=========================================
        const usersCollection = collection(db, 'users');

        // Get all documents from the collection
        const snapshot = await getDocs(usersCollection);

        // Map the documents to an array of data
        const allUsers = snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter(user => user.role !== 'super admin');

        return NextResponse.json({ data: allUsers, message: 'User deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting user:', error);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
