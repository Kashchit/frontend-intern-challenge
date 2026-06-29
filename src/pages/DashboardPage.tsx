import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import StatCard from '@/components/ui/StatCard';
import TaskChart from '@/components/ui/TaskChart';
import TaskRow from '@/components/ui/TaskRow';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import TaskDetailsModal from '@/components/ui/TaskDetailsModal';
import TaskForm from '@/features/tasks/TaskForm';
import { useMergedTasks } from '@/hooks/useMergedTasks';
import { useTaskContext } from '@/features/tasks/TaskContext';
import { useDebounce } from '@/hooks/useDebounce';
import { paginate, getTotalPages } from '@/utils/pagination';
import type { Task, TaskFilter } from '@/types/task.types';
import type { TaskFormValues } from '@/features/tasks/taskSchema';

const PAGE_SIZE = 10;

const DashboardPage = () => {
    const { tasks, isLoading, isError, updateLocal, deleteTask } = useMergedTasks();
    const { addTask } = useTaskContext();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [filter, setFilter] = useState<TaskFilter>('All');
    const [page, setPage] = useState(1);

    const [viewingTask, setViewingTask] = useState<Task | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch = task.title
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());
            const matchesFilter =
                filter === 'All' ||
                (filter === 'Completed' && task.completed) ||
                (filter === 'Pending' && !task.completed);
            return matchesSearch && matchesFilter;
        });
    }, [tasks, debouncedSearch, filter]);

    const totalPages = getTotalPages(filteredTasks.length, PAGE_SIZE);
    const visibleTasks = paginate(filteredTasks, page, PAGE_SIZE);

    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    const handleCreate = (values: TaskFormValues) => {
        addTask(values);
        toast.success('Task created');
        setIsCreateOpen(false);
    };

    const handleEditSubmit = (values: TaskFormValues) => {
        if (!editingTask) return;
        updateLocal(editingTask.id, values);
        toast.success('Task updated');
        setEditingTask(null);
    };

    const handleConfirmDelete = () => {
        if (deletingId === null) return;
        deleteTask(deletingId);
        toast.success('Task deleted');
        setDeletingId(null);
    };

    return (
        <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total Tasks" value={tasks.length} accent="indigo" />
                <StatCard label="Completed Tasks" value={completedCount} accent="green" />
                <StatCard label="Pending Tasks" value={pendingCount} accent="amber" />
            </div>

            {/* Chart */}
            <TaskChart completed={completedCount} pending={pendingCount} />

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm sm:w-64"
                    />
                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value as TaskFilter);
                            setPage(1);
                        }}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    + New Task
                </button>
            </div>

            {/* Task table */}
            <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
                {isLoading ? (
                    <p className="p-6 text-center text-sm text-slate-500">Loading tasks...</p>
                ) : isError ? (
                    <p className="p-6 text-center text-sm text-red-500">
                        Failed to load tasks. Please try again later.
                    </p>
                ) : visibleTasks.length === 0 ? (
                    <p className="p-6 text-center text-sm text-slate-500">No tasks found.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase text-slate-500">Status</th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase text-slate-500">Priority</th>
                                <th className="px-4 py-3 text-xs font-semibold uppercase text-slate-500 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleTasks.map((task) => (
                                <TaskRow
                                    key={task.id}
                                    task={task}
                                    onView={setViewingTask}
                                    onEdit={setEditingTask}
                                    onDelete={setDeletingId}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`h-8 w-8 rounded-md text-sm ${p === page ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}

            {/* Modals */}
            <TaskDetailsModal task={viewingTask} onClose={() => setViewingTask(null)} />

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Task">
                <TaskForm onSubmit={handleCreate} submitLabel="Create Task" />
            </Modal>

            <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
                {editingTask && (
                    <TaskForm
                        defaultValues={{
                            title: editingTask.title,
                            description: editingTask.description ?? '',
                            dueDate: editingTask.dueDate ?? '',
                            priority: editingTask.priority ?? 'Medium',
                        }}
                        onSubmit={handleEditSubmit}
                        submitLabel="Save Changes"
                    />
                )}
            </Modal>

            <ConfirmDialog
                isOpen={deletingId !== null}
                onClose={() => setDeletingId(null)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this task? This action cannot be undone."
            />
        </div>
    );
};

export default DashboardPage;