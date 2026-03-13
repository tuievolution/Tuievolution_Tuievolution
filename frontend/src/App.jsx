import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AuraTech from './components/AuraTech';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Ana Kapsayıcı */}
          <div className="min-h-screen relative overflow-hidden">
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -z-10"></div>
            
            <Navbar />
            <AppRouter />
            <AuraTech />
            
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;