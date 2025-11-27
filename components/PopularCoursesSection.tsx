
import React, { useRef, useState } from 'react';

interface PopularCoursesSectionProps {
  onNavigate: (page: string) => void;
}

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development Bootcamp",
    category: "Web Development",
    description: "Become a full-stack developer with React, Node.js, and modern database tools.",
    duration: "24h",
    level: "Beginner",
    rating: "4.8",
    priceTag: "Included in Pro",
    highlight: true,
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    category: "Design",
    description: "Learn to design beautiful interfaces and user experiences from scratch.",
    duration: "18h",
    level: "Intermediate",
    rating: "4.9",
    priceTag: "Included in Pro",
    highlight: false,
  },
  {
    id: 3,
    title: "Data Science with Python",
    category: "Data Science",
    description: "Master Python libraries like Pandas and NumPy to analyze real-world data.",
    duration: "32h",
    level: "Advanced",
    rating: "4.7",
    priceTag: "Included in Pro",
    highlight: false,
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    category: "Mobile",
    description: "Build native iOS and Android apps using your existing JavaScript skills.",
    duration: "20h",
    level: "Intermediate",
    rating: "4.8",
    priceTag: "Included in Pro",
    highlight: false,
  },
  {
    id: 5,
    title: "DevOps Fundamentals",
    category: "DevOps",
    description: "Learn Docker, Kubernetes, and CI/CD pipelines to deploy apps like a pro.",
    duration: "15h",
    level: "Advanced",
    rating: "4.6",
    priceTag: "Included in Pro",
    highlight: false,
  },
];

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({ onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('All');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark">Popular Courses</h2>
            <p className="text-muted mt-1">Explore our highest-rated learning paths.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg self-start md:self-auto">
            {['All', 'Beginner', 'Advanced'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  activeTab === tab 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-muted hover:text-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-dark hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:flex focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards List */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course) => (
              <div 
                key={course.id}
                className={`min-w-[85vw] sm:min-w-[340px] md:min-w-[350px] bg-white rounded-xl p-5 border ${course.highlight ? 'border-blue-200 ring-1 ring-blue-50' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all snap-center flex flex-col`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 bg-gray-50 text-xs font-semibold text-gray-600 rounded-md uppercase tracking-wide">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-sm font-bold text-dark">{course.rating}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <h3 
                  className="text-lg font-bold text-dark mb-2 leading-tight cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onNavigate('course-details')}
                >
                  {course.title}
                </h3>
                <p className="text-muted text-sm mb-6 flex-grow">
                  {course.description}
                </p>

                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {course.level}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary bg-blue-50 px-2 py-1 rounded">
                      {course.priceTag}
                    </span>
                    <button 
                      onClick={() => onNavigate('course-details')}
                      className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1"
                      aria-label={`View details for ${course.title}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-dark hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:flex focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
