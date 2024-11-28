import { NextResponse } from 'next/server';

import { getDoc, doc } from 'firebase/firestore';

import { db } from '@/firebase/config'; // Make sure db is properly initialized in this file

export async function POST(req) {
    try {
        // Parse the request body to get the document ID
        const { documentId } = await req.json();

        if (!documentId) {
            return NextResponse.json({ message: 'Document ID is required' }, { status: 400 });
        }

        // Reference to the document
        const docRef = doc(db, 'users', documentId);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document data
            const data = docSnap.data();


            return NextResponse.json(data, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No such document!' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching document:', error);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
