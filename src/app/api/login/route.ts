import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/user'; // Adjust according to your folder structure
import connectToDatabase from '@/lib/mongodb';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers'; // Required for handling cookies in route handlers
import { sessionOptions } from '@/lib/session';

export async function POST(req: Request) {
  try {
    const session = await getIronSession(cookies(), sessionOptions); // Initialize session
    const body = await req.json(); // Parse the request body

    // Debugging: Check if the body is being parsed correctly
    console.log('Request body:', body);

    const { email, password } = body;
    console.log('Email:', email);

    await connectToDatabase();

    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Set session data
    session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    
    // Save the session
    await session.save();

    // Return success response
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
