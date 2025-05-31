import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./ComponentWeb/LoadingScreen";
import ResultDiagnose from "./User/ResultDiagnose";
import { FaArrowRight } from "react-icons/fa";
import ModalAuth from "./ComponentWeb/ModalAuth";
import { useForm, router } from "@inertiajs/react";

export default function DiagnoseRes({
    hasil,
    optPadi,
    penanggulangan,
    userSelectedGejala,
    user,
}) {
    const [loading, setLoading] = useState(true);

    const loginForm = useForm({
        email: "",
        password: "",
    });

    const registForm = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [localErrors, setLocalErrors] = useState({});

    const validateLogin = () => {
        const newErrors = {};

        if (!loginForm.data.email.trim()) {
            newErrors.email = "email wajib diisi.";
        } else if (!/\S+@\S+\.\S+/.test(loginForm.data.email)) {
            newErrors.email = "format email tidak valid.";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateRegist = () => {
        const newErrors = {};

        if (!registForm.data.name.trim()) {
            newErrors.name = "username wajib diisi.";
        }

        if (!registForm.data.email.trim()) {
            newErrors.email = "email wajib diisi.";
        } else if (!/\S+@\S+\.\S+/.test(registForm.data.email)) {
            newErrors.email = "format email tidak valid.";
        }

        if (!registForm.data.password) {
            newErrors.password = "password wajib diisi.";
        } else if (registForm.data.password.length < 8) {
            newErrors.password = "password minimal 8 karakter.";
        }

        if (
            registForm.data.password !== registForm.data.password_confirmation
        ) {
            newErrors.password_confirmation =
                "Konfirmasi password tidak cocok.";
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleLoginChange = (e) => {
        loginForm.setData(e.target.name, e.target.value);
    };

    const handleRegisterChange = (e) => {
        registForm.setData(e.target.name, e.target.value);
    };

    const [isLoad, setIsLoad] = useState(false);

    const handleClick = () => {
        if (user) {
            setIsLoad(true);

            router.post("/simpan-diagnosa", guestHistori, {
                onFinish: () => setIsLoad(false),
            });
        } else {
            document.getElementById("modal_login").showModal();
        }
    };

    const firstHasil = hasil?.[0];
    const optMatch = optPadi.find((opt) => opt.id === firstHasil?.opt);
    const selectedKodeGejala = Array.isArray(userSelectedGejala)
        ? userSelectedGejala
              .filter((g) => g && g.gejala && g.kodeGejala)
              .map((g) => `${g.gejala} (${g.kodeGejala})`)
        : [];

    const guestHistori =
        firstHasil && optMatch && selectedKodeGejala.length > 0
            ? {
                  gejala: selectedKodeGejala,
                  opt: optMatch.opt,
                  score: firstHasil.score,
              }
            : null;

    const login = (e) => {
        e.preventDefault();

        if (!validateLogin()) return;

        loginForm.post(route("login"), {
            onSuccess: () => {
                if (guestHistori) {
                    router.post("/simpan-diagnosa", guestHistori);
                }
                document.getElementById("modal_login").close();
                loginForm.reset();
            },
            onError: (errors) => {
                console.error("Register error:", errors);
            },
        });
    };

    const register = (e) => {
        e.preventDefault();

        if (!validateRegist()) return;

        registForm.post(route("register"), {
            onSuccess: () => {
                if (guestHistori) {
                    router.post("/simpan-diagnosa", guestHistori);
                }

                registForm.reset();
                document.getElementById("modal_register").close();
            },
            onError: (errors) => {
                console.error("Register error:", errors);
            },
        });
    };

    const handleGoogleLogin = () => {
        if (guestHistori) {
            sessionStorage.setItem(
                "guestHistori",
                JSON.stringify(guestHistori)
            );
        }

        window.location.href = `${window.location.origin}/auth/redirect`;
    };

    useEffect(() => {
        // Simulasikan loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Sistem Pakar" />
            <AnimatePresence>
                {loading && <LoadingScreen text={"Mendiagnosa..."} />}
            </AnimatePresence>
            {!loading && (
                <>
                    <div className="navbar fixed top-0 left-0 z-20 bg-green text-white">
                        <div className="navbar-start">
                            <div className="px-4">
                                <a href="/">
                                    <svg
                                        width="29"
                                        height="34"
                                        viewBox="0 0 29 34"
                                        fill="none"
                                        xmln
                                        s="http://www.w3.org/2000/svg"
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
                                </a>
                            </div>
                        </div>
                    </div>

                    <ModalAuth
                        id="modal_login"
                        title="Login to Your Account!"
                        subtitle="You must be logged to perform this action."
                        google="Sign in with Google"
                        footer="Don't have an account?"
                        subfooter="Sign Up"
                        linkfooter={(e) => {
                            e.preventDefault();
                            document.getElementById("modal_login").close(); // tutup login
                            setTimeout(() => {
                                document
                                    .getElementById("modal_register")
                                    .showModal(); // buka register
                            }, 200); // delay dikit biar smooth
                        }}
                        onSubmit={login}
                        googleLogin={handleGoogleLogin}
                        processing={loginForm.processing}
                        errors={localErrors}
                        input={[
                            {
                                id: "email_login",
                                types: "email",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                ),
                                names: "email",
                                placeholder: "Email",
                                value: loginForm.email,
                                onChange: handleLoginChange,
                            },
                            {
                                id: "password_login",
                                types: "password",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ),
                                names: "password",
                                placeholder: "Password",
                                value: loginForm.password,
                                onChange: handleLoginChange,
                            },
                        ]}
                    />

                    <ModalAuth
                        id="modal_register"
                        title="Create a New Account!"
                        subtitle="Create an account to continue"
                        google="Sign in with Google"
                        footer="Already registered?"
                        subfooter="Log In"
                        linkfooter={(e) => {
                            e.preventDefault();
                            document.getElementById("modal_register").close(); // tutup register
                            setTimeout(() => {
                                document
                                    .getElementById("modal_login")
                                    .showModal(); // buka login
                            }, 200);
                        }}
                        onSubmit={register}
                        googleLogin={handleGoogleLogin}
                        processing={registForm.processing}
                        errors={localErrors}
                        input={[
                            {
                                id: "name_regis",
                                types: "text",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                ),
                                names: "name",
                                placeholder: "Name",
                                value: registForm.name,
                                onChange: handleRegisterChange,
                            },
                            {
                                id: "email_regis",
                                types: "email",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                ),
                                names: "email",
                                placeholder: "Email",
                                value: registForm.email,
                                onChange: handleRegisterChange,
                            },
                            {
                                id: "password_regis",
                                types: "password",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ),
                                names: "password",
                                placeholder: "Password",
                                value: registForm.password,
                                onChange: handleRegisterChange,
                            },
                            {
                                id: "confirm_password_regis",
                                types: "password",
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ),
                                names: "password_confirmation",
                                placeholder: "Confirm Password",
                                value: registForm.password_confirmation,
                                onChange: handleRegisterChange,
                            },
                        ]}
                    />

                    <div
                        id="result"
                        className="w-full min-h-screen px-5 lg:px-[72px] bg-gradient-to-b from-[#43766C] to-[#407067] overflow-y-auto mt-[64px]"
                    >
                        <div className="flex flex-col justify-center items-center h-full text-white p-5 mt-[64px]">
                            {hasil?.slice(0, 1).map((data, i) => {
                                const optMatch = optPadi.find(
                                    (opt) => opt.id === data.opt
                                );

                                return (
                                    <React.Fragment key={i}>
                                        {optMatch ? (
                                            <ResultDiagnose
                                                penanggulangan={penanggulangan}
                                                opt={optMatch}
                                                score={parseFloat(
                                                    data.score
                                                ).toFixed(6)}
                                            />
                                        ) : (
                                            <ResultDiagnose />
                                        )}
                                    </React.Fragment>
                                );
                            })}

                            <button
                                className="btn btn-secondary mt-5 btn-lg font-bold"
                                onClick={handleClick}
                                disabled={isLoad}
                                type="button"
                            >
                                {isLoad ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading loading-spinner"></span>
                                        <i>Loading</i>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        SIMPAN HASIL DIAGNOSA <FaArrowRight />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
             
        </div>
    );
}
