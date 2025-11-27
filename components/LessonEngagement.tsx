
import React, { useState, useEffect } from 'react';

// --- Types ---
export interface Note {
  id: string;
  timestamp?: number; // seconds
  timestampDisplay?: string; // "02:15"
  content: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: { name: string; avatar?: string; role?: string };
  text: string;
  timestamp: string; // "2 hours ago"
  likes: number;
  replies?: Comment[];
  isPinned?: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'assignment';
  duration?: string; // "15 mins"
  attemptsLeft?: number;
  dueDate?: string;
  score?: number; // percentage
  passingScore?: number;
}

// --- Icons ---
const TrashIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const ClockIcon = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SendIcon = () => <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const LockIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const CheckIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

// --- Components ---

/**
 * NotesPanel
 * Allows users to take timestamped notes.
 */
interface NotesPanelProps {
  notes: Note[];
  onCreateNote: (content: string, timestamp?: number) => void;
  onDeleteNote: (id: string) => void;
  onSeek: (time: number) => void;
  currentTime?: number; // Optional current time to pre-fill
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ notes, onCreateNote, onDeleteNote, onSeek, currentTime = 0 }) => {
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSave = () => {
    if (!draft.trim()) return;
    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      onCreateNote(draft, currentTime);
      setDraft('');
      setIsSaving(false);
    }, 600);
  };

  const filteredNotes = notes.filter(n => n.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">My Notes</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{notes.length}</span>
      </div>

      {/* Editor */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <textarea
          className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none text-sm"
          rows={3}
          placeholder="Type a note... (Markdown supported)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <button 
            type="button"
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            onClick={() => setDraft(prev => prev + ` @${formatTime(currentTime)} `)}
          >
            <ClockIcon /> Add timestamp ({formatTime(currentTime)})
          </button>
          <button
            onClick={handleSave}
            disabled={!draft.trim() || isSaving}
            className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>

      {/* Search (if notes exist) */}
      {notes.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100">
           <input 
             type="text" 
             placeholder="Search notes..." 
             className="w-full text-xs py-1.5 px-2 bg-gray-50 rounded border border-transparent focus:bg-white focus:border-blue-200 focus:outline-none transition-all"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">
            {search ? 'No matches found.' : 'No notes yet. Start typing above!'}
          </p>
        )}
        {filteredNotes.map(note => (
          <div key={note.id} className="group relative pl-3 border-l-2 border-gray-200 hover:border-primary transition-colors">
            <div className="flex justify-between items-start">
               <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                 <span>{note.createdAt}</span>
                 {note.timestamp !== undefined && (
                   <button 
                     onClick={() => onSeek(note.timestamp!)}
                     className="bg-blue-50 text-primary px-1.5 rounded hover:bg-blue-100 transition-colors font-mono"
                   >
                     {note.timestampDisplay}
                   </button>
                 )}
               </div>
               <button 
                 onClick={() => onDeleteNote(note.id)}
                 className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 aria-label="Delete note"
               >
                 <TrashIcon />
               </button>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * LessonDiscussion
 * Threaded comments section.
 */
interface LessonDiscussionProps {
  comments: Comment[];
  onPostComment: (text: string) => void;
  onReply: (commentId: string, text: string) => void;
  onReact: (commentId: string) => void;
}

export const LessonDiscussion: React.FC<LessonDiscussionProps> = ({ comments, onPostComment, onReply, onReact }) => {
  const [newComment, setNewComment] = useState('');

  const handlePost = () => {
    if (!newComment.trim()) return;
    onPostComment(newComment);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Discussion ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})</h3>
        <p className="text-sm text-gray-500 hidden sm:block">Be respectful and helpful to your peers.</p>
      </div>

      {/* Composer */}
      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
           <img src={`https://ui-avatars.com/api/?name=Me&background=random`} alt="My Avatar" />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none shadow-sm"
            rows={2}
            placeholder="Ask a question or share a thought..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handlePost}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              Post Comment <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="group">
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                 <img src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.name}&background=random`} alt={comment.author.name} />
               </div>
               <div className="flex-1">
                 <div className="bg-gray-50 rounded-xl p-4 relative">
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-gray-900 text-sm">
                         {comment.author.name}
                         {comment.author.role === 'Instructor' && (
                           <span className="ml-2 bg-blue-100 text-primary text-[10px] uppercase px-1.5 py-0.5 rounded font-bold">Instructor</span>
                         )}
                       </h4>
                       <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                       <button onClick={() => onReact(comment.id)} className="text-xs font-medium text-gray-500 hover:text-primary flex items-center gap-1">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                         {comment.likes || 0}
                       </button>
                       <button className="text-xs font-medium text-gray-500 hover:text-dark">Reply</button>
                    </div>
                 </div>

                 {/* Replies */}
                 {comment.replies && comment.replies.length > 0 && (
                   <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100 ml-4">
                     {comment.replies.map(reply => (
                       <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                             <img src={reply.author.avatar || `https://ui-avatars.com/api/?name=${reply.author.name}&background=random`} alt={reply.author.name} />
                          </div>
                          <div className="bg-white border border-gray-100 rounded-xl p-3 flex-1">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-gray-900 text-xs">{reply.author.name}</h4>
                                <span className="text-[10px] text-gray-400">{reply.timestamp}</span>
                             </div>
                             <p className="text-xs text-gray-700">{reply.text}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * LessonAssessmentCTA
 * Contextual card for quizzes/assignments.
 */
interface LessonAssessmentCTAProps {
  assessment: Assessment;
  status: 'locked' | 'available' | 'in-progress' | 'submitted';
  onStart: () => void;
  onViewResults: () => void;
}

export const LessonAssessmentCTA: React.FC<LessonAssessmentCTAProps> = ({ assessment, status, onStart, onViewResults }) => {
  const isLocked = status === 'locked';
  const isSubmitted = status === 'submitted';

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
      {/* Decorative accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isLocked ? 'bg-gray-300' : isSubmitted ? 'bg-green-500' : 'bg-primary'}`}></div>

      <div className="p-3 rounded-full bg-gray-50 text-gray-600 flex-shrink-0">
        {isLocked ? <LockIcon /> : isSubmitted ? <CheckIcon /> : (
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-bold text-gray-900 text-lg flex items-center justify-center sm:justify-start gap-2">
          {assessment.title}
          {isLocked && <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Locked</span>}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {isSubmitted 
            ? `You scored ${assessment.score}% (Passing: ${assessment.passingScore}%)` 
            : `${assessment.type === 'quiz' ? 'Quiz' : 'Assignment'} • ${assessment.duration || 'Untimed'} • ${assessment.attemptsLeft} attempts left`
          }
        </p>
      </div>

      <div className="flex-shrink-0">
         {isSubmitted ? (
           <button 
             onClick={onViewResults}
             className="px-5 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors"
           >
             View Results
           </button>
         ) : (
           <button 
             onClick={onStart}
             disabled={isLocked}
             className="px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all hover:scale-105"
           >
             {status === 'in-progress' ? 'Resume Quiz' : 'Start Quiz'}
           </button>
         )}
      </div>
    </div>
  );
};
