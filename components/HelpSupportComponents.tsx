
import React, { useState } from 'react';

// --- Types ---
export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  readTime: string; // "3 min read"
  views: number;
}

export interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// --- Icons ---
export const SearchIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
export const BookOpenIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
export const CreditCardIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
export const DesktopComputerIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
export const WrenchIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const DocumentTextIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
export const PaperClipIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>;
export const ChatAltIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
export const XIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// --- Components ---

/**
 * Help Hero Search
 */
export const HelpHero: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  return (
    <div className="bg-primary py-16 md:py-24 text-center relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">How can we help you today?</h1>
        <p className="text-blue-100 mb-8 text-lg">Search our knowledge base or browse categories below.</p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            placeholder="Search articles (e.g., 'reset password', 'billing')" 
            className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-shadow bg-white"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Category Card
 */
export const CategoryCard: React.FC<{ category: SupportCategory }> = ({ category }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group h-full flex flex-col">
      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
        {category.icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {category.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {category.description}
      </p>
    </div>
  );
};

/**
 * Article List Item
 */
export const ArticleListItem: React.FC<{ article: HelpArticle }> = ({ article }) => {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group cursor-pointer">
      <div className="mt-1 text-gray-400 group-hover:text-primary transition-colors">
        <DocumentTextIcon />
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-0.5 rounded">{article.category}</span>
          <span>• {article.readTime}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Contact Support Form
 */
export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thanks for reaching out. Our support team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Still need help?</h3>
      <p className="text-gray-500 mb-6 text-sm">Fill out the form below and we'll be in touch.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name</label>
            <input required type="text" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
            <input required type="email" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" placeholder="john@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Issue Type</label>
          <select className="w-full bg-white border border-gray-200 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
            <option>Technical Issue</option>
            <option>Billing & Payments</option>
            <option>Course Content</option>
            <option>Account Access</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
          <textarea required className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition h-32 resize-none" placeholder="Describe your issue in detail..." />
        </div>

        <div>
          <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
             <div className="text-center">
                <div className="mx-auto h-8 w-8 text-gray-400 mb-1"><PaperClipIcon /></div>
                <span className="text-xs text-gray-500 font-medium">Attach a file or screenshot (optional)</span>
             </div>
             <input type="file" className="hidden" />
          </label>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

/**
 * Live Chat Widget
 */
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl w-80 sm:w-96 border border-gray-200 overflow-hidden animate-fade-in-up origin-bottom-right">
           <div className="bg-primary p-4 flex justify-between items-center text-white">
              <div>
                 <h4 className="font-bold">EduWave Support</h4>
                 <p className="text-xs text-blue-100 opacity-90">We typically reply in a few minutes</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded p-1 transition-colors">
                 <XIcon />
              </button>
           </div>
           <div className="h-80 bg-gray-50 p-4 flex flex-col gap-3 overflow-y-auto">
              <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700">
                 Hi there! 👋 How can I help you with your learning journey today?
              </div>
              <div className="self-end bg-blue-100 p-3 rounded-2xl rounded-tr-none text-blue-900 text-sm max-w-[85%]">
                 I have a question about the React certification.
              </div>
              <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm text-gray-700">
                 Sure thing! What specifically would you like to know?
              </div>
           </div>
           <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                 <input type="text" placeholder="Type a message..." className="flex-1 bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm" />
                 <button className="bg-primary text-white p-2 rounded-full hover:bg-blue-700">
                    <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                 </button>
              </div>
           </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center justify-center"
      >
        {isOpen ? <XIcon /> : <ChatAltIcon />}
      </button>
    </div>
  );
};
