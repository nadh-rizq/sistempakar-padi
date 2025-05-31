import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

const AlertModal = () => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.message) {
            Swal.fire({
                title: flash.title || "Success",
                text: flash.message,
                icon: flash.type || "success",
                confirmButtonText: "OK",
            });
        }
    }, [flash]);

    return null;
};

export default AlertModal;
