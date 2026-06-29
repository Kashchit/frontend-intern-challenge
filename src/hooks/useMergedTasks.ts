import { useMemo } from 'react';
import { useTasks } from './useTasks';
import { useTaskContext } from '@/features/tasks/TaskContext';
import type { Task } from '@/types/task.types';

interface DeletedIds {
    has: (id: number) => boolean;
}

// Merges server-fetched tasks with local edits/deletes/creates
// so the UI behaves like a real CRUD app over a read-only API.
export const useMergedTasks = () => {
    const { data: serverTasks, isLoading, isError } = useTasks();
    const { localTasks, updateTask: updateLocal, deleteTask } = useTaskContext();

    const deletedIds = useMemo(
        () => new Set<number>(),
        []
    ) as Set<number> & DeletedIds;

    const mergedTasks: Task[] = useMemo(() => {
        if (!serverTasks) return localTasks;

        const overriddenServerTasks = serverTasks
            .filter((task) => !deletedIds.has(task.id))
            .map((task) => {
                const override = localTasks.find((t) => t.id === task.id);
                return override ? { ...task, ...override } : task;
            });

        const createdTasks = localTasks.filter(
            (t) => !serverTasks.some((s) => s.id === t.id)
        );

        return [...createdTasks, ...overriddenServerTasks];
    }, [serverTasks, localTasks, deletedIds]);

    return { tasks: mergedTasks, isLoading, isError, updateLocal, deleteTask };
};