import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, userProfile } from '../utils/api';

const UserProfile = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userProfile();
        console.log('Fetched userData:', userData);
  
        setUser(userData);
        setUpdatedUser({ name: userData.name, email: userData.email });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      // Update UI
      setUser((prevUser) => prevUser ? { ...prevUser, ...updatedUser } : null);
      setIsEditing(false);
      alert('Profile updated successfully! 🎉');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return <div className="text-center py-8">No user data found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="space-y-6">
        <div className="p-6 bg-gray-100 rounded-md shadow">
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <p className="text-gray-700"><span className="font-semibold">Username:</span> {user.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Role:</span> {user.role}</p>
        </div>

        {/* Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow">
            <div>
              <label className="block text-sm font-semibold">Username</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
