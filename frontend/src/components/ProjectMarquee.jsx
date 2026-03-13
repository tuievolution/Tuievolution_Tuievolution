import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProjectMarquee = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Render üzerindeki backend URL'niz
    fetch('https://tuievolution-backend.onrender.com/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error(`Sunucu Hatası: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Gelen verinin dizi olduğundan emin oluyoruz (500 hatasında dizi gelmez)
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Beklenen veri formatı (dizi) gelmedi:", data);
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projeler çekilirken hata oluştu:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Hata veya Yükleme Durumları
  if (loading) return (
    <div className="text-center py-10 opacity-50">
      <div>Projeler Yükleniyor...</div>
      <div>Database bağlanıldığı için birkaç dakika alabilir</div>
    </div>

  );
  if (error) return <div className="text-center py-10 text-red-500">Verilere erişilemiyor. (CORS veya Veritabanı Hatası)</div>;
  if (!Array.isArray(projects) || projects.length === 0) return null;

  // Sonsuz döngü için veriyi çoğalt (Sadece veri varsa çalışır)
  const displayProjects = [...projects, ...projects, ...projects, ...projects];

  // Helper: Başlıktaki boşlukları _ yapar (Asistan yönlendirmesiyle uyumlu)
  const getProjectSlug = (title) => title ? title.trim().replace(/\s+/g, '_') : 'proje';

  return (
    <div className="w-full overflow-hidden py-10 bg-accent/5 dark:bg-white/5 mt-10 relative">
      <div className="flex w-max gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {displayProjects.map((project, index) => (
          <Link 
            key={`${project.id || index}-${index}`} 
            to={`/projects#${getProjectSlug(project.title)}`}
            className="w-72 h-48 glass card flex flex-col items-center justify-center overflow-hidden group border border-transparent hover:border-accent relative rounded-2xl p-0 transition-all duration-300 flex-shrink-0"
          >
             {/* Arka Plan Görseli */}
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${project.imageUrl || 'https://via.placeholder.com/300x200'})` }}
             >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
             </div>
             
             {/* Başlık ve Işıklı Efekt Katmanı */}
             <div className="relative z-10 text-center px-4">
                <h3 className="text-xl font-bold text-white drop-shadow-md tracking-wider group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
             </div>

             {/* Kart Etrafındaki Çift Yönlü Işık Efekti (Hover durumunda) */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 border-2 border-accent/30 rounded-2xl animate-pulse"></div>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;