import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onDiagnose, auth }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Kalau scroll Y > 10 px, anggap sudah discroll
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`navbar fixed top-0 left-0 z-20 bg-green text-white ${
                scrolled ? "shadow-2xl " : ""
            }`}
        >
            <div className="navbar-start">
                <div className="dropdown relative">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-cream text-green rounded-box z-[1] mt-3 w-52 p-2"
                    >
                        <li>
                            <a
                                onClick={() =>
                                    document
                                        .getElementById("userviewopt")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                Gejala & OPT
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() =>
                                    document
                                        .getElementById("userviewpencegahan")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                Pencegahan
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() =>
                                    document
                                        .getElementById("userviewpenanganan")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                Penanganan
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="px-4">
                    <svg
                        width="29"
                        height="34"
                        viewBox="0 0 29 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.1367 32.5081C6.75177 32.8728 0.469526 27.1818 0.104871 19.7969L-0.000243956 17.6681C7.38464 17.3035 13.6669 22.9945 14.0315 30.3794L14.1367 32.5081Z"
                            fill="#F2F4E7"
                        />
                        <path
                            d="M19.2202 15.5003C11.8353 15.8649 5.55302 10.1739 5.18837 2.78903L5.08325 0.660264C12.4681 0.295609 18.7504 5.98664 19.115 13.3715L19.2202 15.5003Z"
                            fill="#F2F4E7"
                        />
                        <path
                            d="M15.3804 32.4468C22.7653 32.0821 28.4563 25.7999 28.0917 18.415L27.9866 16.2862C20.6017 16.6509 14.9107 22.9331 15.2753 30.318L15.3804 32.4468Z"
                            fill="#F2F4E7"
                        />
                    </svg>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-6 px-1">
                    <li>
                        <a
                            onClick={() =>
                                document
                                    .getElementById("userviewopt")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Gejala & OPT
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() =>
                                document
                                    .getElementById("userviewpencegahan")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Pencegahan
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() =>
                                document
                                    .getElementById("userviewpenanganan")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Penanganan
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {auth?.kodeRole !== "R0LE01" && auth?.kodeRole !== "R0LE02" && (
                    <button
                        onClick={onDiagnose}
                        className="btn btn-ghost group"
                    >
                        <span className="text-transparent translate-x-10 group-hover:text-white group-hover:translate-x-0 transition-all duration-700">
                            Diagnosa
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-5 group-hover:animate-bounce"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </button>
                )}
                {auth?.kodeRole && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="m-1 rounded-full p-2 text-lg text-cream"
                        >
                            <FaUserCircle />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-secondary rounded-box z-[1] w-48 p-2 shadow-lg text-primary"
                        >
                            <li>
                                <Link
                                    href={
                                        auth.kodeRole === "R0LE01" ||
                                        auth.kodeRole === "R0LE02"
                                            ? "/list-riwayat"
                                            : auth.kodeRole === "R0LE03"
                                            ? route("UserDiagnosa")
                                            : "/"
                                    }
                                    method="get"
                                    as="button"
                                >
                                    {auth.kodeRole === "R0LE01" ||
                                    auth.kodeRole === "R0LE02"
                                        ? "Dashboard"
                                        : auth.kodeRole === "R0LE03"
                                        ? "Riwayat Diagnosa"
                                        : ""}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
