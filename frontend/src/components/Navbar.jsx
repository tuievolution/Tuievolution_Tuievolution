import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, ChevronDown, LogOut, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Scroll takibi
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tema Renkleri
  const themeBgColor = isDarkMode ? '#1A0B2E' : '#FFDCF3';

  const navbarStyle = {
    backgroundColor: isScrolled ? themeBgColor : 'transparent',
    transition: 'all 0.4s ease-in-out',
  };

  const drawerStyle = {
    backgroundColor: themeBgColor,
  };

  const signInButtonStyle = {
    backgroundColor: 'var(--accent)',
    color: isDarkMode ? '#1A0B2E' : '#FFE6F7',
  };

  const profileDropdownStyle = {
    backgroundColor: themeBgColor,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  };

  return (
    <>
      <nav style={navbarStyle} className={`fixed top-0 left-0 right-0 px-6 py-4 z-[9999] ${isScrolled ? "shadow-2xl border-b border-white/10" : ""}`}>
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
            TUIEVOLUTION
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-800 dark:text-white">
            <Link to="/" className="hover:text-pink-500 font-bold transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-pink-500 font-bold transition-colors">Projects</Link>
            
            {/* About Us Dropdown */}
            <div className="relative group py-2">
              <Link to="/about" className="hover:text-pink-500 font-bold flex items-center gap-1 transition-colors">
                About Us <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div style={{ backgroundColor: themeBgColor }} className="w-44 border-2 border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                  <Link to="/about/evrim" className="px-4 py-3 hover:bg-white/10 text-sm font-bold transition-colors text-gray-800 dark:text-white">Evrim Aluç</Link>
                  <Link to="/about/tuana" className="px-4 py-3 hover:bg-white/10 text-sm font-bold transition-colors text-gray-800 dark:text-white">Tuana Akyıldız</Link>
                </div>
              </div>
            </div>

            <Link to="/contact" className="hover:text-pink-500 font-bold transition-colors">Connect Us</Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-800 dark:text-white hover:text-pink-500 hover:rotate-12 transition-transform">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* --- DESKTOP PROFILE SECTION (GÜNCELLEME BURADA) --- */}
            {/* 'hidden md:block' ekleyerek mobilde üst bardan gizledik */}
            <div className="relative hidden md:block">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-white/20 hover:scale-105 transition-transform"
                  >
                    <User size={20} />
                  </button>

                  {isProfileOpen && (
                    <div 
                      style={profileDropdownStyle}
                      className="absolute top-full right-0 mt-2 w-56 border-2 rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-50 text-gray-800 dark:text-white"
                    >
                      <div className="px-4 py-3 border-b border-accent/10 bg-accent/5">
                        <p className="text-[10px] opacity-50 uppercase font-black">Active Account</p>
                        <p className="text-sm font-bold truncate">{user?.email || "Giriş Yapılmadı"}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 text-sm transition-colors font-semibold">
                        <User size={16} /> My Profile
                      </Link>
                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-red-500/20 text-red-500 font-bold transition-colors border-t border-white/10"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" style={signInButtonStyle} className="text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-opacity-90 transition-all">
                  Sign In
                </Link>
              )}
            </div>

            {/* Hamburger Button */}
            <button className="md:hidden text-gray-800 dark:text-white z-50" onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        style={drawerStyle}
        className={`fixed top-0 right-0 h-full w-[280px] shadow-2xl z-[10000] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-white/10 text-gray-800 dark:text-white`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-6 overflow-y-auto flex-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-pink-500 transition-colors">
              Home <ChevronRight size={18} className="opacity-50" />
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-pink-500 transition-colors">
              Projects <ChevronRight size={18} className="opacity-50" />
            </Link>
            
            <div className="flex flex-col gap-3">
              <div className="text-lg font-bold opacity-80">About Us</div>
              <div className="pl-4 flex flex-col gap-3 border-l-2 border-white/20 ml-1">
                 <Link to="/about/evrim" onClick={() => setIsOpen(false)} className="text-sm font-semibold hover:text-pink-500 transition-colors">
                   Evrim Aluç
                 </Link>
                 <Link to="/about/tuana" onClick={() => setIsOpen(false)} className="text-sm font-semibold hover:text-pink-500 transition-colors">
                   Tuana Akyıldız
                 </Link>
              </div>
            </div>

             <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-pink-500 transition-colors">
              Connect Us <ChevronRight size={18} className="opacity-50" />
            </Link>
          </div>

          {/* --- MOBILE DRAWER FOOTER (ACCOUNT) --- */}
          {/* Mobil menünün en altına hesap işlemlerini ekledik */}
          <div className="p-6 border-t border-white/10 bg-black/5">
             {user ? (
               <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                     <User size={20} />
                   </div>
                   <div className="flex flex-col overflow-hidden">
                      <span className="text-xs opacity-50 font-bold uppercase">Hesap</span>
                      <span className="text-sm font-bold truncate">{user.email}</span>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 mt-2">
                   <Link 
                     to="/profile" 
                     onClick={() => setIsOpen(false)}
                     className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                   >
                     <User size={14} /> Profil
                   </Link>
                   <button 
                     onClick={() => { logout(); setIsOpen(false); }}
                     className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors"
                   >
                     <LogOut size={14} /> Çıkış
                   </button>
                 </div>
               </div>
             ) : (
               <Link 
                 to="/login" 
                 onClick={() => setIsOpen(false)}
                 style={signInButtonStyle} 
                 className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold shadow-md hover:brightness-110 transition-all"
               >
                 Giriş Yap / Sign In
               </Link>
             )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;