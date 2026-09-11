import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, History, BarChart3, Settings, Menu, X, ShieldAlert } from 'lucide-react';
import { useHealth } from '../../hooks/useSettings';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data: health } = useHealth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Cemetery', path: '/cemetery', icon: Compass },
    { label: 'Timeline', path: '/timeline', icon: History },
    { label: 'Statistics', path: '/statistics', icon: BarChart3 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cemetery-bg text-slate-200 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-cemetery-card/90 border-r border-cemetery-border/60 p-6 justify-between shrink-0">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-3xl select-none">🪦</span>
            <div>
              <h1 className="font-serif font-bold text-lg tracking-wide text-slate-100">Digital Cemetery</h1>
              <p className="text-[11px] text-cemetery-fog tracking-tight">Memento mori digitalis</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-cemetery-darkgreen text-emerald-300 border border-cemetery-moss/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-cemetery-card'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Watcher Status Footer */}
        <div className="pt-6 border-t border-cemetery-border/40 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  health?.watcher_running ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                }`}
              />
              <span>Watcher: {health?.watcher_running ? 'Active' : 'Inactive'}</span>
            </span>
            <span className="font-mono text-[10px] text-slate-500">v1.0.0</span>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-cemetery-card border-b border-cemetery-border">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🪦</span>
          <span className="font-serif font-bold text-sm">Digital Cemetery</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cemetery-card border-b border-cemetery-border p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-cemetery-darkgreen text-emerald-300' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
