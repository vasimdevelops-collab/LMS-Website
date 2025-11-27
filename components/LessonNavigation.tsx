
import React from 'react';

interface LessonNavigationBarProps {
  previousLesson?: { title: string; id: string };
  nextLesson?: { title: string; id: string };
  currentIndex: number;
  totalLessons: number;
  isCompleted?: boolean;
  onNavigate: (direction: 'prev' | 'next') => void;
  onMarkComplete: () => void;
}

export const LessonNavigationBar: React.FC<LessonNavigationBarProps> = ({
  previousLesson,
  nextLesson,
  currentIndex,
  totalLessons,
  isCompleted,
  onNavigate,
  onMarkComplete
}) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex items-center justify-between py-6 mt-8 border-t border-gray-100">
        {/* Previous */}
        <div className="flex-1">
          {previousLesson ? (
            <button 
              onClick={() => onNavigate('prev')}
              className="group flex items-center gap-3 text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-primary group-hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div>
                <span className="text-xs text-gray-400 block uppercase tracking-wide">Previous</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-dark line-clamp-1 max-w-[150px]">
                  {previousLesson.title}
                </span>
              </div>
            </button>
          ) : (
            <div className="w-8"></div> // Spacer
          )}
        </div>

        {/* Center Actions */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
           <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
             Lesson {currentIndex} of {totalLessons}
           </span>
           <button 
             onClick={onMarkComplete}
             className={`flex items-center gap-2 px-5 py-2 rounded-full border font-bold text-sm transition-all ${
               isCompleted 
                 ? 'bg-green-50 border-green-200 text-green-700' 
                 : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
             }`}
           >
             {isCompleted ? (
               <>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                 Completed
               </>
             ) : (
               <>
                 <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                 Mark Complete
               </>
             )}
           </button>
        </div>

        {/* Next */}
        <div className="flex-1 flex justify-end">
          {nextLesson ? (
            <button 
              onClick={() => onNavigate('next')}
              className="group flex items-center gap-3 text-right hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div>
                <span className="text-xs text-gray-400 block uppercase tracking-wide">Next</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-dark line-clamp-1 max-w-[150px]">
                  {nextLesson.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-primary group-hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ) : (
             <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
               Finish Course
             </button>
          )}
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 flex items-center gap-4 safe-area-pb">
        <button 
          onClick={() => onNavigate('prev')}
          disabled={!previousLesson}
          className="p-3 rounded-full border border-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={nextLesson ? () => onNavigate('next') : undefined}
          className="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {nextLesson ? (
            <>
              Next Lesson
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          ) : 'Finish Course'}
        </button>
      </div>
      {/* Spacer for mobile footer */}
      <div className="h-20 md:hidden"></div>
    </>
  );
};
