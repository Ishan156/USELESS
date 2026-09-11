import React from 'react';

export function LoadingSpinner({ text = 'Communing with the deceased...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-10 h-10 border-2 border-cemetery-border border-t-cemetery-candle rounded-full animate-spin"></div>
      <p className="text-sm font-serif italic text-cemetery-fog tracking-wide">{text}</p>
    </div>
  );
}

export function EmptyState({
  title = 'No souls have departed yet',
  description = 'Files monitored in your watched folders will find their eternal rest here when deleted.',
  icon = '🪦',
}: {
  title?: string;
  description?: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-cemetery-border/60 bg-cemetery-card/40 rounded-xl max-w-lg mx-auto">
      <div className="text-5xl mb-4 select-none opacity-80">{icon}</div>
      <h3 className="text-lg font-serif font-medium text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-3 py-6 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1.5 rounded bg-cemetery-card border border-cemetery-border text-slate-300 disabled:opacity-30 hover:border-cemetery-moss transition"
      >
        Previous
      </button>
      <span className="text-xs text-cemetery-fog font-mono">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1.5 rounded bg-cemetery-card border border-cemetery-border text-slate-300 disabled:opacity-30 hover:border-cemetery-moss transition"
      >
        Next
      </button>
    </div>
  );
}
