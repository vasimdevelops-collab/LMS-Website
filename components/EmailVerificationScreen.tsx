import React from 'react';
import { AuthCard, PrimaryButton, SecondaryButton } from './SharedAuth';

/**
 * Example usage:
 * <EmailVerificationScreen 
 *    status="success" 
 *    onContinue={() => navigate('dashboard')} 
 *    onResend={() => callApi()} 
 * />
 */

interface EmailVerificationScreenProps {
  status: 'verifying' | 'success' | 'error';
  onResend?: () => void;
  onContinue?: () => void;
}

const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({ status, onResend, onContinue }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <AuthCard className="text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2" role="status">Verifying your email...</h2>
            <p className="text-muted text-sm">Please wait while we secure your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2" role="status">Email verified!</h2>
            <p className="text-muted text-sm mb-8 leading-relaxed">
              Thanks — your email is now verified. You can continue to Login and access your dashboard.
            </p>
            <div className="space-y-3">
              <PrimaryButton onClick={onContinue}>
                Go to Dashboard
              </PrimaryButton>
              <SecondaryButton onClick={() => window.location.href = '/login'}>
                 Go to Login
              </SecondaryButton>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2" role="alert">Verification failed</h2>
            <p className="text-muted text-sm mb-8 leading-relaxed">
              This verification link is invalid or has expired. Please try requesting a new one.
            </p>
            <PrimaryButton onClick={onResend}>
              Resend verification
            </PrimaryButton>
          </>
        )}
      </AuthCard>
    </div>
  );
};

export default EmailVerificationScreen;
