
import React, { useState, useEffect } from 'react';

// --- FormError ---
export const FormError: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-red-500 text-xs mt-1 ${className}`} role="alert">{children}</p>
);

// --- AuthCard ---
export const AuthCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-md w-full bg-white rounded-2xl shadow-md p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

// --- InputField ---
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, showToggle, className = '', type = 'text', ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = showToggle ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className={className}>
      <label htmlFor={props.id} className="block text-sm font-medium text-dark mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={inputType}
          aria-invalid={!!error}
          className={`w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition ${error ? 'border-red-500 focus:ring-red-200' : ''} ${showToggle ? 'pr-10' : ''}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-dark focus:outline-none"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
             {isPasswordVisible ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

// --- PrimaryButton ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ isLoading, disabled, children, className = '', ...props }) => (
  <button
    {...props}
    disabled={disabled || isLoading}
    className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
  >
    {isLoading ? (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : null}
    {children}
  </button>
);

// --- SecondaryButton ---
export const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-full shadow-sm text-sm font-medium text-dark bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all ${className}`}
  >
    {children}
  </button>
);

// --- RoleToggle ---
interface RoleToggleProps {
  role: 'student' | 'instructor';
  onChange: (role: 'student' | 'instructor') => void;
}

export const RoleToggle: React.FC<RoleToggleProps> = ({ role, onChange }) => (
  <div className="bg-gray-100 p-1 rounded-lg flex mb-6" role="radiogroup" aria-label="Select account type">
    <button
      type="button"
      role="radio"
      aria-checked={role === 'student'}
      onClick={() => onChange('student')}
      className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
        role === 'student' 
          ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' 
          : 'text-muted hover:text-dark'
      }`}
    >
      <span>Student</span>
      <span className="text-[10px] font-normal opacity-75">I want to learn</span>
    </button>
    <button
      type="button"
      role="radio"
      aria-checked={role === 'instructor'}
      onClick={() => onChange('instructor')}
      className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
        role === 'instructor' 
          ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' 
          : 'text-muted hover:text-dark'
      }`}
    >
      <span>Instructor</span>
      <span className="text-[10px] font-normal opacity-75">Teach & monetize</span>
    </button>
  </div>
);

// --- PasswordStrength ---
export const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (password.length > 0) score++;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1">
        <div className={`flex-1 rounded-full transition-colors ${strength >= 1 ? (strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
        <div className={`flex-1 rounded-full transition-colors ${strength >= 2 ? (strength === 2 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
        <div className={`flex-1 rounded-full transition-colors ${strength >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
      </div>
      <p className="text-[10px] text-muted mt-1 text-right">
        {strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : strength === 3 ? 'Strong' : ''}
      </p>
    </div>
  );
};

// --- SocialButton ---
interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'github';
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, className = '', ...props }) => (
  <button
    {...props}
    className={`w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-dark hover:bg-gray-50 transition-colors ${className}`}
  >
    {provider === 'google' ? (
      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ) : (
      <svg className="h-5 w-5 mr-2 text-dark" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )}
    Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
  </button>
);
