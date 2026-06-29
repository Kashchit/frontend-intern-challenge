import type { Task } from '@/types/task.types';

interface TaskRowProps {
    task: Task;
    onView: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

const priorityColor: Record<string, string> = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-green-100 text-green-700',
};

const TaskRow = ({ task, onView, onEdit, onDelete }: TaskRowProps) => (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
        <td className="px-4 py-3 text-sm text-slate-700">{task.title}</td>
        <td className="px-4 py-3">
            <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${task.completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}
            >
                {task.completed ? 'Completed' : 'Pending'}
            </span>
        </td>
        <td className="px-4 py-3">
            {task.priority && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor[task.priority]}`}>
                    {task.priority}
                </span>
            )}
        </td>
        <td className="px-4 py-3 text-right text-sm">
            <button onClick={() => onView(task)} className="mr-3 text-indigo-600 hover:underline">
                View
            </button>
            <button onClick={() => onEdit(task)} className="mr-3 text-slate-600 hover:underline">
                Edit
            </button>
            <button onClick={() => onDelete(task.id)} className="text-red-600 hover:underline">
                Delete
            </button>
        </td>
    </tr>
);

export default TaskRow;