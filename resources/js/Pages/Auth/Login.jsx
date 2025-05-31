import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://127.0.0.1:8000/auth/redirect";
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    {/* <InputLabel htmlFor="email" value="Email" /> */}

                    {/* <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    /> */}
                    <label className="input input-bordered flex items-center gap-2 mt-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            className="input grow border-none"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={handleOnChange}
                        />
                    </label>
                </div>

                <div className="mt-4">
                    {/* <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    /> */}

                    <label className="input input-bordered flex items-center gap-2">
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
                        <input
                            type="password"
                            className="input grow border-none"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                    </label>

                    <InputError message={errors.email} className="mt-2" />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div className="mt-1 flex justify-between">
                    <label className="flex items-center">
                        <input
                            name="remember"
                            value={data.remember}
                            type="checkbox"
                            onChange={handleOnChange}
                            className="checkbox checkbox-xs rounded-md checkbox-primary border-gray-300"
                        />
                        <span className="ml-2 text-xs text-green">
                            Remember me
                        </span>
                    </label>
                    <div className="">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-xs text-green hover:text-choco rounded-md focus:outline-none"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </div> */}

                <div className="flex items-center w-full mt-4 mb-2">
                    <button
                        className="btn bg-green btn-block rounded-md text-cream hover:bg-choco"
                        disabled={processing}
                    >
                        LOG IN
                    </button>
                </div>
                <div className="flex items-center text-xs text-green">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 ">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center w-full my-2">
                    <button
                        className="btn btn-block rounded-md bg-white border-none hover:bg-sky-50 hover:border-none"
                        onClick={handleGoogleLogin}
                        method="get"
                        as="button"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google Logo"
                            className="w-6 h-6 mr-2"
                        />
                        Sign In with Google
                    </button>
                </div>
                <div className="flex justify-end">
                    <p className="text-xs text-green mr-1">Don't Have an Account?</p>
                    <Link
                        href={route("register")}
                        className="underline text-xs text-green hover:text-choco rounded-md focus:outline-none"
                    >
                         <strong>Sign Up</strong>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
