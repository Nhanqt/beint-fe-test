import { toast } from 'react-toastify';

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
