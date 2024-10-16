// NextCRUD\src\models\user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
    default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
