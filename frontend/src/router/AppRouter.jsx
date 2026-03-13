// src/router/AppRouter.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

/**
 * Hata Kontrollü Named Export Yükleyici
 * Eğer modül içinde beklenen isim bulunamazsa konsola hata basar.
 */
const lazyNamed = (importPromise, name) => 
  lazy(() => 
    importPromise.then(module => {
      if (module[name]) {
        return { default: module[name] };
      } else {
        console.error(`HATA: "${name}" bileşeni modül içinde bulunamadı! Mevcut exportlar:`, Object.keys(module));
        // Uygulamanın çökmemesi için boş bir div döner
        return { default: () => <div className="p-20 text-center">Bileşen Yüklenemedi: {name}</div> };
      }
    }).catch(err => {
      console.error(`${name} yüklenirken dosya yolu hatası oluştu:`, err);
      return { default: () => <div className="p-20 text-center">Dosya bulunamadı!</div> };
    })
  );

// src/router/AppRouter.jsx içinde ilgili satırları şu şekilde değiştir:

const Home = lazy(() => import('../pages/Home'));
const Projects = lazy(() => import('../pages/Projects'));
const About = lazy(() => import('../pages/About'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));
const Contact = lazy(()=> import('../pages/Contact'));
const Signup = lazy(()=> import('../pages/Signup'));

// Alt sayfalar
const EvrimAluc = lazy(() => import('../pages/AboutUs/EvrimAluc'));
const TuanaAkyildiz = lazy(() => import('../pages/AboutUs/TuanaAkyildiz'));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Eğer context hala yükleniyorsa bekle (Boş ekran veya loading spinner dönebilir)
  if (loading) {
     return <div>Yükleniyor...</div>; 
  }

  // Kullanıcı yoksa Login'e at
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı varsa sayfayı göster
  return children;
};

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bgPrimary dark:bg-darkBgPrimary">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        
        {/* About Hiyerarşisi */}
        <Route path="/about" element={<About />} />
        <Route path="/about/evrim" element={<EvrimAluc />} />
        <Route path="/about/tuana" element={<TuanaAkyildiz />} />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route  path="/contact" element={<Contact/>}  />
        
        <Route path="*" element={<div className="pt-40 text-center text-3xl font-bold text-accent">404 - Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;