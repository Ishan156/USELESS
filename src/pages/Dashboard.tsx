import React from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { useRecentDeaths } from '../hooks/useDeaths';
import { DeathCard } from '../components/death/DeathCard';
import { LoadingSpinner, EmptyState } from '../components/common/Common';
import { formatBytes, formatLifespan } from '../utils/formatters';
import { Link } from 'react-router-dom';
import { ArrowRight, Skull, Calendar, FileText, HardDrive } from 'lucide-react';

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useStatistics();
  const { data: recentDeaths, isLoading: deathsLoading } = useRecentDeaths(6);

  if (statsLoading || deathsLoading) {
    return <LoadingSpinner text="Summoning cemetery archives..." />;
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Atmosphere Header */}
      <div className="relative border-b border-cemetery-border/60 pb-8 pt-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-slate-100 mb-2">
          Digital Cemetery
        </h1>
        <p className="text-base md:text-lg text-cemetery-fog font-serif italic tracking-wide">
          "Everything eventually gets deleted."
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-cemetery-card/70 border border-cemetery-border p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Deceased</span>
            <Skull className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-serif text-slate-100">
            {stats?.total_deaths ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">lifetime deletions</div>
        </div>

        <div className="bg-cemetery-card/70 border border-cemetery-border p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Died Today</span>
            <Calendar className="w-4 h-4 text-cemetery-candle" />
          </div>
          <div className="text-3xl font-bold font-serif text-slate-100">
            {stats?.deaths_today ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            {stats?.deaths_this_week ?? 0} this week
          </div>
        </div>

        <div className="bg-cemetery-card/70 border border-cemetery-border p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Top File Type</span>
            <FileText className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-100">
            {stats?.most_common_extension || 'N/A'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">most common casualty</div>
        </div>

        <div className="bg-cemetery-card/70 border border-cemetery-border p-5 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Heaviest File</span>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-serif text-slate-100 truncate" title={stats?.largest_file?.filename}>
            {stats?.largest_file ? formatBytes(stats.largest_file.size_bytes) : '0 B'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono truncate">
            {stats?.largest_file?.filename || 'none'}
          </div>
        </div>
      </div>

      {/* Recent Deaths Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-slate-200">Recent Departures</h2>
          <Link
            to="/cemetery"
            className="flex items-center space-x-1.5 text-xs text-cemetery-fog hover:text-emerald-300 transition font-mono"
          >
            <span>Enter the Cemetery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!recentDeaths || recentDeaths.length === 0 ? (
          <EmptyState
            title="The cemetery grounds are quiet"
            description="No deleted files have been detected yet. Delete a file in a watched folder to create its gravestone."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDeaths.map((death) => (
              <DeathCard key={death.id} death={death} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
