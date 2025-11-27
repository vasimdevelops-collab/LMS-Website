
import React, { useState } from 'react';
import { PricingTierCard, ComparisonTable, FAQAccordion, CheckoutModal, PricingPlan } from './PricingComponents';

interface PricingPageProps {
  onNavigate?: (page: string) => void;
}

// --- Data ---
const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for exploring new topics and basic learning.',
    features: ['Access to free courses', 'Community support', 'Basic progress tracking', '1 project per course'],
    buttonText: 'Get Started',
    priceValue: 0
  },
  {
    id: 'pro',
    name: 'Pro Learner',
    price: '$29',
    period: '/mo',
    description: 'Everything you need to become a professional developer.',
    features: ['Unlimited course access', 'Verified Certificates', 'Project reviews & feedback', 'Offline downloads', 'Priority support'],
    buttonText: 'Upgrade to Pro',
    isPopular: true,
    priceValue: 29
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    description: 'For teams and organizations scaling their workforce.',
    features: ['All Pro features', 'Team management dashboard', 'SSO & Advanced Security', 'Custom learning paths', 'Dedicated success manager'],
    buttonText: 'Contact Sales',
    priceValue: 99
  }
];

const FAQS = [
  { question: "Can I cancel my subscription anytime?", answer: "Yes, absolutely. You can cancel your subscription from your account settings at any time. You will retain access until the end of your billing period." },
  { question: "Is there a student discount?", answer: "We offer a 50% discount for students with a valid .edu email address. Contact support to apply." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal." },
  { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time. Prorated charges will apply automatically." },
  { question: "Do you offer refunds?", answer: "We offer a 30-day money-back guarantee for all Pro plans if you are not satisfied with the content." },
];

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [checkoutPlan, setCheckoutPlan] = useState<PricingPlan | null>(null);

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'free') {
      if (onNavigate) onNavigate('dashboard');
    } else if (plan.id === 'enterprise') {
      window.location.href = 'mailto:sales@eduwave.com';
    } else {
      setCheckoutPlan(plan);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-20">
      
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Invest in your future with <span className="text-primary">EduWave</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. Unlimited access to 120+ world-class courses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-12 md:-mt-16">
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PLANS.map(plan => (
            <PricingTierCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Compare Features</h2>
          <ComparisonTable />
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <FAQAccordion items={FAQS} />
        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        plan={checkoutPlan} 
        onClose={() => setCheckoutPlan(null)}
        onSuccess={() => {
          // In real app, update user state here
          if (onNavigate) onNavigate('dashboard');
        }}
      />

    </div>
  );
};

export default PricingPage;
