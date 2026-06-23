import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const loginSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/auth/login', data);
      login(response.data.user);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-600">Newborn ERP</h2>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Employee ID"
            type="text"
            {...register('employeeId')}
            error={errors.employeeId?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

      </div>
    </div>
  );
};

export default Login;
