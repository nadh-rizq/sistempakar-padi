import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";
import Textarea from "../ComponentAdmin/Textarea";

const GejalaPages = ({ dataGejala, flash }) => {
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

    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const addForm = useForm({
        gejala: "",
    });

    const updateForm = useForm({
        kodeGejala: "",
        gejala: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        addForm.setData(e.target.name, e.target.value);
    };

    const handleUpdateChange = (gejala) => {
        updateForm.setData({
            kodeGejala: gejala.kodeGejala,
            gejala: gejala.gejala,
        });
        setUpdateModalOpen(true);
    };

    const checkDuplicate = () => {
        const isDuplicate = dataGejala.some(
            (gejala) =>
                gejala.gejala.toLowerCase() ===
                addForm.data.gejala.toLowerCase()
        );
        if (isDuplicate) {
            setErrors({ ...errors, gejala: "*gejala sudah ada!" });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checkDuplicate()) return;
        addForm.post("/list-gejala", {
            onSuccess: () => {
                setStoreModalOpen(false); // Tutup modal setelah klik OK
                addForm.reset();
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

    const handleUpdate = (e) => {
        e.preventDefault();

        updateForm.put(`/list-gejala/${updateForm.data.kodeGejala}`, {
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

    const handleDelete = (kodeGejala) => {
        Swal.fire({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F47C7C",
            cancelButtonColor: "#43766C",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
            showLoaderOnConfirm: true, // Tampilkan loading di tombol konfirmasi
            preConfirm: () => {
                return new Promise((resolve, reject) => {
                    router.delete(`/list-gejala/${kodeGejala}`, {
                        onSuccess: () => {
                            resolve();
                        },
                        onError: () => {
                            reject();
                            Swal.fire(
                                "Gagal!",
                                "Terjadi kesalahan saat menghapus data.",
                                "error"
                            );
                        },
                    });
                });
            },
            allowOutsideClick: () => !Swal.isLoading(), // Tidak bisa klik di luar saat loading
        });
    };

    return (
        <>
            <div className="w-full py-2">
                <div className="min-h-[50px] bg-gray-50 rounded-md text-green flex justify-between items-center mr-2">
                    <div className="card-title mx-5">
                        Data Gejala Organisme Pengganggu Tumbuhan (OPT)
                    </div>
                    <button
                        className="mx-5 btn btn-primary btn-sm"
                        onClick={() => setStoreModalOpen(true)}
                    >
                        + Tambah Data
                    </button>
                </div>
            </div>
            {/* post */}
            <Modal
                isOpen={storeModalOpen}
                title="Masukkan Gejala Baru!"
                onSend={handleSubmit}
                onClose={() => setStoreModalOpen(false)}
                processing={addForm.processing}
                w="max-w-5xl"
            >
                <div className="fieldset">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Gejala
                    </legend>
                    <Textarea
                        name="gejala"
                        value={addForm.data.gejala}
                        onChange={handleChange}
                        placeholder="Gejala Organisme Pengganggu Tumbuhan..."
                    />
                    {errors.gejala && (
                        <p className="text-error text-xs mt-1">
                            {errors.gejala}
                        </p>
                    )}
                </div>
            </Modal>

            {updateModalOpen && (
                <Modal
                    isOpen={updateModalOpen}
                    title="Ubah data Gejala!"
                    onSend={handleUpdate}
                    onClose={() => setUpdateModalOpen(false)}
                    processing={updateForm.processing}
                    w="max-w-5xl"
                >
                    <div className="fieldset">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Gejala
                        </legend>
                        <Textarea
                            name="gejala"
                            value={updateForm.data.gejala}
                            onChange={(e) =>
                                updateForm.setData("gejala", e.target.value)
                            }
                            placeholder="Gejala Organisme Pengganggu Tumbuhan..."
                        />
                        {errors.gejala && (
                            <p className="text-error text-xs mt-1">
                                {errors.gejala}
                            </p>
                        )}
                    </div>
                </Modal>
            )}

            <div className="w-full">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th>KODE GEJALA</th>
                                <th>GEJALA OPT PADI</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {dataGejala ? (
                                dataGejala.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.kodeGejala}</td>
                                            <td>{data.gejala}</td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        className="btn btn-xs text-primary btn-circle"
                                                        onClick={() =>
                                                            handleUpdateChange(
                                                                data
                                                            )
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-xs text-primary btn-circle"
                                                        onClick={() =>
                                                            handleDelete(
                                                                data.kodeGejala
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
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

export default GejalaPages;
