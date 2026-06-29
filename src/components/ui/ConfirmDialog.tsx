import Modal from './Modal';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }: ConfirmDialogProps) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
        <p className="mb-6 text-sm text-slate-600">{message}</p>
        <div className="flex justify-end gap-3">
            <button
                onClick={onClose}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
                Cancel
            </button>
            <button
                onClick={onConfirm}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    </Modal>
);

export default ConfirmDialog;