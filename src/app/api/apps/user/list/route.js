import { NextResponse } from 'next/server';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/firebase/config';

export async function GET() {
  try {
    // Reference to the 'users' collection
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

    return NextResponse.json({ data: allUsers }, { status: 200 }); // Use 200 for success status
  } catch (error) {
    console.error('Error fetching users:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
