import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleniyor durumu ekledik

  // 1. Sayfa ilk açıldığında Hafızayı (LocalStorage) Kontrol Et
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Kullanıcı verisi okunamadı", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false); // Kontrol bitti
  }, []);

  // 2. Giriş Fonksiyonu (Veriyi hem State'e hem Hafızaya yazar)
  const login = (userData, rememberMe = true) => {
    setUser(userData);
    // Eğer "Beni Hatırla" seçiliyse LocalStorage, değilse SessionStorage (tercihen hepsi local olabilir)
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.setItem('user', JSON.stringify(userData)); // Standart olarak local kullanalım
    }
  };

  // 3. Çıkış Fonksiyonu (Hafızayı Temizle)
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login'; // Kesin yönlendirme
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Yükleme bitmeden sayfayı gösterme */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);