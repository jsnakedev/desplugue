export interface Article {
  id: string;
  title: string;
  category: 'reflexao' | 'conceitos' | 'ferramentas';
  content: string;
  readingTime: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  reflection?: string;
  dateCompleted?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
}

export interface UserStats {
  challengesCompleted: number;
  streakDays: number;
  totalOfflineMinutes: number;
  lastActiveDate?: string;
  moodEntries: {
    date: string;
    mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  }[];
}

export interface ThemeSettings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'sans' | 'serif';
}