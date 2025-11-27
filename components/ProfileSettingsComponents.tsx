
import React, { useState } from 'react';

// --- Icons ---
export const UserIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
export const ShieldCheckIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
export const CreditCardIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
export const BellIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
export const LockClosedIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const CloudUploadIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
const TrashIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- 1. Profile Form ---
export const ProfileForm: React.FC = () => {
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Alex+Doe&background=2B3BFF&color=fff");

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 shadow-sm">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="text-xs font-bold text-primary border border-primary rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors flex items-center gap-1">
            <CloudUploadIcon /> Change Photo
          </button>
        </div>

        {/* Fields */}
        <div className="flex-1 w-full space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
              <input type="text" defaultValue="Alex" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Headline / Bio</label>
            <textarea defaultValue="Full Stack Developer learning AI." className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition h-24 resize-none" />
            <p className="text-xs text-gray-500 mt-1">Brief description for your profile.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
            <input type="text" defaultValue="San Francisco, CA" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Social Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">GitHub</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">github.com/</span>
              <input type="text" defaultValue="alexdoe" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-24 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">linkedin.com/in/</span>
              <input type="text" defaultValue="alex-doe" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-28 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Website</label>
            <input type="text" placeholder="https://yourportfolio.com" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Twitter / X</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">@</span>
              <input type="text" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

// --- 2. Account Security ---
export const AccountSecurity: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Email & Password */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-gray-900">Login Details</h3>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
          <div className="flex gap-3">
            <input type="email" defaultValue="alex@example.com" className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-gray-500 cursor-not-allowed focus:outline-none" disabled />
            <button className="text-sm font-medium text-primary hover:underline">Change</button>
          </div>
        </div>

        <hr className="border-gray-100 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>
          <div className="hidden md:block"></div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
            <input type="password" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" className="w-full bg-white border border-gray-200 text-gray-800 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
          </div>
        </div>
        <div className="flex justify-end">
           <button className="text-sm font-bold text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Update Password</button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Login History */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Login History</h3>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Chrome on Mac OS X</td>
                <td className="px-4 py-3 text-gray-500">San Francisco, US</td>
                <td className="px-4 py-3 text-gray-500">Oct 24, 2025 at 10:30 AM</td>
                <td className="px-4 py-3 text-gray-500">192.168.1.1</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">Safari on iPhone</td>
                <td className="px-4 py-3 text-gray-500">San Jose, US</td>
                <td className="px-4 py-3 text-gray-500">Oct 22, 2025 at 08:15 PM</td>
                <td className="px-4 py-3 text-gray-500">10.0.0.12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 3. Billing Settings ---
export const BillingSettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Payment Methods */}
      <div>
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
           <button className="text-xs font-bold text-primary border border-primary rounded px-3 py-1.5 hover:bg-blue-50 transition-colors">
             + Add New Card
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Saved Card 1 */}
           <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-6 bg-gray-800 rounded text-white text-[8px] flex items-center justify-center font-bold tracking-widest">VISA</div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/2028</p>
                 </div>
              </div>
              <span className="text-xs font-medium bg-blue-50 text-primary px-2 py-0.5 rounded">Default</span>
           </div>
           
           {/* Saved Card 2 */}
           <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-6 bg-red-600 rounded text-white text-[8px] flex items-center justify-center font-bold tracking-widest">MC</div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Mastercard ending in 8899</p>
                    <p className="text-xs text-gray-500">Expires 08/2026</p>
                 </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                 <TrashIcon />
              </button>
           </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Invoice History */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Billing History</h3>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-gray-900">Oct 01, 2025</td>
                <td className="px-4 py-3 text-gray-900 font-medium">$29.00</td>
                <td className="px-4 py-3 text-gray-500">Pro Monthly</td>
                <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Paid</span></td>
                <td className="px-4 py-3 text-right"><button className="text-primary hover:underline text-xs font-bold">Download</button></td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">Sep 01, 2025</td>
                <td className="px-4 py-3 text-gray-900 font-medium">$29.00</td>
                <td className="px-4 py-3 text-gray-500">Pro Monthly</td>
                <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Paid</span></td>
                <td className="px-4 py-3 text-right"><button className="text-primary hover:underline text-xs font-bold">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 4. Notifications ---
export const NotificationPreferences: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h3 className="text-lg font-bold text-gray-900">Email Notifications</h3>
      
      <div className="space-y-4">
        {[
          { label: "Course Updates", desc: "Receive emails about updates to courses you're enrolled in." },
          { label: "Assignment Due Dates", desc: "Get reminders 24 hours before an assignment is due." },
          { label: "Promotional Offers", desc: "Receive emails about new courses and discounts." },
          { label: "Discussion Replies", desc: "Get notified when someone replies to your comments." },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between">
             <div>
                <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 my-6" />

      <h3 className="text-lg font-bold text-gray-900">Push Notifications</h3>
      <p className="text-xs text-gray-500 mb-4">Manage notifications on your mobile devices.</p>
      
      <div className="space-y-4">
        {[
          { label: "New Content Alerts", desc: "Get notified when new lessons are added." },
          { label: "Direct Messages", desc: "Receive push notifications for messages from instructors." },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between">
             <div>
                <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i === 0} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 5. Privacy & Connected Accounts ---
export const PrivacySettings: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Connected Accounts */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Connected Accounts</h3>
        <div className="space-y-4">
           <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6" />
                 <div>
                    <p className="font-bold text-gray-900 text-sm">Google</p>
                    <p className="text-xs text-gray-500">Connected as alex@example.com</p>
                 </div>
              </div>
              <button className="text-xs font-bold text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded px-3 py-1.5 transition-colors">
                Disconnect
              </button>
           </div>

           <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                 <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                 <div>
                    <p className="font-bold text-gray-900 text-sm">GitHub</p>
                    <p className="text-xs text-gray-500">Not connected</p>
                 </div>
              </div>
              <button className="text-xs font-bold text-primary hover:text-blue-700 border border-primary/20 hover:border-primary rounded px-3 py-1.5 transition-colors">
                Connect
              </button>
           </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Danger Zone */}
      <div>
        <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
        <div className="border border-red-100 bg-red-50 rounded-xl p-6">
           <h4 className="font-bold text-gray-900 text-sm mb-1">Delete Account</h4>
           <p className="text-sm text-gray-600 mb-4">
             Once you delete your account, there is no going back. Please be certain.
           </p>
           <button className="bg-white border border-red-200 text-red-600 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm">
             Delete Account
           </button>
        </div>
      </div>
    </div>
  );
};
