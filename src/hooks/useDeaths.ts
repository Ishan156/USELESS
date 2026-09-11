import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeaths, fetchRecentDeaths, fetchDeath, fetchDeathTimeline, searchDeaths, fetchTimeline, DeathsQueryParams } from '../api/deaths';

export function useDeaths(params: DeathsQueryParams = {}) {
  return useQuery({
    queryKey: ['deaths', params],
    queryFn: () => fetchDeaths(params),
    refetchInterval: 30000,
  });
}

export function useRecentDeaths(limit = 10) {
  return useQuery({
    queryKey: ['deaths', 'recent', limit],
    queryFn: () => fetchRecentDeaths(limit),
    refetchInterval: 15000,
  });
}

export function useDeath(id: number) {
  return useQuery({
    queryKey: ['death', id],
    queryFn: () => fetchDeath(id),
    enabled: !isNaN(id),
  });
}

export function useDeathTimeline(id: number) {
  return useQuery({
    queryKey: ['death', id, 'timeline'],
    queryFn: () => fetchDeathTimeline(id),
    enabled: !isNaN(id),
  });
}

export function useSearchDeaths(query: string, page = 1, limit = 20) {
  return useQuery({
    queryKey: ['deaths', 'search', query, page, limit],
    queryFn: () => searchDeaths(query, page, limit),
    enabled: query.trim().length > 0,
  });
}

export function useTimeline(params: { from?: string; to?: string; page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ['timeline', params],
    queryFn: () => fetchTimeline(params),
    refetchInterval: 30000,
  });
}
