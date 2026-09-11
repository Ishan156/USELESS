import { X, LayoutDashboard, TreePine, Clock, BarChart2, Settings } from 'lucide-react'
import NavLink from './NavLink'

interface SidebarProps {
  onClose?: () => void
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/cemetery', label: 'Cemetery', icon: TreePine },
  { to: '/timeline', label: 'Timeline', icon: Clock },
  { to: '/statistics', label: 'Statistics', icon: BarChart2 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-64 h-full flex flex-col bg-cemetery-surface border-r border-cemetery-border">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-cemetery-border">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚰️</span>
          <div>
            <h1 className="font-serif font-bold text-cemetery-fog text-base leading-tight">
              Digital Cemetery
            </h1>
            <p className="text-cemetery-stone text-xs">File Death Records</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-cemetery-stone hover:text-cemetery-fog transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            exact={item.exact}
            onNavigate={onClose}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-cemetery-border">
        <p className="text-cemetery-stone text-xs text-center italic leading-relaxed">
          "Everything eventually gets deleted."
        </p>
        <div className="mt-2 flex justify-center gap-1">
          {['🕯️', '🪦', '🕯️'].map((emoji, i) => (
            <span key={i} className="text-sm animate-flicker" style={{ animationDelay: `${i * 0.4}s` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
