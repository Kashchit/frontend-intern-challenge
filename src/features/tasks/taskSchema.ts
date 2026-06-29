import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    dueDate: z.string().min(1, 'Due date is required'),
    priority: z.enum(['High', 'Medium', 'Low']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;