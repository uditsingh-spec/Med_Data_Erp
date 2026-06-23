import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, UserCircle, Users, Baby, ClipboardList } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
      isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="p-4 flex-1 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink to="/observations" className={linkClass}>
          <ClipboardList className="w-5 h-5 mr-3" />
          Daily Observations
        </NavLink>
        <NavLink to="/new-baby" className={linkClass}>
          <Baby className="w-5 h-5 mr-3" />
          New Baby
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <UserCircle className="w-5 h-5 mr-3" />
          Profile
        </NavLink>

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-slate-200">
            <span className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Admin
            </span>
            <div className="mt-2 space-y-1">
              <NavLink to="/employees" className={linkClass}>
                <Users className="w-5 h-5 mr-3" />
                Manage Employees
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
