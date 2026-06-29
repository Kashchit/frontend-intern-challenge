// Shape returned by JSONPlaceholder
export interface RemoteTask {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export type Priority = 'High' | 'Medium' | 'Low';

// Our app's enriched task — extends the API shape with local-only fields
export interface Task extends RemoteTask {
    description?: string;
    dueDate?: string;
    priority?: Priority;
}

export type TaskFilter = 'All' | 'Completed' | 'Pending';

export interface CreateTaskInput {
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
}