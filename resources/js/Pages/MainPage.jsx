import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Navbar from "./ComponentWeb/Navbar";
import Home from "./User/Home";
import Search from "./User/Search";
import ListOpt from "./User/ListOpt";
import ListPenanganan from "./User/ListPenanganan";
import ListPencegahan from "./User/ListPencegahan";
import { AnimatePresence } from "framer-motion";
import FlashMixin from "./ComponentWeb/FlashMixin";

export default function MainPage({
    dataGejala,
    search,
    dataOpt,
    dataInferensi,
    dataPenanggulangan,
    auth,
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

    useEffect(() => {
        const storedHistori = sessionStorage.getItem("guestHistori");

        if (storedHistori) {
            try {
                const histori = JSON.parse(storedHistori);
                router.post("/simpan-diagnosa", histori); // Kirim ke backend
                sessionStorage.removeItem("guestHistori"); // Bersihkan setelah dikirim
            } catch (e) {
                console.error("Gagal kirim hasil diagnosa:", e);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Sistem Pakar" />
            <Navbar onDiagnose={() => setSearchBar(true)} auth={auth} />
            <Home onDiagnose={() => setSearchBar(true)} auth={auth} />

            <ListOpt dataOpt={dataOpt} dataInferensi={dataInferensi} />
            <ListPencegahan data={dataPenanggulangan} />
            <ListPenanganan data={dataPenanggulangan} />

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
