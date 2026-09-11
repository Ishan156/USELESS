import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

interface NavLinkProps {
  to: string
  label: string
  icon: LucideIcon
  exact?: boolean
  onNavigate?: () => void
}

export default function NavLink({ to, label, icon: Icon, exact = false, onNavigate }: NavLinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: exact })
  const isActive = Boolean(match)

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
        transition-all duration-200 group
        ${
          isActive
            ? 'bg-cemetery-moss/20 text-cemetery-candle border border-cemetery-moss/30'
            : 'text-cemetery-stone hover:text-cemetery-fog hover:bg-white/5 border border-transparent'
        }
      `}
    >
      <Icon
        size={18}
        className={`flex-shrink-0 transition-colors ${
          isActive ? 'text-cemetery-candle' : 'text-cemetery-stone group-hover:text-cemetery-fog'
        }`}
      />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cemetery-candle animate-flicker" />
      )}
    </Link>
  )
}
