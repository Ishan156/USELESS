import { apiClient } from './client';
import { Death, DeathListResponse, FileTimelineResponse } from '../types';

export interface DeathsQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export async function fetchDeaths(params: DeathsQueryParams = {}): Promise<DeathListResponse> {
  const { data } = await apiClient.get<DeathListResponse>('/api/deaths', { params });
  return data;
}

export async function fetchRecentDeaths(limit = 10): Promise<Death[]> {
  const { data } = await apiClient.get<Death[]>('/api/deaths/recent', { params: { limit } });
  return data;
}

export async function fetchDeath(id: number): Promise<Death> {
  const { data } = await apiClient.get<Death>(`/api/deaths/${id}`);
  return data;
}

export async function fetchDeathTimeline(id: number): Promise<FileTimelineResponse> {
  const { data } = await apiClient.get<FileTimelineResponse>(`/api/deaths/${id}/timeline`);
  return data;
}

export async function searchDeaths(q: string, page = 1, limit = 20): Promise<DeathListResponse> {
  const { data } = await apiClient.get<DeathListResponse>('/api/search', {
    params: { q, page, limit },
  });
  return data;
}

export async function fetchTimeline(params: { from?: string; to?: string; page?: number; limit?: number } = {}): Promise<DeathListResponse> {
  const { data } = await apiClient.get<DeathListResponse>('/api/timeline', { params });
  return data;
}
