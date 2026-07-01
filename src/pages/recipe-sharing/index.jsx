import React from 'react';
import { Heart, MessageCircle, Share2, ChefHat, Leaf } from 'lucide-react';

const recipes = [
  { id: 1, title: 'Zero-Waste Vegetable Broth', author: 'EcoChef', image: '🍲', score: 'A+', likes: 342, time: '40m' },
  { id: 2, title: 'Plant-Based Lentil Shepherd\'s Pie', author: 'GreenEater', image: '🥧', score: 'A', likes: 215, time: '1h' },
  { id: 3, title: 'Upcycled Banana Peel Curry', author: 'WasteNot', image: '🍛', score: 'A+', likes: 189, time: '30m' },
  { id: 4, title: 'Locally Sourced Mushroom Risotto', author: 'EarthLover', image: '🍄', score: 'B+', likes: 156, time: '45m' },
  { id: 5, title: 'Broccoli Stem Pesto Pasta', author: 'NoScrap', image: '🍝', score: 'A', likes: 421, time: '20m' },
  { id: 6, title: 'Vegan Cauliflower Wings', author: 'PlantPower', image: '🍗', score: 'B', likes: 290, time: '35m' }
];

const RecipeSharing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <ChefHat className="text-green-500 w-10 h-10" />
              Sustainable Recipes
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Cook delicious meals with a lower carbon footprint.</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Share Recipe
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col group cursor-pointer">
              <div className="h-48 bg-green-50 dark:bg-gray-700 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300">
                {recipe.image}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight">{recipe.title}</h3>
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-black flex items-center gap-1 shrink-0">
                    <Leaf className="w-3 h-3" /> {recipe.score}
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">By @{recipe.author} • {recipe.time}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" /> <span className="text-sm font-medium">{recipe.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSharing;
