
import React from 'react';

// --- Types ---
export interface InstructorStats {
  totalEarnings: string;
  monthlyEarnings: string;
  totalStudents: number;
  averageRating: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  thumbnail: string;
  status: 'published' | 'draft';
  views: number;
  enrollments: number;
  rating: number;
  revenue: string;
}

export interface Submission {
  id: string;
  studentName: string;
  studentAvatar?: string;
  assignmentTitle: string;
  courseTitle: string;
  submittedAt: string;
  status: 'new' | 'reviewed';
}

export interface Message {
  id: string;
  studentName: string;
  studentAvatar?: string;
  courseTitle: string;
  preview: string;
  timeAgo: string;
  isUnread: boolean;
}

// --- Icons ---
const PlusIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UserGroupIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CurrencyIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const EyeIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const StarIcon = () => <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const TrendingUpIcon = () => <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ChartIcon = () => <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

// --- Components ---

export const InstructorHeader: React.FC<{ 
  user: { name: string }; 
  stats: InstructorStats; 
  onCreateCourse: () => void; 
}> = ({ user, stats, onCreateCourse }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-primary text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Instructor</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Teaching {stats.totalStudents.toLocaleString()} students on EduWave</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 min-w-[180px]">
               <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CurrencyIcon /></div>
               <div>
                 <p className="text-xs text-gray-500 font-medium uppercase">Total Earnings</p>
                 <p className="text-lg font-bold text-gray-900">{stats.totalEarnings}</p>
               </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 min-w-[180px]">
               <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><UserGroupIcon /></div>
               <div>
                 <p className="text-xs text-gray-500 font-medium uppercase">Students</p>
                 <p className="text-lg font-bold text-gray-900">{stats.totalStudents}</p>
               </div>
            </div>
            <button 
              onClick={onCreateCourse}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 shadow-sm transition-all whitespace-nowrap"
            >
              <PlusIcon /> Create Course
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export const AnalyticsOverview: React.FC = () => {
  return (
    <section className="w-full min-w-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
        <select className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm max-w-[150px]">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Course Views', value: '12.5k', change: '+12%', color: 'blue' },
          { label: 'Completion Rate', value: '42%', change: '+5%', color: 'green' },
          { label: 'Engagement Score', value: '8.4', change: '+0.2', color: 'purple' },
          { label: 'Rev. per Course', value: '₹1,240', change: '+8%', color: 'yellow' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
             <p className="text-xs text-gray-500 font-medium uppercase mb-1">{metric.label}</p>
             <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                  <TrendingUpIcon /> {metric.change}
                </span>
             </div>
          </div>
        ))}
      </div>

      {/* Placeholder Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden">
         <div className="absolute inset-x-0 bottom-0 h-48 flex items-end justify-between px-6 opacity-10">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
              <div key={i} className="w-full mx-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
         </div>
         <div className="z-10 bg-gray-50 p-4 rounded-full mb-4 text-primary">
            <ChartIcon />
         </div>
         <h3 className="text-gray-900 font-bold z-10">Revenue Growth</h3>
         <p className="text-gray-500 text-sm z-10">Interactive charts would go here (using Recharts or Chart.js)</p>
      </div>
    </section>
  );
};

export const CourseManagementTable: React.FC<{ courses: InstructorCourse[] }> = ({ courses }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-bold text-gray-900 text-lg">My Courses</h3>
        <div className="flex bg-gray-50 rounded-lg p-0.5 self-start sm:self-auto">
          <button className="px-3 py-1.5 bg-white shadow-sm text-xs font-bold rounded-md text-gray-900">All</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">Published</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">Drafts</button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Enrollments</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail} alt="" className="w-14 h-10 flex-shrink-0 object-cover rounded bg-gray-200" />
                    <span className="font-semibold text-gray-900 truncate max-w-[200px]" title={course.title}>
                      {course.title}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600 font-medium">
                  {course.enrollments.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center text-gray-900 font-bold gap-1">
                    {course.rating} <StarIcon />
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="text-primary hover:text-blue-700 font-medium text-xs border border-primary/20 hover:border-primary rounded px-3 py-1.5 transition-colors">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <ul className="md:hidden divide-y divide-gray-100">
        {courses.map(course => (
          <li key={course.id} className="p-4 flex items-center gap-3 bg-white">
            <img src={course.thumbnail} alt="" className="w-14 h-10 object-cover rounded flex-shrink-0 bg-gray-200" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{course.title}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                 <span className="truncate">{course.enrollments.toLocaleString()} students</span>
                 <span>•</span>
                 <span className="font-medium text-gray-700 flex items-center gap-0.5">{course.rating} <StarIcon /></span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
               <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {course.status}
               </span>
               <button className="text-xs text-primary font-medium hover:underline">Manage</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const GradingQueue: React.FC<{ items: Submission[] }> = ({ items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full min-w-0 flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-sm">Grading Queue</h3>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{items.length} Pending</span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {items.length === 0 ? (
          <p className="p-4 text-center text-gray-400 text-xs">All caught up! No pending assignments.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2 min-w-0">
                   <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                     {item.studentAvatar && <img src={item.studentAvatar} className="w-full h-full object-cover" alt="" />}
                   </div>
                   <span className="text-xs font-semibold text-gray-900 truncate">{item.studentName}</span>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{item.submittedAt}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2 truncate">
                <span className="font-medium text-gray-800">{item.assignmentTitle}</span> • {item.courseTitle}
              </p>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-primary px-1.5 py-0.5 rounded">
                   {item.status === 'new' ? 'Needs Review' : 'Updated'}
                 </span>
                 <button className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                   Grade Now
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const MessagesInbox: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full min-w-0 flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-sm">Recent Messages</h3>
        <button className="text-primary text-xs font-bold hover:underline">View All</button>
      </div>

      <div className="divide-y divide-gray-100">
        {messages.map(msg => (
          <div key={msg.id} className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${msg.isUnread ? 'bg-blue-50/30' : ''}`}>
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={msg.studentAvatar || `https://ui-avatars.com/api/?name=${msg.studentName}&background=random`} alt="" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={`text-xs truncate pr-2 ${msg.isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {msg.studentName}
                    </h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{msg.timeAgo}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-0.5 truncate">{msg.courseTitle}</p>
                  <p className={`text-xs text-gray-600 line-clamp-1 ${msg.isUnread ? 'font-medium' : ''}`}>
                    {msg.preview}
                  </p>
               </div>
             </div>
             <div className="mt-2 pl-11">
               <button className="text-[10px] font-medium text-primary hover:text-blue-700 flex items-center gap-1">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                 Reply
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
