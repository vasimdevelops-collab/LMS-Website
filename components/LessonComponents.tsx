import React, { useState, useRef, useEffect } from 'react';

// --- Types ---
export interface Resource {
  id: string;
  type: 'file' | 'link';
  title: string;
  url: string;
  size?: string; // e.g. "2.4 MB"
  updatedAt: string;
  pinned?: boolean;
}

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'article';
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: LessonItem[];
}

// --- Icons ---
const FileIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PlayCircleIcon = () => (
  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

// --- LessonPlayer ---
interface LessonPlayerProps {
  title: string;
  videoUrl?: string;
  posterImage?: string;
  captions?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  title,
  videoUrl,
  posterImage,
  captions,
  onPlay,
  onPause,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'ArrowRight') {
        skip(5);
      } else if (e.code === 'ArrowLeft') {
        skip(-5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="w-full">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg group">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoUrl}
          poster={posterImage}
          controls // Using native controls for robust mobile/desktop support
          onPlay={() => { setIsPlaying(true); onPlay?.(); }}
          onPause={() => { setIsPlaying(false); onPause?.(); }}
          onEnded={() => { setIsPlaying(false); onComplete?.(); }}
          aria-label={`Lesson video: ${title}`}
        >
          {captions && <track kind="captions" />}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Control Bar (Speed & Transcript) */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 mt-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
           <span className="text-sm font-medium text-gray-700">Speed:</span>
           <div className="flex bg-gray-100 rounded-lg p-1">
             {[0.75, 1, 1.25, 1.5, 2].map(speed => (
               <button
                 key={speed}
                 onClick={() => changeSpeed(speed)}
                 className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                   playbackRate === speed 
                     ? 'bg-white text-primary shadow-sm' 
                     : 'text-gray-600 hover:text-gray-900'
                 }`}
               >
                 {speed}x
               </button>
             ))}
           </div>
        </div>

        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            showTranscript ? 'bg-primary text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        </button>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-6 max-h-64 overflow-y-auto">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Transcript</h3>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p><span className="text-primary font-mono text-xs mr-2">[00:00]</span> Welcome back to the course. In this lesson, we're going to dive deep into...</p>
            <p><span className="text-primary font-mono text-xs mr-2">[01:15]</span> As you can see from the diagram, the data flows from the client to the server...</p>
            <p><span className="text-primary font-mono text-xs mr-2">[03:45]</span> Now, let's open up our code editor and implement this function together.</p>
            <p className="opacity-50 italic">(Transcript continues...)</p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- LessonResources ---
interface LessonResourcesProps {
  resources: Resource[];
}

export const LessonResources: React.FC<LessonResourcesProps> = ({ resources }) => {
  const handleAction = (res: Resource) => {
    // In real app: trigger download or open window
    if (res.type === 'link') {
      window.open(res.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Downloading ${res.title}...`);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
         <h3 className="text-lg font-bold text-gray-900">Resources & Files</h3>
         <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{resources.length}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {resources.map((res) => (
            <li key={res.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-lg ${res.type === 'file' ? 'bg-red-50' : 'bg-blue-50'}`}>
                   {res.type === 'file' ? <FileIcon /> : <LinkIcon />}
                </div>
                <div>
                   <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                     {res.title}
                     {res.pinned && (
                       <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                         Instructor Pick
                       </span>
                     )}
                   </h4>
                   <p className="text-xs text-gray-500 mt-0.5">
                     {res.type === 'file' ? res.size : 'External Link'} • {res.updatedAt}
                   </p>
                </div>
              </div>

              <button
                onClick={() => handleAction(res)}
                className="p-2 text-gray-400 hover:text-primary hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                aria-label={res.type === 'file' ? "Download file" : "Open link"}
              >
                {res.type === 'file' ? <DownloadIcon /> : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- LessonOutline ---
interface LessonOutlineProps {
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}

export const LessonOutline: React.FC<LessonOutlineProps> = ({ modules, currentLessonId, onSelectLesson }) => {
  const activeRef = useRef<HTMLButtonElement>(null);
  const [openModules, setOpenModules] = useState<string[]>(modules.map(m => m.id)); // Default all open

  // Auto-scroll to active lesson
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentLessonId]);

  const toggleModule = (modId: string) => {
    setOpenModules(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  return (
    <nav aria-label="Course outline" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col max-h-[calc(100vh-120px)]">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-900">Course Content</h3>
        <p className="text-xs text-gray-500 mt-1">32% Completed</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
           <div className="bg-green-500 h-1.5 rounded-full w-[32%]"></div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-100 last:border-0">
            <button 
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
              aria-expanded={openModules.includes(module.id)}
            >
              <div className="font-semibold text-gray-800 text-sm">
                {module.title}
              </div>
              <svg 
                className={`w-4 h-4 text-gray-400 transform transition-transform ${openModules.includes(module.id) ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openModules.includes(module.id) && (
              <ul className="bg-gray-50/50">
                {module.lessons.map((lesson, idx) => {
                  const isActive = lesson.id === currentLessonId;
                  return (
                    <li key={lesson.id}>
                      <button
                        ref={isActive ? activeRef : null}
                        onClick={() => !lesson.isLocked && onSelectLesson(lesson.id)}
                        disabled={lesson.isLocked}
                        className={`w-full flex items-start gap-3 p-3 text-left border-l-4 transition-all ${
                          isActive 
                            ? 'bg-blue-50 border-primary text-primary' 
                            : 'border-transparent hover:bg-gray-100 text-gray-600'
                        } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                         <div className="mt-0.5 flex-shrink-0">
                           {lesson.isLocked ? <LockIcon /> : (
                             lesson.isCompleted ? <CheckCircleIcon /> : (
                               isActive ? <PlayCircleIcon /> : (
                                 <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                               )
                             )
                           )}
                         </div>
                         <div>
                           <div className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                             {idx + 1}. {lesson.title}
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {lesson.duration}
                              </span>
                              {lesson.type === 'quiz' && (
                                <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 rounded uppercase font-bold">Quiz</span>
                              )}
                           </div>
                         </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};