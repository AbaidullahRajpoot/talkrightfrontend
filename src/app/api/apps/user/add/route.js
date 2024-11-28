import { NextResponse } from 'next/server';

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { setDoc, doc, getDocs, query, collection, where } from "firebase/firestore";

import { auth, db, storage } from '@/firebase/config';

export async function POST(req) {
  try {
    // Parse form data from the request
    const data = await req.formData();
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


    // Check if the email already exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.length > 0) {
      return NextResponse.json({ message: 'Email already exists.' }, { status: 400 });
    }

    // Check if the username already exists
    const usernameQuery = query(collection(db, "users"), where("username", "==", username));
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      return NextResponse.json({ message: 'Username already exists.' }, { status: 400 });
    }

    // If email does not exist, create a new user
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    if (user) {
      let imageURL = null;

      // Upload the image to Firebase Storage if provided
      if (imageFile && imageFile.size > 0) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, imageFile);

        imageURL = await getDownloadURL(snapshot.ref);
      }

      // Save the user's details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
        password,
        name: firstName,
        lname: lastName,
        country,
        gender,
        date,
        phoneNumber,
        image: imageURL,
        role: "admin"
      });

      return NextResponse.json({ message: "User Registered Successfully!" });
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json({ message: 'Email is already in use.' }, { status: 400 });
    }

    console.error('Error adding user:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
