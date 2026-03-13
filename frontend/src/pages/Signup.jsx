import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext EKLENDİ
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // 2. Context'ten login fonksiyonunu alıyoruz
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 3. Kayıt İsteği Atılıyor
      const response = await axios.post("https://tuievolution-backend.onrender.com/api/users/register", formData);
      
      if (response.data) {
        // 4. KRİTİK NOKTA: Kayıt başarılıysa gelen veriyi direkt 'login' fonksiyonuna veriyoruz.
        // Bu sayede kullanıcıyı hem Context'e hem de LocalStorage'a yazıyoruz.
        login(response.data);
        
        // 5. Hiç bekletmeden Profil sayfasına atıyoruz
        navigate("/profile");
      }

    } catch (err) {
      console.error("Kayıt Hatası:", err);
      const errorMsg = err.response?.data?.message || "Kayıt başarısız. Lütfen tekrar deneyin.";
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Create Account</h2>
          <p className="text-sm opacity-60" style={{ color: 'var(--text-primary)' }}>Join the evolution</p>
        </div>

        {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm text-center font-bold">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* İsim Alanı */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-70" style={{ color: 'var(--text-primary)' }}>Full Name</label>
            <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} />
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-accent outline-none bg-white/50 focus:bg-white transition-all"
                  placeholder="Evrim Aluç"
                />
            </div>
          </div>

          {/* Email Alanı */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-70" style={{ color: 'var(--text-primary)' }}>Email Address</label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent focus:border-accent outline-none bg-white/50 focus:bg-white transition-all"
                  placeholder="test@example.com"
                />
            </div>
          </div>

          {/* Şifre Alanı */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-70" style={{ color: 'var(--text-primary)' }}>Password</label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required 
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-transparent focus:border-accent outline-none bg-white/50 focus:bg-white transition-all"
                  placeholder="123456"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-8 text-sm opacity-70" style={{ color: 'var(--text-primary)' }}>
          Already have an account? <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;