import Swal from "sweetalert2";

const FlashMixin = Swal.mixin({
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    position: "top-end",
    toast: true,
    width: 500,
});

export default FlashMixin;
