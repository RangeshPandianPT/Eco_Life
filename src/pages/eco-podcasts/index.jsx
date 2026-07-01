import React from 'react';
import { PlayCircle, Headphones, BookOpen, Clock, Star } from 'lucide-react';

const episodes = [
  { id: 1, title: 'The True Cost of Fast Fashion', duration: '12 min', category: 'Podcast', image: '👕', rating: 4.8 },
  { id: 2, title: 'How to Compost in an Apartment', duration: '8 min', category: 'Mini-Course', image: '🪱', rating: 4.9 },
  { id: 3, title: 'Understanding Carbon Credits', duration: '15 min', category: 'Podcast', image: '📉', rating: 4.5 },
  { id: 4, title: 'Zero Waste Grocery Shopping', duration: '10 min', category: 'Mini-Course', image: '🛒', rating: 4.7 },
  { id: 5, title: 'Electric Vehicles: Myth vs Reality', duration: '20 min', category: 'Podcast', image: '🚗', rating: 4.6 },
  { id: 6, title: 'Growing Herbs on Your Windowsill', duration: '5 min', category: 'Mini-Course', image: '🌿', rating: 4.9 },
];

const EcoPodcasts = () => {
  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-indigo-950 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Headphones className="w-4 h-4" /> Listen & Learn
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 dark:text-indigo-100 mb-4 tracking-tight">
              Eco-Learning Hub
            </h1>
            <p className="text-indigo-700/70 dark:text-indigo-300/70 text-xl max-w-2xl">Bite-sized audio lessons and mini-courses to help you green your lifestyle on the go.</p>
          </div>
          <div className="bg-white dark:bg-indigo-900 p-6 rounded-3xl shadow-xl flex gap-10">
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">45</div>
              <div className="text-xs font-bold text-indigo-400 dark:text-indigo-300/70 uppercase tracking-widest mt-1">Min Listened</div>
            </div>
            <div className="w-px bg-indigo-100 dark:bg-indigo-800"></div>
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">3</div>
              <div className="text-xs font-bold text-indigo-400 dark:text-indigo-300/70 uppercase tracking-widest mt-1">Courses Done</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map(ep => (
            <div key={ep.id} className="bg-white dark:bg-indigo-900 rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-indigo-50 dark:border-indigo-800 flex flex-col hover:-translate-y-2">
              <div className="h-40 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-900/50 rounded-[1.5rem] mb-8 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300">
                {ep.image}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-extrabold px-3 py-1.5 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-lg uppercase tracking-wide">
                  {ep.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" /> {ep.rating}
                  </span>
                  <span className="text-sm font-semibold text-indigo-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {ep.duration}
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-6 flex-1 leading-tight">{ep.title}</h3>
              
              <button className="w-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold py-4 rounded-xl flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <PlayCircle className="w-6 h-6" /> Play Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoPodcasts;
