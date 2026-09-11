import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeath, useDeathTimeline } from '../hooks/useDeaths';
import { LoadingSpinner } from '../components/common/Common';
import { formatBytes, formatLifespan, formatDate } from '../utils/formatters';
import { ArrowLeft, Clock, HardDrive, MapPin, Skull } from 'lucide-react';

export function DeathDetails() {
  const { id } = useParams<{ id: string }>();
  const deathId = parseInt(id || '0', 10);

  const { data: death, isLoading: deathLoading } = useDeath(deathId);
  const { data: timeline, isLoading: timelineLoading } = useDeathTimeline(deathId);

  if (deathLoading || timelineLoading) {
    return <LoadingSpinner text="Consulting the death registry..." />;
  }

  if (!death) {
    return (
      <div className="p-10 text-center space-y-4">
        <h2 className="text-2xl font-serif">Memorial Record Not Found</h2>
        <Link to="/cemetery" className="text-emerald-400 underline text-sm">
          Return to the cemetery
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        to="/cemetery"
        className="inline-flex items-center space-x-2 text-xs text-cemetery-fog hover:text-emerald-300 font-mono transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Cemetery Grounds</span>
      </Link>

      {/* Headstone Memorial Banner */}
      <div className="bg-cemetery-card border border-cemetery-border/80 rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="text-6xl mb-4 select-none">🪦</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 mb-2 tracking-wide">
          {death.filename}
        </h1>
        <p className="font-mono text-xs text-cemetery-fog mb-6">
          {death.original_path}
        </p>

        {death.epitaph && (
          <div className="max-w-xl mx-auto py-4 px-6 border-y border-cemetery-candle/30 bg-amber-950/10 rounded-md my-4">
            <p className="font-serif italic text-base md:text-lg text-amber-200">
              "{death.epitaph}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-cemetery-border/60 text-left font-mono text-xs">
          <div>
            <span className="text-slate-500 block mb-1">File Size</span>
            <span className="text-slate-200 font-bold">{formatBytes(death.size_bytes)}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Lifespan</span>
            <span className="text-slate-200 font-bold">{formatLifespan(death.lifespan_seconds)}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Cause of Death</span>
            <span className="text-red-300 font-bold">{death.cause}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Grave Coordinates</span>
            <span className="text-emerald-300 font-bold">
              X: {death.cemetery_x}%, Y: {death.cemetery_y}%
            </span>
          </div>
        </div>
      </div>

      {/* Chronological Life Events Timeline */}
      <div className="bg-cemetery-card/70 border border-cemetery-border rounded-xl p-6">
        <h3 className="font-serif text-lg font-bold text-slate-200 mb-6 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Life Story & Lifecycle Events</span>
        </h3>

        {!timeline?.events || timeline.events.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono">No prior events recorded.</p>
        ) : (
          <div className="relative border-l-2 border-cemetery-border ml-3 space-y-6">
            {timeline.events.map((event, idx) => {
              const badgeColors: Record<string, string> = {
                CREATED: 'bg-emerald-950 text-emerald-400 border-emerald-800',
                MODIFIED: 'bg-sky-950 text-sky-400 border-sky-800',
                MOVED: 'bg-amber-950 text-amber-400 border-amber-800',
                DELETED: 'bg-red-950 text-red-400 border-red-800',
              };
              return (
                <div key={event.id} className="ml-6 relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cemetery-border border border-cemetery-moss" />
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        badgeColors[event.event_type] || 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {event.event_type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>
                  {event.old_path && event.new_path && (
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      {event.old_path} → {event.new_path}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
