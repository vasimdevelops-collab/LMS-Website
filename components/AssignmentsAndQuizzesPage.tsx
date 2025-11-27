
import React, { useState } from 'react';
import { 
  AssessmentList, 
  QuizRunner, 
  GradingWorkspace, 
  AssessmentItem, 
  QuizQuestion,
  StudentSubmission 
} from './AssignmentComponents';

// --- Mock Data ---

const ASSESSMENTS: AssessmentItem[] = [
  { id: '1', title: 'Module 4: React Components Quiz', courseTitle: 'Web Development Bootcamp', type: 'quiz', dueDate: 'Today, 11:59 PM', status: 'pending', duration: '15 mins', attemptsLeft: 3, totalPoints: 20 },
  { id: '2', title: 'Persona & User Journey Map', courseTitle: 'UI/UX Masterclass', type: 'assignment', dueDate: 'Oct 28, 5:00 PM', status: 'pending', totalPoints: 100 },
  { id: '3', title: 'Python Functions Practice', courseTitle: 'Python Data Science', type: 'assignment', dueDate: 'Yesterday', status: 'late', totalPoints: 50 },
  { id: '4', title: 'Intro to CSS Grid', courseTitle: 'Web Development Bootcamp', type: 'quiz', dueDate: 'Oct 15', status: 'graded', score: 18, totalPoints: 20 },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', text: 'Which hook is used to handle side effects in React?', type: 'mcq', options: ['useState', 'useEffect', 'useContext', 'useReducer'] },
  { id: 'q2', text: 'React components must return a single root element.', type: 'true-false' },
  { id: 'q3', text: 'What is the virtual DOM?', type: 'short-answer' },
];

const SUBMISSIONS: StudentSubmission[] = [
  { id: 's1', studentName: 'Alice Johnson', avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random', submittedAt: 'Oct 24, 2:30 PM', status: 'new' },
  { id: 's2', studentName: 'Bob Smith', avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random', submittedAt: 'Oct 24, 3:15 PM', status: 'new' },
  { id: 's3', studentName: 'Charlie Davis', avatar: 'https://ui-avatars.com/api/?name=Charlie+Davis&background=random', submittedAt: 'Oct 23, 10:00 AM', status: 'new' },
];

interface PageProps {
  onNavigate: (page: string) => void;
}

const AssignmentsAndQuizzesPage: React.FC<PageProps> = ({ onNavigate }) => {
  // Mode: 'student' (lists), 'quiz' (runner), 'instructor' (grading)
  const [viewMode, setViewMode] = useState<'student' | 'quiz' | 'instructor'>('student');
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');
  const [activeQuiz, setActiveQuiz] = useState<AssessmentItem | null>(null);

  // Computed lists
  const filteredItems = ASSESSMENTS.filter(item => {
    if (filter === 'pending') return item.status === 'pending' || item.status === 'late';
    if (filter === 'graded') return item.status === 'graded' || item.status === 'submitted';
    return true;
  });

  const handleAction = (item: AssessmentItem) => {
    if (item.type === 'quiz' && item.status !== 'graded') {
      setActiveQuiz(item);
      setViewMode('quiz');
    } else {
      // For assignments or graded items, usually open details or upload modal
      alert(`Action triggered for ${item.title}`);
    }
  };

  // --- Renders ---

  if (viewMode === 'quiz' && activeQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <QuizRunner 
          quizTitle={activeQuiz.title} 
          duration={15} 
          questions={QUIZ_QUESTIONS}
          onComplete={() => {
            alert("Quiz Submitted!");
            setViewMode('student');
          }}
          onExit={() => {
            if (window.confirm("Exit quiz? Progress will be lost.")) setViewMode('student');
          }}
        />
      </div>
    );
  }

  if (viewMode === 'instructor') {
    return (
      <GradingWorkspace 
        submissions={SUBMISSIONS} 
        onClose={() => setViewMode('student')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h1 className="text-2xl font-bold text-gray-900">Assignments & Quizzes</h1>
               <p className="text-gray-500 mt-1">Track your progress and upcoming deadlines.</p>
             </div>
             
             {/* Demo Toggle for Reviewer */}
             <button 
               onClick={() => setViewMode('instructor')} 
               className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
             >
               Switch to Instructor View (Demo)
             </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {(['all', 'pending', 'graded'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? 'All Items' : f}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2">
             {filteredItems.length > 0 ? (
               <AssessmentList items={filteredItems} onAction={handleAction} />
             ) : (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                 <p className="text-gray-500">No {filter} items found.</p>
               </div>
             )}
          </div>

          <div className="hidden lg:block lg:col-span-1 space-y-6">
             {/* Stats Widget */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-4">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-600">Average Quiz Score</span>
                       <span className="font-bold text-gray-900">82%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2">
                       <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-600">Assignments On-Time</span>
                       <span className="font-bold text-gray-900">95%</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2">
                       <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                     </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Study Tip</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Quizzes with unlimited attempts are a great way to practice. Review the material and try again to improve your score!
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignmentsAndQuizzesPage;
