// Next Imports
import { NextResponse } from 'next/server'

// Mock data for demo purpose

// Firebase Imports
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/firebase/config';


export async function POST(req) {
  // Vars
  const { email, password } = await req.json()

  try {
    // Authenticate user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));


    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Check if the role matches
      if (userData.email === email && userData.password === password) {
        // Exclude password from response (even though it’s not stored)
        const { password: _, ...filteredUserData } = userData;

        return NextResponse.json(filteredUserData);
      } else {
        // Role does not match
        return NextResponse.json(
          {
            message: ['Unauthorized Access: Invalid role'],
          },
          {
            status: 403,
            statusText: 'Forbidden',
          }
        );
      }
    } else {
      // No user data found in Firestore
      return NextResponse.json(
        {
          message: ['User data not found in Firestore'],
        },
        {
          status: 404,
          statusText: 'Not Found',
        }
      );
    }
  } catch (error) {
    // Handle authentication errors
    console.error('Authentication error:', error);

    return NextResponse.json(
      {
        message: ['Email or Password is invalid'],
      },
      {
        status: 401,
        statusText: 'Unauthorized Access',
      }
    );
  }
}
