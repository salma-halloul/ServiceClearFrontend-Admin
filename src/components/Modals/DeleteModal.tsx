interface DeleteModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onConfirm, onCancel, message }) => {
    if (!show) return null;

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center lg:w-full lg:h-full bg-black bg-opacity-50"
        >
            <div className="relative w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
                        onClick={onCancel}
                    >
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                            />
                        </svg>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            className="mx-auto mb-4 w-12 h-12 text-gray-400 dark:text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {message || "Are you sure you want to delete this item?"}
                        </h3>
                        <button
                            onClick={onConfirm}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            onClick={onCancel}
                            className="ms-3 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
