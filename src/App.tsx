import React, { useState, useEffect } from 'react';
import { MANGAS } from './data';
import { Manga, Chapter, UserStats, ReadingProgress } from './types';
import Dashboard from './components/Dashboard';
import MangaDetail from './components/MangaDetail';
import Lector from './components/Lector';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'manga-detail' | 'lector'>('dashboard');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Load state from localStorage on init
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('manganova_bookmarks');
    return saved ? JSON.parse(saved) : ['solo-leveling']; // Pre-populate Solo Leveling for a premium first look
  });

  const [readingProgress, setReadingProgress] = useState<ReadingProgress[]>(() => {
    const saved = localStorage.getItem('manganova_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('manganova_stats');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      username: 'Andrés Nazario',
      streakDays: 12,
      hoursRead: 34.2,
      chaptersCompleted: 173,
      genresProgress: { 'Acción': 80, 'Fantasía': 60 }
    };
  });

  // Keep values in sync with localStorage
  useEffect(() => {
    localStorage.setItem('manganova_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('manganova_progress', JSON.stringify(readingProgress));
  }, [readingProgress]);

  useEffect(() => {
    localStorage.setItem('manganova_stats', JSON.stringify(stats));
  }, [stats]);

  // Navigate to Detail page
  const handleSelectManga = (manga: Manga) => {
    setSelectedManga(manga);
    setCurrentView('manga-detail');
    window.scrollTo({ top: 0 });
  };

  // Launch Lector Reader
  const handleSelectChapter = (manga: Manga, chapter: Chapter) => {
    setSelectedManga(manga);
    setSelectedChapter(chapter);
    setCurrentView('lector');
    window.scrollTo({ top: 0 });
  };

  // Bookmark toggler
  const handleToggleBookmark = (mangaId: string) => {
    setBookmarks((prev) => {
      if (prev.includes(mangaId)) {
        return prev.filter(id => id !== mangaId);
      } else {
        return [...prev, mangaId];
      }
    });
  };

  // Save Page Progress trigger
  const handleSaveProgress = (progress: { mangaId: string; chapterId: string; page: number }) => {
    setReadingProgress((prev) => {
      // Check if entry exists
      const existingIdx = prev.findIndex(
        p => p.mangaId === progress.mangaId && p.chapterId === progress.chapterId
      );

      const targetManga = MANGAS.find(m => m.id === progress.mangaId);
      const targetChapter = targetManga?.chapters.find(c => c.id === progress.chapterId);
      const totalPages = targetChapter?.pagesCount || 3;

      const newEntry: ReadingProgress = {
        mangaId: progress.mangaId,
        chapterId: progress.chapterId,
        page: progress.page,
        totalPages,
        updatedAt: new Date().toISOString()
      };

      let updated = [...prev];
      if (existingIdx >= 0) {
        updated[existingIdx] = newEntry;
      } else {
        updated.push(newEntry);
        
        // Boost user stats chapters completed if it is a new chapter they started/completed!
        setStats((prevStats) => ({
          ...prevStats,
          chaptersCompleted: prevStats.chaptersCompleted + 1,
          hoursRead: Number((prevStats.hoursRead + 0.1).toFixed(1))
        }));
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-on-surface text-center">
      {/* Dynamic Render Switch */}
      {currentView === 'dashboard' && (
        <Dashboard
          mangas={MANGAS}
          stats={stats}
          bookmarks={bookmarks}
          readingProgress={readingProgress}
          onSelectManga={handleSelectManga}
          onSelectChapter={handleSelectChapter}
        />
      )}

      {currentView === 'manga-detail' && selectedManga && (
        <MangaDetail
          manga={selectedManga}
          readingProgress={readingProgress}
          bookmarks={bookmarks}
          onBack={() => {
            setCurrentView('dashboard');
            window.scrollTo({ top: 0 });
          }}
          onChapterSelect={(chapter) => handleSelectChapter(selectedManga, chapter)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {currentView === 'lector' && selectedManga && selectedChapter && (
        <Lector
          manga={selectedManga}
          chapter={selectedChapter}
          onBack={() => {
            setCurrentView('manga-detail');
            window.scrollTo({ top: 0 });
          }}
          onChapterSelect={(chap) => {
            setSelectedChapter(chap);
            window.scrollTo({ top: 0 });
          }}
          onSaveProgress={handleSaveProgress}
        />
      )}
    </div>
  );
}
