import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";

const KategoriPages = ({ dataKategori, flash }) => {
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
        id: "",
        bobot: 0,
    });

    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const newErrors = {};

        if (data.bobot === "") {
            newErrors.bobot = "*bobot harus diisi!";
        } else if (data.bobot === 0) {
            newErrors.bobot = "*bobot tidak boleh 0!";
        } else if (data.bobot < 0 || data.bobot > 0.999999) {
            newErrors.bobot = "*bobot harus antara 0.000001 dan 0.999999!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateChange = (kategori) => {
        updateForm.setData({
            id: kategori.id,
            kategori: kategori.kategori,
            bobot: kategori.bobot,
        });
        setUpdateModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!validateForm(updateForm.data)) return;

        updateForm.put(`/list-kategori/${updateForm.data.id}`, {
            onSuccess: () => {
                setUpdateModalOpen(false);
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
                    <div className="card-title mx-5">Data Kategori Gejala</div>
                </div>
            </div>
            {updateModalOpen && (
                <Modal
                    isOpen={updateModalOpen}
                    title={`Ubah Bobot Kategori (${updateForm.data.kategori}) !`}
                    onSend={handleUpdate}
                    onClose={() => setUpdateModalOpen(false)}
                    processing={updateForm.processing}
                >
                    <input
                        type="number"
                        step="0.000001"
                        min="0"
                        max="0.999999"
                        name="bobot"
                        value={updateForm.data.bobot}
                        onChange={(e) =>
                            updateForm.setData(
                                "bobot",
                                parseFloat(e.target.value)
                            )
                        }
                        className="input bg-gray-100 w-full"
                        required
                    />
                    {errors.bobot && (
                        <p className="text-error text-xs mt-1">
                            {errors.bobot}
                        </p>
                    )}
                </Modal>
            )}
            <div className="w-full ">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg  ">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th>KATEGORI</th>
                                <th>BOBOT</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {dataKategori ? (
                                dataKategori.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.kategori}</td>
                                            <td>
                                                {parseFloat(data.bobot).toFixed(
                                                    6
                                                )}
                                            </td>
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
                                    <td colSpan={4}>
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

export default KategoriPages;
