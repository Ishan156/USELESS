import { apiClient } from './client';
import { SettingsResponse, SettingsUpdate, HealthResponse } from '../types';

export async function fetchSettings(): Promise<SettingsResponse> {
  const { data } = await apiClient.get<SettingsResponse>('/api/settings');
  return data;
}

export async function updateSettings(settings: SettingsUpdate): Promise<SettingsResponse> {
  const { data } = await apiClient.put<SettingsResponse>('/api/settings', settings);
  return data;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>('/api/health');
  return data;
}
