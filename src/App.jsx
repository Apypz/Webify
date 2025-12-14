import React, { useState, useEffect, useRef } from 'react';
import LandingPageInfo from './LandingPageInfo';
import LoginPage from './LandingPage';
import base from './assets/base.png';
import hat from './assets/hat.png';
import jacket from './assets/jacket.png';
import samurai from './assets/samurai.png';
import hatJacket from './assets/hat+jacket.png';
import samuraiJacket from './assets/samurai+jacket.png';
import { 
  Trophy, 
  Code, 
  Play, 
  CheckCircle, 
  User, 
  Zap, 
  Star, 
  Lock, 
  Unlock, 
  Layout, 
  Terminal, 
  Hash, 
  ChevronRight,
  Flame,
  Award,
  Book,         // For Student Log
  Rocket,       // For Final Project
  Github,       // For Git Course
  Plus,         // For Add Log
  Save,         // For Save Log
  CheckSquare,  // For Checklist
  Link as LinkIcon,
  LogOut,
  Shirt
} from 'lucide-react';

// --- MOCK DATA: CURRICULUM ---
const CURRICULUM = [
  {
    id: 'html',
    title: 'Struktur HTML',
    icon: Layout,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    progressColor: 'bg-orange-400',
    description: 'Kerangka dasar website.',
    lessons: [
      {
        id: 'html-1',
        title: 'Tag & Element',
        videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE', 
        content: 'HTML menggunakan "tag" untuk membuat elemen. Kebanyakan tag memiliki pembuka <tag> dan penutup </tag>.',
        taskType: 'quiz',
        question: 'Tag mana yang membuat heading terbesar?',
        options: ['<head>', '<h6>', '<h1>', '<header>'],
        correctAnswer: '<h1>',
        xpReward: 50
      },
      {
        id: 'html-2',
        title: 'Atribut & Gambar',
        videoUrl: 'https://www.youtube.com/embed/kUmKb99XWnI',
        content: 'Atribut memberikan informasi tambahan tentang elemen. Tag <img> memerlukan atribut "src".',
        taskType: 'code',
        challenge: 'Ketik kode untuk menampilkan gambar dengan sumber "cat.jpg".',
        expectedCode: '<img src="cat.jpg">',
        xpReward: 75
      },
      {
        id: 'html-3',
        title: 'Form & Input',
        videoUrl: 'https://www.youtube.com/embed/YwbIeMlxZcU',
        content: 'Form memungkinkan pengguna mengirim data. Input adalah tempat pengguna memasukkan data.',
        taskType: 'code',
        challenge: 'Buat input text dengan placeholder "Nama".',
        expectedCode: '<input type="text" placeholder="Nama">',
        xpReward: 80
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Styling',
    icon: Hash,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    progressColor: 'bg-blue-400',
    description: 'Buat website terlihat cantik.',
    lessons: [
      {
        id: 'css-1',
        title: 'Selector & Warna',
        videoUrl: 'https://www.youtube.com/embed/yfoY53QXEnI',
        content: 'CSS memilih elemen HTML dan menerapkan gaya. Warna bisa berupa hex, nama, atau RGB.',
        taskType: 'quiz',
        question: 'Properti mana yang mengubah warna teks?',
        options: ['font-color', 'text-style', 'color', 'background'],
        correctAnswer: 'color',
        xpReward: 60
      },
      {
        id: 'css-2',
        title: 'Box Model',
        videoUrl: 'https://www.youtube.com/embed/rIO0XMu-O5M',
        content: 'Box model terdiri dari content, padding, border, dan margin.',
        taskType: 'quiz',
        question: 'Urutan box model dari dalam ke luar?',
        options: ['margin, border, padding, content', 'content, padding, border, margin', 'padding, content, margin, border', 'border, padding, content, margin'],
        correctAnswer: 'content, padding, border, margin',
        xpReward: 70
      },
      {
        id: 'css-3',
        title: 'Flexbox & Grid',
        videoUrl: 'https://www.youtube.com/embed/qqdhbgx_8-g',
        content: 'Flexbox dan Grid memudahkan tata letak responsive.',
        taskType: 'code',
        challenge: 'Buat container flex dengan direction row.',
        expectedCode: 'display: flex; flex-direction: row;',
        xpReward: 85
      }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript Logic',
    icon: Terminal,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    progressColor: 'bg-yellow-400',
    description: 'Buat website interaktif.',
    lessons: [
      {
        id: 'js-1',
        title: 'Variabel',
        videoUrl: 'https://www.youtube.com/embed/9D1x7-2FmQA',
        content: 'Variabel adalah kontainer untuk menyimpan nilai. Gunakan let, const, atau var.',
        taskType: 'code',
        challenge: 'Deklarasikan variabel "score" dengan nilai 10 menggunakan "let".',
        expectedCode: 'let score = 10;',
        xpReward: 100
      },
      {
        id: 'js-2',
        title: 'Function & Loop',
        videoUrl: 'https://www.youtube.com/embed/FOD408a0EzU',
        content: 'Function adalah blok kode yang dapat digunakan kembali. Loop mengulang kode.',
        taskType: 'quiz',
        question: 'Loop mana yang cocok untuk array?',
        options: ['for', 'forEach', 'while', 'semua jawaban benar'],
        correctAnswer: 'semua jawaban benar',
        xpReward: 110
      },
      {
        id: 'js-3',
        title: 'DOM Manipulation',
        videoUrl: 'https://www.youtube.com/embed/l-7scXxFmzI',
        content: 'DOM adalah representasi HTML dalam JavaScript. Kita bisa mengubahnya secara dinamis.',
        taskType: 'code',
        challenge: 'Pilih elemen dengan id "myId".',
        expectedCode: 'document.getElementById("myId")',
        xpReward: 120
      }
    ]
  },
  {
    id: 'git',
    title: 'Git & Version Control',
    icon: Github,
    color: 'text-white',
    bgColor: 'bg-slate-700/50',
    progressColor: 'bg-white',
    description: 'Kelola versi kode Anda.',
    lessons: [
      {
        id: 'git-1',
        title: 'Init & Commit',
        videoUrl: 'https://www.youtube.com/embed/USjZcfj8yxE',
        content: 'Git melacak perubahan kode. "Init" memulai repo, "Add" menyelaraskan file, dan "Commit" menyimpannya.',
        taskType: 'quiz',
        question: 'Perintah mana yang menyimpan perubahan Anda?',
        options: ['git save', 'git push', 'git commit', 'git add'],
        correctAnswer: 'git commit',
        xpReward: 120
      },
      {
        id: 'git-2',
        title: 'Branch & Merge',
        videoUrl: 'https://www.youtube.com/embed/e2IbNHi4uCI',
        content: 'Branch memungkinkan Anda bekerja pada fitur terpisah. Merge menggabungkan perubahan.',
        taskType: 'quiz',
        question: 'Perintah mana yang membuat branch baru?',
        options: ['git new branch', 'git branch newname', 'git create branch', 'git switch -c newname'],
        correctAnswer: 'git branch newname',
        xpReward: 130
      }
    ]
  },
  // {
  //   id: 'react',
  //   title: 'React Basics',
  //   icon: Code,
  //   color: 'text-cyan-400',
  //   bgColor: 'bg-cyan-500/20',
  //   progressColor: 'bg-cyan-400',
  //   description: 'Buat UI dengan React.',
  //   lessons: [
  //     {
  //       id: 'react-1',
  //       title: 'Component & JSX',
  //       videoUrl: 'https://www.youtube.com/embed/0IiGBLDg69A',
  //       content: 'Component adalah bagian UI yang dapat digunakan kembali. JSX membuat HTML dalam JavaScript.',
  //       taskType: 'code',
  //       challenge: 'Buat functional component bernama MyApp.',
  //       expectedCode: 'function MyApp() { return <h1>Hello</h1>; }',
  //       xpReward: 140
  //     },
  //     {
  //       id: 'react-2',
  //       title: 'State & Props',
  //       videoUrl: 'https://www.youtube.com/embed/ICmMVDp_OAI',
  //       content: 'State adalah data yang dapat berubah. Props adalah data yang dikirim ke component.',
  //       taskType: 'quiz',
  //       question: 'Props dapat diubah dari dalam component?',
  //       options: ['Ya', 'Tidak', 'Tergantung', 'Bisa keduanya'],
  //       correctAnswer: 'Tidak',
  //       xpReward: 150
  //     }
  //   ]
  // }
];

const BADGES = {
  html: { name: 'Arsitek HTML', icon: Layout, color: 'text-orange-400' },
  css: { name: 'Penyihir Gaya', icon: Hash, color: 'text-blue-400' },
  js: { name: 'Ninja Logika', icon: Terminal, color: 'text-yellow-400' },
  git: { name: 'Penjelajah Waktu', icon: Github, color: 'text-white' },
  react: { name: 'Master Komponen', icon: Code, color: 'text-cyan-400' },
  expert: { name: 'Expert Developer', icon: Trophy, color: 'text-purple-400' },
  speedrunner: { name: 'Speedrunner', icon: Flame, color: 'text-red-400' },
  allstar: { name: 'All Star', icon: Star, color: 'text-yellow-400' },
  master: { name: 'Master Developer', icon: Trophy, color: 'text-yellow-500' },
  project: { name: 'Project Submitter', icon: Rocket, color: 'text-green-400' }
};

// Rank system based on completed milestones
const RANK_SYSTEM = {
  none: { name: 'Code Novice', icon: Code, color: 'text-slate-400' },
  html: { name: 'Front-End Cadet', icon: Layout, color: 'text-orange-400' },
  html_css: { name: 'Style Master', icon: Hash, color: 'text-blue-400' },
  html_css_js: { name: 'JavaScript Warrior', icon: Terminal, color: 'text-yellow-400' },
  html_css_js_git: { name: 'Version Control Expert', icon: Github, color: 'text-white' },
  html_css_js_git_react: { name: 'Full-Stack Legend', icon: Code, color: 'text-cyan-400' }
};

const getRankBasedOnMilestones = (completedMilestones) => {
  const completed = completedMilestones.sort().join('_');
  
  if (completedMilestones.includes('html') && completedMilestones.includes('css') && 
      completedMilestones.includes('js') && completedMilestones.includes('git') && 
      completedMilestones.includes('react')) {
    return RANK_SYSTEM.html_css_js_git_react;
  } else if (completedMilestones.includes('html') && completedMilestones.includes('css') && 
             completedMilestones.includes('js') && completedMilestones.includes('git')) {
    return RANK_SYSTEM.html_css_js_git;
  } else if (completedMilestones.includes('html') && completedMilestones.includes('css') && 
             completedMilestones.includes('js')) {
    return RANK_SYSTEM.html_css_js;
  } else if (completedMilestones.includes('html') && completedMilestones.includes('css')) {
    return RANK_SYSTEM.html_css;
  } else if (completedMilestones.includes('html')) {
    return RANK_SYSTEM.html;
  }
  return RANK_SYSTEM.none;
};

const PROJECT_STEPS = [
  { id: 1, text: 'Inisialisasi repository Git baru secara lokal' },
  { id: 2, text: 'Buat index.html dengan layout semantik (header, main, footer)' },
  { id: 3, text: 'Buat style.css dan tautkan ke HTML Anda' },
  { id: 4, text: 'Tambahkan bagian "Tentang Saya" dengan biodata Anda' },
  { id: 5, text: 'Buat galeri "Proyek" menggunakan CSS Grid atau Flexbox' },
  { id: 6, text: 'Commit semua perubahan dengan pesan yang bermakna' },
  { id: 7, text: 'Buat repository baru di GitHub' },
  { id: 8, text: 'Push kode lokal Anda ke remote repository GitHub' }
];

// --- COMPONENTS ---

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute animate-ping w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="text-4xl animate-bounce">🎉</div>
      <div className="absolute top-1/4 left-1/4 text-4xl animate-pulse">✨</div>
      <div className="absolute top-1/4 right-1/4 text-4xl animate-pulse delay-75">🔥</div>
      <div className="absolute bottom-1/4 left-1/3 text-4xl animate-pulse delay-150">🌟</div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, user, onLogout, clearActiveLesson, character, getCharacterImage }) => (
  <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col items-center md:items-stretch py-6 transition-all duration-300">
    <div className="px-6 mb-10 flex items-center justify-center md:justify-start gap-3">
      <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
        <Code className="text-white w-6 h-6" />
      </div>
      <span className="hidden md:block font-bold text-xl text-white tracking-tight">Webify</span>
    </div>

    <nav className="flex-1 space-y-2 px-3">
      {[
        { id: 'dashboard', icon: Zap, label: 'Dashboard' },
        { id: 'learn', icon: Trophy, label: 'Quests' },
        { id: 'logs', icon: Book, label: "Log" },
        { id: 'character', icon: Shirt, label: 'Character' },
        { id: 'project', icon: Rocket, label: 'Final Project' },
        { id: 'profile', icon: User, label: 'Profile' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => {
            clearActiveLesson();
            setActiveTab(item.id);
          }}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
            activeTab === item.id 
              ? 'bg-violet-600/10 text-violet-400' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'stroke-[2.5px]' : ''}`} />
          <span className="hidden md:block font-medium">{item.label}</span>
          {activeTab === item.id && (
            <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"></div>
          )}
        </button>
      ))}
    </nav>

    {/* User Mini Profile */}
    <div className="mt-auto px-4 py-4 border-t border-slate-800/50 w-full space-y-4">
      <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
          <img src={getCharacterImage()} alt="Character" className="w-8 h-8" />
        </div>
        <div className="hidden md:block overflow-hidden">
          <p className="text-sm font-bold text-slate-200 truncate">{user.name}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {user.xp} XP
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span className="font-bold text-yellow-400">$</span> {user.coins} Coins
          </p>
        </div>
      </div>
      
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden md:block">Logout</span>
      </button>
    </div>
  </div>
);

const LessonView = ({ milestone, lesson, onComplete, onBack, onNext }) => {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const checkAnswer = () => {
    let correct = false;
    if (lesson.taskType === 'quiz') {
      correct = userInput === lesson.correctAnswer;
    } else {
      const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
      correct = normalize(userInput) === normalize(lesson.expectedCode);
    }

    if (correct) {
      setFeedback('correct');
      setIsCompleted(true);
      onComplete(lesson.xpReward);
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {lesson.title}
            {isCompleted && <CheckCircle className="text-green-400 w-6 h-6" />}
          </h2>
          <p className="text-slate-400 text-sm">{milestone.title} • {lesson.xpReward} XP Reward</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto pb-20">
        <div className="space-y-6">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 relative group">
            <iframe 
              src={lesson.videoUrl} 
              title={lesson.title}
              className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-violet-300 mb-2">The Theory</h3>
              <p className="text-slate-300 leading-relaxed">{lesson.content}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6 flex-1 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Mission Task
              </h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                {lesson.taskType.toUpperCase()}
              </span>
            </div>

            <p className="text-slate-300 mb-6 font-medium">
              {lesson.taskType === 'quiz' ? lesson.question : lesson.challenge}
            </p>

            {lesson.taskType === 'quiz' ? (
              <div className="space-y-3">
                {lesson.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setUserInput(opt)}
                    disabled={isCompleted}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-200 ${
                      userInput === opt 
                        ? 'border-violet-500 bg-violet-500/10 text-white' 
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isCompleted}
                  placeholder="Type your code here..."
                  className="w-full h-40 bg-black/50 border border-slate-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  spellCheck="false"
                />
              </div>
            )}

            <div className="mt-6">
              {feedback === 'incorrect' && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center animate-shake">
                  Oops! That doesn't look right. Try again!
                </div>
              )}
              
              {isCompleted ? (
                 <div className="space-y-3">
                   <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-center font-bold flex flex-col items-center gap-2 animate-bounce-short">
                    <CheckCircle className="w-8 h-8" />
                    Mission Complete! +{lesson.xpReward} XP
                  </div>
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      Next Lesson <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                 </div>
              ) : (
                <button
                  onClick={checkAnswer}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 transition-all active:scale-95"
                >
                  Submit Solution
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterView = ({ user, character, setCharacter, spendCoins, getCharacterImage }) => {
  const shopItems = [
    { name: 'hat', cost: 100 },
    { name: 'jacket', cost: 250 },
    { name: 'samurai', cost: 400 },
  ];

  const purchaseItem = (item) => {
    if (user.coins >= item.cost && !character.purchasedItems.includes(item.name)) {
      spendCoins(item.cost);
      setCharacter(prev => ({ ...prev, purchasedItems: [...prev.purchasedItems, item.name] }));
    } else if (character.purchasedItems.includes(item.name)) {
      alert("You already own this item!");
    } else {
      alert("Not enough coins!");
    }
  };

  const toggleEquip = (itemName) => {
    const { equipped } = character;
    const isCurrentlyEquipped = equipped[itemName];

    // Constraint: cannot equip hat and samurai at the same time
    if (!isCurrentlyEquipped) {
      if (itemName === 'hat' && equipped.samurai) {
        alert("Cannot equip hat with samurai!");
        return;
      }
      if (itemName === 'samurai' && equipped.hat) {
        alert("Cannot equip samurai with hat!");
        return;
      }
    }

    setCharacter(prev => ({
      ...prev,
      equipped: {
        ...prev.equipped,
        [itemName]: !isCurrentlyEquipped
      }
    }));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-white mb-4">Your Avatar</h2>
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center">
            <img src={getCharacterImage()} alt="Character" className="w-48 h-48" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Accessory Shop</h2>
            <p className="text-slate-400 mb-6">Koin punyamu: <span className="font-bold text-yellow-400">{user.coins}</span></p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {shopItems.map(item => (
                <div key={item.name} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
                  <h3 className="font-bold text-slate-200 capitalize">{item.name}</h3>
                  <p className="text-sm text-yellow-400 font-bold mb-4">{item.cost} coins</p>
                  <button
                    onClick={() => purchaseItem(item)}
                    disabled={character.purchasedItems.includes(item.name)}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 rounded-xl transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
                  >
                    {character.purchasedItems.includes(item.name) ? 'Owned' : 'Buy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Inventory</h2>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              {character.purchasedItems.map(itemName => (
                <div key={itemName} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
                  <h3 className="font-bold text-slate-200 capitalize">{itemName}</h3>
                  <button
                    onClick={() => toggleEquip(itemName)}
                    className={`w-full mt-4 font-bold py-2 rounded-xl transition-colors ${
                      character.equipped[itemName]
                        ? 'bg-red-500 hover:bg-red-700 text-white'
                        : 'bg-green-500 hover:bg-green-700 text-white'
                    }`}
                  >
                    {character.equipped[itemName] ? 'Unequip' : 'Equip'}
                  </button>
                </div>
              ))}
              {character.purchasedItems.length === 0 && <p className="text-slate-500">Belum ada item yang dibeli.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Navigation state: 'landing' -> 'login' -> 'dashboard'
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLesson, setActiveLesson] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    level: 1,
    xp: 0,
    xpToNext: 200,
    badges: [],
    completedLessons: [],
    coins: 0
  });
  const [character, setCharacter] = useState({
    purchasedItems: [],
    equipped: {
      hat: false,
      jacket: false,
      samurai: false
    }
  });

  // --- STATE FOR STUDENT LOG ---
  const [logs, setLogs] = useState([
    { id: 1, date: '2023-12-01', mission: 'HTML Basics', report: 'Understood tags but confused about div vs span.' }
  ]);
  const [newLog, setNewLog] = useState({ date: '', mission: '', report: '' });
  const [isLogFormOpen, setIsLogFormOpen] = useState(false);

  // --- STATE FOR FINAL PROJECT ---
  const [projectProgress, setProjectProgress] = useState({
    completedSteps: [],
    repoUrl: '',
    isSubmitted: false
  });

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleLogin = (userData) => {
    setUser(prev => ({
      ...prev,
      name: userData.name,
      email: userData.email
    }));
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
    setUser({
      name: '',
      email: '',
      level: 1,
      xp: 0,
      xpToNext: 200,
      badges: [],
      completedLessons: []
    });
    setActiveTab('dashboard');
  };

  // Show landing page first
  if (currentPage === 'landing') {
    return <LandingPageInfo onGetStarted={handleGetStarted} />;
  }

  // Show login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBackToLanding={handleBackToLanding} />;
  }

  // Show dashboard/app
  if (currentPage === 'dashboard' && isLoggedIn) {
    const addRewards = (rewards) => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      setUser(prev => {
        let newXp = prev.xp + (rewards.xp || 0);
        let newLevel = prev.level;
        let newXpToNext = prev.xpToNext;
        let newCoins = prev.coins + (rewards.coins || 0);

        if (newXp >= prev.xpToNext) {
          newLevel += 1;
          newXp -= prev.xpToNext;
          newXpToNext = Math.floor(newXpToNext * 1.5);
        }

        return { ...prev, xp: newXp, level: newLevel, xpToNext: newXpToNext, coins: newCoins };
      });
    };

    const spendCoins = (amount) => {
      setUser(prev => {
        if (prev.coins >= amount) {
          return { ...prev, coins: prev.coins - amount };
        }
        return prev;
      });
    };

    const completeLesson = (lessonId, xpReward) => {
      if (!user.completedLessons.includes(lessonId)) {
        setUser(prev => ({
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId]
        }));
        addRewards({ xp: xpReward, coins: xpReward });
        checkBadges(lessonId);
      }
    };

    const checkBadges = (justCompletedId) => {
      const milestone = CURRICULUM.find(m => m.lessons.some(l => l.id === justCompletedId));
      if (!milestone) return;

      const allDone = milestone.lessons.every(l => 
        user.completedLessons.includes(l.id) || l.id === justCompletedId
      );

      if (allDone && !user.badges.includes(milestone.id)) {
        setTimeout(() => {
          alert(`🏆 BADGE UNLOCKED: ${BADGES[milestone.id].name}!`);
          setUser(prev => ({
            ...prev,
            badges: [...prev.badges, milestone.id]
          }));
        }, 1000);
      }

      // Check if all courses are completed for master badge
      const completedMilestones = CURRICULUM.filter(m => 
        m.lessons.every(l => user.completedLessons.includes(l.id) || 
          (m.lessons.some(lesson => lesson.id === justCompletedId) && 
           m.lessons.every(lesson => user.completedLessons.includes(lesson.id) || lesson.id === justCompletedId)))
      ).map(m => m.id);

      if (completedMilestones.length === CURRICULUM.length && !user.badges.includes('master')) {
        setTimeout(() => {
          alert(`🌟 ULTIMATE BADGE UNLOCKED: ${BADGES['master'].name}! You are now a Master Developer! 🌟`);
          setUser(prev => ({
            ...prev,
            badges: [...prev.badges, 'master']
          }));
        }, 2000);
      }
    };

    const getProgress = (milestoneId) => {
      const milestone = CURRICULUM.find(m => m.id === milestoneId);
      if (!milestone) return 0;
      const completedCount = milestone.lessons.filter(l => user.completedLessons.includes(l.id)).length;
      return Math.round((completedCount / milestone.lessons.length) * 100);
    };

    const getCompletedMilestones = () => {
      return CURRICULUM.filter(milestone => 
        milestone.lessons.every(l => user.completedLessons.includes(l.id))
      ).map(m => m.id);
    };

    const getCurrentRank = () => {
      return getRankBasedOnMilestones(getCompletedMilestones());
    };

    // --- LOG HANDLERS ---
    const handleLogSubmit = (e) => {
      e.preventDefault();
      if (!newLog.date || !newLog.mission) return;
      setLogs([ { id: Date.now(), ...newLog }, ...logs ]);
      setNewLog({ date: '', mission: '', report: '' });
      setIsLogFormOpen(false);
      addRewards({xp: 20, coins: 10}); // Small XP and coin reward for logging
    };

    // --- PROJECT HANDLERS ---
    const toggleProjectStep = (stepId) => {
      setProjectProgress(prev => {
        const isCompleted = prev.completedSteps.includes(stepId);
        const newSteps = isCompleted 
          ? prev.completedSteps.filter(id => id !== stepId)
          : [...prev.completedSteps, stepId];
        return { ...prev, completedSteps: newSteps };
      });
    };

    const getCharacterImage = () => {
      const { equipped } = character;
      if (equipped.samurai && equipped.jacket) return samuraiJacket;
      if (equipped.hat && equipped.jacket) return hatJacket;
      if (equipped.samurai) return samurai;
      if (equipped.hat) return hat;
      if (equipped.jacket) return jacket;
      return base;
    };

    const submitProject = () => {
      if (projectProgress.repoUrl.includes('github.com')) {
        setProjectProgress(prev => ({ ...prev, isSubmitted: true }));
        addRewards({xp: 500, coins: 250}); // Massive XP and coin reward for finishing project
        alert("🚀 Project Submitted! You are now a true Developer.");
        if (!user.badges.includes('project')) {
          setUser(prev => ({
            ...prev,
            badges: [...prev.badges, 'project']
          }));
        }
      } else {
        alert("Please enter a valid GitHub URL.");
      }
    };

    const getNextLesson = () => {
      const currentMilestone = CURRICULUM.find(m => m.lessons.includes(activeLesson));
      if (!currentMilestone) return null;

      const currentIndex = currentMilestone.lessons.indexOf(activeLesson);
      
      // If there's a next lesson in the same milestone, go to it
      if (currentIndex < currentMilestone.lessons.length - 1) {
        setActiveLesson(currentMilestone.lessons[currentIndex + 1]);
        return;
      }

      // If at the end of milestone, go to first lesson of next milestone
      const currentMilestoneIndex = CURRICULUM.indexOf(currentMilestone);
      if (currentMilestoneIndex < CURRICULUM.length - 1) {
        setActiveLesson(CURRICULUM[currentMilestoneIndex + 1].lessons[0]);
        return;
      }

      // If at the very end, go back
      setActiveLesson(null);
    };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} clearActiveLesson={() => setActiveLesson(null)} character={character} getCharacterImage={getCharacterImage} />
      <Confetti active={showConfetti} />

      <main className="flex-1 overflow-y-auto relative">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
          
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {activeTab === 'dashboard' ? 'Dashboard' : 
                 activeTab === 'learn' ? 'Pilih Misi' : 
                 activeTab === 'logs' ? "Log Kapten" :
                 activeTab === 'character' ? 'Kustomisasi Avatar' :
                 activeTab === 'project' ? 'Proyek Final' :
                 'Profil Operatif'}
              </h1>
              <p className="text-slate-400">Selamat kembali, {user.name}. Sistem Online.</p>
            </div>
            
            <div className="hidden md:flex items-center gap-4 bg-slate-900/50 p-2 pr-6 rounded-full border border-slate-800 backdrop-blur-md">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                  <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-violet-500 transition-all duration-1000" strokeDasharray={`${(user.xp / user.xpToNext) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <span className="absolute font-bold text-sm text-white">{user.level}</span>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Next Level</div>
                <div className="text-sm font-semibold text-white">{user.xp} / {user.xpToNext} XP</div>
              </div>
            </div>
          </header>

          {/* CONTENT AREA */}
          {activeLesson ? (
            <LessonView 
              milestone={CURRICULUM.find(m => m.lessons.includes(activeLesson))}
              lesson={activeLesson}
              onBack={() => setActiveLesson(null)}
              onComplete={(xp) => completeLesson(activeLesson.id, xp)}
              onNext={getNextLesson}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-violet-900/20 relative overflow-hidden group">
                      <div className="relative z-10">
                        <div className="text-violet-200 text-sm font-medium mb-1">Total XP Diraih</div>
                        <div className="text-4xl font-bold">{user.xp}</div>
                        <div className="mt-4 flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                          <Flame className="w-4 h-4 text-orange-300" /> 5% Teratas Peserta
                        </div>
                      </div>
                      <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Zap size={120} />
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                      <div className="text-slate-400 text-sm font-medium mb-1">Misi Selesai</div>
                      <div className="text-4xl font-bold text-white">{user.completedLessons.length} <span className="text-xl text-slate-500">/ {CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0)}</span></div>
                      <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-1000" 
                          style={{ width: `${(user.completedLessons.length / CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-purple-500 to-pink-500 transition-opacity duration-500"></div>
                       <div className="relative z-10">
                         <div className="text-slate-400 text-sm font-medium mb-3">Rank Sekarang</div>
                         <div className="flex items-center justify-center gap-2 mb-3">
                           <span className="text-3xl">⭐</span>
                         </div>
                         <div className={`text-3xl font-bold mb-2`} style={{color: getCurrentRank().color.includes('slate') ? '#cbd5e1' : getCurrentRank().color.includes('orange') ? '#fb923c' : getCurrentRank().color.includes('blue') ? '#60a5fa' : getCurrentRank().color.includes('yellow') ? '#facc15' : getCurrentRank().color.includes('white') ? '#e2e8f0' : getCurrentRank().color.includes('cyan') ? '#06b6d4' : '#c084fc'}} >
                           {getCurrentRank().name}
                         </div>
                         
                       </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Lanjutkan Perjalananmu</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-11">
                      {CURRICULUM.map(milestone => {
                        const progress = getProgress(milestone.id);
                        return (
                          <div key={milestone.id} className="bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 p-5 rounded-2xl flex items-center gap-4 group transition-all cursor-pointer" onClick={() => setActiveTab('learn')}>
                            <div className={`w-14 h-14 rounded-2xl ${milestone.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <milestone.icon className={`w-7 h-7 ${milestone.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-slate-200">{milestone.title}</h3>
                                <span className="text-xs font-bold text-slate-400">{progress}%</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${milestone.progressColor} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                            <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'learn' && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300 pb-11">
                  {CURRICULUM.map((milestone, idx) => (
                    <div key={milestone.id} className="relative">
                      {idx !== CURRICULUM.length - 1 && (
                        <div className="absolute left-8 top-16 bottom-[-32px] w-1 bg-slate-800 -z-10"></div>
                      )}
                      
                      <div className="flex gap-6">
                        <div className={`w-16 h-16 shrink-0 rounded-2xl ${milestone.bgColor} border border-slate-700 flex items-center justify-center shadow-lg z-10`}>
                          <milestone.icon className={`w-8 h-8 ${milestone.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <h2 className={`text-2xl font-bold ${milestone.color} mb-1`}>{milestone.title}</h2>
                          <p className="text-slate-400 mb-6 max-w-2xl">{milestone.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {milestone.lessons.map((lesson, lIdx) => {
                              const isUnlocked = lIdx === 0 || user.completedLessons.includes(milestone.lessons[lIdx - 1].id);
                              const isCompleted = user.completedLessons.includes(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  disabled={!isUnlocked}
                                  onClick={() => setActiveLesson(lesson)}
                                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${
                                    isCompleted 
                                      ? 'bg-slate-900/40 border-emerald-500/30' 
                                      : isUnlocked 
                                        ? 'bg-slate-900 border-slate-700 hover:border-violet-500 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/10' 
                                        : 'bg-slate-950 border-slate-900 opacity-60 cursor-not-allowed grayscale'
                                  }`}
                                >
                                  {isCompleted && (
                                    <div className="absolute top-3 right-3 text-emerald-500">
                                      <CheckCircle className="w-5 h-5" />
                                    </div>
                                  )}
                                  {!isUnlocked && (
                                    <div className="absolute top-3 right-3 text-slate-600">
                                      <Lock className="w-5 h-5" />
                                    </div>
                                  )}
                                  
                                  <div className="mb-3 inline-flex p-2 rounded-lg bg-slate-800/50">
                                    <Play className={`w-4 h-4 ${isUnlocked ? 'text-white' : 'text-slate-600'}`} />
                                  </div>
                                  
                                  <h3 className="font-bold text-slate-200 mb-1">{lesson.title}</h3>
                                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                    <span>Task: {lesson.taskType}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span className="text-violet-400">+{lesson.xpReward} XP</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- STUDENT LOG TAB --- */}
              {activeTab === 'logs' && (
                <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">Buku Log Misi</h2>
                      <p className="text-slate-400">Catat progresmu, kadet.</p>
                    </div>
                    <button 
                      onClick={() => setIsLogFormOpen(!isLogFormOpen)}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-colors font-bold"
                    >
                      <Plus className="w-4 h-4" /> Entri Baru
                    </button>
                  </div>

                  {isLogFormOpen && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 animate-in slide-in-from-top-4">
                      <form onSubmit={handleLogSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tanggal</label>
                             <input 
                               type="date" 
                               value={newLog.date}
                               onChange={e => setNewLog({...newLog, date: e.target.value})}
                               className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 focus:outline-none"
                               required
                             />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Topik Misi</label>
                             <input 
                               type="text" 
                               placeholder="Contoh: Belajar Flexbox"
                               value={newLog.mission}
                               onChange={e => setNewLog({...newLog, mission: e.target.value})}
                               className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 focus:outline-none"
                               required
                             />
                           </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Laporan & Tantangan</label>
                          <textarea 
                            placeholder="Apa yang kamu pelajari? Error apa yang kamu hadapi?"
                            value={newLog.report}
                            onChange={e => setNewLog({...newLog, report: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 focus:outline-none h-32 resize-none"
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <button 
                            type="button" 
                            onClick={() => setIsLogFormOpen(false)}
                            className="text-slate-400 hover:text-white px-4 py-2"
                          >
                            Batal
                          </button>
                          <button 
                            type="submit" 
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
                          >
                            <Save className="w-4 h-4" /> Simpan Log
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-4">
                    {logs.map(log => (
                      <div key={log.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex gap-6 hover:border-slate-700 transition-colors">
                        <div className="flex flex-col items-center gap-2 min-w-[80px]">
                           <div className="bg-slate-800 p-2 rounded-lg">
                             <Book className="w-6 h-6 text-violet-400" />
                           </div>
                           <span className="text-xs font-mono text-slate-500">{log.date}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{log.mission}</h3>
                          <p className="text-slate-300 leading-relaxed text-sm">{log.report}</p>
                        </div>
                      </div>
                    ))}
                    {logs.length === 0 && (
                      <div className="text-center py-12 text-slate-500">Belum ada entri. Mulai logmu hari ini!</div>
                    )}
                  </div>
                </div>
              )}

               {/* --- CHARACTER TAB --- */}
              {activeTab === 'character' && (
                <CharacterView 
                  user={user}
                  character={character}
                  setCharacter={setCharacter}
                  spendCoins={spendCoins}
                  getCharacterImage={getCharacterImage}
                />
              )}

              {/* --- FINAL PROJECT TAB --- */}
              {activeTab === 'project' && (
                getCompletedMilestones().length === CURRICULUM.length ? (
                  <div className="animate-in fade-in duration-500 h-full flex flex-col lg:flex-row gap-8">
                    {/* Checklist Side */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Protokol Proyek: Portofolio</h2>
                        <p className="text-slate-400">Ikuti langkah-langkah ini untuk membangun identitas digitalmu.</p>
                      </div>
                      
                      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                        {PROJECT_STEPS.map((step) => {
                          const isDone = projectProgress.completedSteps.includes(step.id);
                          return (
                            <div 
                              key={step.id} 
                              onClick={() => toggleProjectStep(step.id)}
                              className={`p-4 flex items-center gap-4 border-b border-slate-800 cursor-pointer transition-colors hover:bg-slate-800/50 ${isDone ? 'bg-emerald-900/10' : ''}`}
                            >
                              <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                                isDone ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-transparent'
                              }`}>
                                {isDone && <CheckSquare className="w-4 h-4 text-white" />}
                              </div>
                              <span className={isDone ? 'text-slate-400 line-through decoration-slate-600' : 'text-slate-200 font-medium'}>
                                {step.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submission Side */}
                    <div className="lg:w-96 space-y-6">
                      <div className="bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 p-6 rounded-3xl sticky top-6">
                        <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-600/30">
                          <Rocket className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Siap Diluncurkan?</h3>
                        <p className="text-sm text-slate-300 mb-6">
                          Setelah kamu mencentang semua kotak dan push kode ke GitHub, tempel tautan repositorimu di bawah.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-violet-300 uppercase mb-2 block">URL Repository GitHub</label>
                            <div className="relative">
                              <Github className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                              <input 
                                type="url" 
                                placeholder="https://github.com/username/project"
                                disabled={projectProgress.isSubmitted}
                                value={projectProgress.repoUrl}
                                onChange={e => setProjectProgress({...projectProgress, repoUrl: e.target.value})}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-violet-500 focus:outline-none disabled:opacity-50"
                              />
                            </div>
                          </div>

                          {projectProgress.isSubmitted ? (
                            <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                              <CheckCircle className="w-8 h-8 text-emerald-400" />
                              <div className="font-bold text-emerald-400">Submisi Diterima</div>
                              <div className="text-xs text-emerald-300/70">Menunggu Reviu Kode</div>
                            </div>
                          ) : (
                            <button 
                              onClick={submitProject}
                              className="w-full bg-white text-violet-900 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors shadow-lg"
                            >
                              Kirim Proyek
                            </button>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-xs text-slate-400">
                           <span>Progress</span>
                           <span>{Math.round((projectProgress.completedSteps.length / PROJECT_STEPS.length) * 100)}% Ready</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                           <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(projectProgress.completedSteps.length / PROJECT_STEPS.length) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Lock className="w-16 h-16 text-slate-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Proyek Final Terkunci</h2>
                    <p className="text-slate-400 max-w-md">
                      Kamu harus menyelesaikan semua quest di semua modul terlebih dahulu sebelum dapat mengakses Proyek Final. Teruslah belajar dan kembali lagi nanti!
                    </p>
                  </div>
                )
              )}

              {activeTab === 'profile' && (
                <div className="animate-in slide-in-from-right-8 duration-500 pb-11">
                  <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 mb-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 p-1">
                        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                           <img src={getCharacterImage()} alt="Character" className="w-32 h-32" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                         <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                         <span className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-bold text-sm">Level {user.level}</span>
                         <span className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold text-sm">{user.xp} Total XP</span>
                         <span className="rank-label px-4 py-2 rounded-full font-bold text-sm border border-orange-500/20" style={{backgroundColor: `${getCurrentRank().color}20`, borderColor: `${getCurrentRank().color}40`}}>🎖️ {getCurrentRank().name}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="text-yellow-500" />
                    Koleksi Badge
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(BADGES).map(([key, badge]) => {
                      const isUnlocked = user.badges.includes(key);
                      return (
                        <div key={key} className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-4 text-center transition-all ${
                          isUnlocked 
                            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl shadow-black/20' 
                            : 'bg-slate-900/30 border border-slate-800/50 opacity-50 grayscale'
                        }`}>
                          <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${isUnlocked ? 'bg-slate-800 shadow-inner' : 'bg-slate-900'}`}>
                             <badge.icon className={`w-8 h-8 ${isUnlocked ? badge.color : 'text-slate-600'}`} />
                          </div>
                          <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>{badge.name}</h4>
                          <p className="text-xs text-slate-500 mt-2">{isUnlocked ? 'Unlocked' : 'Locked'}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
    );
  }

  // Fallback to landing
  return <LandingPageInfo onGetStarted={handleGetStarted} />;
}

export default App;