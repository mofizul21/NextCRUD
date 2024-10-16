import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await request.json();
    const { username, email, password } = body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
