export interface Death {
  id: number;
  file_id: number;
  filename: string;
  original_path: string;
  extension: string | null;
  size_bytes: number | null;
  born_at: string | null;
  last_modified_at: string | null;
  deleted_at: string;
  lifespan_seconds: number | null;
  cause: string;
  epitaph: string | null;
  cemetery_x: number;
  cemetery_y: number;
  created_at: string;
}

export interface DeathListResponse {
  items: Death[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FileEvent {
  id: number;
  file_id: number;
  event_type: 'CREATED' | 'MODIFIED' | 'MOVED' | 'DELETED';
  timestamp: string;
  old_path: string | null;
  new_path: string | null;
}

export interface FileTimelineResponse {
  file_id: number;
  filename: string;
  original_path: string;
  events: FileEvent[];
}

export interface FileInfo {
  filename: string;
  size_bytes: number;
}

export interface StatisticsResponse {
  total_deaths: number;
  deaths_today: number;
  deaths_this_week: number;
  deaths_this_month: number;
  largest_file: FileInfo | null;
  smallest_file: FileInfo | null;
  shortest_lifespan_seconds: number | null;
  longest_lifespan_seconds: number | null;
  most_common_extension: string | null;
  deaths_by_extension: Record<string, number>;
  deaths_by_day: Record<string, number>;
  deaths_by_hour: Record<number, number>;
  deaths_by_directory: Record<string, number>;
}

export interface SettingsResponse {
  watched_directories: string[];
  ignored_directories: string[];
  ai_epitaphs_enabled: boolean;
}

export interface SettingsUpdate {
  watched_directories?: string[];
  ignored_directories?: string[];
  ai_epitaphs_enabled?: boolean;
}

export interface HealthResponse {
  status: string;
  watcher_running: boolean;
}
