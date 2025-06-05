import React, { createContext, useContext, useEffect, useState } from 'react';
import { Article, Challenge, JournalEntry, UserStats } from '../types';
import { articles } from '../data/articles';
import { challenges } from '../data/challenges';

interface DataContextType {
  articles: Article[];
  challenges: Challenge[];
  journalEntries: JournalEntry[];
  userStats: UserStats;
  completeChallenge: (id: string, reflection?: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  deleteJournalEntry: (id: string) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
}

const defaultUserStats: UserStats = {
  challengesCompleted: 0,
  streakDays: 0,
  totalOfflineMinutes: 0,
  moodEntries: [],
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journal-entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [userChallenges, setUserChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('user-challenges');
    return saved ? JSON.parse(saved) : challenges;
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('user-stats');
    return saved ? JSON.parse(saved) : defaultUserStats;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('user-challenges', JSON.stringify(userChallenges));
  }, [userChallenges]);

  useEffect(() => {
    localStorage.setItem('user-stats', JSON.stringify(userStats));
  }, [userStats]);

  // Update streak days
  useEffect(() => {
    const checkStreak = () => {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = userStats.lastActiveDate;

      if (!lastActive) {
        setUserStats((prev) => ({ ...prev, lastActiveDate: today }));
        return;
      }

      const lastActiveDate = new Date(lastActive);
      const currentDate = new Date(today);
      
      // Get the difference in days
      const diffTime = currentDate.getTime() - lastActiveDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // If it's consecutive day, increase streak
        setUserStats((prev) => ({
          ...prev,
          streakDays: prev.streakDays + 1,
          lastActiveDate: today,
        }));
      } else if (diffDays > 1) {
        // If more than a day has passed, reset streak
        setUserStats((prev) => ({
          ...prev,
          streakDays: 1,
          lastActiveDate: today,
        }));
      } else if (diffDays === 0) {
        // Same day, no change to streak
        return;
      }
    };

    checkStreak();
  }, [userStats.lastActiveDate]);

  const completeChallenge = (id: string, reflection?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const challenge = userChallenges.find((c) => c.id === id);
    
    if (!challenge) return;

    // Update the challenge
    setUserChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              completed: true,
              reflection,
              dateCompleted: today,
            }
          : c
      )
    );

    // Update user stats
    setUserStats((prev) => ({
      ...prev,
      challengesCompleted: prev.challengesCompleted + 1,
      totalOfflineMinutes: prev.totalOfflineMinutes + challenge.duration,
      lastActiveDate: today,
    }));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };

    setJournalEntries((prev) => [newEntry, ...prev]);

    if (entry.mood) {
      const today = new Date().toISOString().split('T')[0];
      
      setUserStats((prev) => ({
        ...prev,
        moodEntries: [
          { date: today, mood: entry.mood! },
          ...prev.moodEntries,
        ].slice(0, 30), // Keep only last 30 entries
        lastActiveDate: today,
      }));
    }
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const updateJournalEntry = (updatedEntry: JournalEntry) => {
    setJournalEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  return (
    <DataContext.Provider
      value={{
        articles,
        challenges: userChallenges,
        journalEntries,
        userStats,
        completeChallenge,
        addJournalEntry,
        deleteJournalEntry,
        updateJournalEntry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};