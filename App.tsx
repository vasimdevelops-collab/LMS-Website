
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PopularCoursesSection from './components/PopularCoursesSection';
import HowItWorksSection from './components/HowItWorksSection';
import InstructorsSection from './components/InstructorsSection';
import PricingTeaserSection from './components/PricingTeaserSection';
import Footer from './components/Footer';

// Auth Pages
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import EmailVerificationScreen from './components/EmailVerificationScreen';

// Catalog Page
import CoursesCatalogPage from './components/CoursesCatalogPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import LessonPage from './components/LessonPage';

// Dashboard
import StudentDashboardPage from './components/StudentDashboardPage';
import InstructorDashboardPage from './components/InstructorDashboardPage';
import CourseBuilderPage from './components/CourseBuilderPage';
import AssignmentsAndQuizzesPage from './components/AssignmentsAndQuizzesPage';
import CommunityPage from './components/CommunityPage';
import CalendarPage from './components/CalendarPage';
import NotificationsPage from './components/NotificationsPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';
import PricingPage from './components/PricingPage';
import HelpSupportPage from './components/HelpSupportPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentPage} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={setCurrentPage} />;
      case 'email-verify':
        return (
          <EmailVerificationScreen 
            status="success" 
            onContinue={() => setCurrentPage('home')}
            onResend={() => alert('Resending...')}
          />
        );
      case 'catalog':
        return <CoursesCatalogPage onNavigate={setCurrentPage} />;
      case 'course-details':
        return <CourseDetailsPage onNavigate={setCurrentPage} />;
      case 'lesson':
        return <LessonPage />;
      case 'dashboard':
        return <StudentDashboardPage onNavigate={setCurrentPage} />;
      case 'instructor-dashboard':
        return <InstructorDashboardPage onNavigate={setCurrentPage} />;
      case 'course-builder':
        return <CourseBuilderPage onNavigate={setCurrentPage} />;
      case 'assignments':
        return <AssignmentsAndQuizzesPage onNavigate={setCurrentPage} />;
      case 'community':
        return <CommunityPage onNavigate={setCurrentPage} />;
      case 'schedule':
        return <CalendarPage onNavigate={setCurrentPage} />;
      case 'notifications':
        return <NotificationsPage onNavigate={setCurrentPage} />;
      case 'settings':
        return <ProfileSettingsPage onNavigate={setCurrentPage} />;
      case 'pricing':
        return <PricingPage onNavigate={setCurrentPage} />;
      case 'help':
        return <HelpSupportPage onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return (
          <>
            <HeroSection onNavigate={setCurrentPage} />
            <FeaturesSection />
            <PopularCoursesSection onNavigate={setCurrentPage} />
            <HowItWorksSection />
            <InstructorsSection />
            <PricingTeaserSection />
          </>
        );
    }
  };

  const isAuthPage = ['login', 'signup', 'forgot-password', 'reset-password', 'email-verify'].includes(currentPage);
  // Pages that don't need the default footer/navbar or have their own
  const isLessonPage = currentPage === 'lesson';
  const isBuilderPage = currentPage === 'course-builder';

  return (
    <div className="min-h-screen bg-white text-dark font-sans flex flex-col">
      {!isAuthPage && !isBuilderPage && <Navbar onNavigate={setCurrentPage} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {!isAuthPage && !isLessonPage && !isBuilderPage && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
};

export default App;
