import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Code, Zap, Trophy, Users, Star, CheckCircle, 
  Sparkles, Flame, Target, ChevronDown, ChevronUp, Github, 
  Twitter, Linkedin, Terminal, Layout, Database, Globe
} from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sponsors = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Vercel', 'Node.js'];

  const roadmap = [
    { title: 'Dasar Web', icon: Layout, desc: 'HTML5 & CSS3 Mastery' },
    { title: 'Logika Pemrograman', icon: Terminal, desc: 'JavaScript Modern (ES6+)' },
    { title: 'Frontend Modern', icon: Code, desc: 'React.js & State Management' },
    { title: 'Backend & API', icon: Database, desc: 'Node.js & Database' },
  ];

  const testimonials = [
    { name: "Sarah W.", role: "Frontend Dev", text: "Cara belajarnya seru banget! Gak kerasa kayak lagi belajar, tapi skill nambah terus." },
    { name: "Budi Santoso", role: "Career Switcher", text: "Dari nol banget sampai bisa bikin web sendiri dalam 3 bulan. Recommended!" },
    { name: "Jessica L.", role: "Student", text: "Gamifikasinya bikin ketagihan. Tiap naik level rasanya puas banget." }
  ];

  const faqs = [
    { q: "Apakah cocok untuk pemula?", a: "Sangat cocok! Materi disusun dari nol tanpa asumsi kamu punya latar belakang IT." },
    { q: "Berapa lama akses materinya?", a: "Akses selamanya (Lifetime Access) untuk kelas yang sudah dibeli." },
    { q: "Apakah dapat sertifikat?", a: "Ya, sertifikat kompetensi akan diberikan setelah menyelesaikan final project." },
    { q: "Ada mentor yang membimbing?", a: "Tentu, kamu bisa tanya jawab langsung dengan mentor di grup Discord eksklusif." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white relative">
      
      {/* Background Ambience & Moving Grid (New "Wow" Factor) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Slowed down pulse animation (duration-10s) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        
        {/* Moving Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-purple-500/20">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Webify</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#roadmap" className="hover:text-white transition-colors">Alur Belajar</a>
            <a href="#features" className="hover:text-white transition-colors">Fitur</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          {/* New Animated Button */}
          <button onClick={onGetStarted} className="relative group px-6 py-2.5 rounded-full font-bold text-sm overflow-hidden bg-white text-slate-900 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <span className="relative z-10">Masuk / Daftar</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-11">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="animate-fade-in-up z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 backdrop-blur-sm shadow-lg shadow-purple-900/20">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Revolusi Cara Belajar Coding</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Koding Jadi <br/>
              {/* Animated Gradient Text with Shine Effect Inside */}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-color-shift bg-300%">
                  Lebih Seru
                </span>
             
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              Platform belajar coding interaktif dengan sistem gamifikasi. 
              Raih XP, naikkan level, dan bangun portofolio impianmu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onGetStarted} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-purple-500/25 ring-2 ring-purple-500/20 ring-offset-2 ring-offset-slate-950">
                Mulai Gratis <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl font-semibold transition-all hover:border-purple-500/50">
                Lihat Silabus
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-xs text-white overflow-hidden shadow-lg">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+5}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Bergabung dengan 10.000+ developer</p>
            </div>
          </div>

          {/* Right: Mock Code Editor */}
          <div className="relative group perspective-1000 hidden lg:block z-10">
            {/* Glow effect behind editor */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl transform rotate-y-6 rotate-x-6 group-hover:rotate-0 transition-all duration-700 ease-out">
              {/* Window Controls */}
              <div className="bg-slate-900/50 px-4 py-3 flex items-center gap-2 border-b border-slate-800 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 text-xs text-slate-500 font-mono flex items-center gap-2">
                  <Code className="w-3 h-3" /> app.js — CodeMastery
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">1</span>
                  <p><span className="text-purple-400 font-bold">const</span> <span className="text-blue-400">student</span> = <span className="text-yellow-300">new</span> <span className="text-green-400">Developer</span>();</p>
                </div>
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">2</span>
                  <p><span className="text-blue-400">student</span>.<span className="text-yellow-300">learn</span>(<span className="text-orange-300">'HTML'</span>);</p>
                </div>
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">3</span>
                  <p><span className="text-blue-400">student</span>.<span className="text-yellow-300">learn</span>(<span className="text-orange-300">'CSS'</span>);</p>
                </div>
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">4</span>
                  <p><span className="text-blue-400">student</span>.<span className="text-yellow-300">master</span>(<span className="text-orange-300">'React'</span>);</p>
                </div>
                <div className="flex mt-2">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">5</span>
                  <p><span className="text-purple-400 font-bold">if</span> ( <span className="text-blue-400">student</span>.<span className="text-blue-400">isReady</span> ) {'{'}</p>
                </div>
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">6</span>
                  <p className="pl-4"><span className="text-blue-400">job</span>.<span className="text-yellow-300">apply</span>();</p>
                </div>
                <div className="flex">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">7</span>
                  <p>{'}'}</p>
                </div>
                {/* Simulated Cursor with clearer blink */}
                <div className="flex mt-2">
                  <span className="text-slate-700 mr-4 select-none w-4 text-right">8</span>
                  <span className="w-2.5 h-5 bg-purple-500 animate-cursor-blink shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Strip - Enhanced */}
      <div className="border-y border-slate-800 bg-slate-950/80 backdrop-blur-sm overflow-hidden py-10 relative z-10">
        <div className="flex animate-scroll whitespace-nowrap gap-16 w-max px-6">
          {[...sponsors, ...sponsors, ...sponsors].map((tech, i) => (
            <span key={i} className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-600 to-slate-800 uppercase tracking-widest hover:from-slate-400 hover:to-slate-600 transition-all cursor-default">{tech}</span>
          ))}
        </div>
      </div>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-11 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Peta Jalan Menuju Pro</h2>
          <p className="text-slate-400">Kurikulum terstruktur untuk membimbingmu dari nol hingga kerja.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {roadmap.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-purple-900/20">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="absolute top-6 right-6 text-slate-800 font-black text-4xl group-hover:text-purple-500/10 transition-colors">{idx + 1}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              {/* Connector Line (Desktop Only) */}
              {idx !== roadmap.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-slate-800 z-10 group-hover:bg-purple-500/50 transition-colors delay-100"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/30 px-11 relative border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <span className="text-purple-400 font-semibold tracking-wider text-sm uppercase">Fitur Unggulan</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Belajar Lebih Cepat & Efektif</h2>
              <p className="text-slate-400 mb-6">Metode kami dirancang agar kamu tidak bosan dan materi mudah menempel di otak.</p>
              {/* <button className="text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors">Lihat semua fitur</button> */}
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "Gamifikasi XP", desc: "Dapatkan XP setiap menyelesaikan modul." },
                { icon: Trophy, title: "Leaderboard", desc: "Bersaing sehat dengan siswa lain." },
                { icon: Users, title: "Forum Diskusi", desc: "Tanya jawab 24/7 jika stuck." },
                { icon: Target, title: "Proyek Nyata", desc: "Bangun portfolio yang bisa dipamerkan." }
              ].map((f, i) => (
                <div key={i} className="group bg-slate-950/80 p-6 rounded-xl border border-slate-800 hover:border-purple-500/30 hover:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{f.title}</h4>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-11 max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-16">Apa Kata Mereka?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 relative hover:-translate-y-2 transition-transform duration-300 shadow-xl">
              <div className="absolute top-[-10px] left-8 text-6xl text-purple-900/50 font-serif leading-none">"</div>
              <p className="text-slate-300 italic mb-6 relative z-10">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                   <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${t.name}`} alt={t.name} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">{t.name}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Sering Ditanyakan</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-slate-700">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className={`font-medium transition-colors ${openFaq === index ? 'text-purple-400' : 'text-slate-200'}`}>
                  {item.q}
                </span>
                {openFaq === index ? <ChevronUp className="w-5 h-5 text-purple-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-600 to-blue-700 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl shadow-purple-900/50">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          {/* Animated glow inside CTA */}
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-white/10 rotate-45 animate-pulse-slow pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Jangan Cuma Nonton Tutorial.</h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">Mulai menulis kode pertamamu hari ini dan ubah karirmu dalam 12 minggu ke depan.</p>
            <button className="px-10 py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform hover:shadow-white/20">
              Gabung Sekarang — Gratis
            </button>
            <p className="mt-6 text-sm text-purple-200/80">Tidak perlu kartu kredit. Batalkan kapan saja.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-11 text-sm relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Webify</span>
            </div>
            <p className="text-slate-500 max-w-xs">Platform belajar coding nomor #1 di Indonesia dengan metode gamifikasi yang terbukti efektif.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-slate-200">Belajar</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">HTML & CSS</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">JavaScript</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">React JS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-slate-200">Perusahaan</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600">
          <p>&copy; 2025 Webify Indonesia. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      {/* Custom Keyframe Styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        .bg-300% {
          background-size: 300% auto;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes colorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shineSlow {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-gradient-text {
          animation: gradientMove 6s ease infinite;
        }

        .animate-color-shift {
          background-size: 200% 200%;
          animation: colorShift 4s ease-in-out infinite;
        }

        .animate-shine-slow {
          animation: shineSlow 3.5s ease-in-out infinite;
        }

        .animate-cursor-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}