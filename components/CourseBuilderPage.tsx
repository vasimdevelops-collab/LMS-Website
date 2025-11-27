
import React, { useState } from 'react';
import { 
  CourseBasicInfoForm, 
  CurriculumManager, 
  MediaUploader, 
  QuizBuilder, 
  ModuleDraft,
  LessonDraft 
} from './CourseBuilderComponents';

interface CourseBuilderPageProps {
  onNavigate: (page: string) => void;
}

const CourseBuilderPage: React.FC<CourseBuilderPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'curriculum' | 'publish'>('plan');
  const [activeLesson, setActiveLesson] = useState<LessonDraft | null>(null);
  
  // Mock State
  const [modules, setModules] = useState<ModuleDraft[]>([
    {
      id: 'm1',
      title: 'Introduction',
      lessons: [
        { id: 'l1', title: 'Welcome to the course', type: 'video', status: 'ready', duration: '2:30' },
      ]
    }
  ]);

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handlePublish = () => {
    // Validate
    if (modules.length === 0 || modules[0].lessons.length === 0) {
      alert('Please add at least one module and lesson before publishing.');
      return;
    }
    alert('Course published!');
    onNavigate('instructor-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('instructor-dashboard')} className="text-gray-500 hover:text-gray-900">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             </button>
             <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px] sm:max-w-md">
               Untitled Course
               <span className="ml-2 bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded uppercase tracking-wide">Draft</span>
             </h1>
           </div>

           <div className="flex items-center gap-3">
             <button onClick={handleSaveDraft} className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
               Save Draft
             </button>
             <button 
               onClick={() => activeTab === 'publish' ? handlePublish() : setActiveTab('publish')}
               className="bg-primary text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
             >
               {activeTab === 'publish' ? 'Publish Now' : 'Next'}
             </button>
           </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex gap-8">
            {['plan', 'curriculum', 'publish'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 text-sm font-bold border-b-2 transition-colors capitalize ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 w-full">
         {activeTab === 'plan' && <CourseBasicInfoForm />}
         
         {activeTab === 'curriculum' && (
           <CurriculumManager 
             modules={modules} 
             onUpdateModules={setModules}
             onEditLesson={setActiveLesson} 
           />
         )}

         {activeTab === 'publish' && (
           <div className="max-w-2xl mx-auto text-center py-12">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Launch?</h2>
                 <p className="text-gray-500 mb-6">Review your course settings and curriculum before making it live.</p>
                 
                 <div className="grid grid-cols-3 gap-4 text-left mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                       <p className="text-xs text-gray-400 uppercase font-bold">Modules</p>
                       <p className="font-bold text-gray-900">{modules.length}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                       <p className="text-xs text-gray-400 uppercase font-bold">Lessons</p>
                       <p className="font-bold text-gray-900">{modules.reduce((acc, m) => acc + m.lessons.length, 0)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                       <p className="text-xs text-gray-400 uppercase font-bold">Price</p>
                       <p className="font-bold text-gray-900">Free</p>
                    </div>
                 </div>
                 
                 <button onClick={() => setActiveTab('curriculum')} className="text-primary text-sm font-bold hover:underline">
                   Review Curriculum
                 </button>
              </div>
           </div>
         )}
      </main>

      {/* Lesson Editor Drawer (Slide-over) */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex justify-end">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setActiveLesson(null)}></div>
           
           {/* Panel */}
           <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                 <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Editing Lesson</span>
                    <h3 className="font-bold text-gray-900">{activeLesson.title}</h3>
                 </div>
                 <button onClick={() => setActiveLesson(null)} className="p-2 hover:bg-gray-200 rounded-full">
                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                 <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Lesson Title</label>
                    <input 
                      type="text" 
                      defaultValue={activeLesson.title} 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                 </div>

                 {activeLesson.type === 'video' ? (
                   <div>
                      <h4 className="text-sm font-bold text-gray-700 mb-2">Video Content</h4>
                      <MediaUploader />
                   </div>
                 ) : (
                   <div>
                      <h4 className="text-sm font-bold text-gray-700 mb-2">Quiz Questions</h4>
                      <QuizBuilder />
                   </div>
                 )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                 <button onClick={() => setActiveLesson(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900">Cancel</button>
                 <button onClick={() => setActiveLesson(null)} className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm">Save Changes</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default CourseBuilderPage;
