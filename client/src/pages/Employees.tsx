import React, { useEffect, useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useAuthStore } from '../store/authStore';
import { Shield, Plus, Edit, Trash2, Key, Power, PowerOff } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ModalWrapper from '../components/common/ModalWrapper';

const Employees: React.FC = () => {
  const { user } = useAuthStore();
  const { employees, loading, fetchEmployees, createEmployee, updateEmployee, deleteEmployee, resetPassword, toggleStatus } = useEmployees();

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [modalType, setModalType] = useState<'edit' | 'reset' | 'delete' | null>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEmployees();
    }
  }, [user, fetchEmployees]);

  if (user?.role !== 'admin') {
    return <div className="p-8 text-red-500">Access Denied. Admins only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee Management</h1>
            <p className="text-sm text-slate-500">Manage hospital staff access and permissions</p>
          </div>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Employee</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading employees...</td></tr>
              ) : employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-800">{emp.employeeId}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{emp.name}</div>
                    <div className="text-xs text-slate-500">{emp.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${emp.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                      {emp.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(emp._id)}
                      className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${emp.isActive ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                      disabled={emp._id === user._id}
                    >
                      {emp.isActive ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                      <span>{emp.isActive ? 'Active' : 'Disabled'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(emp.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => { setSelectedEmployee(emp); setModalType('edit'); }} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setSelectedEmployee(emp); setModalType('reset'); }} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors" title="Reset Password">
                      <Key className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setSelectedEmployee(emp); setModalType('delete'); }} disabled={emp._id === user._id} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateEmployeeModal 
          onClose={() => setCreateModalOpen(false)} 
          onSubmit={async (data: any) => {
            await createEmployee(data);
            setCreateModalOpen(false);
          }} 
        />
      )}

      {modalType === 'edit' && selectedEmployee && (
        <EditEmployeeModal 
          employee={selectedEmployee}
          onClose={() => { setModalType(null); setSelectedEmployee(null); }}
          onSubmit={async (data: any) => {
            await updateEmployee(selectedEmployee._id, data);
            setModalType(null);
            setSelectedEmployee(null);
          }}
        />
      )}

      {modalType === 'reset' && selectedEmployee && (
        <ResetPasswordModal 
          onClose={() => { setModalType(null); setSelectedEmployee(null); }}
          onSubmit={async (password: string) => {
            await resetPassword(selectedEmployee._id, password);
            setModalType(null);
            setSelectedEmployee(null);
          }}
        />
      )}

      {modalType === 'delete' && selectedEmployee && (
        <ModalWrapper isOpen={true} onClose={() => { setModalType(null); setSelectedEmployee(null); }} title="Delete Employee">
          <p className="text-slate-600 mb-6">Are you sure you want to delete {selectedEmployee.name}? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => { setModalType(null); setSelectedEmployee(null); }}>Cancel</Button>
            <Button onClick={async () => {
              await deleteEmployee(selectedEmployee._id);
              setModalType(null);
              setSelectedEmployee(null);
            }} className="bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Employees;

// Sub-components

const CreateEmployeeModal = ({ onClose, onSubmit }: any) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={true} onClose={onClose} title="Create New Employee">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}
        <Input label="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <Input label="Password" type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select 
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={loading}>Create Employee</Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

const EditEmployeeModal = ({ employee, onClose, onSubmit }: any) => {
  const [formData, setFormData] = useState({ name: employee.name, email: employee.email, role: employee.role });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={true} onClose={onClose} title="Edit Employee">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}
        <Input label="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select 
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={loading}>Save Changes</Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

const ResetPasswordModal = ({ onClose, onSubmit }: any) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(password);
    setLoading(false);
  };

  return (
    <ModalWrapper isOpen={true} onClose={onClose} title="Reset Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="New Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={loading}>Reset Password</Button>
        </div>
      </form>
    </ModalWrapper>
  );
};
