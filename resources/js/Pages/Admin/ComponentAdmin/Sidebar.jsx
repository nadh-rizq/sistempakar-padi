import {
    FaChartBar,
    FaVirus,
    FaSearchPlus,
    FaLeaf,
    FaThLarge,
    FaFingerprint,
    FaUser,
} from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = ({ isSwipe, user }) => {
    const { url } = usePage();

    return (
        <aside
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-gray-50 border-r border-gray-200 sm:translate-x-0 transition-transform ${
                isSwipe ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="h-full px-3 pb-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {(user === "R0LE01" || user === "R0LE02") && (
                        <li>
                            <Link
                                href="/list-riwayat"
                                className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out ${
                                    url.startsWith("/list-riwayat")
                                        ? "bg-green text-cream"
                                        : " text-green hover:bg-green hover:text-cream"
                                }`}
                            >
                                <FaChartBar className="mr-3" />
                                <span className="flex-1 me-3">Dashboard</span>
                            </Link>
                        </li>
                    )}
                    {user === "R0LE01" && (
                        <>
                            <li>
                                <Link
                                    href="/list-user"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-user")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaUser className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Akun Pengguna
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/list-kategori"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-kategori")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaThLarge className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Kategori Gejala
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/list-tabKeputusan"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-tabKeputusan")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaFingerprint className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Inferensi Pakar
                                    </span>
                                </Link>
                            </li>
                        </>
                    )}
                    {(user === "R0LE01" || user === "R0LE02") && (
                        <>
                            <li>
                                <Link
                                    href="/list-opt"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-opt")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaVirus className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Organisme Pengganggu Tumbuhan (OPT)
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/list-gejala"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-gejala")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaSearchPlus className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Gejala-gejala
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/list-penanggulangan"
                                    className={`flex items-center p-2 rounded-lg transition-colors duration-400 ease-in-out  ${
                                        url.startsWith("/list-penanggulangan")
                                            ? "bg-green text-cream"
                                            : " text-green hover:bg-green hover:text-cream"
                                    }`}
                                >
                                    <FaLeaf className="mr-3" />
                                    <span className="flex-1 me-3">
                                        Penanggulangan
                                    </span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
