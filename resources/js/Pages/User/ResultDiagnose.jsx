import React from "react";

const ResultDiagnose = ({ image, opt, score, penanggulangan }) => {
    const handling = penanggulangan?.find((data) => data.opt.id === opt.id);

    return (
        <div className="bg-transparent rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="rounded-[2rem] overflow-hidden border-4 border-white shadow-md max-w-xs w-full h-full md:h-80">
                <img
                    src={image ? image : "/images/blas.jpg"}
                    alt={opt.opt ? opt.opt : "Organisme Pengganggu Tumbuhan"}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 text-white">
                <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
                    Result <span className="text-2xl">🌿</span>
                </h2>

                <div className="bg-white text-primary rounded-xl px-4 py-2 text-green-800 font-semibold flex justify-between items-center w-full mb-4">
                    <span className="text-xl">
                        {opt.opt ? opt.opt : "Organisme Pengganggu Tumbuhan"}{" "}
                        <i>
                            (
                            {opt.nama_latin ? opt.nama_latin : "Nama Latin OPT"}
                            ){" "}
                        </i>
                    </span>
                    <span className="text-xl font-bold">
                        {score ? (score * 100).toFixed(2) + "%" : "...%"}
                    </span>
                </div>

                <div className="flex flex-col md:flex-row gap-6 text-primary justify-between">
                    {handling ? (
                        <>
                            <div className="flex-col bg-white bg-opacity-5 text-white py-3 px-8 rounded-xl shadow-md flex items-center gap-2 w-full md:w-auto">
                                <h1 className="font-bold text-lg md:text-xl">
                                    PENCEGAHAN
                                </h1>
                                <p className="text-xs md:text-sm">
                                    {handling.pencegahan}
                                </p>
                            </div>

                            <div className="flex-col bg-white bg-opacity-5 text-white py-3 px-8 rounded-xl shadow-md flex items-center gap-2 w-full md:w-auto">
                                <h1 className="font-bold text-lg md:text-xl">
                                    PENANGANAN
                                </h1>
                                <p className="text-xs md:text-sm">
                                    {handling.penanganan}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex-col bg-white bg-opacity-5 text-white py-3 px-8 rounded-xl shadow-md flex items-center gap-2 w-full md:w-auto">
                                <h1 className="font-bold text-lg md:text-xl">
                                    PENCEGAHAN
                                </h1>
                                <p className="text-xs md:text-sm">
                                    <i>empty</i>
                                </p>
                            </div>

                            {/* Penanganan - Empty */}
                            <div className="flex-col bg-white bg-opacity-5 text-white py-3 px-8 rounded-xl shadow-md flex items-center gap-2 w-full md:w-auto">
                                <h1 className="font-bold text-lg md:text-xl">
                                    PENANGANAN
                                </h1>
                                <p className="text-xs md:text-sm">
                                    <i>empty</i>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultDiagnose;
