import React from 'react';
import { AuthCard, PrimaryButton, SecondaryButton } from './SharedAuth';

interface SuccessScreenProps {
  title: string;
  message: string;
  primaryActionText: string;
  onPrimary: () => void;
  secondaryActionText?: string;
  onSecondary?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  message,
  primaryActionText,
  onPrimary,
  secondaryActionText,
  onSecondary,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <AuthCard className="text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2" role="status">
          {title}
        </h1>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          {message}
        </p>

        <div className="space-y-3">
          <PrimaryButton onClick={onPrimary}>
            {primaryActionText}
          </PrimaryButton>
          
          {secondaryActionText && onSecondary && (
            <SecondaryButton onClick={onSecondary}>
              {secondaryActionText}
            </SecondaryButton>
          )}
        </div>
      </AuthCard>
    </div>
  );
};

export default SuccessScreen;
