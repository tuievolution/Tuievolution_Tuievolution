import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Projenizde yüklü olan Lucide ikonlarını kullanıyoruz
import { Github, Linkedin, Download, Star, Briefcase } from 'lucide-react';

const EvrimAluc = () => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    // Backend'den veriyi çek ve filtrele
    axios.get('https://tuievolution-backend.onrender.com/api/team')
      .then(res => {
        // İsmin içinde "evrim" geçen kaydı bulur (büyük/küçük harf duyarsız)
        const found = res.data.find(m => m.name.toLowerCase().includes("evrim"));
        setMember(found);
      })
      .catch(err => console.error("Evrim verisi çekilemedi:", err));
  }, []);

  if (!member) return <div className="py-20 text-center">Yükleniyor...</div>;

  return (
    <div className='w-full min-h-screen py-16 px-4 transition-colors duration-500' style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className='max-w-[1000px] mx-auto'>
        {/* Ana Kart Yapısı - index.css'deki .card sınıfı kullanıldı */}
        <div className='card shadow-2xl flex flex-col p-8 rounded-3xl border border-white/10'>
            
            {/* Üst Bilgi Satırı: İsim, Sosyal Linkler ve CV Butonu */}
            <div className='flex flex-wrap items-center justify-between border-b pb-6 border-white/10 mb-8'>
                <div className='flex items-center gap-6'>
                    <h2 className='text-4xl font-bold' style={{ color: 'var(--text-primary)' }}>{member.name}</h2>
                    <div className='flex gap-4'>
                        <a href={member.githubUrl} target="_blank" rel="noreferrer" className='hover:scale-110 transition-transform' style={{ color: 'var(--text-primary)' }}>
                            <Github size={28} />
                        </a>
                        <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className='hover:scale-110 transition-transform' style={{ color: 'var(--accent)' }}>
                            <Linkedin size={28} />
                        </a>
                    </div>
                </div>
                
                <a href={member.cvPdfUrl} download className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all hover:brightness-110 shadow-lg" style={{ backgroundColor: 'var(--accent)' }}>
                    <Download size={20} /> CV İndir
                </a>
            </div>

            {/* İçerik Alanı: Sol (Açıklama) ve Sağ (Yetenekler Listesi) */}
            <div className='grid md:grid-cols-3 gap-10'>
                
                {/* SOL TARAF: Hakkımda / Açıklama (Geniş Alan) */}
                <div className='md:col-span-2'>
                    <h3 className='text-xl font-bold mb-4 flex items-center gap-2' style={{ color: 'var(--accent)' }}>
                        <Star size={22} /> Hakkımda
                    </h3>
                    <p className='text-lg leading-relaxed text-justify opacity-90' style={{ color: 'var(--text-primary)' }}>
                        {member.description}
                    </p>
                </div>

                {/* SAĞ TARAF: Core Skills (Dikey Liste) */}
                <div className='md:col-span-1 border-l border-white/10 pl-0 md:pl-10'>
                    <h3 className='text-xl font-bold mb-4 flex items-center gap-2' style={{ color: 'var(--accent)' }}>
                        <Briefcase size={22} /> Core Skills
                    </h3>
                    <div className='flex flex-col gap-4'>
                        {member.coreSkills && member.coreSkills.map((skill, index) => (
                            <div 
                                key={index} 
                                className='px-5 py-3 rounded-2xl font-bold text-center shadow-sm border transition-transform hover:scale-105' 
                                style={{ 
                                    backgroundColor: 'var(--bg-secondary)', 
                                    color: 'var(--text-primary)', 
                                    borderColor: 'var(--accent)' 
                                }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default EvrimAluc;