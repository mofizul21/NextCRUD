export const sessionOptions = {
    password: process.env.SESSION_SECRET as string,
    cookieName: 'myapp_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  };
  