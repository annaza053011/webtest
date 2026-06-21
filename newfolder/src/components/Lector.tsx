import React, { useState, useEffect, useRef } from 'react';
import { Manga, Chapter } from '../types';
import { 
  ArrowLeft, Bookmark, Share2, Settings, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, MessageSquare, Sun, Check, ExternalLink, RefreshCw 
} from 'lucide-react';

interface LectorProps {
  manga: Manga;
  chapter: Chapter;
  onBack: () => void;
  onChapterSelect: (chap: Chapter) => void;
  onSaveProgress: (progress: { mangaId: string; chapterId: string; page: number }) => void;
}

export default function Lector({ manga, chapter, onBack, onChapterSelect, onSaveProgress }: LectorProps) {
  const [activePage, setActivePage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'scroll' | 'single'>('scroll');
  const [commentText, setCommentText] = useState<string>('');
  
  // Real layout ref
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Simulation of fan comments
  const [comments, setComments] = useState([
    { id: 1, user: 'JinWooFans', text: '¡Increíble nivel de detalle! Esa batalla con el Monarca es legendaria.', time: 'Hace 2 horas', likes: 245 },
    { id: 2, user: 'OtakuSupreme', text: 'Los ojos morados brillando en la oscuridad me dan escalofríos. Qué arte tan espectacular.', time: 'Hace 5 horas', likes: 189 },
    { id: 3, user: 'MangaEnjoyer', text: '¿Alguien más gritó de la emoción en la página 3? Sung Jinwoo es el mejor de todos.', time: 'Hace 1 día', likes: 412 },
  ]);

  // Handle intersection observer to auto-track pagination on scroll
  useEffect(() => {
    if (viewMode === 'scroll') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-page-index'));
            if (!isNaN(index)) {
              setActivePage(index + 1);
            }
          }
        });
      }, {
        threshold: 0.4,
        rootMargin: '-50px 0px -50px 0px'
      });

      // Observe each visible page wrapper
      pageRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [viewMode, chapter]);

  const handlePageSelect = (pageNumber: number) => {
    if (viewMode === 'scroll') {
      const targetElement = pageRefs.current[pageNumber - 1];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setActivePage(pageNumber);
    }
  };

  const handleSaveProgress = () => {
    onSaveProgress({
      mangaId: manga.id,
      chapterId: chapter.id,
      page: activePage
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${manga.title} - ${chapter.title}`,
        text: `¡Lee gratis el ${chapter.title} en MangaNova!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de lectura copiado al portapapeles!');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: 'Tú',
        text: commentText,
        time: 'Ahora mismo',
        likes: 0
      },
      ...comments
    ]);
    setCommentText('');
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-on-surface select-none pb-24 hide-scrollbar">
      {/* Background Ambient Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-radial-[circle_at_top] from-primary/10 via-transparent to-transparent" />

      {/* Header Panel */}
      <header id="reader-header" className="fixed top-0 left-0 right-0 z-40 glass-overlay bg-[#131313]/80 border-b border-outline-variant/10 shadow-lg transition-transform duration-300">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              id="back-button"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface hover:text-primary transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="font-display font-bold text-lg md:text-xl text-on-surface line-clamp-1">{manga.title}</h1>
              <p className="font-label text-xs text-primary uppercase tracking-wider">{chapter.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button 
              id="save-progress-button"
              onClick={handleSaveProgress}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isSaved 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant/10'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? '¡Progreso Guardado!' : 'Guardar Progreso'}</span>
            </button>

            <button 
              id="share-button"
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-variant hover:text-primary text-on-surface transition-all cursor-pointer"
              title="Compartir Capítulo"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button 
              id="comments-toggle-button"
              onClick={() => setShowComments(!showComments)}
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-variant transition-all cursor-pointer ${showComments ? 'text-secondary border border-secondary/30' : 'text-on-surface'}`}
              title="Comentarios de Fans"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button 
              id="settings-toggle-button"
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Ajustes de Lector"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Manga Layout Stage */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center pt-24 pb-32">
        
        {/* Settings Floating Widget */}
        {showSettings && (
          <div className="fixed top-24 right-4 md:right-8 z-50 w-80 p-5 rounded-2xl bg-surface-container-high/95 glass-overlay border border-outline-variant/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <h3 className="font-display font-semibold text-sm uppercase text-primary tracking-wider mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Prefes de Lectura
            </h3>
            
            <div className="space-y-4 text-xs font-label text-on-surface-variant">
              <div>
                <label className="block mb-2 font-medium">Modo de Vista</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setViewMode('scroll')}
                    className={`py-2 px-3 rounded-lg text-center font-semibold transition-all border cursor-pointer ${viewMode === 'scroll' ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container border-outline-variant/10 text-on-surface-variant'}`}
                  >
                    Despliegue Vertical
                  </button>
                  <button 
                    onClick={() => {
                      setViewMode('single');
                      if (activePage > chapter.pages.length) setActivePage(1);
                    }}
                    className={`py-2 px-3 rounded-lg text-center font-semibold transition-all border cursor-pointer ${viewMode === 'single' ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container border-outline-variant/10 text-on-surface-variant'}`}
                  >
                    Página por Página
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" /> Brillo del Panel
                  </label>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="120" 
                  value={brightness} 
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-primary h-1 rounded-lg bg-surface-variant"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Escala del Ancho: {zoom}%</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                    className="flex-1 py-1 px-2 rounded bg-surface-container border border-outline-variant/10 hover:border-primary text-center"
                  >
                    Reducir
                  </button>
                  <button 
                    onClick={() => setZoom(100)}
                    className="flex-1 py-1 px-2 rounded bg-surface-container border border-outline-variant/10 hover:border-primary text-center"
                  >
                    Normal (100)
                  </button>
                  <button 
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                    className="flex-1 py-1 px-2 rounded bg-surface-container border border-outline-variant/10 hover:border-primary text-center"
                  >
                    Ampliar
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowSettings(false)}
              className="mt-5 w-full py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold font-label text-xs transition-all cursor-pointer"
            >
              Listo
            </button>
          </div>
        )}

        {/* Dynamic Reader Box */}
        <div 
          className="flex flex-col items-center gap-1 transition-all duration-300 w-full"
          style={{ 
            maxWidth: `${800 * (zoom / 100)}px`,
            filter: `brightness(${brightness}%)`
          }}
        >
          {viewMode === 'scroll' ? (
            // Full Vertical Scroller
            chapter.pages.map((pageUrl, index) => (
              <div 
                key={index}
                data-page-index={index}
                ref={(el) => { pageRefs.current[index] = el; }}
                className="relative w-full group cursor-pointer overflow-hidden transition-all duration-300 rounded-sm"
              >
                <img 
                  src={pageUrl} 
                  alt={`Manga Page ${index + 1}`}
                  className="w-full h-auto manga-page-shadow rounded-sm border border-outline-variant/10 object-contain max-h-[140vh]"
                />
                <div className="absolute inset-x-0 bottom-0 py-2 text-center text-[10px] bg-gradient-to-t from-black/80 to-transparent text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Sung Jinwoo / {manga.title} - Página {index + 1}
                </div>
              </div>
            ))
          ) : (
            // Page by Page mode
            <div className="relative w-full flex flex-col items-center">
              <div className="relative w-full group cursor-pointer overflow-hidden rounded-sm transition-all duration-300">
                <img 
                  src={chapter.pages[activePage - 1]} 
                  alt={`Manga Page ${activePage}`}
                  className="w-full h-auto manga-page-shadow rounded-sm border border-outline-variant/10 object-contain max-h-[120vh]"
                />
                
                {/* Hotspot navigation helpers */}
                <div 
                  onClick={() => {
                    if (activePage > 1) setActivePage(activePage - 1);
                  }}
                  className="absolute left-0 inset-y-0 w-1/4 bg-gradient-to-r from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-start pl-4"
                  title="Página Anterior"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-primary">
                    <ChevronLeft className="w-6 h-6" />
                  </div>
                </div>

                <div 
                  onClick={() => {
                    if (activePage < chapter.pages.length) setActivePage(activePage + 1);
                  }}
                  className="absolute right-0 inset-y-0 w-1/4 bg-gradient-to-l from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-end pr-4"
                  title="Siguiente Página"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-primary">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Page Indicators */}
              <div className="flex gap-2 mt-4">
                {chapter.pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePage(i + 1)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${activePage === i + 1 ? 'bg-primary scale-125' : 'bg-surface-variant hover:bg-primary-container'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* End of Chapter Section */}
        <div className="mt-16 py-16 w-full max-w-[800px] px-6 text-center flex flex-col items-center space-y-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="font-body text-lg italic text-on-surface-variant">
            Has llegado al final del {chapter.title}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={onBack}
              className="px-8 py-3.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all active:scale-95 cursor-pointer text-sm"
            >
              Volver al Inicio
            </button>

            {manga.chapters.findIndex(c => c.id === chapter.id) - 1 >= 0 ? (
              <button 
                onClick={() => {
                  const currIdx = manga.chapters.findIndex(c => c.id === chapter.id);
                  onChapterSelect(manga.chapters[currIdx - 1]);
                  setActivePage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer text-sm"
              >
                Siguiente Capítulo
              </button>
            ) : (
              <button 
                disabled
                className="px-8 py-3.5 rounded-full bg-neutral-800 text-neutral-500 font-bold text-sm cursor-not-allowed opacity-50"
              >
                Último Capítulo Alcanzado
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Floating Comments Panel Drawer */}
      {showComments && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-surface-container-high/95 glass-overlay border-l border-outline-variant/30 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-250">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-secondary w-5 h-5" />
              <h3 className="font-display font-semibold text-base text-on-surface uppercase tracking-wider">
                Comunidad ({comments.length})
              </h3>
            </div>
            <button 
              onClick={() => setShowComments(false)}
              className="text-on-surface-variant hover:text-primary transition-all p-1"
            >
              Cerrar
            </button>
          </div>

          {/* Comment Form */}
          <form onSubmit={submitComment} className="mb-6">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe un comentario sobre el capítulo..."
              rows={3}
              className="w-full bg-surface p-3 rounded-xl text-xs text-on-surface border border-outline-variant/10 focus:border-secondary outline-none resize-none transition-all"
            />
            <div className="flex justify-end mt-2">
              <button 
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Comentar
              </button>
            </div>
          </form>

          {/* List of comments */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-surface-variant">
            {comments.map((comment) => (
              <div key={comment.id} className="p-3.5 rounded-xl bg-surface border border-outline-variant/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs text-secondary-container text-on-secondary-container bg-secondary-container/20 py-0.5 px-2 rounded-md">
                    {comment.user}
                  </span>
                  <span className="text-[10px] text-neutral-500">{comment.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{comment.text}</p>
                <div className="flex justify-end mt-2 text-[10px] text-primary hover:text-primary-container cursor-pointer font-bold">
                  👍 Respaldar ({comment.likes})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Floating Menu navigation panel exactly matching user screens */}
      <nav id="reader-controls" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-transform duration-300">
        <div className="glass-overlay bg-[#201f1f]/90 border border-outline-variant/30 rounded-2xl md:rounded-full p-2.5 md:p-3 flex flex-col md:flex-row items-center gap-4 shadow-2xl">
          
          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <button 
              onClick={() => {
                if (activePage > 1) {
                  handlePageSelect(activePage - 1);
                } else {
                  // go to previous chapter if any
                  const currIdx = manga.chapters.findIndex(c => c.id === chapter.id);
                  if (currIdx + 1 < manga.chapters.length) {
                    onChapterSelect(manga.chapters[currIdx + 1]);
                    setActivePage(1);
                  }
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all font-semibold font-label text-xs cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>ANTERIOR</span>
            </button>

            <div className="h-6 w-px bg-outline-variant/20 hidden md:block mx-1"></div>

            <button 
              onClick={() => {
                if (activePage < chapter.pages.length) {
                  handlePageSelect(activePage + 1);
                } else {
                  // go to next chapter if any
                  const currIdx = manga.chapters.findIndex(c => c.id === chapter.id);
                  if (currIdx - 1 >= 0) {
                    onChapterSelect(manga.chapters[currIdx - 1]);
                    setActivePage(1);
                  }
                }
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold hover:scale-[1.01] active:scale-95 transition-all font-label text-xs cursor-pointer active-glow group"
            >
              <span>SIGUIENTE</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Dynamic Progress indicator bar */}
          <div className="flex-grow flex items-center gap-3 px-3 w-full md:w-auto">
            <span className="font-label text-xs text-on-surface-variant shrink-0 font-medium">Pág. {activePage}</span>
            <div className="relative flex-grow h-2 bg-surface-variant rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300" 
                style={{ width: `${(activePage / chapter.pages.length) * 100}%` }}
              />
            </div>
            <span className="font-label text-xs text-on-surface-variant shrink-0 font-medium">{chapter.pages.length}</span>
            
            {/* Quick dropdown for chapter switching */}
            <div className="relative group shrink-0">
              <select
                value={chapter.id}
                onChange={(e) => {
                  const targetChapter = manga.chapters.find(c => c.id === e.target.value);
                  if (targetChapter) {
                    onChapterSelect(targetChapter);
                    setActivePage(1);
                  }
                }}
                className="bg-surface-variant/80 text-on-surface font-label text-xs font-semibold py-1 px-3 pr-8 rounded-lg appearance-none cursor-pointer border border-outline-variant/10 focus:outline-none"
              >
                {manga.chapters.map((chap) => (
                  <option key={chap.id} value={chap.id} className="bg-surface text-on-surface">
                    Cap. {chap.number}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-on-surface-variant">
                <Settings className="w-3 h-3 rotate-90" />
              </div>
            </div>
          </div>

          {/* Zoom & Screen state controls on desktop */}
          <div className="hidden md:flex items-center gap-1 pr-1 font-label">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              title="Reducir tamaño"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="px-1 text-xs text-on-surface min-w-[42px] text-center font-bold">{zoom}%</div>
            <button 
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              title="Aumentar tamaño"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <div className="h-6 w-px bg-outline-variant/20 mx-1.5"></div>

            <button 
              onClick={toggleFullscreen}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${isFullscreen ? 'text-secondary bg-surface-container' : 'text-on-surface-variant hover:text-secondary'}`}
              title="Alternar Pantalla Completa"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Fast Bar toggles */}
          <div className="md:hidden flex w-full border-t border-outline-variant/10 pt-2.5 mt-1 justify-around text-neutral-400">
            <button 
              onClick={() => setViewMode(viewMode === 'scroll' ? 'single' : 'scroll')} 
              className="p-1 hover:text-primary" 
              title="Cambiar formato"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="p-1 hover:text-primary"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="p-1 hover:text-secondary"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSaveProgress} 
              className="p-1 hover:text-emerald-400"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

        </div>
      </nav>

    </div>
  );
}
