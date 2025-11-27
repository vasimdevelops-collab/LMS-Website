
import React, { useState } from 'react';

/**
 * Handle token verification on mount if needed.
 * Submit new password to API in `handleSubmit`.
 */

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Simulate token expiry
  const isTokenValid = true; // In real app, check URL param

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    // Simulate API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-dark mb-2">Link Expired</h2>
          <p className="text-muted text-sm mb-6">
            This password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => onNavigate('forgot-password')}
            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Request new link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 md:p-8">
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-dark mb-2">Reset your password</h1>
            <p className="text-muted text-sm mb-6">
              Create a new strong password for your account. Link expires in 60 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">New Password</label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all`}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                 {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Updating...' : 'Set new password'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-dark mb-2">Password Reset Successful</h2>
            <p className="text-muted text-sm mb-6">
              Your password has been updated. You can now sign in with your new credentials.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 px-4 bg-primary text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
