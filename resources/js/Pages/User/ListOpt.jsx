import { useRef, useState } from "react";
import { FaDisease, FaInfoCircle } from "react-icons/fa";

const ListOpt = ({ dataOpt, dataInferensi }) => {
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll speed
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <div
            id="userviewopt"
            className="w-full h-screen px-5 lg:px-[72px] bg-cream"
        >
            <div className="flex flex-col justify-center items-center h-full">
                <h1 className="font-black text-2xl text-accent">
                    Organisme Pengganggu Tumbuhan (OPT) beserta Gejala-gejalanya
                </h1>

                <div
                    className="carousel carousel-center max-w-full rounded-box space-x-4 p-4 cursor-grab select-none"
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {dataOpt.map((data, index) => (
                        <div className="carousel-item" key={index}>
                            <div className="card bg-base-100 w-[260px] shadow-sm">
                                <figure className="px-5 pt-5">
                                    <img
                                        src={`/show/${data.gambar}`}
                                        alt={data.kodeOpt}
                                        className="rounded-xl object-cover h-36 w-full"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-accent font-bold">
                                        {data.opt}
                                    </h2>
                                    <p className="text-accent italic">
                                        {data.nama_latin}
                                    </p>
                                    <div className="card-actions pt-5">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        `modal_${data.kodeOpt}`
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            informasi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {dataOpt.map((data, index) => (
                        <dialog
                            key={index}
                            id={`modal_${data.kodeOpt}`}
                            className="modal text-primary"
                        >
                            <div className="modal-box w-11/12 max-w-4xl">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-gray-100">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg">
                                    Bagaimana tanaman padi yang terinfeksi{" "}
                                    <strong>{data.opt}</strong>
                                </h3>
                                <div className="flex flex-col lg:flex-row">
                                    <div className="p-2">
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2 font-semibold my-2">
                                                <FaInfoCircle />
                                                <span>Deskripsi:</span>
                                            </div>
                                            <p>{data.deskripsi}</p>
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2 font-semibold my-2">
                                                <FaDisease />
                                                <span>Gejala Umum:</span>
                                            </div>
                                            {dataInferensi
                                                .filter(
                                                    (data2) =>
                                                        data2.opt.kodeOpt ===
                                                        data.kodeOpt
                                                )
                                                .sort((a, b) =>
                                                    a.opt.opt.localeCompare(
                                                        b.opt.opt
                                                    )
                                                )
                                                .map((data2, i) => (
                                                    <div
                                                        className="flex rounded-xl badge badge-accent py-1 my-2 mx-[2px] whitespace-normal break-words"
                                                        key={i}
                                                    >
                                                        {data2.gejala.gejala}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <img
                                            src={`/show/${data.gambar}`}
                                            alt={data.kodeOpt}
                                            className="rounded-xl h-full object-cover w-96"
                                        />
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListOpt;
