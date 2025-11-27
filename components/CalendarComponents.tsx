
import React, { useState, useEffect } from 'react';

// --- Types ---
export type EventType = 'deadline' | 'live' | 'assessment' | 'reminder';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date; // JS Date object for easier math
  startTime: string; // "10:00 AM"
  endTime?: string;
  type: EventType;
  courseTitle?: string;
  url?: string; // Link to join/view
}

// --- Icons ---
const ChevronLeftIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const VideoCameraIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CalendarIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const DownloadIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sunday

// --- Components ---

/**
 * Header for the calendar view.
 */
export const CalendarHeader: React.FC<{
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  view: 'month' | 'week';
  onViewChange: (v: 'month' | 'week') => void;
}> = ({ currentDate, onPrevMonth, onNextMonth, onToday, view, onViewChange }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 w-48">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
          <button onClick={onPrevMonth} className="p-2 hover:bg-gray-50 text-gray-600 rounded-l-lg border-r border-gray-200">
            <ChevronLeftIcon />
          </button>
          <button onClick={onToday} className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
            Today
          </button>
          <button onClick={onNextMonth} className="p-2 hover:bg-gray-50 text-gray-600 rounded-r-lg border-l border-gray-200">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button 
          onClick={() => onViewChange('month')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Month
        </button>
        <button 
          onClick={() => onViewChange('week')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Week
        </button>
      </div>
    </div>
  );
};

/**
 * Event Badge Component
 */
const EventBadge: React.FC<{ event: CalendarEvent; onClick: () => void }> = ({ event, onClick }) => {
  const styles = {
    deadline: 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100',
    live: 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100',
    assessment: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100',
    reminder: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100',
  };

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-full text-left text-[10px] sm:text-xs px-1.5 py-1 rounded border mb-1 truncate transition-colors ${styles[event.type]}`}
      title={event.title}
    >
      <span className="font-bold mr-1 hidden sm:inline">{event.startTime}</span>
      {event.title}
    </button>
  );
};

/**
 * Month Grid View
 */
export const MonthGrid: React.FC<{
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}> = ({ currentDate, events, onEventClick }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  // Padding for prev month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`pad-${i}`} className="bg-gray-50/30 border-b border-r border-gray-100 min-h-[100px] md:min-h-[120px]"></div>);
  }
  
  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = new Date(year, month, d).toDateString();
    const dayEvents = events.filter(e => e.date.toDateString() === dateStr);
    const isToday = new Date().toDateString() === dateStr;

    days.push(
      <div key={d} className={`bg-white border-b border-r border-gray-100 min-h-[100px] md:min-h-[120px] p-2 hover:bg-gray-50 transition-colors group relative ${isToday ? 'bg-blue-50/20' : ''}`}>
        <div className="flex justify-between items-start mb-1">
          <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : 'text-gray-700'}`}>
            {d}
          </span>
          {/* Add event button (hover only) */}
          <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary transition-opacity">
            +
          </button>
        </div>
        <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
          {dayEvents.map(ev => (
            <EventBadge key={ev.id} event={ev} onClick={() => onEventClick(ev)} />
          ))}
        </div>
      </div>
    );
  }

  // Padding for end of grid (to make it a multiple of 7)
  const totalCells = days.length;
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`end-pad-${i}`} className="bg-gray-50/30 border-b border-r border-gray-100 min-h-[100px] md:min-h-[120px]"></div>);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {days}
      </div>
    </div>
  );
};

/**
 * Sidebar Card for upcoming sessions with countdown.
 */
export const UpcomingSessionCard: React.FC<{ event: CalendarEvent }> = ({ event }) => {
  // Mock countdown based on event time
  // In real app, calculate diff between now and event.date
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${event.type === 'live' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
           {event.type === 'live' ? <VideoCameraIcon /> : <ClockIcon />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">{event.title}</h4>
          <p className="text-xs text-gray-500 mb-2">{event.courseTitle}</p>
          <div className="flex items-center gap-2 text-xs font-medium bg-gray-50 px-2 py-1 rounded w-fit">
            <span className={event.type === 'live' ? 'text-green-600' : 'text-red-500'}>
              {event.type === 'live' ? 'Starts in 2h 15m' : 'Due in 3 days'}
            </span>
          </div>
        </div>
      </div>
      
      {event.type === 'live' && (
        <button className="w-full mt-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
          Join Session
        </button>
      )}
    </div>
  );
};

export const SyncWidget: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-xl p-5 text-white shadow-lg">
      <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
        <CalendarIcon /> Sync Schedule
      </h3>
      <p className="text-xs text-gray-400 mb-4">Never miss a deadline. Add to your personal calendar.</p>
      
      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-4 h-4" alt="Google" />
          Google Calendar
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-800 border border-gray-700 text-white text-xs font-bold rounded-lg hover:bg-gray-700 transition-colors">
          <DownloadIcon /> Export .ICS File
        </button>
      </div>
    </div>
  );
};

export const EventDetailModal: React.FC<{ event: CalendarEvent | null; onClose: () => void }> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${event.type === 'live' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
             {event.type === 'live' ? <VideoCameraIcon /> : <ClockIcon />}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
        <p className="text-sm text-primary font-medium mb-4">{event.courseTitle}</p>
        
        <div className="space-y-3 mb-6">
           <div className="flex items-center gap-3 text-sm text-gray-600">
              <CalendarIcon />
              <span>{event.date.toDateString()}</span>
           </div>
           <div className="flex items-center gap-3 text-sm text-gray-600">
              <ClockIcon />
              <span>{event.startTime} - {event.endTime || '1h'}</span>
           </div>
        </div>

        <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
          {event.type === 'live' ? 'Join Now' : 'Go to Course'}
        </button>
      </div>
    </div>
  );
};
