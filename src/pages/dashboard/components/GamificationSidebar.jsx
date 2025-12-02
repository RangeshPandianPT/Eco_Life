import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationSidebar = () => {
  const userStats = {
    currentPoints: 2847,
    level: 12,
    levelName: 'Eco Warrior',
    nextLevelPoints: 3000,
    rank: 23,
    totalUsers: 15420
  };

  const recentAchievements = [
    {
      id: 1,
      title: 'Carbon Crusher',
      description: 'Saved 50kg CO₂ this month',
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      earnedAt: '2 hours ago',
      points: 150
    },
    {
      id: 2,
      title: 'Scan Master',
      description: 'Scanned 100 products',
      icon: 'QrCode',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      earnedAt: '1 day ago',
      points: 100
    },
    {
      id: 3,
      title: 'Meal Planner Pro',
      description: 'Created 10 sustainable meal plans',
      icon: 'ChefHat',
      color: 'text-success',
      bgColor: 'bg-success/10',
      earnedAt: '3 days ago',
      points: 75
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 4521, avatar: 'SC', isCurrentUser: false },
    { rank: 2, name: 'Mike Johnson', points: 4102, avatar: 'MJ', isCurrentUser: false },
    { rank: 3, name: 'Emma Wilson', points: 3876, avatar: 'EW', isCurrentUser: false },
    { rank: 23, name: 'Alex Green', points: 2847, avatar: 'AG', isCurrentUser: true }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Zero Waste Week',
      description: 'Avoid single-use plastics for 7 days',
      progress: 65,
      reward: '200 points',
      daysLeft: 3,
      participants: 1247
    },
    {
      id: 2,
      title: 'Plant-Based Power',
      description: 'Try 5 new plant-based recipes',
      progress: 40,
      reward: '150 points',
      daysLeft: 10,
      participants: 892
    }
  ];

  const progressToNextLevel = ((userStats?.currentPoints % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* User Level & Points */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="User" size={24} color="white" />
          </div>
          <h3 className="font-heading font-bold text-lg text-card-foreground">{userStats?.levelName}</h3>
          <p className="text-sm text-muted-foreground">Level {userStats?.level}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Points</span>
            <span className="font-semibold text-primary">{userStats?.currentPoints?.toLocaleString()}</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{userStats?.currentPoints % 1000} points</span>
            <span>{userStats?.nextLevelPoints - userStats?.currentPoints} to next level</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-accent">#{userStats?.rank}</div>
              <div className="text-xs text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-success">{userStats?.totalUsers?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Recent Achievements</h3>
          <Button variant="ghost" size="sm" iconName="Trophy" iconPosition="left">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-10 h-10 rounded-lg ${achievement?.bgColor} flex items-center justify-center`}>
                <Icon name={achievement?.icon} size={18} className={achievement?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-card-foreground">{achievement?.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{achievement?.earnedAt}</span>
                  <span className="text-xs font-medium text-primary">+{achievement?.points} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Leaderboard</h3>
          <Button variant="ghost" size="sm" iconName="Users" iconPosition="left">
            View Full
          </Button>
        </div>

        <div className="space-y-2">
          {leaderboard?.map((user) => (
            <div 
              key={user?.rank} 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-organic ${
                user?.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${user?.rank <= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
                  #{user?.rank}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  user?.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {user?.avatar}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-card-foreground">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.points?.toLocaleString()} points</div>
              </div>
              {user?.isCurrentUser && (
                <Icon name="User" size={16} color="var(--color-primary)" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Active Challenges */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Active Challenges</h3>
          <Button variant="ghost" size="sm" iconName="Target" iconPosition="left">
            Browse
          </Button>
        </div>

        <div className="space-y-4">
          {challenges?.map((challenge) => (
            <div key={challenge?.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-card-foreground">{challenge?.title}</h4>
                <span className="text-xs text-accent font-medium">{challenge?.reward}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{challenge?.description}</p>
              
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${challenge?.progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{challenge?.progress}% complete</span>
                <span>{challenge?.daysLeft} days left</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {challenge?.participants?.toLocaleString()} participants
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationSidebar;