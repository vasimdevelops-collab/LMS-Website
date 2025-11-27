
import React, { useState } from 'react';

// --- Types ---
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  threadCount: number;
  color: string; // Tailwind color class for icon bg
}

export interface Thread {
  id: string;
  title: string;
  author: { name: string; avatar?: string; role?: string };
  category: string;
  content: string; // Preview or full
  replies: number;
  views: number;
  likes: number;
  lastActive: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface ForumComment {
  id: string;
  author: { name: string; avatar?: string; role?: string };
  content: string;
  timestamp: string;
  likes: number;
  replies?: ForumComment[]; // Nested replies
}

// --- Icons ---
export const ChatIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
export const HeartIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
export const EyeIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
export const ChevronUpIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
export const PaperClipIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>;

// --- Components ---

export const CategoryCard: React.FC<{ category: ForumCategory; onClick: () => void }> = ({ category, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all text-left flex items-start gap-4 group w-full"
  >
    <div className={`p-3 rounded-xl ${category.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
      {category.icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{category.name}</h3>
      <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{category.description}</p>
      <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100">
        {category.threadCount.toLocaleString()} Threads
      </span>
    </div>
  </button>
);

export const ThreadListItem: React.FC<{ thread: Thread; onClick: () => void }> = ({ thread, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
         <div className="flex items-center gap-2 mb-1">
           {thread.isPinned && (
             <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">Pinned</span>
           )}
           <span className="text-xs font-medium text-gray-400">{thread.category}</span>
         </div>
         <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
           {thread.title}
         </h3>
         <p className="text-sm text-gray-500 line-clamp-2 mb-3">
           {thread.content}
         </p>
         
         <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
               <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                 <img src={thread.author.avatar || `https://ui-avatars.com/api/?name=${thread.author.name}&background=random`} alt="" className="w-full h-full object-cover" />
               </div>
               <span className="font-medium text-gray-600">{thread.author.name}</span>
            </div>
            <span>• {thread.lastActive}</span>
         </div>
      </div>

      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-gray-400">
         <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <ChatIcon />
            <span className="text-xs font-bold text-gray-600">{thread.replies}</span>
         </div>
         <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <HeartIcon />
            <span className="text-xs font-bold text-gray-600">{thread.likes}</span>
         </div>
      </div>
    </div>
  </div>
);

export const ReplyComposer: React.FC<{ onPost: (text: string) => void }> = ({ onPost }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    if (!text.trim()) return;
    onPost(text);
    setText('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <textarea
        className="w-full bg-white border-none text-gray-900 placeholder-gray-400 rounded-md p-0 focus:outline-none focus:ring-0 resize-y min-h-[100px]"
        placeholder="Write your reply here... (Markdown supported)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
        <div className="flex gap-2">
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Attach File">
             <PaperClipIcon />
           </button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors font-bold font-serif" title="Bold">B</button>
           <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors italic font-serif" title="Italic">I</button>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Post Reply
        </button>
      </div>
    </div>
  );
};

export const CommentItem: React.FC<{ comment: ForumComment; isNested?: boolean }> = ({ comment, isNested }) => {
  return (
    <div className={`flex gap-3 ${isNested ? 'ml-8 sm:ml-12 mt-4 border-l-2 border-gray-100 pl-4' : 'mt-6'}`}>
       <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.name}&background=random`} alt="" className="w-full h-full object-cover" />
       </div>
       <div className="flex-1">
          <div className="bg-gray-50 rounded-xl p-4">
             <div className="flex justify-between items-start mb-2">
               <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    {comment.author.name}
                    {comment.author.role && (
                      <span className="bg-blue-100 text-primary text-[10px] px-1.5 py-0.5 rounded uppercase">{comment.author.role}</span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-400">{comment.timestamp}</span>
               </div>
               <button className="text-gray-400 hover:text-primary transition-colors">
                  <HeartIcon />
               </button>
             </div>
             <div className="prose prose-sm max-w-none text-gray-700">
               <p>{comment.content}</p>
             </div>
          </div>
          <div className="flex items-center gap-4 mt-1 ml-2">
             <button className="text-xs font-bold text-gray-500 hover:text-dark">Reply</button>
             <button className="text-xs font-bold text-gray-500 hover:text-dark">Report</button>
          </div>

          {comment.replies?.map(reply => (
             <CommentItem key={reply.id} comment={reply} isNested />
          ))}
       </div>
    </div>
  );
};
