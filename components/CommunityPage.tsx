
import React, { useState } from 'react';
import { 
  CategoryCard, 
  ThreadListItem, 
  ReplyComposer, 
  CommentItem,
  ForumCategory,
  Thread,
  ForumComment,
  ChevronUpIcon
} from './CommunityComponents';

// --- Mock Data ---
const CATEGORIES: ForumCategory[] = [
  { id: '1', name: 'General Discussion', description: 'Hangout, introductions, and off-topic chat.', threadCount: 1240, icon: <span className="text-xl">💬</span>, color: 'bg-blue-500' },
  { id: '2', name: 'Web Development', description: 'React, Node.js, CSS, and all things web.', threadCount: 850, icon: <span className="text-xl">💻</span>, color: 'bg-indigo-500' },
  { id: '3', name: 'Data Science', description: 'Python, Pandas, ML, and AI discussions.', threadCount: 420, icon: <span className="text-xl">📊</span>, color: 'bg-green-500' },
  { id: '4', name: 'Career Advice', description: 'Resume reviews, interview prep, and job hunting.', threadCount: 310, icon: <span className="text-xl">💼</span>, color: 'bg-purple-500' },
  { id: '5', name: 'Course Support', description: 'Get help with specific course exercises.', threadCount: 2100, icon: <span className="text-xl">🎓</span>, color: 'bg-orange-500' },
  { id: '6', name: 'Project Showcase', description: 'Show off what you’ve built!', threadCount: 150, icon: <span className="text-xl">🚀</span>, color: 'bg-pink-500' },
];

const THREADS: Thread[] = [
  { id: 't1', title: 'Best resources to learn React in 2025?', author: { name: 'Alex M.' }, category: 'Web Development', content: 'I am just starting out and there are so many tutorials. Which ones do you recommend for a complete beginner who knows JS?', replies: 24, views: 1205, likes: 45, lastActive: '2 hours ago', isPinned: true },
  { id: 't2', title: 'Stuck on Module 4: API Integration', author: { name: 'Sarah J.' }, category: 'Course Support', content: 'I keep getting a CORS error when trying to fetch from the example API. Has anyone else encountered this?', replies: 8, views: 340, likes: 2, lastActive: '5 mins ago' },
  { id: 't3', title: 'Just landed my first job! Here is my advice.', author: { name: 'David Chen', role: 'Alumni' }, category: 'Career Advice', content: 'After 6 months of intense study on EduWave, I finally got an offer. Here are the top 3 things that helped me pass the interview.', replies: 156, views: 5400, likes: 320, lastActive: '1 day ago', tags: ['Success Story', 'Interview'] },
];

const COMMENTS: ForumComment[] = [
  { 
    id: 'c1', 
    author: { name: 'Angela Yu', role: 'Instructor' }, 
    content: 'Great question! We actually just updated our React roadmap. Check out the pinned post in the Announcements section.', 
    timestamp: '1 hour ago', 
    likes: 12,
    replies: [
       { id: 'c1-1', author: { name: 'Alex M.' }, content: 'Oh awesome, I missed that. Thanks Angela!', timestamp: '55 mins ago', likes: 2 }
    ]
  },
  { 
    id: 'c2', 
    author: { name: 'Mike Ross' }, 
    content: 'I highly recommend the official docs too, they are much better now.', 
    timestamp: '45 mins ago', 
    likes: 5 
  }
];

interface CommunityPageProps {
  onNavigate?: (page: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  // State
  const [view, setView] = useState<'categories' | 'list' | 'detail'>('categories');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);

  // Computed
  const displayedThreads = activeCategory 
    ? THREADS.filter(t => t.category === CATEGORIES.find(c => c.id === activeCategory)?.name)
    : THREADS;

  // Handlers
  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setView('list');
    window.scrollTo(0,0);
  };

  const handleThreadClick = (thread: Thread) => {
    setActiveThread(thread);
    setView('detail');
    window.scrollTo(0,0);
  };

  const handleBack = () => {
    if (view === 'detail') {
      setView('list');
    } else {
      setView('categories');
      setActiveCategory(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
                 <p className="text-gray-500 mt-1">Connect, learn, and share with 15,000+ students.</p>
              </div>
              <div className="flex gap-3">
                 <input 
                   type="text" 
                   placeholder="Search discussions..." 
                   className="pl-4 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                 />
                 <button className="bg-primary text-white font-bold px-5 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors whitespace-nowrap">
                   + New Post
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar (Desktop Navigation) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <nav className="space-y-1">
                   <button 
                     onClick={() => { setView('categories'); setActiveCategory(null); }}
                     className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${view === 'categories' ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                   >
                     Home
                   </button>
                   <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                     My Threads
                   </button>
                   <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                     Popular This Week
                   </button>
                </nav>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3 px-2">Categories</h3>
                <nav className="space-y-1">
                   {CATEGORIES.map(cat => (
                     <button 
                       key={cat.id}
                       onClick={() => handleCategoryClick(cat.id)}
                       className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                        <span className={`w-2 h-2 rounded-full ${cat.color.replace('bg-', 'bg-')}`}></span>
                        {cat.name}
                     </button>
                   ))}
                </nav>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
             
             {/* Breadcrumb / Back Button */}
             {view !== 'categories' && (
               <button 
                 onClick={handleBack}
                 className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
               >
                 <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 Back to {view === 'detail' ? 'Threads' : 'Categories'}
               </button>
             )}

             {/* VIEW 1: Categories Grid */}
             {view === 'categories' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                 {CATEGORIES.map(cat => (
                   <CategoryCard key={cat.id} category={cat} onClick={() => handleCategoryClick(cat.id)} />
                 ))}
               </div>
             )}

             {/* VIEW 2: Thread List */}
             {view === 'list' && (
               <div className="space-y-4 animate-fade-in-up">
                 <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.name : 'All Threads'}
                    </h2>
                    <select className="text-sm border-gray-200 rounded-lg focus:ring-primary focus:border-primary">
                       <option>Newest First</option>
                       <option>Most Active</option>
                    </select>
                 </div>
                 {displayedThreads.length > 0 ? (
                   displayedThreads.map(thread => (
                     <ThreadListItem key={thread.id} thread={thread} onClick={() => handleThreadClick(thread)} />
                   ))
                 ) : (
                   <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                      <p className="text-gray-500">No threads found in this category yet.</p>
                      <button className="mt-2 text-primary font-bold hover:underline">Start the discussion!</button>
                   </div>
                 )}
               </div>
             )}

             {/* VIEW 3: Thread Detail */}
             {view === 'detail' && activeThread && (
               <div className="animate-fade-in-up">
                 {/* Original Post */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
                    <div className="flex gap-4">
                       <div className="flex flex-col items-center gap-1">
                          <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors">
                             <ChevronUpIcon />
                          </button>
                          <span className="font-bold text-lg text-gray-900">{activeThread.likes}</span>
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">{activeThread.category}</span>
                             {activeThread.tags?.map(tag => (
                               <span key={tag} className="bg-blue-50 text-primary text-xs font-bold px-2 py-0.5 rounded">#{tag}</span>
                             ))}
                             <span className="text-xs text-gray-400 ml-auto">{activeThread.lastActive}</span>
                          </div>
                          <h1 className="text-2xl font-bold text-gray-900 mb-4">{activeThread.title}</h1>
                          <div className="prose max-w-none text-gray-800 mb-6">
                             <p>{activeThread.content}</p>
                             <p>Any advice would be greatly appreciated!</p>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                  <img src={activeThread.author.avatar || `https://ui-avatars.com/api/?name=${activeThread.author.name}&background=random`} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-bold text-gray-900">{activeThread.author.name}</span>
                             </div>
                             <div className="flex gap-4">
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Share</button>
                                <button className="text-sm font-medium text-gray-500 hover:text-red-600">Report</button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Comments */}
                 <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                       {activeThread.replies} Replies
                    </h3>
                    <div className="space-y-6">
                       {COMMENTS.map(c => <CommentItem key={c.id} comment={c} />)}
                    </div>
                 </div>

                 {/* Composer */}
                 <div className="mb-12">
                    <h3 className="font-bold text-gray-900 mb-4">Leave a Reply</h3>
                    <ReplyComposer onPost={(text) => alert(`Posted: ${text}`)} />
                 </div>
               </div>
             )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
