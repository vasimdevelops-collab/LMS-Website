import React from 'react';

const steps = [
  {
    step: 1,
    title: "Choose Your Track",
    description: "Browse our catalog and select a skill path that aligns with your career goals.",
    detail: "Over 50+ career paths available.",
  },
  {
    step: 2,
    title: "Learn with Guided Lessons",
    description: "Watch bite-sized videos, complete interactive quizzes, and track your daily progress.",
    detail: "Self-paced with mentor support.",
  },
  {
    step: 3,
    title: "Build Projects & Get Certified",
    description: "Apply what you've learned in real-world scenarios and earn a verified certificate.",
    detail: "Portfolio-ready projects included.",
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="bg-[#EEF2FF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">How It Works</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Starting a new career shouldn't be complicated. We've streamlined the journey into three simple stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => (
            <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-blue-50 relative flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-dark">{item.title}</h3>
              </div>
              
              <p className="text-muted leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>

              <div className="pt-4 border-t border-gray-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item.detail}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;