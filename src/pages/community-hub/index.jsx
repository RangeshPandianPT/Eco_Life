import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "GreenGuru",
      avatar: "🌿",
      time: "2 hours ago",
      content: "Just completed my first zero-waste week! Here are my top 5 tips that actually worked:",
      tips: [
        "Bring your own containers to bulk stores",
        "Make your own cleaning products",
        "Start composting immediately",
        "Buy secondhand first",
        "Plan meals to avoid food waste"
      ],
      likes: 142,
      comments: 28,
      shares: 15,
      tags: ["ZeroWaste", "Tips", "Beginner"]
    },
    {
      id: 2,
      author: "EcoWarrior_2025",
      avatar: "🌱",
      time: "4 hours ago",
      content: "Amazing discovery! Found a local farmer's market that's completely plastic-free. Supporting local AND reducing packaging waste! 🎉",
      image: "/api/placeholder/400/200",
      location: "Portland, OR",
      likes: 89,
      comments: 12,
      shares: 23,
      tags: ["LocalFood", "PlasticFree", "Discovery"]
    },
    {
      id: 3,
      author: "PlantBased_Pro",
      avatar: "🌳",
      time: "6 hours ago",
      content: "Week 3 of my plant-based journey. Energy levels are through the roof and my carbon footprint has decreased by 35%! Here's what I'm eating:",
      recipe: {
        name: "Ultimate Green Buddha Bowl",
        ingredients: ["Quinoa", "Roasted chickpeas", "Avocado", "Spinach", "Hemp seeds"],
        co2Saved: "2.3 kg CO₂"
      },
      likes: 234,
      comments: 45,
      shares: 67,
      tags: ["PlantBased", "Recipe", "CarbonFootprint"]
    }
  ]);

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Community Plastic Cleanup",
      description: "Join 500+ members cleaning up our neighborhoods this weekend!",
      participants: 547,
      date: "This Saturday",
      location: "Multiple Cities",
      organizer: "EcoCleanup Team",
      tags: ["Cleanup", "Community", "Action"]
    },
    {
      id: 2,
      title: "30-Day Local Food Challenge",
      description: "Eat only locally sourced food for the entire month of January",
      participants: 1203,
      date: "January 1-31",
      location: "Global",
      organizer: "LocalFoodie Network",
      tags: ["Food", "Local", "Challenge"]
    },
    {
      id: 3,
      title: "Zero-Waste Workshop Series",
      description: "Learn practical zero-waste techniques from community experts",
      participants: 89,
      date: "Every Tuesday",
      location: "Online",
      organizer: "WasteNot Community",
      tags: ["Education", "ZeroWaste", "Workshop"]
    }
  ]);

  const [tips, setTips] = useState([
    {
      id: 1,
      category: "Energy",
      title: "LED Light Hack",
      tip: "Replace just your 5 most-used bulbs with LEDs. You'll save 80% energy on lighting costs immediately!",
      author: "ElectricEco",
      votes: 156,
      difficulty: "Easy",
      savings: "$50/year"
    },
    {
      id: 2,
      category: "Transport",
      title: "Bike Route Planning",
      tip: "Use apps like Komoot or Strava to find the safest, most scenic bike routes. Makes eco-commuting actually enjoyable!",
      author: "CycleCity",
      votes: 203,
      difficulty: "Easy",
      savings: "300kg CO₂/year"
    },
    {
      id: 3,
      category: "Food",
      title: "Meal Prep Revolution",
      tip: "Batch cook grains and legumes on Sunday. Reduces food waste, saves time, and makes plant-based eating effortless!",
      author: "BatchCookBoss",
      votes: 187,
      difficulty: "Medium",
      savings: "$200/month"
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "Alex (You)",
        avatar: "🌟",
        time: "Just now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        tags: ["Personal"]
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const joinChallenge = (challengeId) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));
  };

  const voteTip = (tipId) => {
    setTips(tips.map(tip =>
      tip.id === tipId
        ? { ...tip, votes: tip.votes + 1 }
        : tip
    ));
  };

  return (
    <>
      <Helmet>
        <title>Community Hub - EcoLife | Connect with Eco Warriors</title>
        <meta name="description" content="Join the EcoLife community to share tips, participate in challenges, and connect with like-minded individuals on your sustainability journey." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🌍 Community Hub
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Connect, share, and grow together!
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-green-600">12.5K</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-blue-600">3.2K</div>
              <div className="text-sm text-gray-600">Posts Today</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-gray-600">Active Challenges</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-orange-600">456</div>
              <div className="text-sm text-gray-600">Tips Shared</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-xl mb-8 shadow-md">
            {[
              { id: 'posts', label: 'Community Posts', icon: '💬' },
              { id: 'challenges', label: 'Group Challenges', icon: '🎯' },
              { id: 'tips', label: 'Eco Tips', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {activeTab === 'posts' && (
                <div className="space-y-6">
                  {/* New Post Creation */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-2xl">🌟</span>
                      <div className="flex-1">
                        {!showNewPost ? (
                          <button
                            onClick={() => setShowNewPost(true)}
                            className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            Share your eco journey...
                          </button>
                        ) : (
                          <div className="space-y-4">
                            <textarea
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              placeholder="Share your eco tips, experiences, or questions..."
                              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                              rows={4}
                            />
                            <div className="flex space-x-3">
                              <button
                                onClick={handleNewPost}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                              >
                                Post
                              </button>
                              <button
                                onClick={() => {setShowNewPost(false); setNewPost('');}}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Posts Feed */}
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="bg-white rounded-xl p-6 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Post Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl">{post.avatar}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{post.author}</div>
                          <div className="text-sm text-gray-500">{post.time}</div>
                        </div>
                        <div className="flex space-x-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-gray-800 mb-3">{post.content}</p>
                        
                        {post.tips && (
                          <div className="bg-green-50 rounded-lg p-4 mb-3">
                            <div className="font-medium text-green-800 mb-2">💡 Quick Tips:</div>
                            <ul className="space-y-1">
                              {post.tips.map((tip, idx) => (
                                <li key={idx} className="text-green-700 text-sm">• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {post.recipe && (
                          <div className="bg-orange-50 rounded-lg p-4 mb-3">
                            <div className="font-medium text-orange-800 mb-2">🍽️ {post.recipe.name}</div>
                            <div className="text-orange-700 text-sm mb-2">
                              Ingredients: {post.recipe.ingredients.join(', ')}
                            </div>
                            <div className="text-green-600 text-sm font-medium">
                              Impact: Saved {post.recipe.co2Saved} this week!
                            </div>
                          </div>
                        )}

                        {post.location && (
                          <div className="text-sm text-gray-600 mb-2">📍 {post.location}</div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex space-x-6">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <span>❤️</span>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                            <span>🔄</span>
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'challenges' && (
                <div className="space-y-6">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      className="bg-white rounded-xl p-6 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                          <p className="text-gray-600 mb-3">{challenge.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div>📅 {challenge.date}</div>
                            <div>📍 {challenge.location}</div>
                            <div>👥 {challenge.participants} participants</div>
                            <div>👨‍💼 by {challenge.organizer}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => joinChallenge(challenge.id)}
                          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Join Challenge
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        {challenge.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'tips' && (
                <div className="space-y-6">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      className="bg-white rounded-xl p-6 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                              {tip.category}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {tip.difficulty}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{tip.title}</h3>
                          <p className="text-gray-600 mb-3">{tip.tip}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {tip.author}</span>
                            <span>💰 Saves: {tip.savings}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => voteTip(tip.id)}
                          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-xl">👍</span>
                          <span className="text-sm font-medium">{tip.votes}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🔥 Trending Topics</h3>
                <div className="space-y-2">
                  {['#ZeroWaste', '#PlantBased', '#SolarPower', '#CarbonNeutral', '#SustainableFashion'].map(topic => (
                    <div key={topic} className="flex justify-between items-center py-2">
                      <span className="text-green-600 font-medium">{topic}</span>
                      <span className="text-xs text-gray-500">2.3k posts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Champions */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🏆 Weekly Champions</h3>
                <div className="space-y-3">
                  {[
                    { name: 'EcoWarrior_2025', action: 'Most posts shared', avatar: '🌱' },
                    { name: 'GreenGuru', action: 'Most tips voted', avatar: '🌿' },
                    { name: 'PlantBased_Pro', action: 'Challenge leader', avatar: '🌳' }
                  ].map((champion, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <span className="text-lg">{champion.avatar}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{champion.name}</div>
                        <div className="text-xs text-gray-500">{champion.action}</div>
                      </div>
                      <span className="text-yellow-500">🏆</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CommunityHub;