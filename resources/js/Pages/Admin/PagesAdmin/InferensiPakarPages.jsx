import { FaEdit, FaTrashAlt, FaMinus } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";
import Swal from "sweetalert2";

const InferensiPakarPages = ({
    dataKeputusan,
    dataOpt,
    dataGejala,
    dataKategori,
    flash,
}) => {
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

    const availableOpt = dataOpt.filter(
        (opt) => !dataKeputusan.some((keputusan) => keputusan.opt.id === opt.id)
    );

    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [addOptData, setAddOptData] = useState({
        opt: "", // atau bisa juga null
        selectedGejala: [
            {
                gejala: "",
                kategori: "",
            },
        ],
    });

    const handleAddChangeGejala = (index, field, value) => {
        const updated = [...addOptData.selectedGejala];
        updated[index][field] = value;
        setAddOptData({ ...addOptData, selectedGejala: updated });
    };

    const handleAddNewGejala = () => {
        setAddOptData((prev) => ({
            ...prev,
            selectedGejala: [
                ...prev.selectedGejala,
                { gejala: "", kategori: "" },
            ],
        }));
    };

    const handleRemoveNewGejala = (index) => {
        setAddOptData((prev) => ({
            ...prev,
            selectedGejala: prev.selectedGejala.filter((_, i) => i !== index),
        }));
    };

    const [editOptData, setEditOptData] = useState(null);

    const handleUpdateChange = (selectedOpt) => {
        const filtered = dataKeputusan.filter(
            (item) => item.opt.opt === selectedOpt
        );

        const selectedGejala = filtered.map((item) => ({
            id_inferensi: item.id,
            gejala: item.gejala.id,
            kategori: item.kategori.id,
        }));

        const optInfo = filtered[0]?.opt;

        setEditOptData({
            opt: optInfo,
            selectedGejala,
        });

        setUpdateModalOpen(true);
    };

    const handleAddIndex = () => {
        setEditOptData((prev) => ({
            ...prev,
            selectedGejala: [
                ...prev.selectedGejala,
                {
                    id_inferensi: null, // null artinya belum tersimpan
                    gejala: "",
                    kategori: "",
                },
            ],
        }));
    };

    const handleGejalaChange = (index, value) => {
        const updated = [...editOptData.selectedGejala];
        updated[index].gejala = value;
        setEditOptData({ ...editOptData, selectedGejala: updated });
    };

    const handleKategoriChange = (index, value) => {
        const updated = [...editOptData.selectedGejala];
        updated[index].kategori = value;
        setEditOptData({ ...editOptData, selectedGejala: updated });
    };

    const handleRemoveIndex = (index) => {
        const updatedGejala = [...editOptData.selectedGejala];
        updatedGejala.splice(index, 1);
        setEditOptData({ ...editOptData, selectedGejala: updatedGejala });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setProcessing(true);

        router.post("/save-keputusan", addOptData, {
            onSuccess: () => {
                setProcessing(false), setStoreModalOpen(false);
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post("/edit-keputusan", editOptData, {
            onSuccess: () => {
                setProcessing(false), setUpdateModalOpen(false);
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    const handleDelete = (id) => {
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
                    router.delete(`/list-tabKeputusan/${id}`, {
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
                    <div className="card-title mx-5">Data Inferensi Pakar</div>
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
                title="Masukkan Inferensi Baru"
                onSend={handleSubmit}
                onClose={() => {
                    setStoreModalOpen(false);
                    setAddOptData({
                        opt: "",
                        selectedGejala: [
                            {
                                gejala: "",
                                kategori: "",
                            },
                        ],
                    });
                }}
                processing={processing}
                w="max-w-5xl"
            >
                <fieldset className="flex flex-col fieldset rounded-box">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Jenis Organisme Pengganggu Tumbuhan (OPT)
                    </legend>
                </fieldset>
                <select
                    name="gejala"
                    className="select w-full bg-gray-100 text-gray-500 font-semibold"
                    value={addOptData.opt}
                    onChange={(e) =>
                        setAddOptData({ ...addOptData, opt: e.target.value })
                    }
                    disabled={availableOpt.length === 0}
                >
                    <option className="bg-gray-100 hidden">Pilih OPT</option>

                    {availableOpt.length > 0 ? (
                        availableOpt.map((opt) => (
                            <option
                                key={opt.id}
                                value={opt.id}
                                className="bg-gray-100 text-gray-500"
                            >
                                {opt.opt}
                            </option>
                        ))
                    ) : (
                        <option disabled value="">
                            ~ Seluruh OPT Telah Diklasifikasikan Pakar ~
                        </option>
                    )}
                </select>

                {availableOpt.length > 0 ? (
                    <>
                        <hr className="mt-4 mb-2" />

                        <div className="flex items-end">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm ml-auto"
                                onClick={handleAddNewGejala}
                            >
                                + Gejala
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-5/6">
                                <legend className="fieldset-legend text-xs text-primary mt-2">
                                    Gejala-gejala
                                </legend>
                            </div>
                            <div className="w-1/6">
                                <legend className="fieldset-legend text-xs text-primary mt-2">
                                    Kategori
                                </legend>
                            </div>
                            <div>
                                <legend className="fieldset-legend text-xs text-primary mt-2"></legend>
                            </div>
                        </div>

                        {addOptData.selectedGejala.map((item, index) => (
                            <div className="flex gap-4 py-1" key={index}>
                                <div className="w-5/6">
                                    <select
                                        name="gejala"
                                        className="select w-full bg-gray-100 text-gray-500 font-semibold"
                                        value={item.gejala}
                                        onChange={(e) =>
                                            handleAddChangeGejala(
                                                index,
                                                "gejala",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option className="bg-gray-100 hidden">
                                            Pilih Gejala
                                        </option>
                                        {dataGejala.map((gej) => (
                                            <option
                                                key={gej.id}
                                                value={gej.id}
                                                className="bg-gray-100 text-gray-500"
                                            >
                                                {gej.gejala}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-1/6">
                                    <select
                                        name="kategori"
                                        className="select w-full font-semibold bg-gray-100 text-gray-500"
                                        value={item.kategori}
                                        onChange={(e) =>
                                            handleAddChangeGejala(
                                                index,
                                                "kategori",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option className="bg-gray-100 hidden">
                                            Pilih Kategori
                                        </option>
                                        {dataKategori.map((kat) => (
                                            <option
                                                key={kat.id}
                                                value={kat.id}
                                                className="bg-gray-100 text-gray-500"
                                            >
                                                {kat.kategori}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="btn btn-xs text-white btn-circle btn-error"
                                        onClick={() =>
                                            handleRemoveNewGejala(index)
                                        }
                                    >
                                        <FaMinus />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    ""
                )}
            </Modal>

            {/* update */}
            <Modal
                isOpen={updateModalOpen}
                title="Edit Inferensi Pakar"
                onSend={handleUpdate}
                onClose={() => setUpdateModalOpen(false)}
                processing={processing}
                w="max-w-5xl"
            >
                <fieldset className="flex flex-col fieldset rounded-box">
                    <legend className="fieldset-legend text-xs text-primary mb-[5px]">
                        Jenis Organisme Pengganggu Tumbuhan (OPT)
                    </legend>
                    {editOptData && (
                        <>
                            <input
                                type="text"
                                className="input input-primary disabled:bg-gray-100 disabled:text-gray-500 font-extrabold text-sm w-full"
                                value={
                                    dataOpt.find(
                                        (opt) => opt.id === editOptData.opt?.id
                                    )?.opt || ""
                                }
                                disabled={true}
                            />
                            <input
                                type="hidden"
                                name="opt"
                                value={editOptData.opt?.id}
                            />

                            <hr className="mt-4 mb-2" />

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm ml-auto"
                                    onClick={handleAddIndex}
                                >
                                    + Gejala
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-5/6">
                                    <legend className="fieldset-legend text-xs text-primary mt-2">
                                        Gejala-gejala
                                    </legend>
                                </div>
                                <div className="w-1/6">
                                    <legend className="fieldset-legend text-xs text-primary mt-2">
                                        Kategori
                                    </legend>
                                </div>
                                <div>
                                    <legend className="fieldset-legend text-xs text-primary mt-2"></legend>
                                </div>
                            </div>

                            {editOptData.selectedGejala.map((item, index) => (
                                <div className="flex gap-4 py-1" key={index}>
                                    <div className="w-5/6">
                                        <select
                                            name="gejala"
                                            className="select w-full bg-gray-100 text-gray-500 font-semibold"
                                            value={item["gejala"]}
                                            onChange={(e) =>
                                                handleGejalaChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option className="bg-gray-100 hidden">
                                                Pilih Gejala
                                            </option>
                                            {dataGejala.map((gej) => (
                                                <option
                                                    key={gej.id}
                                                    value={gej.id}
                                                    className="bg-gray-100 text-gray-500"
                                                >
                                                    {gej.gejala}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-1/6">
                                        <select
                                            name="kategori"
                                            className="select w-full font-semibold bg-gray-100 text-gray-500"
                                            value={item["kategori"]}
                                            onChange={(e) =>
                                                handleKategoriChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option className="bg-gray-100 hidden">
                                                Pilih Kategori
                                            </option>
                                            {dataKategori.map((kat) => (
                                                <option
                                                    key={kat.id}
                                                    value={kat.id}
                                                    className="bg-gray-100 text-gray-500"
                                                >
                                                    {kat.kategori}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            className="btn btn-xs text-white btn-circle btn-error"
                                            onClick={() => {
                                                handleRemoveIndex(index);
                                            }}
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </fieldset>
            </Modal>

            <div className="w-full py-2">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg">
                    <table className="table table-pin-rows bg-gray-50">
                        <thead className="border-b-2 text-sm text-primary font-bold">
                            <tr>
                                <th>#</th>
                                <th colSpan={2}>OPT</th>
                                <th colSpan={2}>GEJALA</th>
                                <th>KATEGORI</th>
                                <th className="text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {(() => {
                                if (!dataKeputusan) return null;

                                // 1. Urutkan data berdasarkan OPT
                                const sortedData = [...dataKeputusan].sort(
                                    (a, b) => a.opt.id - b.opt.id
                                );

                                if (sortedData.length === 0) {
                                    return (
                                        <tr className="text-center">
                                            <td colSpan={7}>
                                                <i>~ belum ada data ~</i>
                                            </td>
                                        </tr>
                                    );
                                }

                                // 2. Hitung jumlah kemunculan setiap OPT
                                const optCounts = {};
                                sortedData.forEach((data) => {
                                    optCounts[data.opt.opt] =
                                        (optCounts[data.opt.opt] || 0) + 1;
                                });

                                // 3. Render dengan merge OPT & nomor yang sesuai
                                let lastOpt = null;
                                let rowNumber = 1;
                                return sortedData.map((data, i) => {
                                    const showOpt = lastOpt !== data.opt.opt;
                                    if (showOpt) lastOpt = data.opt.opt;

                                    return (
                                        <tr key={i}>
                                            {/* Merge nomor */}
                                            {showOpt ? (
                                                <td
                                                    rowSpan={
                                                        optCounts[data.opt.opt]
                                                    }
                                                    className={
                                                        i !== 0
                                                            ? "border-t-2 border-gray-300"
                                                            : ""
                                                    }
                                                >
                                                    {rowNumber++}
                                                </td>
                                            ) : null}

                                            {/* Merge kode OPT */}
                                            {showOpt ? (
                                                <td
                                                    rowSpan={
                                                        optCounts[data.opt.opt]
                                                    }
                                                    className={
                                                        i !== 0
                                                            ? "border-t-2 border-gray-300"
                                                            : ""
                                                    }
                                                >
                                                    {data.opt.kodeOpt}
                                                </td>
                                            ) : null}

                                            {/* Merge OPT */}
                                            {showOpt ? (
                                                <td
                                                    rowSpan={
                                                        optCounts[data.opt.opt]
                                                    }
                                                    className={
                                                        i !== 0
                                                            ? "border-t-2 border-gray-300"
                                                            : ""
                                                    }
                                                >
                                                    {data.opt.opt}
                                                </td>
                                            ) : null}

                                            <td
                                                className={
                                                    showOpt && i !== 0
                                                        ? "border-t-2 border-gray-300"
                                                        : ""
                                                }
                                            >
                                                {data.gejala.kodeGejala}
                                            </td>
                                            <td
                                                className={
                                                    showOpt && i !== 0
                                                        ? "border-t-2 border-gray-300"
                                                        : ""
                                                }
                                            >
                                                {data.gejala.gejala}
                                            </td>
                                            <td
                                                className={
                                                    showOpt && i !== 0
                                                        ? "border-t-2 border-gray-300"
                                                        : ""
                                                }
                                            >
                                                {data.kategori.bobot}
                                            </td>

                                            {showOpt ? (
                                                <td
                                                    rowSpan={
                                                        optCounts[data.opt.opt]
                                                    }
                                                    className={
                                                        i !== 0
                                                            ? "border-t-2 border-gray-300"
                                                            : ""
                                                    }
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            className="btn btn-xs text-primary btn-circle"
                                                            onClick={() =>
                                                                handleUpdateChange(
                                                                    data.opt.opt
                                                                )
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            className="btn btn-xs text-primary btn-circle"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    data.opt.id
                                                                )
                                                            }
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                </td>
                                            ) : null}
                                        </tr>
                                    );
                                });
                            })()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default InferensiPakarPages;
