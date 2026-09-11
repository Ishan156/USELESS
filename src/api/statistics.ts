import { apiClient } from './client';
import { StatisticsResponse } from '../types';

export async function fetchStatistics(): Promise<StatisticsResponse> {
  const { data } = await apiClient.get<StatisticsResponse>('/api/statistics');
  return data;
}
