import React from 'react';
import { Mail, Lock, User } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6 text-center min-h-screen transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
      
      {/* Main About Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--accent)' }}>About Us</h1>
        <p className="opacity-80 text-lg">Two friends making projects together.</p>
        <p className='opacity-70 leading-relaxed'>
          We are trying to make projects while improving ourselves as well as getting used to working in a team setting.
        </p>
      </div>

      {/* Authentication Demo Section */}
      <div className="mt-20 pt-12 border-t border-white/10 max-w-3xl mx-auto">
        <h3 className='text-3xl font-bold mb-4' style={{ color: 'var(--accent)' }}>Authentication Demo</h3>
        <p className="opacity-70 mb-10">Even though Auth has no actual aim right now, you can try it out using our test credentials below:</p>
        
        {/* Credentials Card */}
        <div 
          className="max-w-md mx-auto p-6 rounded-3xl shadow-2xl border border-white/20 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="space-y-4 text-left">
            
            {/* Name Row */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-black/20 border border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <User size={20} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-bold uppercase tracking-wider opacity-70">Name</span>
              </div>
              <span className="font-mono font-bold">Test User</span>
            </div>

            {/* Email Row */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-black/20 border border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <Mail size={20} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-bold uppercase tracking-wider opacity-70">Email</span>
              </div>
              <span className="font-mono font-bold">test@example.com</span>
            </div>

            {/* Password Row */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-black/20 border border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <Lock size={20} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-bold uppercase tracking-wider opacity-70">Password</span>
              </div>
              <span className="font-mono font-bold">123456</span>
            </div>

          </div>
        </div>
        <p className="opacity-70 mb-10 mt-10">Or you can try signing up. Don't worry you currently don't have to use your own email</p>

      </div>
    </div>
  );
};

export default About;