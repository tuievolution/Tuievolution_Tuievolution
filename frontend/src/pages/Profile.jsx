import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { LogOut, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await axios.post("https://tuievolution-backend.onrender.com/api/projects", {
      email: formData.email,
      password: formData.password
    });

    if (response.data) {
      // 1. AuthContext'i güncelle (Bu, üst menüdeki maili anında düzeltir)
      login(response.data); 
      
      // 2. LocalStorage'a kaydet (Sayfa yenilense de gitmemesi için)
      localStorage.setItem("user", JSON.stringify(response.data));

      // 3. Profil sayfasına yönlendir
      navigate("/profile");
    }
  } catch (err) {
    console.error("Giriş hatası:", err);
    // Hata mesajı gösterimi...
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      // 1. LocalStorage'dan 'user' verisini çekiyoruz
      const storedData = localStorage.getItem('user');
      
      // Eğer veri yoksa veya 'undefined' ise direkt Login'e at
      if (!storedData || storedData === "undefined") {
        console.log("Kullanıcı verisi bulunamadı, Login'e yönlendiriliyor...");
        navigate('/login');
        return;
      }

      const parsedUser = JSON.parse(storedData);

      // Java modelindeki 'id' kontrolü
      if (!parsedUser || !parsedUser.id) {
        console.log("Geçersiz kullanıcı ID'si, Login'e yönlendiriliyor...");
        navigate('/login');
        return;
      }

      try {
        // 2. Backend'den en güncel veriyi çek (Java Controller'ına istek atar)
        const response = await axios.get(`https://tuievolution-backend.onrender.com/api/users/${parsedUser.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Profil bilgileri backend'den çekilemedi:", error);
        // Backend hatası olsa bile eldeki yerel veriyi gösterelim ki sayfa boş kalmasın
        setUserData(parsedUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Veriyi temizle
    navigate('/'); // Ana sayfaya dön
    window.location.reload(); // Navbar'ı güncelle
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2" style={{ borderColor: 'var(--accent)' }}></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-[120px] pb-10 flex flex-col items-center px-6 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      {/* Geri Dön Butonu */}
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 opacity-70 hover:opacity-100 self-start max-w-md mx-auto">
        <ArrowLeft size={20} /> Geri Dön
      </button>

      <div className="card w-full max-w-md h-fit border border-white/10 shadow-2xl p-8 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex flex-col items-center">
          
          {/* Avatar (Java fullName'den çekilir) */}
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg border-4 border-white/20 mb-6"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            {userData?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>

          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
            {userData?.fullName}
          </h1>
          
          <div className="flex items-center gap-2 opacity-70 mb-8">
            <Mail size={16} />
            <span className="text-sm">{userData?.email}</span>
          </div>

          <div className="w-full space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <ShieldCheck size={20} /> Hesap Detayları
            </h3>
            
            <div className="glass p-4 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Sistem ID:</span>
                <span className="font-mono">#{userData?.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Durum:</span>
                <span className="text-green-500 font-bold">Aktif</span>
              </div>
            </div>

            <p className="text-sm opacity-80 leading-relaxed text-center italic mt-4">
              "Hoş geldin {userData?.fullName?.split(' ')[0]}. Bilgilerin Java Backend ve PostgreSQL üzerinden güvenle çekildi."
            </p>
          </div>

          <button 
            onClick={handleLogout}
            className="mt-10 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg text-white bg-red-500 hover:bg-red-600"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;