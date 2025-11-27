import React from 'react';

const PricingTeaserSection: React.FC = () => {
  return (
    <section className="bg-[#EEF2FF] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Flexible Plans</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">Simple pricing for every learner</h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Start for free and upgrade when you're ready to get certified.
          </p>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row text-left">
            
            {/* Free Column */}
            <div className="p-8 md:w-1/2 md:border-r border-gray-100">
              <h3 className="text-xl font-bold text-dark mb-2">Free Plan</h3>
              <p className="text-muted text-sm mb-6">Perfect for exploring new topics.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-green-500 font-bold">✓</span>
                  Access to first 2 modules of any course
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-green-500 font-bold">✓</span>
                  Join community forums
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 text-green-500 font-bold">✓</span>
                  Basic progress tracking
                </li>
              </ul>
            </div>

            {/* Pro Column */}
            <div className="p-8 md:w-1/2 bg-blue-50/30 relative">
              <div className="absolute top-0 right-0 bg-[#FF2AA8] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Pro Plan</h3>
              <p className="text-muted text-sm mb-6">For serious learners and career switchers.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm text-gray-800 font-medium">
                  <span className="mr-2 text-primary font-bold">✓</span>
                  Unlimited access to all 120+ courses
                </li>
                <li className="flex items-start text-sm text-gray-800 font-medium">
                  <span className="mr-2 text-primary font-bold">✓</span>
                  Verified Certificates of Completion
                </li>
                <li className="flex items-start text-sm text-gray-800 font-medium">
                  <span className="mr-2 text-primary font-bold">✓</span>
                  Code reviews & Mentor support
                </li>
              </ul>
              <div className="mt-2 text-primary font-semibold text-sm">
                Starting at ₹599/month
              </div>
            </div>

          </div>

          <div className="mt-10">
            <button className="px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
              View Detailed Pricing
            </button>
            <p className="text-xs text-muted mt-3">Cancel anytime. No hidden fees.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingTeaserSection;