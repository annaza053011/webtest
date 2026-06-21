export interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  pagesCount: number;
  pages: string[];
}

export interface Manga {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  rating: number;
  status: 'En curso' | 'Finalizado';
  genres: string[];
  chapters: Chapter[];
  views: string;
  featured?: boolean;
}

export interface UserStats {
  username: string;
  streakDays: number;
  hoursRead: number;
  chaptersCompleted: number;
  genresProgress: { [key: string]: number };
}

export interface Bookmark {
  mangaId: string;
  bookmarkedAt: string;
}

export interface ReadingProgress {
  mangaId: string;
  chapterId: string;
  page: number;
  totalPages: number;
  updatedAt: string;
}
