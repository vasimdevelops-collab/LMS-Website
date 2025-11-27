
import React, { useState } from 'react';
import { 
  CalendarHeader, 
  MonthGrid, 
  UpcomingSessionCard, 
  SyncWidget, 
  CalendarEvent,
  EventDetailModal
} from './CalendarComponents';

interface CalendarPageProps {
  onNavigate?: (page: string) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Mock Data Generators
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const MOCK_EVENTS: CalendarEvent[] = [
    {
      id: 'e1',
      title: 'Live Q&A: React Hooks',
      date: new Date(year, month, today.getDate() + 1),
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      type: 'live',
      courseTitle: 'Web Development Bootcamp'
    },
    {
      id: 'e2',
      title: 'Project Submission Deadline',
      date: new Date(year, month, today.getDate() + 3),
      startTime: '11:59 PM',
      type: 'deadline',
      courseTitle: 'UI/UX Masterclass'
    },
    {
      id: 'e3',
      title: 'Weekly Quiz',
      date: new Date(year, month, today.getDate() + 5),
      startTime: '09:00 AM',
      type: 'assessment',
      courseTitle: 'Python Data Science'
    },
    {
      id: 'e4',
      title: 'Guest Lecture: System Design',
      date: new Date(year, month, today.getDate() + 10),
      startTime: '02:00 PM',
      type: 'live',
      courseTitle: 'Backend Engineering'
    },
    {
      id: 'e5',
      title: 'Course Access Expiring',
      date: new Date(year, month, today.getDate() + 15),
      startTime: '12:00 PM',
      type: 'reminder',
      courseTitle: 'Digital Marketing'
    }
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const upcomingEvents = MOCK_EVENTS
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-500 mt-1">Keep track of your live classes, deadlines, and learning goals.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Calendar Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
             <CalendarHeader 
               currentDate={currentDate}
               onPrevMonth={handlePrevMonth}
               onNextMonth={handleNextMonth}
               onToday={() => setCurrentDate(new Date())}
               view={view}
               onViewChange={setView}
             />
             
             <MonthGrid 
               currentDate={currentDate}
               events={MOCK_EVENTS}
               onEventClick={setSelectedEvent}
             />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
             
             {/* Upcoming Section */}
             <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                   Next Up
                   <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{upcomingEvents.length}</span>
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <UpcomingSessionCard key={event.id} event={event} />
                  ))}
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No upcoming events.</p>
                  )}
                </div>
             </div>

             {/* Sync Widget */}
             <SyncWidget />

          </div>
        </div>

      </div>

      <EventDetailModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
};

export default CalendarPage;
