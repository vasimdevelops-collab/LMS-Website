
import React from 'react';

// --- Types ---
export interface EnrolledCourse {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number; // 0-100
  lastLessonTitle?: string;
  status: 'in-progress' | 'completed' | 'not-started';
}

export interface Deadline {
  id: string;
  title: string;
  courseName: string;
  dueDate: string; // ISO date string or formatted
  isOverdue?: boolean;
  type: 'quiz' | 'assignment';
}

export interface Activity {
  id: string;
  type: 'lesson' | 'assignment' | 'certificate' | 'comment';
  text: string;
  timestamp: string;
}

export interface Certificate {
  id: string;
  courseName: string;
  issueDate: string;
  previewUrl: string;
}

// --- Icons ---
const PlayIcon = () => <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
const TrophyRealIcon = () => <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DownloadIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

// --- Components ---

export const DashboardHeader: React.FC<{ user: { name: string }; stats: { hoursLearned: number; completed: number; inProgress: number } }> = ({ user, stats }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="max-w-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-primary">{user.name}</span>! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              You've learned for <span className="font-semibold text-gray-900">{stats.hoursLearned} hours</span> this week. Keep it up!
            </p>
          </div>

          {/* Stats Cards - Responsive Wrap */}
          <div className="flex flex-wrap gap-3 items-start w-full md:w-auto">
             <div className="flex-1 min-w-[140px] max-w-[220px] bg-blue-50 border border-blue-100 rounded-xl p-4 text-center shadow-sm">
                <span className="block text-2xl md:text-3xl font-bold text-primary mb-1">{stats.inProgress}</span>
                <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wide">In Progress</span>
             </div>
             <div className="flex-1 min-w-[140px] max-w-[220px] bg-green-50 border border-green-100 rounded-xl p-4 text-center shadow-sm">
                <span className="block text-2xl md:text-3xl font-bold text-green-600 mb-1">{stats.completed}</span>
                <span className="block text-xs font-semibold text-green-600 uppercase tracking-wide">Completed</span>
             </div>
             <div className="flex-1 min-w-[140px] max-w-[220px] bg-purple-50 border border-purple-100 rounded-xl p-4 text-center shadow-sm">
                <span className="block text-2xl md:text-3xl font-bold text-purple-600 mb-1">Top 5%</span>
                <span className="block text-xs font-semibold text-purple-600 uppercase tracking-wide">Engagement</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const ContinueLearningCarousel: React.FC<{ courses: EnrolledCourse[]; onResume: (id: string) => void }> = ({ courses, onResume }) => {
  if (courses.length === 0) return null;

  return (
    <section className="mb-10 w-full min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </div>
      
      {/* 
        Responsive Container:
        - Mobile: Flex row with snap scrolling
        - Desktop (sm+): Grid layout
      */}
      <div className="
        flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar snap-x snap-mandatory
        sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 sm:snap-none
      ">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="
              snap-start shrink-0 
              min-w-[280px] w-[85vw] sm:w-auto sm:min-w-0
              bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col
            "
          >
            <div className="flex h-full">
              {/* Thumbnail Left */}
              <div className="w-1/3 relative shrink-0">
                <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/90 rounded-full p-2 shadow-sm">
                      <div className="text-primary w-4 h-4"><PlayIcon /></div>
                   </div>
                </div>
              </div>
              
              {/* Content Right */}
              <div className="w-2/3 p-4 flex flex-col justify-center min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate mb-1" title={course.title}>
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 truncate">
                  Next: {course.lastLessonTitle || "Introduction"}
                </p>
                
                <div className="mt-auto">
                   <div className="flex justify-between text-[10px] font-medium text-gray-500 mb-1">
                      <span>{course.progress}%</span>
                      <span>{course.completedLessons}/{course.totalLessons}</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                      <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                   </div>
                   <button 
                     onClick={() => onResume(course.id)}
                     className="w-full py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     Resume
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const EnrolledCoursesGrid: React.FC<{ courses: EnrolledCourse[]; onNavigate: (id: string) => void }> = ({ courses, onNavigate }) => {
  return (
    <section className="w-full min-w-0">
       <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Enrolled Courses</h2>
        <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
           <button className="px-3 py-1 bg-white shadow-sm text-xs font-bold rounded-md text-gray-900">All</button>
           <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">In Progress</button>
           <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">Completed</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:border-blue-100 transition-colors min-w-0">
            <div className="h-32 bg-gray-200 relative">
               <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
               <span className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded ${course.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-white/90 text-gray-700'}`}>
                 {course.status === 'completed' ? 'Completed' : 'In Progress'}
               </span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col min-w-0">
               <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 min-h-[3rem]" title={course.title}>
                 {course.title}
               </h3>
               <p className="text-xs text-gray-500 mb-4 truncate">{course.instructor}</p>
               
               <div className="mt-auto">
                 {course.status === 'completed' ? (
                   <button 
                     onClick={() => onNavigate(course.id)}
                     className="w-full py-2 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                   >
                     View Certificate
                   </button>
                 ) : (
                   <>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                     </div>
                     <button 
                       onClick={() => onNavigate(course.id)}
                       className="w-full py-2 bg-blue-50 text-primary text-sm font-bold rounded-lg hover:bg-blue-100 transition-colors"
                     >
                       Continue
                     </button>
                   </>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const SidebarWidgets: React.FC<{ deadlines: Deadline[]; activity: Activity[]; certificates: Certificate[] }> = ({ deadlines, activity, certificates }) => {
  return (
    <div className="space-y-8 w-full min-w-0">
      
      {/* Deadlines Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full">
         <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
            Upcoming Deadlines
            <span className="text-xs font-normal text-primary cursor-pointer hover:underline">View all</span>
         </h3>
         {deadlines.length > 0 ? (
           <ul className="space-y-4">
             {deadlines.map(d => (
               <li key={d.id} className="flex items-start gap-3 min-w-0">
                 <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.isOverdue ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
                 <div className="min-w-0 flex-1">
                   <p className={`text-sm font-medium leading-tight truncate ${d.isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
                     {d.title}
                   </p>
                   <p className="text-xs text-gray-400 mt-0.5 truncate">{d.courseName}</p>
                   <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 truncate">
                     <ClockIcon /> {d.dueDate} {d.isOverdue && <span className="text-red-500 font-bold ml-1">(Overdue)</span>}
                   </div>
                 </div>
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-sm text-gray-500 italic">No upcoming deadlines.</p>
         )}
      </div>

      {/* Certificates Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full">
         <h3 className="font-bold text-gray-900 mb-4">Achievements</h3>
         <div className="grid grid-cols-2 gap-3">
           {certificates.map(cert => (
             <div key={cert.id} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100 group cursor-pointer hover:border-blue-200 transition-colors min-w-0">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                   <TrophyRealIcon />
                </div>
                <p className="text-[10px] font-bold text-gray-800 line-clamp-1">{cert.courseName}</p>
                <button className="mt-2 text-[10px] text-primary font-bold flex items-center justify-center gap-1 mx-auto opacity-60 group-hover:opacity-100">
                   <DownloadIcon /> PDF
                </button>
             </div>
           ))}
           {/* Placeholder for empty slot or "See all" */}
           <div className="border border-dashed border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center text-gray-400 text-xs min-w-0">
              <span>+2 More</span>
           </div>
         </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full">
         <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
         <div className="relative pl-2 border-l border-gray-100 space-y-6">
            {activity.map(item => (
              <div key={item.id} className="relative pl-4 min-w-0">
                 <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-200 rounded-full border-2 border-white"></div>
                 <p className="text-sm text-gray-700 leading-snug line-clamp-2">{item.text}</p>
                 <span className="text-xs text-gray-400 mt-0.5 block truncate">{item.timestamp}</span>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};
