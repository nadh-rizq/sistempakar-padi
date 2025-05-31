import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import NavbarUser from "../ComponentWeb/NavbarUser";
import { AnimatePresence } from "framer-motion";
import Search from "./Search";
import FlashMixin from "../ComponentWeb/FlashMixin";

export default function RiwayatDiagnose({
    dataRiwayat,
    dataGejala,
    search,
    dataOpt,
    dataInferensi,
    flash,
}) {
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

    const [searchBar, setSearchBar] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Sistem Pakar" />
            <NavbarUser onDiagnose={() => setSearchBar(true)} />

            <div
                id="userviewpenanganan"
                className="w-full h-screen px-5 lg:px-[72px] bg-cream"
            >
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="font-black text-2xl text-accent">
                        Riwayat Diagnosa Padi
                    </h1>
                    {dataRiwayat?.length === 0 ? (
                        <p className="pt-2 text-accent">
                            belum ada data, diagnosa sekarang!
                        </p>
                    ) : (
                        <div className="h-[calc(75vh-4rem)] overflow-x-auto rounded-box border bg-secondary text-accent w-full shadow-lg mt-2">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-accent sticky top-0">
                                    <tr className="text-secondary border-b border-secondary">
                                        <th rowSpan="2">#</th>
                                        <th rowSpan="2">Tanggal</th>
                                        <th rowSpan="2">Gejala-gejala</th>
                                        <th colSpan="2" className="text-center">
                                            Hasil Diagnosa
                                        </th>
                                    </tr>
                                    <tr className="text-secondary text-center">
                                        <th>OPT</th>
                                        <th>(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {dataRiwayat.map((data, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-b border-accent/20"
                                        >
                                            <th>{i + 1}</th>
                                            <td>
                                                {new Date(
                                                    data.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td>
                                                {JSON.parse(data.gejala).join(
                                                    ", "
                                                )}
                                            </td>
                                            <td className="font-bold">
                                                {data.opt}
                                            </td>
                                            <td className="font-bold">
                                                {(data.score * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <AnimatePresence mode="wait">
                {searchBar && (
                    <Search
                        dataGejala={dataGejala}
                        search={search}
                        onClose={() => setSearchBar(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
