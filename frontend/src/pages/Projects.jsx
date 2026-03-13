import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, ArrowUp } from 'lucide-react';
import ProjectMarquee from '../components/ProjectMarquee';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const [highlightedSlug, setHighlightedSlug] = useState(null);

  // Helper: Başlığı ID formatına çevirir
  const getProjectSlug = (title) => title ? title.trim().replace(/\s+/g, '_') : '';

  useEffect(() => {
    fetch('https://tuievolution-backend.onrender.com/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Projeler yüklenemedi:", err));
      
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash Link Yönlendirmesi ve Işık Zamanlayıcısı
  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      setHighlightedSlug(slug); // Işığı yak
      
      const element = document.getElementById(slug);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }

      // 3 Saniye Sonra Işığı Söndür
      const timer = setTimeout(() => {
        setHighlightedSlug(null);
      }, 5000);

      // Temizlik: Component unmount olursa veya hash değişirse timer'ı iptal et
      return () => clearTimeout(timer);
    }
  }, [location, projects]);

  return (
    <div className="min-h-screen pt-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <ProjectMarquee />

      <div className="container mx-auto px-6 py-16 relative z-10">
        
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-sm font-bold tracking-wider uppercase opacity-70" style={{ color: 'var(--accent)' }}>
            Öne Çıkan Çalışmalar
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
            Etki Yaratan <span className="italic font-normal" style={{ color: 'var(--accent)' }}>Projeler</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => {
            const projectSlug = getProjectSlug(project.title);
            // Sadece highlightedSlug ile eşleşiyorsa true döner, süre bitince false olur
            const isHighlighted = projectSlug === highlightedSlug;

            return (
              <div 
                key={project.id}
                id={projectSlug}
                // isHighlighted true ise 'active' class'ı eklenir ve ışık yanar.
                // False olduğunda sadece hover efekti kalır.
                className={`group md:row-span-1 shadow-lg transition-all duration-500 rounded-2xl glow-card-base relative
                  ${isHighlighted ? 'active scale-[1.02]' : 'hover:scale-[1.02]'}`}
                style={{ 
                   backgroundColor: 'transparent'
                }}
              >
                {/* İçerik Wrapper: Işığın üstünde duracak ve arkaplan rengini verecek */}
                <div className="glow-content-wrapper h-full flex flex-col">
                    
                    {/* Resim Alanı */}
                    <div className="relative overflow-hidden aspect-video rounded-t-xl">
                      <img
                        src={project.imageUrl || "https://via.placeholder.com/600x400"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60" />
                      
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.projectLink && (
                          <a href={project.projectLink} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-lg">
                            <ArrowUpRight className="w-6 h-6"/>
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-black text-white hover:scale-110 transition-transform shadow-lg">
                            <Github className="w-6 h-6"/>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* İçerik Alanı */}
                    <div className="p-6 space-y-4 flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-2xl font-bold transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {project.title}
                        </h3>
                        <ArrowUpRight 
                          className="w-6 h-6 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                          style={{ color: 'var(--accent)' }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.stack ? project.stack.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 hover:brightness-110"
                            style={{ 
                              backgroundColor: 'var(--bg-primary)', 
                              color: 'var(--text-primary)',
                              borderColor: 'rgba(255,255,255,0.2)'
                            }}
                          > 
                            {tech.trim()} 
                          </span>
                        )) : (
                          <span className="text-xs opacity-50">Teknoloji bilgisi yok</span>
                        )}
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-7 p-3 rounded-full shadow-2xl hover:scale-110 transition-all z-40 text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Projects;