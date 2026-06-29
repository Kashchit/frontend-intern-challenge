import { taskApi } from './axiosInstance';
import type { RemoteTask } from '@/types/task.types';

export const fetchTasks = async (): Promise<RemoteTask[]> => {
    const { data } = await taskApi.get<RemoteTask[]>('/todos');
    return data;
};