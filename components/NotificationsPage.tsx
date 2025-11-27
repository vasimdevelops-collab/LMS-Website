
import React, { useState, useMemo } from 'react';
import { 
  NotificationFilter, 
  NotificationCard, 
  BulkActionToolbar, 
  NotificationItem, 
  NotificationType 
} from './NotificationComponents';

interface NotificationsPageProps {
  onNavigate?: (page: string) => void;
}

// --- Mock Data ---
const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Assignment Due Soon: React Components',
    message: 'Your assignment for Module 3 is due tomorrow at 11:59 PM.',
    fullContent: 'Please ensure you submit your repository link and deploy your project on Vercel. Late submissions will incur a 10% penalty.',
    type: 'assignment',
    date: '2 hours ago',
    isRead: false,
    actionLabel: 'View Assignment',
    actionUrl: 'assignments'
  },
  {
    id: '2',
    title: 'New Reply: API Integration Question',
    message: 'Angela Yu replied to your comment in the "Web Development" forum.',
    fullContent: '"That is a great question! You usually need to handle CORS on the server side..."',
    type: 'community',
    date: '5 hours ago',
    isRead: false,
    actionLabel: 'View Thread',
    actionUrl: 'community'
  },
  {
    id: '3',
    title: 'System Maintenance Scheduled',
    message: 'EduWave will be undergoing maintenance on Saturday, Oct 28th.',
    fullContent: 'The platform will be unavailable from 2:00 AM to 4:00 AM UTC. Please plan your study schedule accordingly.',
    type: 'system',
    date: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    title: 'Course Updated: Python Masterclass',
    message: 'New lectures added to the "Data Visualization" module.',
    type: 'course',
    date: '2 days ago',
    isRead: true,
    actionLabel: 'Go to Course',
    actionUrl: 'course-details'
  },
  {
    id: '5',
    title: 'Welcome to EduWave Pro!',
    message: 'Thank you for upgrading. Here is a quick guide to your new features.',
    fullContent: 'You now have unlimited access to all courses, verified certificates, and priority mentor support.',
    type: 'system',
    date: '1 week ago',
    isRead: true
  }
];

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // --- Logic ---

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      // Filter by Tab
      if (activeTab === 'unread' && n.isRead) return false;
      if (activeTab === 'course' && n.type !== 'course') return false;
      if (activeTab === 'system' && n.type !== 'system') return false;
      
      // Filter by Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(query) || n.message.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [notifications, activeTab, searchQuery]);

  // --- Handlers ---

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedIds.has(id)) {
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    }
  };

  const handleBulkRead = () => {
    setNotifications(prev => prev.map(n => selectedIds.has(n.id) ? { ...n, isRead: true } : n));
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    setNotifications(prev => prev.filter(n => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleAction = (url?: string) => {
    if (url && onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-500 mt-1">Stay updated with your learning journey.</p>
            </div>
            <button 
              onClick={handleMarkAllRead}
              className="text-sm font-bold text-primary hover:text-blue-700 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <NotificationFilter 
          currentTab={activeTab} 
          onTabChange={setActiveTab} 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(item => (
              <NotificationCard 
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                isExpanded={expandedId === item.id}
                onSelect={() => handleToggleSelect(item.id)}
                onToggleExpand={() => {
                  setExpandedId(expandedId === item.id ? null : item.id);
                  if (!item.isRead && expandedId !== item.id) handleMarkRead(item.id);
                }}
                onMarkRead={() => handleMarkRead(item.id)}
                onDelete={() => handleDelete(item.id)}
                onAction={() => handleAction(item.actionUrl)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
               <div className="text-4xl mb-4 text-gray-300">🔕</div>
               <p className="text-gray-500">No notifications found.</p>
               <button onClick={() => { setActiveTab('all'); setSearchQuery(''); }} className="mt-2 text-primary font-bold hover:underline">
                 Clear filters
               </button>
            </div>
          )}
        </div>

      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <BulkActionToolbar 
          count={selectedIds.size} 
          onMarkAllRead={handleBulkRead} 
          onDeleteAll={handleBulkDelete}
          onCancel={() => setSelectedIds(new Set())}
        />
      )}

    </div>
  );
};

export default NotificationsPage;
