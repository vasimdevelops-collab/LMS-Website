
import React, { useState } from 'react';
import { 
  ProfileForm, 
  AccountSecurity, 
  BillingSettings, 
  NotificationPreferences, 
  PrivacySettings,
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BellIcon,
  LockClosedIcon
} from './ProfileSettingsComponents';

interface ProfileSettingsPageProps {
  onNavigate: (page: string) => void;
}

type SettingsTab = 'profile' | 'account' | 'billing' | 'notifications' | 'privacy';

const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs: { id: SettingsTab; label: string; icon: React.FC }[] = [
    { id: 'profile', label: 'Public Profile', icon: UserIcon },
    { id: 'account', label: 'Account & Security', icon: ShieldCheckIcon },
    { id: 'billing', label: 'Payment & Billing', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy & Connections', icon: LockClosedIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileForm />;
      case 'account': return <AccountSecurity />;
      case 'billing': return <BillingSettings />;
      case 'notifications': return <NotificationPreferences />;
      case 'privacy': return <PrivacySettings />;
      default: return <ProfileForm />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences and personal data.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white text-primary shadow-sm border border-gray-200 lg:border-transparent'
                        : 'text-gray-500 hover:bg-white/60 hover:text-gray-900'
                    }`}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Panel */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
               <div className="mb-6 border-b border-gray-100 pb-4 lg:hidden">
                  <h2 className="text-xl font-bold text-gray-900">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
               </div>
               {renderContent()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
