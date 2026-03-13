import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend'e istek at
      const response = await axios.post("https://tuievolution-backend.onrender.com/api/users/login", formData);
      
      if (response.data) {
        console.log("Giriş Başarılı:", response.data); // Konsolda veriyi gör
        
        // 1. Önce Context'i güncelle ve hafızaya yaz
        login(response.data); 
        
        // 2. Hafif bir gecikmeyle veya hemen yönlendir
        navigate("/profile");
      }
    } catch (err) {
      console.error("Giriş Hatası:", err);
      setError("Giriş başarısız. E-posta veya şifre hatalı.");
    }
  };

  const handleForgotPassword = () => {
    const email = formData.email;
    if(email) {
        alert(`${email} adresine şifre sıfırlama bağlantısı gönderildi! (Simülasyon)`);
    } else {
        alert("Lütfen önce email alanını doldurunuz.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Welcome Back</h2>
          <p className="text-sm opacity-60" style={{ color: 'var(--text-primary)' }}>Login to continue your evolution</p>
        </div>

        {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm text-center font-bold">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-600" 
                />
                <span style={{ color: 'var(--text-primary)' }}>Remember Me</span>
            </label>
            <button type="button" onClick={handleForgotPassword} className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>
                Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm opacity-70" style={{ color: 'var(--text-primary)' }}>
          Don't have an account? <Link to="/signup" className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;