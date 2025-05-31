import { createPortal } from "react-dom";

const Modal = ({
    isOpen,
    title,
    children,
    onClose,
    onSend,
    processing,
    w = "w-max-32rem",
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            role="dialog"
            aria-modal="true"
        >
            <div className={`modal-box ${w}`}>
                <form
                    onSubmit={onSend}
                    className="form"
                    encType="multipart/form-data"
                >
                    <h3 className="text-xl font-black text-green text-center">
                        {title.toUpperCase()}
                    </h3>
                    <div className="py-4">{children}</div>
                    <div className="modal-action mt-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-error text-white"
                        >
                            batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner"></span>
                                    <i>simpan</i>
                                </span>
                            ) : (
                                "simpan"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
