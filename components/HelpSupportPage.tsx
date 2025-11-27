
import React, { useState } from 'react';
import { 
  HelpHero, 
  CategoryCard, 
  ArticleListItem, 
  ContactForm, 
  ChatWidget,
  SupportCategory,
  HelpArticle,
  BookOpenIcon,
  CreditCardIcon,
  DesktopComputerIcon,
  WrenchIcon
} from './HelpSupportComponents';

interface HelpSupportPageProps {
  onNavigate?: (page: string) => void;
}

// --- Mock Data ---
const CATEGORIES: SupportCategory[] = [
  { id: '1', title: 'Getting Started', description: 'New to EduWave? Learn how to set up your account and start learning.', icon: <BookOpenIcon />, color: 'bg-blue-500' },
  { id: '2', title: 'Billing & Plans', description: 'Manage your subscription, payment methods, and invoices.', icon: <CreditCardIcon />, color: 'bg-green-500' },
  { id: '3', title: 'Course Taking', description: 'Troubleshoot video playback, quizzes, and certificates.', icon: <DesktopComputerIcon />, color: 'bg-purple-500' },
  { id: '4', title: 'Troubleshooting', description: 'Solutions for common technical issues and account problems.', icon: <WrenchIcon />, color: 'bg-orange-500' },
];

const ARTICLES: HelpArticle[] = [
  { id: 'a1', title: 'How do I reset my password?', category: 'Account', readTime: '2 min read', views: 1250 },
  { id: 'a2', title: 'Can I download videos for offline viewing?', category: 'Courses', readTime: '1 min read', views: 980 },
  { id: 'a3', title: 'How to upgrade to the Pro plan', category: 'Billing', readTime: '3 min read', views: 850 },
  { id: 'a4', title: 'Where can I find my certificate of completion?', category: 'Courses', readTime: '2 min read', views: 1500 },
  { id: 'a5', title: 'System requirements for coding exercises', category: 'Troubleshooting', readTime: '4 min read', views: 600 },
];

const HelpSupportPage: React.FC<HelpSupportPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-20">
      
      <HelpHero onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Articles */}
          <div className="lg:col-span-7 space-y-8">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {searchQuery ? 'Search Results' : 'Popular Articles'}
                </h2>
                
                {filteredArticles.length > 0 ? (
                  <div className="flex flex-col">
                    {filteredArticles.map(article => (
                      <ArticleListItem key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No articles found matching "{searchQuery}".</p>
                )}

                {!searchQuery && (
                  <button className="mt-6 w-full py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    View All Articles
                  </button>
                )}
             </div>

             {/* FAQ / Quick Tips Section */}
             <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 md:p-8">
                <h3 className="font-bold text-blue-900 mb-2">Quick Tip</h3>
                <p className="text-sm text-blue-800 leading-relaxed mb-4">
                  Did you know you can pause your subscription for up to 3 months? Go to <strong>Settings &gt; Billing</strong> to manage your plan status without losing your progress.
                </p>
                {onNavigate && (
                  <button 
                    onClick={() => onNavigate('settings')}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Go to Settings &rarr;
                  </button>
                )}
             </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-5">
             <ContactForm />
          </div>

        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default HelpSupportPage;
