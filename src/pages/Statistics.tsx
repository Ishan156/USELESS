import React from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { LoadingSpinner } from '../components/common/Common';
import { formatBytes, formatLifespan } from '../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export function Statistics() {
  const { data: stats, isLoading } = useStatistics();

  if (isLoading) {
    return <LoadingSpinner text="Aggregating cemetery metrics..." />;
  }

  // Extensions chart data
  const extData = Object.entries(stats?.deaths_by_extension || {}).map(([ext, count]) => ({
    name: ext || 'none',
    count,
  }));

  // Days chart data
  const dayData = Object.entries(stats?.deaths_by_day || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({
      day,
      count,
    }));

  // Hour chart data
  const hourData = Object.entries(stats?.deaths_by_hour || {}).map(([hour, count]) => ({
    hour: `${hour}:00`,
    count,
  }));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div className="border-b border-cemetery-border/60 pb-6">
        <h1 className="font-serif text-3xl font-bold text-slate-100">Mortality Statistics</h1>
        <p className="text-xs text-cemetery-fog font-mono mt-1">
          Patterns, lifespans, and distributions of deleted files
        </p>
      </div>

      {/* Lifespan & File Extremes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cemetery-card border border-cemetery-border p-4 rounded-xl">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">Shortest Lifespan</span>
          <span className="text-xl font-bold font-serif text-slate-100">
            {formatLifespan(stats?.shortest_lifespan_seconds ?? null)}
          </span>
        </div>
        <div className="bg-cemetery-card border border-cemetery-border p-4 rounded-xl">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">Longest Lifespan</span>
          <span className="text-xl font-bold font-serif text-slate-100">
            {formatLifespan(stats?.longest_lifespan_seconds ?? null)}
          </span>
        </div>
        <div className="bg-cemetery-card border border-cemetery-border p-4 rounded-xl">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">Largest Casualty</span>
          <span className="text-xl font-bold font-serif text-slate-100 truncate block">
            {formatBytes(stats?.largest_file?.size_bytes ?? null)}
          </span>
        </div>
        <div className="bg-cemetery-card border border-cemetery-border p-4 rounded-xl">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">Smallest Casualty</span>
          <span className="text-xl font-bold font-serif text-slate-100 truncate block">
            {formatBytes(stats?.smallest_file?.size_bytes ?? null)}
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deaths by Extension */}
        <div className="bg-cemetery-card border border-cemetery-border p-6 rounded-xl space-y-4">
          <h3 className="font-serif text-base font-bold text-slate-200">Deceased by File Extension</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={extData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2e1f" />
                <XAxis dataKey="name" stroke="#7f9389" fontSize={11} />
                <YAxis stroke="#7f9389" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101710', borderColor: '#344e2f' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="count" fill="#344e2f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deaths by Day */}
        <div className="bg-cemetery-card border border-cemetery-border p-6 rounded-xl space-y-4">
          <h3 className="font-serif text-base font-bold text-slate-200">Deletions Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2e1f" />
                <XAxis dataKey="day" stroke="#7f9389" fontSize={11} />
                <YAxis stroke="#7f9389" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101710', borderColor: '#344e2f' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deaths by Hour of Day */}
        <div className="bg-cemetery-card border border-cemetery-border p-6 rounded-xl space-y-4 lg:col-span-2">
          <h3 className="font-serif text-base font-bold text-slate-200">Deletions by Hour of Day (0–23h UTC)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2e1f" />
                <XAxis dataKey="hour" stroke="#7f9389" fontSize={10} />
                <YAxis stroke="#7f9389" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101710', borderColor: '#344e2f' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="count" fill="#4a6741" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
