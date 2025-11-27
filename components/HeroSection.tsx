
import React from 'react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content (Spans 7 columns on desktop) */}
          <div className="flex flex-col text-center lg:text-left space-y-8 lg:col-span-7">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight tracking-tight">
                Level Up Your Skills with <span className="text-primary">Real-World</span> Courses
              </h1>
              
              <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Unlock your potential with over 100+ bite-sized lessons taught by industry experts. 
                Learn at your own pace and build a career you love with flexible, project-based learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10">
              <button 
                onClick={() => onNavigate('catalog')}
                aria-label="Browse all courses"
                className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
              >
                Browse Courses
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                aria-label="Start free trial"
                className="px-8 py-4 bg-white border-2 border-primary text-primary text-lg font-semibold rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
              >
                Start Free Trial
              </button>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-4 pt-2">
              <p className="text-sm text-muted font-medium">
                No credit card required. Cancel anytime.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-semibold text-dark">12k+ students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-semibold text-dark">120+ expert-led courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-sm font-semibold text-dark">4.8/5 average rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration/Card Area (Spans 5 columns on desktop) */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:col-span-5">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* Main Illustration Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 relative overflow-hidden z-10">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-dark">Popular Today</h3>
                  <p className="text-sm text-muted">Trending among students</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              {/* Course Chips */}
              <div className="space-y-4">
                {/* Item 1 */}
                <div 
                  onClick={() => onNavigate('course-details')}
                  role="button"
                  tabIndex={0}
                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg mr-4 shrink-0 group-hover:scale-105 transition-transform">
                    JS
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Advanced JavaScript Patterns</h4>
                    <span className="text-xs text-muted inline-flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      Advanced · 12h
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div 
                  onClick={() => onNavigate('course-details')}
                  role="button"
                  tabIndex={0}
                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mr-4 shrink-0 group-hover:scale-105 transition-transform">
                    UI
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Mastering User Interface Design</h4>
                    <span className="text-xs text-muted inline-flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      Beginner · 6h
                    </span>
                  </div>
                </div>

                 {/* Item 3 */}
                 <div 
                  onClick={() => onNavigate('course-details')}
                  role="button"
                  tabIndex={0}
                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                 >
                  <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold text-lg mr-4 shrink-0 group-hover:scale-105 transition-transform">
                    Py
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">Python for Data Science</h4>
                    <span className="text-xs text-muted inline-flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      Intermediate · 8.5h
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                 <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-medium">
                            U{i}
                        </div>
                    ))}
                 </div>
                 <button 
                   onClick={() => onNavigate('catalog')}
                   className="text-xs text-primary font-medium cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
                 >
                   View all courses &rarr;
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
