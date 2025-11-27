
import React, { useState, useEffect } from 'react';

// --- Types ---
export interface AssessmentItem {
  id: string;
  title: string;
  courseTitle: string;
  type: 'assignment' | 'quiz';
  dueDate: string; // "Oct 24, 11:59 PM"
  status: 'pending' | 'submitted' | 'late' | 'graded';
  score?: number;
  totalPoints: number;
  duration?: string; // for quizzes
  attemptsLeft?: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  options?: string[];
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  avatar: string;
  submittedAt: string;
  contentUrl?: string; // file or text
  status: 'new' | 'graded';
}

// --- Icons ---
const ClockIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AlertIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const FileIcon = () => <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

// --- Helper Components ---

const StatusBadge: React.FC<{ status: AssessmentItem['status'] }> = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    submitted: 'bg-blue-100 text-blue-700',
    late: 'bg-red-100 text-red-700',
    graded: 'bg-green-100 text-green-700',
  };
  
  const labels = {
    pending: 'Due Soon',
    submitted: 'Submitted',
    late: 'Late',
    graded: 'Graded',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

// --- List Component ---
export const AssessmentList: React.FC<{ 
  items: AssessmentItem[]; 
  onAction: (item: AssessmentItem) => void 
}> = ({ items, onAction }) => {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-4">
           {/* Icon / Type */}
           <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'quiz' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-primary'}`}>
             {item.type === 'quiz' ? (
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
             ) : (
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             )}
           </div>

           {/* Content */}
           <div className="flex-1 min-w-0">
             <div className="flex items-center gap-2 mb-1">
               <h3 className="font-bold text-gray-900 truncate" title={item.title}>{item.title}</h3>
               <StatusBadge status={item.status} />
             </div>
             <p className="text-sm text-gray-500 mb-1">{item.courseTitle}</p>
             <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className={`flex items-center gap-1 ${item.status === 'late' ? 'text-red-500 font-bold' : ''}`}>
                  <ClockIcon /> Due {item.dueDate}
                </span>
                {item.type === 'quiz' && (
                  <span>{item.duration} • {item.attemptsLeft} attempts left</span>
                )}
             </div>
           </div>

           {/* Action */}
           <div className="flex-shrink-0 flex items-center gap-3">
             {item.status === 'graded' && (
               <span className="font-bold text-gray-900 text-lg mr-2">
                 {item.score}/{item.totalPoints}
               </span>
             )}
             <button 
               onClick={() => onAction(item)}
               className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm ${
                 item.status === 'graded' || item.status === 'submitted'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-primary text-white hover:bg-blue-700'
               }`}
             >
               {item.status === 'graded' ? 'View Feedback' : item.type === 'quiz' ? 'Start Quiz' : 'Submit'}
             </button>
           </div>
        </div>
      ))}
    </div>
  );
};

// --- Quiz Runner ---
export const QuizRunner: React.FC<{ 
  quizTitle: string; 
  duration: number; // minutes
  questions: QuizQuestion[];
  onComplete: () => void;
  onExit: () => void;
}> = ({ quizTitle, duration, questions, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAnswer = (val: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: val }));
  };

  const isLastQuestion = currentQIndex === questions.length - 1;
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Sticky Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-10">
         <div>
           <h2 className="font-bold text-lg">{quizTitle}</h2>
           <p className="text-xs text-gray-400">Question {currentQIndex + 1} of {questions.length}</p>
         </div>
         <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            <ClockIcon /> {formatTime(timeLeft)}
         </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-1.5">
        <div className="bg-primary h-1.5 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Area */}
      <div className="p-8 min-h-[400px] flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {questions[currentQIndex].text}
          </h3>

          <div className="space-y-3">
             {questions[currentQIndex].type === 'mcq' && questions[currentQIndex].options?.map((opt, idx) => (
               <label key={idx} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[questions[currentQIndex].id] === opt ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                  <input 
                    type="radio" 
                    name={`q-${currentQIndex}`} 
                    className="w-5 h-5 text-primary focus:ring-primary"
                    checked={answers[questions[currentQIndex].id] === opt}
                    onChange={() => handleAnswer(opt)}
                  />
                  <span className="ml-3 font-medium text-gray-800">{opt}</span>
               </label>
             ))}

             {questions[currentQIndex].type === 'true-false' && (
               <div className="flex gap-4">
                 {['True', 'False'].map(opt => (
                   <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold text-lg transition-all ${answers[questions[currentQIndex].id] === opt ? 'border-primary bg-blue-50 text-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             )}

             {questions[currentQIndex].type === 'short-answer' && (
               <textarea 
                 className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                 rows={4}
                 placeholder="Type your answer here..."
                 value={answers[questions[currentQIndex].id] || ''}
                 onChange={(e) => handleAnswer(e.target.value)}
               />
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
           <button 
             onClick={onExit}
             className="text-gray-500 font-bold text-sm hover:text-red-500"
           >
             Exit Quiz
           </button>

           <div className="flex gap-3">
             <button 
               onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
               disabled={currentQIndex === 0}
               className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 disabled:opacity-50"
             >
               Previous
             </button>
             <button 
               onClick={() => isLastQuestion ? onComplete() : setCurrentQIndex(prev => prev + 1)}
               className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-700 shadow-md transition-colors"
             >
               {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Grading Workspace (Instructor) ---
export const GradingWorkspace: React.FC<{
  submissions: StudentSubmission[];
  onClose: () => void;
}> = ({ submissions, onClose }) => {
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const selectedSub = submissions.find(s => s.id === selectedSubId);

  const handleGrade = () => {
    alert(`Graded ${selectedSub?.studentName} with score ${score}`);
    setScore('');
    setFeedback('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F7FB] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-lg">Grading: Module 4 Final Project</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Queue */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm">
            Submission Queue ({submissions.length})
          </div>
          <div className="overflow-y-auto flex-1">
            {submissions.map(sub => (
              <button 
                key={sub.id} 
                onClick={() => setSelectedSubId(sub.id)}
                className={`w-full p-4 flex items-center gap-3 border-b border-gray-100 transition-colors text-left ${selectedSubId === sub.id ? 'bg-blue-50 border-blue-100' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={sub.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <div className={`font-bold text-sm ${selectedSubId === sub.id ? 'text-primary' : 'text-gray-900'}`}>{sub.studentName}</div>
                  <div className="text-xs text-gray-400">{sub.submittedAt}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Preview */}
        <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-y-auto">
           {selectedSub ? (
             <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl h-full min-h-[500px] flex flex-col items-center justify-center p-8 border border-gray-200">
                <FileIcon />
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Project_Submission.pdf</h3>
                <p className="text-gray-500 mb-6">Preview not available in this demo.</p>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">
                  Download File
                </button>
             </div>
           ) : (
             <p className="text-gray-400">Select a submission to grade.</p>
           )}
        </div>

        {/* Right: Evaluation */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
             <h3 className="font-bold text-gray-900 mb-4">Evaluation</h3>
             
             <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Score (out of 100)</label>
                <input 
                  type="number" 
                  className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-mono text-lg"
                  value={score}
                  onChange={e => setScore(e.target.value)}
                  placeholder="0"
                />
             </div>

             <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Feedback</label>
                <textarea 
                  className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition h-40 resize-none"
                  placeholder="Enter feedback for the student..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                />
             </div>

             <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-blue-800 mb-2">Rubric: Creativity</h4>
                <div className="flex gap-2 text-xs">
                   <button className="flex-1 py-1 bg-white border border-blue-200 rounded text-blue-600 hover:bg-blue-100">Low</button>
                   <button className="flex-1 py-1 bg-white border border-blue-200 rounded text-blue-600 hover:bg-blue-100">Med</button>
                   <button className="flex-1 py-1 bg-blue-600 text-white rounded font-bold">High</button>
                </div>
             </div>
          </div>
          
          <div className="p-6 border-t border-gray-100 bg-gray-50">
             <button 
               onClick={handleGrade}
               className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
             >
               Submit Grade
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
