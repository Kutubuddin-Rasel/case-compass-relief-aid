
import { useQuery } from '@tanstack/react-query';
import { casesApi } from '@/services/api';
import { toast } from 'sonner';

export function useTestDatabaseConnection() {
  return useQuery({
    queryKey: ['databaseConnection'],
    queryFn: casesApi.testConnection,
    retry: 1,
    refetchOnWindowFocus: false,
    gcTime: 60000,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to connect to database. Please check your connection settings.');
        console.error('Database connection error:', error);
      }
    }
  });
}

export function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: casesApi.getAllCases,
    refetchOnWindowFocus: false,
    gcTime: 300000, // 5 minutes
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to load cases. Please try again later.');
        console.error('Error fetching cases:', error);
      }
    }
  });
}

export function useCase(id: string) {
  return useQuery({
    queryKey: ['cases', id],
    queryFn: () => casesApi.getCaseById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    gcTime: 300000, // 5 minutes
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load case details for ${id}. Please try again later.`);
        console.error(`Error fetching case ${id}:`, error);
      }
    }
  });
}
