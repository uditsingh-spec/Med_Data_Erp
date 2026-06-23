import React from 'react';
import { useAuthStore } from '../store/authStore';

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">User Profile</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-500">Name</label>
            <p className="mt-1 text-lg font-medium text-slate-900">{user?.name}</p>
          </div>
          <hr className="border-slate-100" />
          <div>
            <label className="text-sm font-medium text-slate-500">Email Address</label>
            <p className="mt-1 text-lg font-medium text-slate-900">{user?.email}</p>
          </div>
          <hr className="border-slate-100" />
          <div>
            <label className="text-sm font-medium text-slate-500">Role</label>
            <p className="mt-1 text-lg font-medium text-slate-900 capitalize">{user?.role}</p>
          </div>
          {/* Note: In a complete implementation we might fetch the full profile from useMe to get the actual createdAt date. Currently user from Zustand only has basic info from login. */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
