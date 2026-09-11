import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Death } from '../../types';
import { formatBytes, formatLifespan, formatDate } from '../../utils/formatters';

interface GraveProps {
  death: Death;
}

export function Grave({ death }: GraveProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Position on the 2D field using cemetery_x and cemetery_y
  const style: React.CSSProperties = {
    left: `${death.cemetery_x}%`,
    top: `${death.cemetery_y}%`,
  };

  return (
    <div
      style={style}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/deaths/${death.id}`)}
    >
      {/* Stone Silhouette */}
      <div className="relative group flex flex-col items-center">
        {/* Subtle candlelight glow when hovered */}
        {hovered && (
          <div className="absolute -top-3 w-6 h-6 bg-amber-500/30 rounded-full blur-md animate-pulse pointer-events-none" />
        )}

        <div className="w-11 h-14 bg-gradient-to-b from-stone-600 via-stone-700 to-stone-900 border border-stone-500/50 rounded-t-full shadow-lg shadow-black/80 flex flex-col items-center justify-between p-1 transition-transform group-hover:scale-110 group-hover:border-amber-400/80">
          <span className="text-[10px] select-none opacity-80 mt-0.5">†</span>
          <span className="text-[7px] font-mono text-stone-300 truncate max-w-[38px] text-center">
            {death.extension || 'file'}
          </span>
          <div className="w-full h-[2px] bg-stone-500/40 rounded-full mb-0.5" />
        </div>

        {/* Hover Tooltip */}
        {hovered && (
          <div className="absolute bottom-16 bg-cemetery-card/95 border border-cemetery-moss p-3 rounded-lg shadow-2xl backdrop-blur-md w-56 z-50 text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="font-bold text-xs text-slate-100 truncate mb-1">
              {death.filename}
            </div>
            <div className="text-[10px] text-cemetery-fog space-y-0.5 font-mono">
              <div>Size: {formatBytes(death.size_bytes)}</div>
              <div>Lifespan: {formatLifespan(death.lifespan_seconds)}</div>
              <div>Died: {formatDate(death.deleted_at)}</div>
            </div>
            {death.epitaph && (
              <div className="mt-2 text-[11px] italic font-serif text-amber-200/90 border-t border-cemetery-border/60 pt-1.5 line-clamp-2">
                "{death.epitaph}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
