const Home = ({ onDiagnose, auth }) => {
    return (
        <div
            id="home"
            className="w-full min-h-screen px-5 lg:px-[72px] bg-cream flex items-center justify-center"
        >
            <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-10 py-10">
                {/* Kiri: Teks dan Tombol */}
                <div className="text-white max-w-xl space-y-6 text-center md:text-left">
                    <h1 className="font-bold text-4xl md:text-5xl leading-tight">
                        Diagnosa Organisme Pengganggu Tumbuhan
                    </h1>
                    <h2 className="text-xl">pada Tanaman Padi</h2>
                    <button
                        onClick={() => {
                            if (
                                auth?.kodeRole !== "R0LE01" &&
                                auth?.kodeRole !== "R0LE02"
                            ) {
                                onDiagnose();
                            } else {
                                window.location.href = "/list-riwayat";
                            }
                        }}
                        className="btn btn-accent font-black btn-lg mt-4"
                    >
                        {auth?.kodeRole !== "R0LE01" &&
                        auth?.kodeRole !== "R0LE02"
                            ? "COBA SEKARANG!"
                            : "DASHBOARD"}
                    </button>
                </div>

                {/* Kanan (atau atas saat mobile): Gambar */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={`/show/asset_padi.png`}
                        alt="Padi"
                        className="max-w-xs md:max-w-md lg:max-w-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
