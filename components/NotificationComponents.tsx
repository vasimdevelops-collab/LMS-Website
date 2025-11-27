
import React from 'react';

// --- Types ---
export type NotificationType = 'system' | 'course' | 'assignment' | 'community';

export interface NotificationItem {
  id: string;
  title: string;
  message: string; // Short preview
  fullContent?: string; // Expanded details
  type: NotificationType;
  date: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// --- Icons ---
const BellIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const CheckIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const TrashIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const SearchIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const FilterIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;

// --- Components ---

/**
 * Filter Bar: Tabs & Search
 */
export const NotificationFilter: React.FC<{
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
}> = ({ currentTab, onTabChange, searchValue, onSearchChange }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'course', label: 'Course Updates' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              currentTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
        />
      </div>
    </div>
  );
};

/**
 * Single Notification Card
 */
export const NotificationCard: React.FC<{
  item: NotificationItem;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
  onAction: () => void;
}> = ({ item, isSelected, isExpanded, onSelect, onToggleExpand, onMarkRead, onDelete, onAction }) => {
  
  const typeStyles = {
    system: 'bg-gray-100 text-gray-600',
    course: 'bg-blue-100 text-blue-600',
    assignment: 'bg-purple-100 text-purple-600',
    community: 'bg-green-100 text-green-600',
  };

  return (
    <div className={`group relative bg-white border rounded-xl transition-all ${isExpanded ? 'shadow-md border-blue-100 ring-1 ring-blue-50' : 'border-gray-100 hover:border-gray-200'} ${!item.isRead ? 'bg-blue-50/10' : ''}`}>
      {/* Unread Indicator */}
      {!item.isRead && (
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full"></div>
      )}

      <div className="p-4 flex gap-4">
        {/* Checkbox */}
        <div className="pt-1">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={(e) => { e.stopPropagation(); onSelect(); }}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
        </div>

        {/* Content Click Area */}
        <div className="flex-1 cursor-pointer" onClick={onToggleExpand}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${typeStyles[item.type]}`}>
              {item.type}
            </span>
            <span className="text-xs text-gray-400">{item.date}</span>
          </div>
          
          <h3 className={`text-base mb-1 ${!item.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
            {item.title}
          </h3>
          
          <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-1'}`}>
            {item.message}
          </p>

          {isExpanded && item.fullContent && (
            <div className="mt-3 text-sm text-gray-600 prose prose-sm animate-fade-in-down">
              <p>{item.fullContent}</p>
            </div>
          )}

          {/* Action Footer (Visible when expanded) */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
              {item.actionLabel && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onAction(); }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {item.actionLabel}
                </button>
              )}
              {!item.isRead && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onMarkRead(); }}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <CheckIcon /> Mark as read
                </button>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors ml-auto"
                title="Delete notification"
              >
                <TrashIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Bulk Action Toolbar
 */
export const BulkActionToolbar: React.FC<{
  count: number;
  onMarkAllRead: () => void;
  onDeleteAll: () => void;
  onCancel: () => void;
}> = ({ count, onMarkAllRead, onDeleteAll, onCancel }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-6 animate-fade-in-up">
      <span className="font-bold text-sm whitespace-nowrap">{count} Selected</span>
      <div className="h-4 w-px bg-gray-700"></div>
      <div className="flex items-center gap-2">
        <button onClick={onMarkAllRead} className="text-xs font-bold hover:text-primary transition-colors">Mark Read</button>
        <button onClick={onDeleteAll} className="text-xs font-bold hover:text-red-400 transition-colors">Delete</button>
      </div>
      <button onClick={onCancel} className="ml-2 text-gray-500 hover:text-white">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};
