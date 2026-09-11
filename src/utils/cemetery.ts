export function getGraveStyle(
  cemetery_x: number,
  cemetery_y: number,
): React.CSSProperties {
  // cemetery_x and cemetery_y are 0-100 percentages
  const left = Math.max(2, Math.min(94, cemetery_x))
  const top = Math.max(2, Math.min(90, cemetery_y))
  return {
    position: 'absolute',
    left: `${left}%`,
    top: `${top}%`,
    transform: 'translate(-50%, -50%)',
  }
}

export type GraveSize = 'sm' | 'md' | 'lg'

export function getGraveSize(size_bytes: number | null): GraveSize {
  if (size_bytes === null || size_bytes === undefined) return 'sm'
  if (size_bytes < 1024 * 100) return 'sm'       // < 100 KB
  if (size_bytes < 1024 * 1024 * 10) return 'md' // < 10 MB
  return 'lg'                                      // >= 10 MB
}

// Import React to allow CSSProperties type
import type React from 'react'
