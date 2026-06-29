import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormValues } from './taskSchema';

interface TaskFormProps {
    defaultValues?: Partial<TaskFormValues>;
    onSubmit: (values: TaskFormValues) => void;
    submitLabel?: string;
}

const TaskForm = ({ defaultValues, onSubmit, submitLabel = 'Save' }: TaskFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Title</label>
                <input
                    {...register('title')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Description</label>
                <textarea
                    {...register('description')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    rows={3}
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Due Date</label>
                <input
                    type="date"
                    {...register('dueDate')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                {errors.dueDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.dueDate.message}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Priority</label>
                <select
                    {...register('priority')}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default TaskForm;