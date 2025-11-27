
import React, { useState } from 'react';
import { LessonPlayer, LessonResources, LessonOutline, Resource, Module } from './LessonComponents';
import { NotesPanel, LessonDiscussion, LessonAssessmentCTA, Note, Comment } from './LessonEngagement';
import { LessonNavigationBar } from './LessonNavigation';

// --- Mock Data ---
const MOCK_RESOURCES: Resource[] = [
  { id: '1', type: 'file', title: 'Lesson Slides', url: '#', size: '2.4 MB', updatedAt: '2 days ago', pinned: true },
  { id: '2', type: 'link', title: 'React Documentation', url: 'https://react.dev', updatedAt: '1 year ago' },
];

const MOCK_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to React',
    lessons: [
      { id: 'l1', title: 'What is React?', duration: '5:30', type: 'video', isCompleted: true },
      { id: 'l2', title: 'Setting up the Environment', duration: '12:15', type: 'video', isCompleted: true },
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Components & Props',
    lessons: [
      { id: 'l4', title: 'Creating your first Component', duration: '10:20', type: 'video', isCompleted: false },
      { id: 'l5', title: 'Understanding Props', duration: '15:00', type: 'video', isCompleted: false },
      { id: 'l7', title: 'Module Quiz', duration: '15:00', type: 'quiz', isCompleted: false, isLocked: false },
    ]
  }
];

const MOCK_NOTES: Note[] = [
  { id: 'n1', content: 'Remember to install Node.js v14 or higher.', timestamp: 65, timestampDisplay: '1:05', createdAt: '2 mins ago' },
  { id: 'n2', content: 'Props are read-only!', timestamp: 300, timestampDisplay: '5:00', createdAt: '1 hour ago' },
];

const MOCK_COMMENTS: Comment[] = [
  { 
    id: 'c1', 
    text: 'Does this work with Next.js too?', 
    author: { name: 'Jason D.', avatar: '' }, 
    likes: 4, 
    timestamp: '2 hours ago',
    replies: [
      { id: 'r1', text: 'Yes, absolutely! The concepts are the same.', author: { name: 'Angela Yu', role: 'Instructor' }, likes: 12, timestamp: '1 hour ago' }
    ]
  }
];

const LessonPage: React.FC = () => {
  const [currentLessonId, setCurrentLessonId] = useState('l4');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'outline' | 'notes'>('outline');
  
  // Engagement State
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  // Helper to find lesson
  const allLessons = MOCK_MODULES.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = allLessons[currentIndex];
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : undefined;

  const handleCreateNote = (content: string, timestamp?: number) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      timestamp,
      timestampDisplay: timestamp ? `${Math.floor(timestamp / 60)}:${(timestamp % 60).toString().padStart(2, '0')}` : undefined,
      createdAt: 'Just now'
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handlePostComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: { name: 'Me' },
      likes: 0,
      timestamp: 'Just now'
    };
    setComments([newComment, ...comments]);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && prevLesson) setCurrentLessonId(prevLesson.id);
    if (direction === 'next' && nextLesson) setCurrentLessonId(nextLesson.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
             <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
               <span className="cursor-pointer hover:text-primary">React Bootcamp</span>
               <span>/</span>
               <span>Module 2</span>
             </div>
             <h1 className="text-2xl font-bold text-gray-900 line-clamp-1">{currentLesson?.title}</h1>
          </div>
          <button 
             onClick={() => setActiveSidebarTab(activeSidebarTab === 'outline' ? 'notes' : 'outline')}
             className="md:hidden px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-sm"
          >
             {activeSidebarTab === 'outline' ? 'View Notes' : 'View Outline'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (Player + Discussion) */}
          <div className="lg:col-span-8 space-y-8">
            <LessonPlayer 
              title={currentLesson?.title || "Lesson"}
              videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
              captions={true}
              onComplete={() => setIsLessonCompleted(true)}
            />

            {/* Assessment CTA (Conditional) */}
            {currentLesson?.type === 'quiz' && (
              <LessonAssessmentCTA 
                assessment={{ id: 'q1', title: 'Module 2 Quiz', type: 'quiz', attemptsLeft: 3, duration: '15 mins', passingScore: 80 }}
                status="available"
                onStart={() => alert('Starting quiz...')}
                onViewResults={() => {}}
              />
            )}
            
            <LessonNavigationBar 
              previousLesson={prevLesson}
              nextLesson={nextLesson}
              currentIndex={currentIndex + 1}
              totalLessons={allLessons.length}
              isCompleted={isLessonCompleted}
              onNavigate={handleNavigate}
              onMarkComplete={() => setIsLessonCompleted(!isLessonCompleted)}
            />

            <LessonResources resources={MOCK_RESOURCES} />

            <div className="pt-4 border-t border-gray-200">
               <LessonDiscussion 
                 comments={comments} 
                 onPostComment={handlePostComment}
                 onReply={() => {}} 
                 onReact={() => {}}
               />
            </div>
          </div>

          {/* Right Sidebar (Outline / Notes) */}
          <div className="lg:col-span-4">
             <div className="sticky top-24 space-y-4">
               
               {/* Desktop Tabs */}
               <div className="hidden md:flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                 <button 
                   onClick={() => setActiveSidebarTab('outline')}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeSidebarTab === 'outline' ? 'bg-gray-100 text-dark' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Curriculum
                 </button>
                 <button 
                   onClick={() => setActiveSidebarTab('notes')}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeSidebarTab === 'notes' ? 'bg-gray-100 text-dark' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   My Notes
                 </button>
               </div>

               {/* Tab Content */}
               {activeSidebarTab === 'outline' ? (
                 <LessonOutline 
                   modules={MOCK_MODULES} 
                   currentLessonId={currentLessonId} 
                   onSelectLesson={setCurrentLessonId} 
                 />
               ) : (
                 <NotesPanel 
                   notes={notes}
                   onCreateNote={handleCreateNote}
                   onDeleteNote={handleDeleteNote}
                   onSeek={(t) => alert(`Seeking to ${t}s`)} // In real app, forward to player ref
                   currentTime={125} // Mock current time
                 />
               )}

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonPage;
