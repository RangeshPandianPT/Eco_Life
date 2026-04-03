import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ImpactForecastWidget = () => {
  const [missionState, setMissionState] = useState({
    completedMissions: [],
    totalMissionPoints: 0,
    streakDays: 0,
  });

  useEffect(() => {
    const loadMissionState = () => {
      const savedData = localStorage.getItem('eco-tools-missions');
      if (!savedData) return;

      try {
        const parsed = JSON.parse(savedData);
        setMissionState({
          completedMissions: parsed.completedMissions || [],
          totalMissionPoints: parsed.totalMissionPoints || 0,
          streakDays: parsed.streakDays || 0,
        });
      } catch (error) {
        console.error('Failed to read eco-tools-missions', error);
      }
    };

    loadMissionState();
    window.addEventListener('storage', loadMissionState);
    window.addEventListener('eco-tools-missions-updated', loadMissionState);
    return () => {
      window.removeEventListener('storage', loadMissionState);
      window.removeEventListener('eco-tools-missions-updated', loadMissionState);
    };
  }, []);

  const metrics = useMemo(() => {
    const weeklySavings = Math.min(28, missionState.totalMissionPoints * 0.18 + missionState.streakDays * 1.4);
    const momentum = Math.min(100, missionState.completedMissions.length * 28 + missionState.streakDays * 6);
    const nextMilestone = Math.max(0, 150 - (missionState.totalMissionPoints % 150));

    return {
      weeklySavings: weeklySavings.toFixed(1),
      momentum,
      nextMilestone,
    };
  }, [missionState.completedMissions.length, missionState.streakDays, missionState.totalMissionPoints]);

  const highlights = [
    { label: 'Missions complete', value: missionState.completedMissions.length, icon: 'CheckCircle2' },
    { label: 'Streak days', value: missionState.streakDays, icon: 'Flame' },
    { label: 'Next XP milestone', value: `${metrics.nextMilestone} XP`, icon: 'Target' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-organic">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Impact Forecast</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Turn your completed missions into a visible weekly sustainability forecast.
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </div>
            <div className="text-lg font-bold text-foreground">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-success/15 via-background to-primary/10 border border-success/20 p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Projected weekly savings</span>
          <span className="text-sm font-bold text-success">{metrics.weeklySavings} kg CO₂e</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${metrics.momentum}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="h-full rounded-full bg-success"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Momentum grows as you complete more Eco Tools missions and keep your streak active.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <div>
          <div className="font-medium text-foreground">Recommended next move</div>
          <div className="text-muted-foreground">Finish one mission today to unlock a stronger forecast.</div>
        </div>
        <div className="px-3 py-2 rounded-lg bg-success text-success-foreground font-medium whitespace-nowrap">
          +{Math.max(10, missionState.streakDays * 2)} bonus XP
        </div>
      </div>
    </div>
  );
};

export default ImpactForecastWidget;