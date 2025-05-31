import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";
import Textarea from "../ComponentAdmin/Textarea";
import { motion, AnimatePresence } from "framer-motion";

const OptPages = ({ optPadi, flash }) => {
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
    const [previewImage, setPreviewImage] = useState(null);

    const addForm = useForm({
        opt: "",
        nama_latin: "",
        deskripsi: "",
        gambar: null,
    });

    const updateForm = useForm({
        kodeOpt: "",
        opt: "",
        nama_latin: "",
        deskripsi: "",
        gambar: null,
    });

    const [errors, setErrors] = useState({});

    const validateAddForm = (data) => {
        const newErrors = {};

        if (!data.opt || data.opt.trim() === "") {
            newErrors.opt = "*jenis OPT wajib diisi!";
        } else if (data.opt.length > 255) {
            newErrors.opt = "*maksimal 255 karakter!";
        } else {
            const isDuplicate = optPadi.some(
                (opt) => opt.opt.toLowerCase() === data.opt.toLowerCase()
            );
            if (isDuplicate) {
                newErrors.opt = "*jenis OPT sudah ada!";
            }
        }

        if (!data.nama_latin || data.nama_latin.trim() === "") {
            newErrors.nama_latin = "*nama latin wajib diisi!";
        } else if (data.nama_latin.length > 255) {
            newErrors.nama_latin = "*maksimal 255 karakter!";
        }

        if (data.deskripsi && data.deskripsi.length > 255) {
            newErrors.deskripsi = "*maksimal 255 karakter!";
        }

        if (data.gambar) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(data.gambar.type)) {
                newErrors.gambar = "*format gambar harus JPG, JPEG, atau PNG!";
            } else if (data.gambar.size > 2 * 1024 * 1024) {
                newErrors.gambar = "*ukuran maksimal 2MB!";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateUpdateForm = (data) => {
        const newErrors = {};

        if (!data.opt || data.opt.trim() === "") {
            newErrors.opt = "*jenis OPT wajib diisi!";
        } else if (data.opt.length > 255) {
            newErrors.opt = "*maksimal 255 karakter!";
        } else {
            const isDuplicate = optPadi.some(
                (opt) =>
                    opt.opt.toLowerCase() === data.opt.toLowerCase() &&
                    opt.kodeOpt !== data.kodeOpt // hanya anggap duplikat kalau beda id
            );
            if (isDuplicate) {
                newErrors.opt = "*jenis OPT sudah ada!";
            }
        }

        if (!data.nama_latin || data.nama_latin.trim() === "") {
            newErrors.nama_latin = "*nama latin wajib diisi!";
        } else if (data.nama_latin.length > 255) {
            newErrors.nama_latin = "*maksimal 255 karakter!";
        }

        if (data.deskripsi && data.deskripsi.length > 255) {
            newErrors.deskripsi = "*maksimal 255 karakter!";
        }

        if (data.gambar) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(data.gambar.type)) {
                newErrors.gambar = "*format gambar harus JPG, JPEG, atau PNG!";
            } else if (data.gambar.size > 2 * 1024 * 1024) {
                newErrors.gambar = "*ukuran maksimal 2MB!";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        addForm.setData(e.target.name, e.target.value);
    };

    const handleUpdateChange = (opt) => {
        updateForm.setData({
            kodeOpt: opt.kodeOpt,
            opt: opt.opt,
            nama_latin: opt.nama_latin,
            deskripsi: opt.deskripsi,
            gambar: null,
        });
        setErrors({});
        setUpdateModalOpen(true);
    };
    // post
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateAddForm(addForm.data)) return;

        addForm.post("/list-opt", {
            forceFormData: true,
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

        if (!validateUpdateForm(updateForm.data)) return;

        updateForm.post(`/list-opt/${updateForm.data.kodeOpt}`, {
            _method: "PUT",
            forceFormData: true,
            onSuccess: () => {
                setUpdateModalOpen(false); // Tutup modal setelah klik OK
                updateForm.reset(); // Reset form
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

    const handleDelete = (kodeOpt) => {
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
                    router.delete(`/list-opt/${kodeOpt}`, {
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
            <div className="py-2 w-full">
                <div className=" min-h-[50px] bg-gray-50 rounded-md text-green flex justify-between items-center mr-2">
                    <div className="card-title mx-5">
                        Data Organisme Pengganggu Tumbuhan (OPT)
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
                title="Masukkan Jenis OPT Baru!"
                onSend={handleSubmit}
                onClose={() => setStoreModalOpen(false)}
                processing={addForm.processing}
            >
                <div className="fieldset">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Jenis OPT
                    </legend>
                    <input
                        type="text"
                        name="opt"
                        value={addForm.data.opt}
                        onChange={handleChange}
                        className="input input-primary border-none bg-gray-100 w-full"
                        placeholder="Jenis Organisme Pengganggu Tumbuhan..."
                        required
                    />
                    {errors.opt && (
                        <p className="text-error text-xs mt-1">{errors.opt}</p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Nama Latin
                    </legend>
                    <input
                        type="text"
                        name="nama_latin"
                        value={addForm.data.nama_latin}
                        onChange={handleChange}
                        className="input input-primary border-none bg-gray-100 w-full"
                        placeholder="Nama Latin Organisme Pengganggu Tumbuhan..."
                        required
                    />
                    {errors.nama_latin && (
                        <p className="text-error text-xs mt-1">
                            {errors.nama_latin}
                        </p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Deskripsi
                    </legend>
                    <Textarea
                        name="deskripsi"
                        value={addForm.data.deskripsi}
                        onChange={handleChange}
                        placeholder="Informasi Singkat Organisme Pengganggu Tumbuhan..."
                    />
                    {errors.deskripsi && (
                        <p className="text-error text-xs mt-1">
                            {errors.deskripsi}
                        </p>
                    )}
                </div>
                <div className="fieldset mt-2">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Gambar Pendukung (<i>ukuran file maksimal 2MB</i>)
                    </legend>
                    <input
                        type="file"
                        name="gambar"
                        onChange={(e) => {
                            addForm.setData("gambar", e.target.files[0]);
                        }}
                        className="file-input file-input-sm w-full border-none bg-gray-100 text-gray-300 font-semibold"
                    />
                    {errors.gambar && (
                        <p className="text-error text-xs mt-1">
                            {errors.gambar}
                        </p>
                    )}
                </div>
            </Modal>

            {updateModalOpen && (
                <Modal
                    isOpen={updateModalOpen}
                    title="Ubah data OPT!"
                    onSend={handleUpdate}
                    onClose={() => setUpdateModalOpen(false)}
                    processing={updateForm.processing}
                >
                    <div className="fieldset">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Jenis OPT
                        </legend>
                        <input
                            type="text"
                            name="opt"
                            value={updateForm.data.opt}
                            onChange={(e) =>
                                updateForm.setData("opt", e.target.value)
                            }
                            className="input input-primary border-none bg-gray-100 w-full"
                            required
                        />
                        {errors.opt && (
                            <p className="text-error text-xs mt-1">
                                {errors.opt}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Nama Latin
                        </legend>
                        <input
                            type="text"
                            name="nama_latin"
                            value={updateForm.data.nama_latin}
                            onChange={(e) =>
                                updateForm.setData("nama_latin", e.target.value)
                            }
                            className="input input-primary border-none bg-gray-100 w-full"
                            required
                        />
                        {errors.nama_latin && (
                            <p className="text-error text-xs mt-1">
                                {errors.nama_latin}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Deskripsi
                        </legend>
                        <Textarea
                            name="deskripsi"
                            value={updateForm.data.deskripsi}
                            onChange={(e) =>
                                updateForm.setData("deskripsi", e.target.value)
                            }
                            placeholder="Informasi Singkat Organisme Pengganggu Tumbuhan..."
                        />
                        {errors.deskripsi && (
                            <p className="text-error text-xs mt-1">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>
                    <div className="fieldset mt-2">
                        <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                            Gambar Pendukung (<i>ukuran file maksimal 2MB</i>)
                        </legend>
                        <input
                            type="file"
                            name="gambar"
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    updateForm.setData(
                                        "gambar",
                                        e.target.files[0]
                                    );
                                } else {
                                    updateForm.setData("gambar", null);
                                }
                            }}
                            className="file-input file-input-sm w-full border-none bg-gray-100 text-gray-300 font-semibold"
                        />
                        {errors.gambar && (
                            <p className="text-error text-xs mt-1">
                                {errors.gambar}
                            </p>
                        )}
                    </div>
                </Modal>
            )}

            <div className="w-full py-2">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg  ">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th>KODE OPT</th>
                                <th>JENIS OPT</th>
                                <th>NAMA LATIN</th>
                                <th>DESKRIPSI</th>
                                <th>GAMBAR</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {optPadi ? (
                                optPadi.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{data.kodeOpt}</td>
                                            <td>{data.opt}</td>
                                            <td>
                                                <i>{data.nama_latin}</i>
                                            </td>
                                            <td>{data.deskripsi}</td>
                                            <td className="text-center align-middle">
                                                <div className="flex items-center justify-center h-full">
                                                    {data.gambar ? (
                                                        <img
                                                            src={`/show/${data.gambar}`}
                                                            className="h-10 w-10 object-cover rounded"
                                                            onClick={() =>
                                                                setPreviewImage(
                                                                    `/show/${data.gambar}`
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <i className="text-xs">
                                                            belum ada gambar
                                                        </i>
                                                    )}
                                                </div>
                                            </td>
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
                                                                data.kodeOpt
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
                                    <td colSpan={5}>
                                        <i>~ belum ada data ~</i>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <AnimatePresence>
                        {previewImage && (
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                onClick={() => setPreviewImage(null)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => e.stopPropagation()} // agar klik di gambar tidak menutup modal
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default OptPages;
