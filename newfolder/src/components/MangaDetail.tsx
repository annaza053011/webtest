import React from 'react';
import { Manga, Chapter, ReadingProgress } from '../types';
import { ArrowLeft, BookOpen, Clock, Award, Star, Heart, Bookmark, Eye, CheckCircle } from 'lucide-react';

interface MangaDetailProps {
  manga: Manga;
  readingProgress: ReadingProgress[];
  bookmarks: string[];
  onBack: () => void;
  onChapterSelect: (chapter: Chapter) => void;
  onToggleBookmark: (mangaId: string) => void;
}

export default function MangaDetail({
  manga,
  readingProgress,
  bookmarks,
  onBack,
  onChapterSelect,
  onToggleBookmark,
}: MangaDetailProps) {
  const isBookmarked = bookmarks.includes(manga.id);

  // Find progress for this manga
  const getProgressForChapter = (chapterId: string) => {
    return readingProgress.find(p => p.mangaId === manga.id && p.chapterId === chapterId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-on-surface select-none pb-20 font-body">
      {/* Immersive Hero Blur Banner */}
      <div className="relative h-[280px] md:h-[380px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-30"
          style={{ backgroundImage: `url(${manga.coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        
        {/* Back navigation */}
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/70 text-on-surface hover:text-primary transition-all cursor-pointer font-semibold text-xs uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </button>
        </div>
      </div>

      {/* Main Metadata Container */}
      <div className="max-w-[1224px] mx-auto px-4 md:px-8 -mt-36 md:-mt-48 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-11">
          
          {/* Column A: Left Cover Image & Actions */}
          <div className="w-full lg:w-[300px] shrink-0 flex flex-col items-center">
            <div className="group relative overflow-hidden rounded-xl manga-page-shadow border border-outline-variant/20 hover:scale-[1.02] transition-transform duration-300 w-64 lg:w-full">
              <img 
                src={manga.coverUrl} 
                alt={`${manga.title} Cover`}
                className="w-full h-[380px] md:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
              
              {/* Rating float */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131313]/90 border border-primary/20 text-xs font-bold text-primary">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span>{manga.rating}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 w-full max-w-xs lg:max-w-none mt-6">
              <button 
                onClick={() => onToggleBookmark(manga.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold font-label text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isBookmarked 
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30' 
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface border-outline-variant/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-400 text-rose-400' : ''}`} />
                <span>{isBookmarked ? 'Favorito' : 'Añadir Favorito'}</span>
              </button>

              <button 
                onClick={() => onChapterSelect(manga.chapters[0])}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold font-label text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 active:scale-95 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Leer cap 1</span>
              </button>
            </div>
          </div>

          {/* Column B: Right Content Details */}
          <div className="flex-1 text-left flex flex-col justify-end">
            <div className="mb-4">
              <span className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                manga.status === 'En curso' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {manga.status}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl md:text-5xl text-on-surface tracking-tight leading-tight">
              {manga.title}
            </h2>
            
            <p className="font-label text-sm text-primary mt-2">
              Autor: <span className="text-on-surface-variant font-semibold">{manga.author}</span>
            </p>

            {/* Stats list bar */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mt-5 py-4 px-5 rounded-2xl bg-[#201f1f]/50 border border-outline-variant/10">
              <div className="text-center">
                <span className="block text-[10px] uppercase font-label text-neutral-500 font-bold">Vistas</span>
                <span className="font-display font-bold text-sm text-on-surface block mt-0.5">{manga.views}</span>
              </div>
              <div className="text-center border-x border-outline-variant/10">
                <span className="block text-[10px] uppercase font-label text-neutral-500 font-bold">Lanzamientos</span>
                <span className="font-display font-bold text-sm text-on-surface block mt-0.5">{manga.chapters.length} Caps</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] uppercase font-label text-neutral-500 font-bold">Puntuación</span>
                <div className="flex items-center justify-center gap-0.5 mt-0.5 text-primary">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="font-display font-bold text-sm text-on-surface">{manga.rating}</span>
                </div>
              </div>
            </div>

            {/* Synopsis block */}
            <div className="mt-6">
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#edb1ff] mb-2">Sinopsis Oficial</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed font-normal p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                {manga.description}
              </p>
            </div>

            {/* Genres chips container */}
            <div className="mt-5 flex flex-wrap gap-2">
              {manga.genres.map((g) => (
                <span key={g} className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-xs font-semibold text-on-surface-variant transition-colors border border-outline-variant/10">
                  {g}
                </span>
              ))}
            </div>

            {/* Chapter Releases segment */}
            <div className="mt-9">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg md:text-xl text-on-surface flex items-center gap-2.5">
                  <BookOpen className="text-primary w-5 h-5" />
                  Capítulos Disponibles
                </h3>
                <span className="text-xs text-neutral-500 font-label">{manga.chapters.length} capítulos</span>
              </div>

              {/* Structured list layout */}
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {manga.chapters.map((chap) => {
                  const prog = getProgressForChapter(chap.id);
                  const isRead = !!prog;
                  const isFinished = prog && prog.page === prog.totalPages;

                  return (
                    <div 
                      key={chap.id}
                      onClick={() => onChapterSelect(chap)}
                      className="group p-4 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-outline-variant/5 hover:border-primary/20 flex items-center justify-between transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isRead ? 'bg-emerald-500/10 text-emerald-400' : 'bg-surface text-primary group-hover:scale-105'}`}>
                          {isFinished ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="font-display font-bold text-xs">{chap.number}</span>
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <h4 className="font-semibold text-xs md:text-sm text-on-surface line-clamp-1 group-hover:text-primary transition-all">
                            Capítulo {chap.number}: {chap.title}
                          </h4>
                          <span className="text-[10px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {chap.date} • {chap.pagesCount} páginas
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status tag */}
                        {isRead && (
                          <span className={`text-[10px] uppercase font-label font-bold py-1 px-2.5 rounded-md ${isFinished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'}`}>
                            {isFinished ? 'Leído' : `Pág ${prog?.page}`}
                          </span>
                        )}
                        <span className="text-primary group-hover:translate-x-1 transition-transform text-xs uppercase font-label font-bold flex items-center gap-1">
                          <span>Leer</span>
                          <span className="text-lg">→</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
