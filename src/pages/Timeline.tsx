import React, { useState } from 'react';
import { useTimeline } from '../hooks/useDeaths';
import { LoadingSpinner, EmptyState, Pagination } from '../components/common/Common';
import { formatBytes, formatLifespan, formatDate, formatRelativeTime } from '../utils/formatters';
import { Link } from 'react-router-dom';
import { Calendar, Filter } from 'lucide-react';

export function Timeline() {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const { data, isLoading } = useTimeline({
    from: fromDate || undefined,
    to: toDate || undefined,
    page,
    limit: 25,
  });

  if (isLoading) {
    return <LoadingSpinner text="Reading the chronological death rolls..." />;
  }

  const deaths = data?.items || [];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header & Date Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cemetery-border/60 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-100">Chronological Timeline</h1>
          <p className="text-xs text-cemetery-fog font-mono mt-1">
            Historical progression of deleted files
          </p>
        </div>

        {/* Date Filter Inputs */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-cemetery-card border border-cemetery-border rounded px-3 py-1.5 text-slate-300 focus:outline-none focus:border-cemetery-moss"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-cemetery-card border border-cemetery-border rounded px-3 py-1.5 text-slate-300 focus:outline-none focus:border-cemetery-moss"
          />
        </div>
      </div>

      {deaths.length === 0 ? (
        <EmptyState
          title="No timeline events recorded"
          description="There are no file deaths recorded for the selected time window."
        />
      ) : (
        <div className="relative border-l-2 border-cemetery-border ml-4 md:ml-8 space-y-8">
          {deaths.map((death) => (
            <div key={death.id} className="relative pl-6 md:pl-8 group">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cemetery-card border-2 border-cemetery-moss group-hover:border-cemetery-candle transition-colors" />

              <div className="bg-cemetery-card/70 border border-cemetery-border hover:border-cemetery-moss/70 rounded-xl p-5 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <Link
                    to={`/deaths/${death.id}`}
                    className="font-semibold text-slate-100 text-sm hover:text-emerald-300 transition truncate max-w-md"
                  >
                    {death.filename}
                  </Link>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formatDate(death.deleted_at)} ({formatRelativeTime(death.deleted_at)})
                  </span>
                </div>

                {death.epitaph && (
                  <p className="text-xs italic font-serif text-slate-300 mb-3 border-l-2 border-cemetery-candle/50 pl-2">
                    "{death.epitaph}"
                  </p>
                )}

                <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 pt-2 border-t border-cemetery-border/40">
                  <span>Size: {formatBytes(death.size_bytes)}</span>
                  <span>Lifespan: {formatLifespan(death.lifespan_seconds)}</span>
                  <span>Cause: {death.cause}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={data?.pages ?? 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
