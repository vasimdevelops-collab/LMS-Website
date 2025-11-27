import React, { useState } from 'react';
import { AuthCard, InputField, PrimaryButton, SocialButton, FormError } from './SharedAuth';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login payload:', formData);
      setIsLoading(false);
      onNavigate('home'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <AuthCard>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-1 mb-4">
             <span className="text-2xl font-bold text-dark tracking-tight">Edu</span>
             <span className="text-2xl font-bold text-primary tracking-tight">Wave</span>
          </div>
          <h1 className="text-2xl font-bold text-dark">Welcome back</h1>
          <p className="text-muted text-sm mt-2">Enter your credentials to continue</p>
        </div>

        {/* Global Form Error */}
        {errors.form && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <InputField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            disabled={isLoading}
          />

          <div>
            <InputField
              id="password"
              label="Password"
              type="password"
              showToggle
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-dark">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-sm font-medium text-primary hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>

          <PrimaryButton type="submit" isLoading={isLoading}>
            Sign In
          </PrimaryButton>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted">or sign in with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3">
          <SocialButton provider="google" />
          <SocialButton provider="github" />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-muted">
          Don't have an account?{' '}
          <button 
            onClick={() => onNavigate('signup')} 
            className="font-medium text-primary hover:text-blue-700 hover:underline"
          >
            Sign up
          </button>
        </p>

      </AuthCard>
    </div>
  );
};

export default LoginPage;
