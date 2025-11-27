
import React, { useState, useEffect } from 'react';

// --- Types ---
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string; // "/mo" or "/yr"
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  priceValue: number; // numeric for calculations
}

// --- Icons ---
const CheckIcon = () => <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ChevronDownIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const LockIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const CreditCardIcon = () => <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;

// --- Components ---

/**
 * Pricing Tier Card
 */
export const PricingTierCard: React.FC<{
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
}> = ({ plan, onSelect }) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-sm border flex flex-col h-full transition-all hover:shadow-lg ${plan.isPopular ? 'border-primary ring-1 ring-primary shadow-md scale-105 md:scale-110 z-10' : 'border-gray-200'}`}>
      
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
          Most Popular
        </div>
      )}

      <div className="p-6 border-b border-gray-50 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
          <span className="text-gray-500 ml-1">{plan.period}</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
              <div className="flex-shrink-0 mt-0.5"><CheckIcon /></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <button 
          onClick={() => onSelect(plan)}
          className={`w-full py-3 rounded-xl font-bold transition-colors shadow-sm ${
            plan.isPopular 
              ? 'bg-primary text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {plan.buttonText}
        </button>
      </div>
    </div>
  );
};

/**
 * Feature Comparison Table
 * Responsive: Table on Desktop, Stacked Cards on Mobile.
 */
export const ComparisonTable: React.FC = () => {
  const features = [
    { name: 'Course Access', free: 'Limited', pro: 'Unlimited', ent: 'Unlimited' },
    { name: 'Certificates', free: false, pro: true, ent: true },
    { name: 'Offline Viewing', free: false, pro: true, ent: true },
    { name: 'Mentor Support', free: false, pro: 'Priority', ent: 'Dedicated' },
    { name: 'Team Analytics', free: false, pro: false, ent: true },
    { name: 'SSO Integration', free: false, pro: false, ent: true },
  ];

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-700 bg-white min-w-[150px]">Feature</th>
              <th className="p-4 font-bold text-gray-700 bg-white text-center min-w-[100px]">Free</th>
              <th className="p-4 font-bold text-primary bg-white text-center min-w-[100px]">Pro</th>
              <th className="p-4 font-bold text-gray-700 bg-white text-center min-w-[100px]">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {features.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600 font-medium">{row.name}</td>
                <td className="p-4 text-center text-gray-600">
                  {typeof row.free === 'boolean' ? (row.free ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : row.free}
                </td>
                <td className="p-4 text-center font-bold text-gray-900 bg-blue-50/30">
                  {typeof row.pro === 'boolean' ? (row.pro ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : row.pro}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {typeof row.ent === 'boolean' ? (row.ent ? <div className="flex justify-center"><CheckIcon /></div> : <div className="flex justify-center"><XIcon /></div>) : row.ent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="md:hidden space-y-4">
        {features.map((row, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="text-sm font-bold text-gray-900 border-b border-gray-50 pb-2">{row.name}</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
               <div className="flex flex-col items-center gap-1 text-center">
                 <span className="text-gray-400 font-medium mb-1">Free</span>
                 {typeof row.free === 'boolean' ? (row.free ? <CheckIcon /> : <XIcon />) : <span className="text-gray-600">{row.free}</span>}
               </div>
               <div className="flex flex-col items-center gap-1 text-center bg-blue-50/50 rounded p-1">
                 <span className="text-primary font-bold mb-1">Pro</span>
                 {typeof row.pro === 'boolean' ? (row.pro ? <CheckIcon /> : <XIcon />) : <span className="text-gray-900 font-bold">{row.pro}</span>}
               </div>
               <div className="flex flex-col items-center gap-1 text-center">
                 <span className="text-gray-400 font-medium mb-1">Ent</span>
                 {typeof row.ent === 'boolean' ? (row.ent ? <CheckIcon /> : <XIcon />) : <span className="text-gray-600">{row.ent}</span>}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * FAQ Accordion
 */
export const FAQAccordion: React.FC<{
  items: { question: string; answer: string }[];
}> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <button 
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-900 text-base">{item.question}</span>
              <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDownIcon />
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed animate-fade-in-down">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Checkout Modal
 */
export const CheckoutModal: React.FC<{
  plan: PricingPlan | null;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ plan, onClose, onSuccess }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', cardNumber: '', expiry: '', cvc: '' });

  // Reset on open
  useEffect(() => {
    if (plan) setStep('form');
  }, [plan]);

  if (!plan) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {step === 'form' && (
          <>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center border border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Plan</p>
                  <p className="font-bold text-gray-900">{plan.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{plan.price}</p>
                  <p className="text-xs text-gray-500">{plan.period}</p>
                </div>
              </div>

              {/* Form */}
              <form id="checkout-form" onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cardholder Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5"><CreditCardIcon /></span>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-mono"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-center"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={e => setFormData({...formData, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CVC</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={e => setFormData({...formData, cvc: e.target.value})}
                      />
                      <span className="absolute left-3 top-3 text-gray-400"><LockIcon /></span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                  <LockIcon /> Payments are secure and encrypted.
                </p>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{plan.price}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="text-gray-600">Tax (Estimated)</span>
                <span className="font-medium">$0.00</span>
              </div>
              <button 
                form="checkout-form"
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
              >
                Pay {plan.price}
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-96">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-primary rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
            <p className="text-gray-500 text-sm">Please do not close this window.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-96 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-500 text-sm mb-8">
              You have successfully upgraded to the <strong>{plan.name}</strong> plan. A receipt has been sent to your email.
            </p>
            <button 
              onClick={() => { onSuccess(); onClose(); }}
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
