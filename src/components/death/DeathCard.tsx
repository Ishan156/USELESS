import React from 'react';
import { Link } from 'react-router-dom';
import { Death } from '../../types';
import { formatBytes, formatLifespan, formatRelativeTime, getFileCategoryIcon } from '../../utils/formatters';

interface DeathCardProps {
  death: Death;
}

export function DeathCard({ death }: DeathCardProps) {
  const bornYear = death.born_at ? new Date(death.born_at).getFullYear() : '????';
  const deathYear = new Date(death.deleted_at).getFullYear();

  return (
    <Link
      to={`/deaths/${death.id}`}
      className="group block relative bg-cemetery-card/70 border border-cemetery-border hover:border-cemetery-moss/80 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl group-hover:scale-110 transition-transform">🪦</span>
          <div>
            <h4 className="font-semibold text-slate-100 text-sm tracking-wide truncate max-w-[180px]" title={death.filename}>
              {death.filename}
            </h4>
            <span className="text-[11px] font-mono text-cemetery-fog">
              {bornYear} — {deathYear}
            </span>
          </div>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-cemetery-border/40 text-slate-300 font-mono">
          {death.extension || 'none'}
        </span>
      </div>

      {death.epitaph && (
        <p className="mt-3 text-xs italic font-serif text-slate-300 line-clamp-2 leading-relaxed border-l-2 border-cemetery-candle/60 pl-2.5">
          "{death.epitaph}"
        </p>
      )}

      <div className="mt-4 pt-3 border-t border-cemetery-border/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>{formatBytes(death.size_bytes)}</span>
        <span>{formatLifespan(death.lifespan_seconds)}</span>
        <span className="text-slate-500">{formatRelativeTime(death.deleted_at)}</span>
      </div>
    </Link>
  );
}
