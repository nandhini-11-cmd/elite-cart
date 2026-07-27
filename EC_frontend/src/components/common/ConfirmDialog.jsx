import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
    >
      <p className="text-slate-600 leading-7">
        {message}
      </p>

      <div className="mt-8 flex justify-end gap-4">

        <Button
          variant="secondary"
          onClick={onCancel}
        >
          {cancelText}
        </Button>

        <Button
          variant="danger"
          loading={loading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>

      </div>
    </Modal>
  );
};

export default ConfirmDialog;