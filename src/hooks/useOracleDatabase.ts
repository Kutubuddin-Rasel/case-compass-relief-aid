
import { useQuery } from '@tanstack/react-query';
import { casesApi } from '@/services/api';

export function useTestDatabaseConnection() {
  return useQuery({
    queryKey: ['databaseConnection'],
    queryFn: casesApi.testConnection,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: casesApi.getAllCases,
    refetchOnWindowFocus: false,
  });
}

export function useCase(id: string) {
  return useQuery({
    queryKey: ['cases', id],
    queryFn: () => casesApi.getCaseById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}
