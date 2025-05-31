import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const Header = ({ SidebarOpt, user }) => {
    return (
        <nav className="fixed top-50 z-50 w-full bg-green border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            className="inline-flex items-center p-2 text-sm text-cream rounded-lg sm:hidden hover:bg-cream hover:text-green focus:outline-none"
                            onClick={SidebarOpt}
                        >
                            <HiOutlineMenuAlt2 className="text-2xl" />
                        </button>
                        <a href="/" className="flex ms-2 md:me-24">
                            <svg
                                className="me-3"
                                width="19"
                                height="24"
                                viewBox="0 0 29 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.1367 32.5081C6.75177 32.8728 0.469526 27.1818 0.104871 19.7969L-0.000243956 17.6681C7.38464 17.3035 13.6669 22.9945 14.0315 30.3794L14.1367 32.5081Z"
                                    fill="#F8FAE5"
                                />
                                <path
                                    d="M19.2202 15.5003C11.8353 15.8649 5.55302 10.1739 5.18837 2.78903L5.08325 0.660264C12.4681 0.295609 18.7504 5.98664 19.115 13.3715L19.2202 15.5003Z"
                                    fill="#F8FAE5"
                                />
                                <path
                                    d="M15.3804 32.4468C22.7653 32.0821 28.4563 25.7999 28.0917 18.415L27.9866 16.2862C20.6017 16.6509 14.9107 22.9331 15.2753 30.318L15.3804 32.4468Z"
                                    fill="#F8FAE5"
                                />
                            </svg>
                            <span className="self-center text-cream text-xl font-semibold sm:text-2xl whitespace-nowrap">
                                {user === "R0LE01"
                                    ? "Admin Page"
                                    : "Expert Page"}
                            </span>
                        </a>
                    </div>
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
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-15 p-2 shadow text-green"
                        >
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
                </div>
            </div>
        </nav>
    );
};

export default Header;
