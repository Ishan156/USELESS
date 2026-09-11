export function formatBytes(bytes: number | null): string {
  if (bytes === null || bytes === undefined) return '--';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatLifespan(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return '--';
  if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '--';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return '--';
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

export function getFileCategoryIcon(extension: string | null): string {
  const ext = (extension || '').toLowerCase();
  if (['.pdf'].includes(ext)) return '📄';
  if (['.doc', '.docx', '.txt', '.md', '.rtf'].includes(ext)) return '📝';
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) return '🖼️';
  if (['.mp3', '.wav', '.flac', '.ogg'].includes(ext)) return '🎵';
  if (['.mp4', '.mkv', '.mov', '.avi'].includes(ext)) return '🎬';
  if (['.zip', '.tar', '.gz', '.rar', '.7z'].includes(ext)) return '📦';
  if (['.py', '.ts', '.js', '.jsx', '.tsx', '.html', '.css', '.json', '.rs', '.go'].includes(ext)) return '💻';
  return '📁';
}
