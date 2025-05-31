import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ListPenanganan = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = data?.length || 0;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
    };

    return (
        <div
            className="flex min-h-screen bg-cream items-center justify-center px-4"
            id="userviewpenanganan"
        >
            <div className="w-full flex flex-col items-center relative z-10 px-6 md:px-10">
                <h1 className="font-black text-3xl text-accent mb-8 text-center">
                    Penanganan OPT Padi
                </h1>

                <div className="">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`mb-4 text-3xl px-2 py-2 rounded-full ${
                            currentIndex === 0
                                ? "text-accent/50 cursor-not-allowed"
                                : "text-accent hover:bg-primary-dark"
                        }`}
                    >
                        <FaCaretDown />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === data.length - 1}
                        className={`mt-4 text-3xl px-2 py-2 rounded-full ${
                            currentIndex === data.length - 1
                                ? "text-accent/50 cursor-not-allowed"
                                : "text-accent hover:bg-primary-dark"
                        }`}
                    >
                        <FaCaretUp />
                    </button>
                </div>

                {/* Card */}
                <div className="relative w-full h-[350px]">
                    {data.map((item, index) => {
                        const isActive = index === currentIndex;
                        const offset = index - currentIndex;

                        return (
                            <div
                                key={index}
                                className={`absolute left-0 w-full transition-all duration-500 ease-in-out ${
                                    isActive
                                        ? "z-30"
                                        : offset === 1
                                        ? "z-20"
                                        : "z-10"
                                }`}
                                style={{
                                    top: `${offset * 20}px`,
                                    transform: `scale(${
                                        1 - Math.abs(offset) * 0.05
                                    })`,
                                    opacity: offset > 2 || offset < -1 ? 0 : 1,
                                    pointerEvents: isActive ? "auto" : "none",
                                }}
                            >
                                <div className="bg-accent text-cream h-[300px] md:h-full px-6 py-6 md:py-20 rounded-lg shadow-xl text-center text-base font-medium">
                                    <div className="h-full overflow-y-auto px-1 py-3">
                                        <h1 className="text-xl font-black mb-2">
                                            {item.opt.opt}
                                        </h1>
                                        <div className="bg-green-100 text-green-900 px-4 py-2 rounded-md shadow-sm">
                                            {item.penanganan}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListPenanganan;
