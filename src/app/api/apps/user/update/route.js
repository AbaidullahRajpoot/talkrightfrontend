import { NextResponse } from 'next/server';

import { updateDoc, doc, getDocs, query, collection, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import admin from 'firebase-admin';

import { auth, db, storage } from '@/firebase/config';


// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "mytalkright-d6289"
  });
}

export async function POST(req) {
  try {


    // Parse form data from the request
    const data = await req.formData();
    const uid = data.get('uid'); // Assume UID is provided in the form data
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const country = data.get('country');
    const gender = data.get('gender');
    const date = data.get('date');
    const phoneNumber = data.get('phoneNumber');
    const imageFile = data.get('file');

    if (!uid) {
      return NextResponse.json({ message: 'User ID (UID) is required.' }, { status: 400 });
    }

    // Check if the username already exists
    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username),
      where("email", "!=", email)
    );

    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      return NextResponse.json({ message: 'Username already exists.' });
    }

    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", uid);

    let updatedData = {
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password }),
      ...(firstName && { name: firstName }),
      ...(lastName && { lname: lastName }),
      ...(country && { country }),
      ...(gender && { gender }),
      ...(date && { date }),
      ...(phoneNumber && { phoneNumber }),
    };

    // If a new image is provided, upload it and update the image URL
    if (imageFile && imageFile.size > 0) {
      const storageRef = ref(storage, `profile_pictures/${uid}`);
      const snapshot = await uploadBytes(storageRef, imageFile);

      const imageURL = await getDownloadURL(snapshot.ref);

      updatedData.image = imageURL;
    }

    // Update the user's details in Firestore
    await updateDoc(userDocRef, updatedData);
    await admin.auth().updateUser(uid, {
      email,
      password
    });

    return NextResponse.json({ message: "User Updated Successfully!" });

  } catch (error) {
    console.error('Error updating user:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
