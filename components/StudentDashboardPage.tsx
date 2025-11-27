
import React, { useState } from 'react';
import { 
  DashboardHeader, 
  ContinueLearningCarousel, 
  EnrolledCoursesGrid, 
  SidebarWidgets,
  EnrolledCourse,
  Deadline,
  Activity,
  Certificate
} from './DashboardComponents';

// --- Mock Data ---
const USER = { name: "Alex" };
const STATS = { hoursLearned: 12.5, completed: 3, inProgress: 4 };

const COURSES: EnrolledCourse[] = [
  { id: '1', title: 'Full-Stack Web Development Bootcamp', thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: 'Angela Yu', totalLessons: 156, completedLessons: 42, progress: 27, lastLessonTitle: 'Intro to React Props', status: 'in-progress' },
  { id: '2', title: 'UI/UX Design Masterclass 2025', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: 'Gary Simon', totalLessons: 89, completedLessons: 80, progress: 90, lastLessonTitle: 'Final Capstone Project', status: 'in-progress' },
  { id: '3', title: 'Python for Data Science', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: 'Jose Portilla', totalLessons: 110, completedLessons: 110, progress: 100, status: 'completed' },
  { id: '4', title: 'Digital Marketing Strategy', thumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', instructor: 'Seth Godin', totalLessons: 45, completedLessons: 0, progress: 0, status: 'not-started' },
];

const DEADLINES: Deadline[] = [
  { id: 'd1', title: 'Module 4 Quiz', courseName: 'Full-Stack Bootcamp', dueDate: 'Today, 11:59 PM', type: 'quiz', isOverdue: false },
  { id: 'd2', title: 'Persona Assignment', courseName: 'UI/UX Masterclass', dueDate: 'Yesterday', type: 'assignment', isOverdue: true },
];

const ACTIVITY: Activity[] = [
  { id: 'a1', type: 'lesson', text: 'Completed "CSS Grid Layouts"', timestamp: '2 hours ago' },
  { id: 'a2', type: 'assignment', text: 'Submitted "Wireframe Project"', timestamp: '1 day ago' },
  { id: 'a3', type: 'certificate', text: 'Earned certificate for "Python for Data Science"', timestamp: '3 days ago' },
];

const CERTIFICATES: Certificate[] = [
  { id: 'c1', courseName: 'Python Data Science', issueDate: 'Oct 12, 2024', previewUrl: '#' },
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const StudentDashboardPage: React.FC<DashboardProps> = ({ onNavigate }) => {
  
  const handleResume = (courseId: string) => {
    // In a real app, you might fetch the specific last lesson ID for this course
    // For now, we just go to the generic lesson page
    console.log(`Resuming course ${courseId}`);
    onNavigate('lesson');
    window.scrollTo(0,0);
  };

  const inProgressCourses = COURSES.filter(c => c.status === 'in-progress').sort((a,b) => b.progress - a.progress);

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12 overflow-x-hidden">
      <DashboardHeader user={USER} stats={STATS} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Column (2/3 width on desktop) */}
          <main className="lg:col-span-2 order-1 min-w-0">
             {/* Continue Learning Carousel */}
             <ContinueLearningCarousel 
               courses={inProgressCourses} 
               onResume={handleResume} 
             />

             {/* All Courses Grid */}
             <div className="mt-8">
                <EnrolledCoursesGrid 
                  courses={COURSES} 
                  onNavigate={(id) => {
                     // If completed, maybe go to certificate or details? 
                     // If in progress, go to lesson. 
                     onNavigate('course-details');
                     window.scrollTo(0,0);
                  }}
                />
             </div>
          </main>

          {/* Right Sidebar Widgets (1/3 width on desktop) */}
          <aside className="lg:col-span-1 order-2 w-full min-w-0 space-y-8">
             <SidebarWidgets 
               deadlines={DEADLINES} 
               activity={ACTIVITY} 
               certificates={CERTIFICATES} 
             />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
