import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Textarea from "../ComponentAdmin/Textarea";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";

const PenanggulanganPages = ({ optPadi, penanggulangan, flash }) => {
    useEffect(() => {
        if (flash?.success) {
            FlashMixin.fire({
                icon: "success",
                title: flash.success,
            });
        }

        if (flash?.error) {
            FlashMixin.fire({
                icon: "error",
                title: flash.error,
            });
        }
    }, [flash]);

    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const updateForm = useForm({
        id: 0,
        opt: 0,
        pencegahan: "",
        penanganan: "",
    });

    const [errors, setErrors] = useState({});

    const handleUpdateChange = (penanggulangan) => {
        updateForm.setData({
            id: penanggulangan.id,
            opt: penanggulangan.opt.id,
            pencegahan: penanggulangan.pencegahan,
            penanganan: penanggulangan.penanganan,
        });
        setUpdateModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        updateForm.put(`/list-penanggulangan/${updateForm.data.id}`, {
            onSuccess: () => {
                setUpdateModalOpen(false); // Tutup modal setelah klik OK
                updateForm.reset();
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Terjadi kesalahan, coba lagi.",
                    confirmButtonColor: "#F47C7C",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <>
            <div className="w-full py-2">
                <div className="card h-[50px] bg-gray-50 rounded-md text-green flex justify-center">
                    <div className="card-title mx-5">
                        Data Penanggulangan Organisme Pengganggu Tumbuhan (OPT)
                    </div>
                </div>
            </div>

            {updateModalOpen && (
                <Modal
                    isOpen={updateModalOpen}
                    title="Ubah Data Penanggulangan"
                    onSend={handleUpdate}
                    onClose={() => setUpdateModalOpen(false)}
                    processing={updateForm.processing}
                    w="max-w-5xl"
                >
                    <div className="fieldset">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Jenis OPT
                        </legend>
                        <input
                            type="text"
                            className="input input-primary disabled:bg-gray-100 disabled:text-primary font-bold w-full"
                            value={
                                optPadi.find(
                                    (opt) => opt.id === updateForm.data.opt
                                )?.opt || ""
                            }
                            disabled={true}
                        />
                        <input
                            type="hidden"
                            name="opt"
                            value={updateForm.data.opt}
                        />
                        {errors.opt && (
                            <p className="text-error text-xs mt-1">
                                {errors.opt}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Pencegahan
                        </legend>
                        <Textarea
                            name="pencegahan"
                            value={updateForm.data.pencegahan}
                            onChange={(e) =>
                                updateForm.setData("pencegahan", e.target.value)
                            }
                        />
                        {errors.pencegahan && (
                            <p className="text-error text-xs mt-1">
                                {errors.pencegahan}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Penanganan
                        </legend>
                        <Textarea
                            name="penanganan"
                            value={updateForm.data.penanganan}
                            onChange={(e) =>
                                updateForm.setData("penanganan", e.target.value)
                            }
                        />
                        {errors.penanganan && (
                            <p className="text-error text-xs mt-1">
                                {errors.penanganan}
                            </p>
                        )}
                    </div>
                </Modal>
            )}

            <div className="w-full">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg  ">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th>JENIS OPT</th>
                                <th>PENCEGAHAN</th>
                                <th>PENANGANAN</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {penanggulangan ? (
                                penanggulangan.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.opt.opt}</td>
                                            <td>{data.pencegahan}</td>
                                            <td>{data.penanganan}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-xs text-primary btn-circle"
                                                    onClick={() =>
                                                        handleUpdateChange(data)
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={5}>
                                        <i>~ belum ada data ~</i>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PenanggulanganPages;
