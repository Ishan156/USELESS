import React, { useState } from 'react';
import { useDeaths } from '../hooks/useDeaths';
import { CemeteryGrid } from '../components/cemetery/CemeteryGrid';
import { LoadingSpinner, EmptyState, Pagination } from '../components/common/Common';
import { Search, Filter } from 'lucide-react';

export function Cemetery() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExt, setSelectedExt] = useState('');

  const { data, isLoading } = useDeaths({
    page,
    limit: 40,
    sort: 'deleted_at',
    order: 'desc',
  });

  if (isLoading) {
    return <LoadingSpinner text="Walking through the digital cemetery..." />;
  }

  const deaths = data?.items || [];
  const filteredDeaths = deaths.filter((d) => {
    const matchQuery = searchQuery ? d.filename.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchExt = selectedExt ? d.extension?.toLowerCase() === selectedExt.toLowerCase() : true;
    return matchQuery && matchExt;
  });

  // Extract unique extensions
  const extensions = Array.from(new Set(deaths.map((d) => d.extension).filter(Boolean)));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-slate-100">The Cemetery Grounds</h1>
          <p className="text-xs text-cemetery-fog font-mono mt-1">
            Displaying {filteredDeaths.length} of {data?.total ?? 0} souls at rest
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deceased..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-cemetery-card border border-cemetery-border rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cemetery-moss w-48 md:w-60"
            />
          </div>

          {/* Extension Filter */}
          <select
            value={selectedExt}
            onChange={(e) => setSelectedExt(e.target.value)}
            className="px-3 py-2 bg-cemetery-card border border-cemetery-border rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cemetery-moss"
          >
            <option value="">All Extensions</option>
            {extensions.map((ext) => (
              <option key={String(ext)} value={String(ext)}>
                {String(ext)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2D Cemetery Field */}
      {filteredDeaths.length === 0 ? (
        <EmptyState
          title="No gravestones found"
          description="Try broadening your search query or removing extension filters."
        />
      ) : (
        <CemeteryGrid deaths={filteredDeaths} />
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
