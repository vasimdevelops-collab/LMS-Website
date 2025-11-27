import React, { useState } from 'react';
import { 
  AuthCard, 
  InputField, 
  PrimaryButton, 
  SocialButton, 
  RoleToggle, 
  PasswordStrength,
  FormError
} from './SharedAuth';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

type Role = 'student' | 'instructor';

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as Role,
    bio: '',
    referralCode: '',
    agreeTerms: false,
  });

  const [showReferral, setShowReferral] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.role === 'instructor' && !formData.bio.trim()) {
      newErrors.bio = "Please provide a short bio for your instructor profile";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Signup payload:', formData);
      setIsLoading(false);
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <AuthCard>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark">Create your account</h1>
            <p className="text-muted text-sm mt-2">Join thousands of learners on EduWave</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            <RoleToggle 
              role={formData.role} 
              onChange={(role) => setFormData({...formData, role})} 
            />

            <InputField
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              error={errors.fullName}
            />

            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              error={errors.email}
            />

            <div>
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
              />
              <PasswordStrength password={formData.password} />
            </div>

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              error={errors.confirmPassword}
            />

            {formData.role === 'instructor' && (
              <div className="animate-fade-in-down">
                <label className="block text-sm font-medium text-dark mb-1">Short Bio / Expertise</label>
                <textarea
                  className={`w-full px-4 py-2 border ${errors.bio ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary transition-all h-24 resize-none`}
                  placeholder="Tell us about your teaching experience..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
                {errors.bio && <FormError>{errors.bio}</FormError>}
              </div>
            )}

            <div>
              {!showReferral ? (
                <button 
                  type="button" 
                  onClick={() => setShowReferral(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Have a promo code?
                </button>
              ) : (
                <InputField
                  id="referralCode"
                  label="Referral Code (Optional)"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                />
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="agreeTerms" className={`font-medium ${errors.agreeTerms ? 'text-red-600' : 'text-gray-600'}`}>
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
            {errors.agreeTerms && <FormError className="ml-6">{errors.agreeTerms}</FormError>}

            <PrimaryButton type="submit" isLoading={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </PrimaryButton>
          </form>

          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted">or sign up with</span>
            </div>
          </div>

          <div className="flex gap-4">
            <SocialButton provider="google" className="flex-1" />
            <SocialButton provider="github" className="flex-1" />
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('login')} 
              className="font-medium text-primary hover:text-blue-700 hover:underline"
            >
              Sign in
            </button>
          </p>

        </AuthCard>
      </div>
    </div>
  );
};

export default SignupPage;
