import React, { useState } from 'react';
import { Manga, UserStats, Chapter, ReadingProgress } from '../types';
import { 
  Flame, Clock, BookOpen, Star, Search, Filter, BookMarked, 
  ChevronRight, Compass, Heart, Award, ArrowUpRight, TrendingUp 
} from 'lucide-react';
import { GENRES } from '../data';

interface DashboardProps {
  mangas: Manga[];
  stats: UserStats;
  bookmarks: string[];
  readingProgress: ReadingProgress[];
  onSelectManga: (manga: Manga) => void;
  onSelectChapter: (manga: Manga, chapter: Chapter) => void;
}

export default function Dashboard({
  mangas,
  stats,
  bookmarks,
  readingProgress,
  onSelectManga,
  onSelectChapter
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [statusFilter, setStatusFilter] = useState<'all' | 'En curso' | 'Finalizado'>('all');

  // Filter mangas list
  const filteredMangas = mangas.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'Todos' || m.genres.includes(selectedGenre);
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const featuredManga = mangas.find(m => m.featured) || mangas[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-on-surface font-body select-none pb-24">
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Main Container Wrapper */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 relative z-10 space-y-9">
        
        {/* Navigation / Header Brand Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center font-display font-black text-xl text-white shadow-md shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
              MN
            </div>
            <div>
              <h1 className="font-display font-black text-lg text-on-surface tracking-wider uppercase flex items-center gap-1.5">
                Manga<span className="text-primary font-normal">Nova</span>
              </h1>
              <span className="text-[10px] text-neutral-500 font-label tracking-widest uppercase">Lector Inmersivo Premium</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar manga o autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1c1b1b] p-2.5 pl-9 rounded-xl text-xs text-on-surface border border-outline-variant/10 focus:border-primary focus:outline-none transition-all placeholder:text-neutral-500"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3.5" />
            </div>

            {/* Profile Avatar Spot */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-outline-variant/10 shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center font-bold text-xs text-secondary">
                  {stats.username.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-semibold text-xs text-on-surface leading-tight">{stats.username}</span>
                <span className="text-[10px] text-primary">Nivel Leyenda</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Spotlight / Featured Slider Section */}
        {featuredManga && (
          <section className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10 group min-h-[380px] md:min-h-[440px] flex items-end">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.025]"
              style={{ backgroundImage: `url(${featuredManga.coverUrl})` }}
            />
            {/* Immersive overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />
            
            {/* Badge Indicator */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-on-secondary font-black text-[10px] tracking-wider uppercase font-label shadow-md animate-pulse">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Sugerido de Hoy</span>
            </div>

            <div className="relative p-6 md:p-10 text-left max-w-2xl z-10 space-y-3.5">
              <div className="flex gap-2">
                {featuredManga.genres.slice(0, 3).map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded bg-white/10 glass-overlay text-[10px] font-semibold text-white uppercase tracking-wider">
                    {g}
                  </span>
                ))}
              </div>
              
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-none">
                {featuredManga.title}
              </h2>
              
              <p className="text-sm text-neutral-300 line-clamp-3 md:line-clamp-4 font-normal max-w-xl">
                {featuredManga.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => onSelectManga(featuredManga)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-[#ffb59c] hover:scale-105 active:scale-95 text-neutral-950 font-black font-label text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-[#ff5f1f]/35 flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorar Capítulo List</span>
                </button>

                <button 
                  onClick={() => onSelectChapter(featuredManga, featuredManga.chapters[0])}
                  className="px-6 py-3 rounded-xl bg-surface-container-high/90 hover:bg-surface-variant text-white font-bold font-label text-xs uppercase tracking-wider transition-all cursor-pointer border border-outline-variant/30 flex items-center gap-2 hover:border-primary/50"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Leer Cap {featuredManga.chapters[0].number}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bento Box statistics and progress section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Streak */}
          <div className="rounded-2xl bg-[#1c1b1b] border border-outline-variant/10 p-5 flex items-center justify-between group hover:border-[#ff5f1f]/30 transition-all cursor-pointer">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-label text-neutral-400 font-bold tracking-widest block">Racha de Lectura</span>
              <h3 className="font-display font-black text-2xl text-on-surface">
                {stats.streakDays} Días
              </h3>
              <p className="text-xs text-neutral-500">
                ¡Mantén el fuego activo para ganar insignias!
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#ff5f1f]/10 flex items-center justify-center text-[#ff5f1f] border border-[#ff5f1f]/20 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7 fill-[#ff5f1f]" />
            </div>
          </div>

          {/* Box 2: Total Hours */}
          <div className="rounded-2xl bg-[#1c1b1b] border border-outline-variant/10 p-5 flex items-center justify-between group hover:border-[#edb1ff]/30 transition-all cursor-pointer">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-label text-neutral-400 font-bold tracking-widest block">Tiempo Invertido</span>
              <h3 className="font-display font-black text-2xl text-on-surface">
                {stats.hoursRead} Horas
              </h3>
              <p className="text-xs text-neutral-500">
                Lector asiduo de manga en español
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#edb1ff]/10 flex items-center justify-center text-[#edb1ff] border border-[#edb1ff]/20 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7" />
            </div>
          </div>

          {/* Box 3: Total Completed */}
          <div className="rounded-2xl bg-[#1c1b1b] border border-outline-variant/10 p-5 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-label text-neutral-400 font-bold tracking-widest block">Capítulos Terminados</span>
              <h3 className="font-display font-black text-2xl text-on-surface">
                {stats.chaptersCompleted} Capítulos
              </h3>
              <p className="text-xs text-neutral-500">
                Historial completo registrado
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-outline-variant/10 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>
          </div>

        </section>

        {/* Bookmarked / Reading Progress Quick Row */}
        {bookmarks.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-neutral-400 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-[#edb1ff]" /> Tus Favoritos Guardados
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {mangas.filter(m => bookmarks.includes(m.id)).map((m) => (
                <div 
                  key={m.id}
                  onClick={() => onSelectManga(m)}
                  className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <img src={m.coverUrl} className="w-9 h-11 object-cover rounded-md" />
                  <div className="text-left overflow-hidden">
                    <h4 className="font-bold text-xs text-on-surface line-clamp-1">{m.title}</h4>
                    <span className="text-[9px] text-[#ffb59c] block mt-0.5">{m.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Central Filter / Library Search Category Segment */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-outline-variant/10 pb-4">
            
            {/* Genres Tabs Slider container */}
            <div className="overflow-x-auto hide-scrollbar flex gap-1.5 max-w-full">
              {GENRES.map((g) => {
                const isActive = selectedGenre === g;
                return (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider font-label transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-on-primary font-bold shadow-md' 
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant border border-outline-variant/5'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            {/* Status indicators */}
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setStatusFilter('all')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase font-label border transition-all cursor-pointer ${statusFilter === 'all' ? 'border-primary text-primary bg-primary/5' : 'border-outline-variant/10 text-neutral-500'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setStatusFilter('En curso')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase font-label border transition-all cursor-pointer ${statusFilter === 'En curso' ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5' : 'border-outline-variant/10 text-neutral-500'}`}
              >
                En curso
              </button>
              <button 
                onClick={() => setStatusFilter('Finalizado')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold tracking-wider uppercase font-label border transition-all cursor-pointer ${statusFilter === 'Finalizado' ? 'border-amber-400 text-amber-400 bg-amber-500/5' : 'border-outline-variant/10 text-neutral-500'}`}
              >
                Finalizado
              </button>
            </div>
          </div>

          {/* Manga Cards Grid - Responsive columns */}
          {filteredMangas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {filteredMangas.map((m) => {
                const matchesBookmark = bookmarks.includes(m.id);
                return (
                  <div 
                    key={m.id}
                    onClick={() => onSelectManga(m)}
                    className="group rounded-xl overflow-hidden bg-surface-container/60 border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col cursor-pointer max-w-[210px] mx-auto w-full"
                  >
                    {/* Cover Wrap */}
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={m.coverUrl} 
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Rating Label and Bookmark overlay */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 py-1 px-2 rounded-lg bg-surface-container-high/90 text-[10px] font-bold text-[#ffb59c] border border-outline-variant/5">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <span>{m.rating}</span>
                      </div>

                      {matchesBookmark && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-rose-500/80 flex items-center justify-center text-white shadow">
                          <Heart className="w-3.5 h-3.5 fill-white text-white" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-90" />
                      
                      {/* Status Pil Indicator */}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className={`text-[9px] uppercase font-label font-black tracking-widest px-2 py-0.5 rounded ${
                          m.status === 'En curso' ? 'bg-emerald-500 text-neutral-950' : 'bg-amber-500 text-neutral-950'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </div>

                    {/* Metadata brief */}
                    <div className="p-3 text-left space-y-1 flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-display font-extrabold text-xs text-on-surface group-hover:text-primary transition-all line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-[10px] text-neutral-500 font-medium line-clamp-1">
                          {m.author}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-between border-t border-outline-variant/5">
                        <span className="text-[10px] text-neutral-400 font-label">{m.chapters.length} Caps</span>
                        <span className="text-[9px] text-neutral-500 font-label tracking-widest uppercase">Leer →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-on-surface-variant max-w-md mx-auto space-y-3">
              <Compass className="w-12 h-12 text-primary mx-auto opacity-45 animate-bounce" />
              <p className="font-semibold text-sm">No encontramos mangas que coincidan con tu búsqueda</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedGenre('Todos'); setStatusFilter('all'); }}
                className="text-xs text-primary underline underline-offset-4 cursor-pointer font-bold"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </section>

        {/* Recommendations block / Trivia Fun segment */}
        <footer className="pt-10 border-t border-outline-variant/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-label">
            <p>© 2026 MangaNova Corp. Lector Inmersivo de Manga de Alta Fidelidad.</p>
            <div className="flex gap-4">
              <a href="#terminos" className="hover:text-primary">Términos de servicio</a>
              <a href="#privacidad" className="hover:text-primary">Privacidad</a>
              <a href="#contacto" className="hover:text-primary">Soporte</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
