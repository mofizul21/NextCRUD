'use client';

import { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profileImage: '', // URL for the profile image
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/profile'); // Fetch user profile data from API
        const data = await res.json();
        console.log(data);
        
        if (res.ok) {
          setUserData(data); // Set the user data in the state
        } else {
          setErrorMessage(data.error || 'Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Something went wrong. Please try again.');
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    if (newImage) {
      formData.append('profileImage', newImage);
    }

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log("Data from FE:", data);
      if (res.ok) {
        setMessage('Profile updated successfully from FE.');
        setUserData((prevData) => ({
          ...prevData,
          profileImage: data.profileImage || prevData.profileImage, // Update profile image if needed
        }));
        setNewImage(null); // Clear the image input
      } else {
        setErrorMessage(data.error || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Profile View */}
      <div className="w-1/2 flex flex-col items-center p-6 bg-white shadow-md">
        <img
          src={userData.profileImage || '/demo-user.jpg'} // Replace with demo image path
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-700">{userData.username || 'Demo User'}</h2>
        <p className="text-gray-600">{userData.email || 'demo@example.com'}</p>
      </div>

      {/* Profile Update Form */}
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Update Profile</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
