import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Header from "./ComponentAdmin/header";
import Sidebar from "./ComponentAdmin/Sidebar";
import LoadingScreen from "../ComponentWeb/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const DashboardAdmin = ({ children }) => {
    const [isSwipe, setIsSwipe] = useState(false);
    const [loading, setLoading] = useState(true);

    const { auth } = usePage().props;
    const userRole = auth?.user?.kodeRole;

    useEffect(() => {
        // Simulasikan loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    const SidebarOpt = () => {
        setIsSwipe(!isSwipe);
    };
    return (
        <div className="flex h-screen">
            <AnimatePresence>
                {loading && <LoadingScreen text={"Tunggu Sebentar..."} />}
            </AnimatePresence>
            {!loading && (
                <>
                    <Head title="Sistem Pakar" />
                    <Header SidebarOpt={SidebarOpt} user={userRole} />
                    <Sidebar isSwipe={isSwipe} user={userRole} />
                    <div className="flex flex-1 sm:ml-64 mt-[58px]">
                        <main className="flex-1 flex-col flex p-5 bg-gray-100">
                            {children}
                        </main>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardAdmin;
