import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/api/tasks.api';
import type { Task } from '@/types/task.types';

// Limits to first 50 — JSONPlaceholder returns 200 todos, which is excessive for a demo dashboard
export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const data = await fetchTasks();
            return data.slice(0, 50);
        },
    });
};