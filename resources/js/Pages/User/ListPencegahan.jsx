import { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const ListPencegahan = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = data?.length || 0;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
    };

    return (
        <div className="flex h-screen bg-green" id="userviewpencegahan">
            {/* Kiri (text/list) */}
            <div className=" w-full md:w-1/2 px-6 md:px-10 flex flex-col justify-center relative z-10">
                <h1 className="font-black text-3xl text-secondary mb-8 text-center">
                    Pencegahan OPT Padi
                </h1>

                {/* Wrapper dengan posisi relatif untuk tempat tombol kiri/kanan */}
                <div className="relative max-w-md mx-auto m-2">
                    {/* Konten utama */}
                    <div className="bg-cream text-green p-8 rounded-lg shadow-lg text-center text-lg font-semibold">
                        {data.length > 0 ? (
                            <>
                                <h1 className="text-xl font-black mb-2">
                                    {data[currentIndex]?.opt.opt}
                                </h1>
                                <div className="bg-green-100 px-4 py-2 rounded-md shadow-sm">
                                    {data[currentIndex]?.pencegahan}
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-500">Tidak ada data.</p>
                        )}
                    </div>

                    <div className="flex justify-center md:justify-between items-center mt-4 md:mt-0 md:absolute md:left-[-50px] md:right-[-50px] md:top-1/2 md:transform md:-translate-y-1/2">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`text-3xl px-3 py-2 rounded-full ${
                                currentIndex === 0
                                    ? "text-cream/70 cursor-not-allowed"
                                    : "text-cream hover:bg-primary-dark"
                            }`}
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === total - 1}
                            className={`text-3xl px-3 py-2 rounded-full ${
                                currentIndex === total - 1
                                    ? "text-cream/70 cursor-not-allowed"
                                    : "text-cream hover:bg-primary-dark"
                            }`}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="hidden md:block w-1/2 relative overflow-hidden">
                <img
                    src={`/show/petani.jpg`}
                    alt="Gambar Pencegahan"
                    className="absolute top-0 right-0 h-full w-full object-cover"
                    style={{
                        clipPath: "ellipse(100% 100% at 100% 50%)",
                    }}
                />
            </div>
        </div>
    );
};

export default ListPencegahan;
