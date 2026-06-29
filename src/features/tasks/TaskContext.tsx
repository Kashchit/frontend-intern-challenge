import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Task, CreateTaskInput } from '@/types/task.types';

interface TaskContextValue {
    localTasks: Task[];
    setLocalTasks: (tasks: Task[]) => void;
    addTask: (input: CreateTaskInput) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [localTasks, setLocalTasks] = useState<Task[]>([]);

    const addTask = (input: CreateTaskInput) => {
        const newTask: Task = {
            id: Date.now(), // local-only id, safe since JSONPlaceholder ids won't collide with timestamps
            userId: 1,
            title: input.title,
            completed: false,
            description: input.description,
            dueDate: input.dueDate,
            priority: input.priority,
        };
        setLocalTasks((prev) => [newTask, ...prev]);
    };

    const updateTask = (id: number, updates: Partial<Task>) => {
        setLocalTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
    };

    const deleteTask = (id: number) => {
        setLocalTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider
            value={{ localTasks, setLocalTasks, addTask, updateTask, deleteTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextValue => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};