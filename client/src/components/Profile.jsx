import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera } from "lucide-react";
import avatar from "../assets/avatar.png";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl)
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({profilePicture : base64Image})
    }
  };

  return (
    <div className="h-screen raleway pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="text-center bg-base-300 rounded-xl p-6">
          <h1 className="text-2xl text-white font-semibold">Profile</h1>
          <p>Your profile information</p>

          {/* Upload Avatar */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <img
                  src={selectedImage || authUser.profilePicture || avatar}
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover"
                />
                <span className="absolute bottom-0 p-1 right-0 bg-gray-500 rounded-full">
                  <Camera />
                </span>
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUpdatingProfile}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || isUpdatingProfile}
            className="mt-3 btn btn-primary"
          >
            {isUpdatingProfile ? "Uploading..." : "Update Profile Picture"}
          </button>

          <h2 className="text-lg font-medium mt-8 text-white mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Full Name</span>
              <span>{authUser.fullname}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Username</span>
              <span>{authUser.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
