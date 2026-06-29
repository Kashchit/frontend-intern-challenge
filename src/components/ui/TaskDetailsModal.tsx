import Modal from './Modal';
import type { Task } from '@/types/task.types';

interface TaskDetailsModalProps {
    task: Task | null;
    onClose: () => void;
}

const TaskDetailsModal = ({ task, onClose }: TaskDetailsModalProps) => {
    if (!task) return null;

    return (
        <Modal isOpen={!!task} onClose={onClose} title="Task Details">
            <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <dt className="font-medium text-slate-500">Task ID</dt>
                    <dd className="text-slate-800">{task.id}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="font-medium text-slate-500">Title</dt>
                    <dd className="text-slate-800">{task.title}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="font-medium text-slate-500">Status</dt>
                    <dd className="text-slate-800">{task.completed ? 'Completed' : 'Pending'}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="font-medium text-slate-500">User ID</dt>
                    <dd className="text-slate-800">{task.userId}</dd>
                </div>
            </dl>
        </Modal>
    );
};

export default TaskDetailsModal;