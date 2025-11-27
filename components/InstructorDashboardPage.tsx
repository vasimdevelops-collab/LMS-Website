
import React from 'react';
import {
  InstructorHeader,
  AnalyticsOverview,
  CourseManagementTable,
  GradingQueue,
  MessagesInbox,
  InstructorCourse,
  Submission,
  Message
} from './InstructorDashboardComponents';

// --- Mock Data ---
const INSTRUCTOR_USER = { name: "Dr. Angela Yu" };
const INSTRUCTOR_STATS = {
  totalEarnings: "₹12,45,000",
  monthlyEarnings: "₹85,000",
  totalStudents: 15420,
  averageRating: 4.8
};

const MY_COURSES: InstructorCourse[] = [
  { id: '1', title: 'The Complete Python Pro Bootcamp', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'published', views: 45200, enrollments: 8500, rating: 4.9, revenue: '₹5.2L' },
  { id: '2', title: 'Web Development Bootcamp 2025', thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'published', views: 128000, enrollments: 24000, rating: 4.8, revenue: '₹18.5L' },
  { id: '3', title: 'Advanced React Patterns', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'draft', views: 0, enrollments: 0, rating: 0, revenue: '₹0' },
  { id: '4', title: 'Data Structures & Algorithms', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'published', views: 8900, enrollments: 1200, rating: 4.6, revenue: '₹1.8L' },
];

const PENDING_SUBMISSIONS: Submission[] = [
  { id: 's1', studentName: 'Jason Doe', assignmentTitle: 'Portfolio Website', courseTitle: 'Web Development Bootcamp', submittedAt: '2 hours ago', status: 'new' },
  { id: 's2', studentName: 'Sarah Smith', assignmentTitle: 'Data Cleaning Project', courseTitle: 'Python Bootcamp', submittedAt: '5 hours ago', status: 'new' },
  { id: 's3', studentName: 'Mike Ross', assignmentTitle: 'React To-Do App', courseTitle: 'Advanced React', submittedAt: '1 day ago', status: 'reviewed' },
];

const RECENT_MESSAGES: Message[] = [
  { id: 'm1', studentName: 'Emily Clark', courseTitle: 'Web Development Bootcamp', preview: 'Hi, I am stuck on the CSS Grid lesson. Can you explain the difference between auto-fit and auto-fill?', timeAgo: '10 mins ago', isUnread: true },
  { id: 'm2', studentName: 'David Wong', courseTitle: 'Python Bootcamp', preview: 'Is the certificate valid for job applications in FAANG companies?', timeAgo: '2 hours ago', isUnread: false },
  { id: 'm3', studentName: 'Jessica Jones', courseTitle: 'Data Structures', preview: 'Thanks for the great course! I just got my first internship.', timeAgo: '1 day ago', isUnread: false },
];

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
}

const InstructorDashboardPage: React.FC<InstructorDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12 overflow-x-hidden">
      
      <InstructorHeader 
        user={INSTRUCTOR_USER} 
        stats={INSTRUCTOR_STATS}
        onCreateCourse={() => onNavigate('course-builder')}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* Analytics Section */}
        <div className="mb-8">
          <AnalyticsOverview />
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Management (2/3) */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
             <CourseManagementTable courses={MY_COURSES} />
             
             {/* Bottom CTA Banner */}
             <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                   <h3 className="text-2xl font-bold mb-2">Ready to share more knowledge?</h3>
                   <p className="text-blue-100 max-w-md">Create your next bestseller course today. We've updated the course builder with new AI tools.</p>
                </div>
                <button 
                  onClick={() => onNavigate('course-builder')}
                  className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Start Creating
                </button>
             </div>
          </div>

          {/* Right Column: Communication & Tasks (1/3) */}
          <div className="lg:col-span-1 space-y-8 w-full min-w-0">
             <GradingQueue items={PENDING_SUBMISSIONS} />
             <MessagesInbox messages={RECENT_MESSAGES} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
