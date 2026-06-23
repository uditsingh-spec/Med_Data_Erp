import { useState, useCallback } from 'react';
import api from '../services/api';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/employees');
      setEmployees(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEmployee = async (employeeData: any) => {
    const { data } = await api.post('/employees', employeeData);
    setEmployees((prev) => [data, ...prev]);
    return data;
  };

  const updateEmployee = async (id: string, employeeData: any) => {
    const { data } = await api.put(`/employees/${id}`, employeeData);
    setEmployees((prev) => prev.map((e) => (e._id === id ? data : e)));
    return data;
  };

  const resetPassword = async (id: string, password: string) => {
    const { data } = await api.patch(`/employees/${id}/reset-password`, { password });
    return data;
  };

  const toggleStatus = async (id: string) => {
    const { data } = await api.patch(`/employees/${id}/toggle-status`);
    setEmployees((prev) => prev.map((e) => (e._id === id ? { ...e, isActive: data.isActive } : e)));
    return data;
  };

  const deleteEmployee = async (id: string) => {
    await api.delete(`/employees/${id}`);
    setEmployees((prev) => prev.filter((e) => e._id !== id));
  };

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    resetPassword,
    toggleStatus,
    deleteEmployee,
  };
};
