import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DiagnoseItem from "../ComponentWeb/DiagnoseItem";
import { router } from "@inertiajs/react";

const Search = ({ dataGejala, search, onClose }) => {
    const [searchField, setSearchField] = useState(search || "");
    const [selectedGejala, setSelectedGejala] = useState([]);
    const [activeSelected, setActiveSelected] = useState(0);

    const [selectedGejalaSet, setSelectedGejalaSet] = useState(new Set());

    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setActiveSelected(0);
    }, [searchField]);

    const filteredGejala = useMemo(() => {
        return dataGejala.filter((item) =>
            item.Gejala.toLowerCase().includes(searchField.toLowerCase())
        );
    }, [dataGejala, searchField]);

    const handleSelect = (item) => {
        setSelectedGejala([...selectedGejala, item]);
        setSelectedGejalaSet(new Set([...selectedGejalaSet, item.kodeGejala]));
        setSearchField("");
        inputRef.current.focus();
    };

    const handleRemoveSelect = (item) => {
        const updateSelect = selectedGejala.filter(
            (selectedGejala) => selectedGejala.kodeGejala !== item.kodeGejala
        );
        setSelectedGejala(updateSelect);

        const updateGejalaSet = new Set(selectedGejalaSet);
        updateGejalaSet.delete(item.kodeGejala);

        setSelectedGejalaSet(updateGejalaSet);
    };

    const handleKey = (e) => {
        if (
            e.key === "Backspace" &&
            e.target.value === "" &&
            selectedGejala.length > 0
        ) {
            const lastGejala = selectedGejala[selectedGejala.length - 1];
            handleRemoveSelect(lastGejala);
        } else if (e.key === "ArrowDown" && filteredGejala?.length > 0) {
            e.preventDefault();
            setActiveSelected((prev) =>
                prev < filteredGejala.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === "ArrowUp" && filteredGejala.length > 0) {
            e.preventDefault();
            setActiveSelected((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (
            e.key === "Enter" &&
            activeSelected >= 0 &&
            activeSelected < filteredGejala.length
        ) {
            handleSelect(filteredGejala[activeSelected]);
        }
    };

    const handleDiagnosa = () => {
        setLoading(true);
        const dataToSend = {
            gejala: selectedGejala.map((item) => item.kodeGejala),
        };

        router.post("/diagnose", dataToSend, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <button
                className="absolute top-4 right-4 btn-circle text-secondary hover:bg-[#407067] text-xl font-bold z-50"
                onClick={onClose}
                aria-label="Close"
            >
                ✕
            </button>
            <div
                id="search"
                className="w-full px-5 lg:px-[72px] min-h-screen bg-primary"
            >
                <div className="flex flex-col py-20">
                    <div className="w-full max-w-[100%] relative">
                        <div className="w-full px-4 py-2 border rounded-lg flex flex-wrap items-center bg-white min-h-[3rem]">
                            {selectedGejala.map((item, index) => {
                                return (
                                    <DiagnoseItem
                                        key={`${item.kodeGejala}-${index}`}
                                        text={item.Gejala}
                                        onClick={() => handleRemoveSelect(item)}
                                    />
                                );
                            })}
                            <input
                                ref={inputRef}
                                type="text"
                                className={`grow input border-none focus:outline-none focus:ring-0 focus:shadow-none ${
                                    loading ? "disabled:bg-gray-50" : ""
                                }`}
                                placeholder="Cari Gejala pada Padi..."
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                                onKeyDown={handleKey}
                                disabled={loading}
                            />

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
                        </div>

                        {searchField && filteredGejala.length > 0 && (
                            <ul className="suggestion-list">
                                {filteredGejala
                                    .filter(
                                        (item) =>
                                            !selectedGejalaSet.has(
                                                item.kodeGejala
                                            )
                                    )
                                    .map((item, index) => (
                                        <li
                                            key={`${item.kodeGejala}-${index}`}
                                            className={`p-1 ${
                                                index === activeSelected
                                                    ? "activeSelected"
                                                    : ""
                                            }`}
                                            onClick={() => handleSelect(item)}
                                        >
                                            <a
                                                onClick={() =>
                                                    setSearchField(item.Gejala)
                                                }
                                            >
                                                {item.Gejala}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                    <div className=" flex justify-between">
                        <span>
                            <p className="text-white text-opacity-30 text-xs my-2">
                                <i>* minimal 2 gejala</i>
                            </p>
                        </span>
                        <button
                            className="btn btn-secondary mt-2 disabled:bg-[#4f8c80] disabled:text-[#7daba2] disabled:cursor-not-allowed"
                            onClick={handleDiagnosa}
                            disabled={selectedGejala.length < 2 || loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner"></span>
                                    <i>Diagnosa</i>
                                </span>
                            ) : (
                                "Diagnosa"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Search;
