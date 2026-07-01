import React from 'react';
import { TreePine, Wind, Droplets, ArrowRight, Sun } from 'lucide-react';

const projects = [
  { id: 1, title: 'Amazon Rainforest Protection', type: 'Forestry', icon: <TreePine className="w-8 h-8 text-emerald-500"/>, cost: '$12/ton', funded: 75, desc: 'Protect old-growth forests and support indigenous communities in the Amazon basin.' },
  { id: 2, title: 'Texas Wind Farm Expansion', type: 'Renewable', icon: <Wind className="w-8 h-8 text-blue-500"/>, cost: '$8/ton', funded: 42, desc: 'Fund the construction of new wind turbines to replace fossil fuel energy sources.' },
  { id: 3, title: 'Clean Water Initiative', type: 'Community', icon: <Droplets className="w-8 h-8 text-cyan-500"/>, cost: '$15/ton', funded: 89, desc: 'Provide clean water access, avoiding the need for wood-burning purification in rural areas.' },
  { id: 4, title: 'Solar Array Community Grid', type: 'Renewable', icon: <Sun className="w-8 h-8 text-amber-500"/>, cost: '$10/ton', funded: 60, desc: 'Install community solar panels to provide clean energy to low-income neighborhoods.' },
];

const CarbonOffset = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 pt-8">
          <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            Verified Projects
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Carbon Offset Marketplace</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">Take direct action. Fund verified environmental projects worldwide to balance out your unavoidable carbon emissions.</p>
        </div>

        <div className="grid gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6 group">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>
              <div className="flex-1 text-center md:text-left w-full">
                <div className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-1">{project.type}</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">{project.desc}</p>
                
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 mb-2 overflow-hidden">
                  <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: `${project.funded}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{project.funded}% Funded</div>
                  <div className="text-sm text-slate-400 dark:text-slate-500">{100 - project.funded}% to go</div>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-6 md:pt-0 md:pl-8">
                <div className="text-4xl font-black text-slate-800 dark:text-white">{project.cost}</div>
                <button className="w-full md:w-auto bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                  Fund Project <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonOffset;
