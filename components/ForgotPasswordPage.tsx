
import React, { useState } from 'react';

/**
 * Handle API call to send reset link in `handleSubmit`.
 */

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 md:p-8">
        
        {/* Back Link */}
        <button 
          onClick={() => onNavigate('login')}
          className="mb-6 flex items-center text-sm text-muted hover:text-dark transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Login
        </button>

        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-dark mb-2">Forgot your password?</h1>
            <p className="text-muted text-sm mb-6">
              Enter your email and we'll send reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-dark mb-2">Check your email</h2>
            <p className="text-muted text-sm mb-6">
              If an account exists for <span className="font-semibold text-dark">{email}</span>, we sent instructions to reset your password.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 px-4 border border-gray-200 rounded-full text-sm font-medium text-dark hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </button>
             <p className="mt-4 text-xs text-muted">
               Did not receive the email? <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">Click to retry</button>
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
