import React from 'react';
import ProjectMarquee from '../components/ProjectMarquee';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      
      {/* Hero Section */}
      <div className="text-center px-4 mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-textprimary tracking-tight">
          Welcome to <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-pink-500">TUIEVOLUTION</span>
        </h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto font-light">
          İnovasyon ve teknolojinin buluştuğu nokta. Modern web çözümleri geliştiriyoruz.
        </p>
      </div>

      {/* Kayan Projeler */}
      <section className="mb-24">
        <h2 className="text-center text-2xl font-bold text-accent mb-4 tracking-widest uppercase">Latest Works</h2>
        <ProjectMarquee />
      </section>

      {/* Developers Section */}
<section className="container mx-auto px-6 py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Evrim Kartı */}
      <Link to="/about/evrim" className="glass p-8 rounded-[2.5rem] hover:scale-[1.02] transition-transform group cursor-pointer">
        <div className="w-16 h-16 bg-accent rounded-2xl mb-6 flex items-center justify-center text-white font-bold text-xl ">EA</div>
        <h3 className="text-2xl font-bold text-accent mb-2">Evrim Aluç</h3>
        <p className="opacity-70">Backend Architect & Java Developer. Specialized in scalable systems.</p>
      </Link>

    {/* Tuana Kartı */}
      <Link to="/about/tuana" className="glass p-8 rounded-[2.5rem] hover:scale-[1.02] transition-transform group cursor-pointer border-pink-300/30">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mb-6 flex items-center justify-center text-white font-bold text-xl">TA</div>
        <h3 className="text-2xl font-bold text-accent mb-2">Tuana Akyıldız</h3>
        <p className="opacity-70">Software Engineer & Full-Stack Developer</p>
      </Link>
  </div>
</section>
    </div>
  );
};

export default Home;