import React, { useState } from 'react';
import { useSettings, useUpdateSettings, useHealth } from '../hooks/useSettings';
import { LoadingSpinner } from '../components/common/Common';
import { FolderPlus, Trash2, Save, Sparkles, Folder } from 'lucide-react';

export function Settings() {
  const { data: settings, isLoading } = useSettings();
  const { data: health } = useHealth();
  const updateSettings = useUpdateSettings();

  const [watchedDirs, setWatchedDirs] = useState<string[]>([]);
  const [ignoredDirs, setIgnoredDirs] = useState<string[]>([]);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [newWatchedDir, setNewWatchedDir] = useState('');
  const [newIgnoredDir, setNewIgnoredDir] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state once data loads
  if (settings && !hasInitialized) {
    setWatchedDirs(settings.watched_directories || []);
    setIgnoredDirs(settings.ignored_directories || []);
    setAiEnabled(settings.ai_epitaphs_enabled || false);
    setHasInitialized(true);
  }

  if (isLoading) {
    return <LoadingSpinner text="Retrieving watcher configuration..." />;
  }

  const handleAddWatched = () => {
    if (newWatchedDir.trim() && !watchedDirs.includes(newWatchedDir.trim())) {
      setWatchedDirs([...watchedDirs, newWatchedDir.trim()]);
      setNewWatchedDir('');
    }
  };

  const handleRemoveWatched = (dir: string) => {
    setWatchedDirs(watchedDirs.filter((d) => d !== dir));
  };

  const handleAddIgnored = () => {
    if (newIgnoredDir.trim() && !ignoredDirs.includes(newIgnoredDir.trim())) {
      setIgnoredDirs([...ignoredDirs, newIgnoredDir.trim()]);
      setNewIgnoredDir('');
    }
  };

  const handleRemoveIgnored = (dir: string) => {
    setIgnoredDirs(ignoredDirs.filter((d) => d !== dir));
  };

  const handleSave = () => {
    updateSettings.mutate(
      {
        watched_directories: watchedDirs,
        ignored_directories: ignoredDirs,
        ai_epitaphs_enabled: aiEnabled,
      },
      {
        onSuccess: () => {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        },
      }
    );
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="border-b border-cemetery-border/60 pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-100">Cemetery Configuration</h1>
          <p className="text-xs text-cemetery-fog font-mono mt-1">
            Manage monitored folders, ignore filters, and epitaph intelligence
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs shadow-lg shadow-emerald-950/50 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{updateSettings.isPending ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-lg text-xs font-mono">
          ✓ Settings saved and filesystem watcher reconfigured.
        </div>
      )}

      {/* Watched Directories */}
      <div className="bg-cemetery-card border border-cemetery-border rounded-xl p-6 space-y-4">
        <div>
          <h3 className="font-serif text-base font-bold text-slate-200 flex items-center space-x-2">
            <Folder className="w-4 h-4 text-emerald-400" />
            <span>Monitored Directories</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Directories recursively monitored by the watchdog background service.
          </p>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="e.g. C:\Users\Username\Downloads"
            value={newWatchedDir}
            onChange={(e) => setNewWatchedDir(e.target.value)}
            className="flex-1 bg-[#090f09] border border-cemetery-border rounded-lg px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cemetery-moss font-mono"
          />
          <button
            onClick={handleAddWatched}
            className="px-4 py-2 bg-cemetery-darkgreen border border-cemetery-moss text-xs text-emerald-200 rounded-lg hover:bg-cemetery-moss hover:text-white transition"
          >
            Add Directory
          </button>
        </div>

        <div className="space-y-2 mt-3">
          {watchedDirs.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No directories currently monitored.</p>
          ) : (
            watchedDirs.map((dir) => (
              <div
                key={dir}
                className="flex items-center justify-between p-3 rounded-lg bg-[#090f09] border border-cemetery-border/60 text-xs font-mono text-slate-300"
              >
                <span>{dir}</span>
                <button
                  onClick={() => handleRemoveWatched(dir)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ignored Directories */}
      <div className="bg-cemetery-card border border-cemetery-border rounded-xl p-6 space-y-4">
        <div>
          <h3 className="font-serif text-base font-bold text-slate-200 flex items-center space-x-2">
            <span>🛡️ Ignored Directories & Patterns</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Files inside these directories will never be tracked or buried.
          </p>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="e.g. node_modules or .git"
            value={newIgnoredDir}
            onChange={(e) => setNewIgnoredDir(e.target.value)}
            className="flex-1 bg-[#090f09] border border-cemetery-border rounded-lg px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cemetery-moss font-mono"
          />
          <button
            onClick={handleAddIgnored}
            className="px-4 py-2 bg-cemetery-card border border-cemetery-border text-xs text-slate-300 rounded-lg hover:border-cemetery-moss transition"
          >
            Add Pattern
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {ignoredDirs.map((dir) => (
            <span
              key={dir}
              className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#090f09] border border-cemetery-border rounded-md text-xs font-mono text-slate-300"
            >
              <span>{dir}</span>
              <button onClick={() => handleRemoveIgnored(dir)} className="text-slate-500 hover:text-red-400">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* AI Epitaph Generator Switch */}
      <div className="bg-cemetery-card border border-cemetery-border rounded-xl p-6 flex items-center justify-between">
        <div className="space-y-1 pr-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-base font-bold text-slate-200">AI Epitaph Generator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Generate custom humor for deceased files via AI. (When disabled, offline deterministic humorous templates are used).
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={aiEnabled}
            onChange={(e) => setAiEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
        </label>
      </div>
    </div>
  );
}
