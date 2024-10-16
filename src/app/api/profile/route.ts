//NextCRUD\src\app\api\profile\route.ts
import { NextResponse } from 'next/server';
import User from '@/models/user'; // Adjust according to your folder structure
import connectToDatabase from '@/lib/mongodb';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/session';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer setup for handling multipart/form-data and saving to 'public/uploads'
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath); // Save to public/uploads
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Helper function to handle form parsing
export const config = {
  api: {
    bodyParser: false, // Disable default body parser, we'll use multer
  },
};

// GET endpoint to fetch user data
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id; // Get the logged-in user ID from the session
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      username: user.username,
      email: user.email,
      profileImage: user.profileImage || null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}


// POST endpoint to update profile data
export async function POST(request: Request) {
  return new Promise((resolve, reject) => {
    upload.single('profileImage')(request as any, {} as any, async (err: any) => {
      if (err) {
        console.error(err);
        return resolve(NextResponse.json({ error: 'File upload failed' }, { status: 500 }));
      }

      try {
        await connectToDatabase();
        
        const session = await getIronSession(cookies(), sessionOptions);

        if (!session.user) {
          return resolve(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
        }

        const userId = session.user.id; // Get the logged-in user ID from the session
        const user = await User.findById(userId);

        if (!user) {
          return resolve(NextResponse.json({ error: 'User not found' }, { status: 404 }));
        }

        const formData = request.body; // Since we're not using body-parser

        // Update user details
        if (formData.username) user.username = formData.username;
        if (formData.email) user.email = formData.email;

        // If a new image is uploaded
        if (request.file) {
          const imagePath = `/uploads/${request.file.filename}`;
          user.profileImage = imagePath; // Save path to image
        }

        await user.save();

        return resolve(NextResponse.json({
          message: 'Profile updated successfully in DB.',
          profileImage: user.profileImage,
        }));
      } catch (error) {
        console.error(error);
        return resolve(NextResponse.json({ error: 'Failed to update profile' }, { status: 500 }));
      }
    });
  });
}
