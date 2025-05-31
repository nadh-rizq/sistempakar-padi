import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../ComponentAdmin/Modal";
import { useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Textarea from "../ComponentAdmin/Textarea";
import FlashMixin from "@/Pages/ComponentWeb/FlashMixin";

const HistoryDiag = ({ riwayatDiagnosa, flash }) => {
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

    const handleDelete = (e) => {
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
                    router.delete(`/list-riwayat/${e}`, {
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
                    <div className="card-title mx-5">Riwayat Diagnosa User</div>
                </div>
            </div>

            <div className="w-full py-2">
                <div className="h-[calc(100vh-165px)] overflow-x-auto rounded-lg  ">
                    <table className="table bg-gray-50">
                        <thead className="border-b-2 text-sm bg-gray-50 text-primary text-center font-bold sticky top-0">
                            <tr>
                                <th rowSpan="2">#</th>
                                <th rowSpan="2">TANGGAL</th>
                                <th rowSpan="2">GEJALA</th>
                                <th colSpan="2"> HASIL DIAGNOSA</th>
                                <th className="text-center" rowSpan="2">
                                    AKSI
                                </th>
                            </tr>
                            <tr>
                                <th>OPT</th>
                                <th>(%)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {riwayatDiagnosa.length > 0 ? (
                                Object.keys(
                                    riwayatDiagnosa.reduce((acc, data) => {
                                        // Mengelompokkan data berdasarkan user.name
                                        if (!acc[data.user.email]) {
                                            acc[data.user.email] = [];
                                        }
                                        acc[data.user.email].push(data);
                                        return acc;
                                    }, {})
                                ).map((userEmail, index) => {
                                    // Menampilkan data per kelompok (user.email)
                                    const groupedData = riwayatDiagnosa.filter(
                                        (data) => data.user.email === userEmail
                                    );
                                    return (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="font-semibold"
                                                >
                                                    {groupedData[0]?.user?.name}{" "}
                                                    ({userEmail})
                                                </td>
                                            </tr>
                                            {groupedData.map((data, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        {new Date(
                                                            data.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {JSON.parse(
                                                            data.gejala
                                                        ).join(", ")}
                                                    </td>
                                                    <td>{data.opt}</td>
                                                    <td>
                                                        {(
                                                            data.score * 100
                                                        ).toFixed(2)}
                                                        %
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button
                                                                className="btn btn-xs text-primary btn-circle"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        data.id
                                                                    )
                                                                }
                                                            >
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={6}>
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

export default HistoryDiag;
