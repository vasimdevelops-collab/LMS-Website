
import React, { useState } from 'react';

// --- Types ---
export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface LessonDraft {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment';
  duration?: string; // "10:00"
  contentUrl?: string; // video url or file
  questions?: Question[];
  status: 'draft' | 'ready';
}

export interface ModuleDraft {
  id: string;
  title: string;
  lessons: LessonDraft[];
}

// --- Icons ---
const VideoIcon = () => <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const QuizIcon = () => <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const TrashIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const GripIcon = () => <svg className="w-4 h-4 text-gray-300 cursor-move" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>;
const UploadIcon = () => <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;

// --- Components ---

/**
 * Form for basic course metadata.
 */
export const CourseBasicInfoForm: React.FC = () => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Course Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input type="text" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" placeholder="e.g. Advanced React Design Patterns" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition h-32 resize-none" placeholder="What will students learn in this course?" />
            <p className="text-xs text-gray-500 mt-1">Markdown supported.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full bg-white border border-gray-200 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                <option>Web Development</option>
                <option>Data Science</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
              <select className="w-full bg-white border border-gray-200 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
        <div className="flex items-center gap-4 mb-4">
           <button 
             onClick={() => setIsPaid(false)}
             className={`flex-1 py-3 border rounded-lg font-medium transition-all ${!isPaid ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 hover:bg-gray-50'}`}
           >
             Free
           </button>
           <button 
             onClick={() => setIsPaid(true)}
             className={`flex-1 py-3 border rounded-lg font-medium transition-all ${isPaid ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 hover:bg-gray-50'}`}
           >
             Paid
           </button>
        </div>

        {isPaid && (
          <div className="animate-fade-in-down">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
            <div className="relative">
               <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
               <input type="number" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" placeholder="499" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Manages the tree of modules and lessons.
 */
export const CurriculumManager: React.FC<{ 
  modules: ModuleDraft[]; 
  onEditLesson: (lesson: LessonDraft) => void;
  onUpdateModules: (modules: ModuleDraft[]) => void;
}> = ({ modules, onEditLesson, onUpdateModules }) => {
  
  const addModule = () => {
    const newModule: ModuleDraft = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      lessons: []
    };
    onUpdateModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    const updated = modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, {
            id: Date.now().toString(),
            title: 'New Lesson',
            type: 'video' as const,
            status: 'draft' as const
          }]
        };
      }
      return m;
    });
    onUpdateModules(updated);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Curriculum</h2>
        <button 
          onClick={addModule}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          + Add Module
        </button>
      </div>

      {modules.map((module, mIdx) => (
        <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between group">
             <div className="flex items-center gap-3 flex-1 min-w-0">
               <GripIcon />
               <span className="font-bold text-gray-700 whitespace-nowrap">Module {mIdx + 1}:</span>
               <input 
                 defaultValue={module.title}
                 className="flex-1 min-w-0 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none font-medium text-gray-900 px-1 truncate"
               />
             </div>
             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs text-red-500 font-medium hover:underline">Delete</button>
             </div>
          </div>

          <div className="p-2 space-y-2">
             {module.lessons.length === 0 && (
               <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-lg m-2">
                 <p className="text-gray-400 text-sm">No lessons yet.</p>
               </div>
             )}
             
             {module.lessons.map((lesson, lIdx) => (
               <div 
                 key={lesson.id} 
                 className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group transition-colors cursor-pointer border border-transparent hover:border-blue-100"
                 onClick={() => onEditLesson(lesson)}
               >
                 <div className="flex items-center gap-3">
                   <GripIcon />
                   {lesson.type === 'quiz' ? <QuizIcon /> : <VideoIcon />}
                   <span className="text-sm font-medium text-gray-700">{lIdx + 1}. {lesson.title}</span>
                   {lesson.status === 'draft' && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded uppercase">Draft</span>}
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <span className="text-xs text-gray-400">{lesson.duration || '0:00'}</span>
                   <button 
                     className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                     onClick={(e) => { e.stopPropagation(); /* Delete logic */ }}
                   >
                     <TrashIcon />
                   </button>
                 </div>
               </div>
             ))}

             <button 
               onClick={() => addLesson(module.id)}
               className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 mt-2"
             >
               + Add Lesson
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Component to upload video/files.
 */
export const MediaUploader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleUpload}>
         <div className="bg-blue-50 p-4 rounded-full mb-3">
           <UploadIcon />
         </div>
         <p className="font-medium text-gray-900">Click to upload video</p>
         <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 2GB</p>
      </div>

      {(isUploading || progress === 100) && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
           <div className="flex justify-between text-sm mb-1">
             <span className="font-medium text-gray-700">{progress === 100 ? 'Upload Complete' : 'Uploading...'}</span>
             <span className="text-gray-500">{progress}%</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-2">
             <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
           </div>
        </div>
      )}
    </div>
  );
};

/**
 * Component to build quizzes.
 */
export const QuizBuilder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <input 
             type="text" 
             className="bg-transparent font-bold text-gray-900 border-b border-transparent focus:border-gray-300 outline-none w-full"
             placeholder="Question 1" 
          />
          <div className="flex items-center gap-2">
             <span className="text-xs text-gray-500 uppercase font-bold">Points:</span>
             <input type="number" className="w-12 text-xs border border-gray-300 rounded p-1" defaultValue={10} />
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
           {['Option A', 'Option B', 'Option C'].map((opt, i) => (
             <div key={i} className="flex items-center gap-3">
                <input type="radio" name="q1" className="text-primary focus:ring-primary" />
                <input type="text" className="flex-1 w-full bg-white border border-gray-200 text-gray-800 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder={opt} />
                <button className="text-gray-400 hover:text-red-500"><TrashIcon /></button>
             </div>
           ))}
        </div>
        <button className="text-xs text-primary font-bold hover:underline">+ Add Option</button>
      </div>

      <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 shadow-sm">
        + Add Question
      </button>
    </div>
  );
};
