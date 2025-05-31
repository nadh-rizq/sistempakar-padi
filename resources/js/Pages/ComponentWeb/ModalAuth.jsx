import InputError from "@/Components/InputError";
import React from "react";

export default function ModalAuth({
    id,
    title,
    subtitle,
    google,
    footer,
    subfooter,
    input = [],
    onSubmit,
    linkfooter,
    processing,
    googleLogin,
    errors,
}) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box rounded-xl">
                <button
                    type="button"
                    onClick={() => document.getElementById(id).close()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="text-xs">{subtitle}</p>
                </div>
                <div className="flex items-center w-full my-5 border-none">
                    <button
                        className="btn w-full border-none rounded-md bg-white text-gray-700 shadow-md hover:shadow-lg hover:bg-secondary transition duration-200 ease-in-out"
                        method="get"
                        as="button"
                        onClick={googleLogin}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google Logo"
                            className="w-6 h-6 mr-3"
                        />
                        <span className="font-medium">{google}</span>
                    </button>
                </div>
                <div className="text-center text-xs text-gray-700 mb-2">
                    <span className="px-3 ">OR</span>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-3 mt-3">
                        {input.map((data, index) => (
                            <div key={index}>
                                <label className="input input-bordered flex items-center gap-2">
                                    {data.icon}
                                    <input
                                        type={data.types}
                                        className="input grow border-none text-sm"
                                        placeholder={data.placeholder}
                                        id={data.id}
                                        name={data.names}
                                        value={data.value}
                                        onChange={data.onChange}
                                        autoComplete="username"
                                    />
                                </label>
                                <InputError
                                    message={errors?.[data.names] ?? ""}
                                    className="mt-2"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center w-full my-3 border-none">
                        <button
                            className="btn btn-primary w-full border-none rounded-md shadow-md text-sm"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner"></span>
                                    <i>Continue</i>
                                </span>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </div>
                </form>
                <div className="flex justify-end">
                    <p className="text-xs text-green mr-1">{footer}</p>
                    <a
                        // href={route("register")}
                        href="#"
                        onClick={linkfooter}
                        className="underline text-xs text-green hover:text-choco rounded-md focus:outline-none"
                    >
                        <strong>{subfooter}</strong>
                    </a>
                </div>
            </div>
        </dialog>
    );
}
