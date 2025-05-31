import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollUp = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 200);
        window.addEventListener("scroll", toggle);
        return () => window.removeEventListener("scroll", toggle);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return visible ? (
        <button
            onClick={scrollToTop}
            className="btn btn-primary fixed bottom-6 right-6 z-50 shadow-lg"
        >
            <FaChevronUp />
        </button>
    ) : null;
};

export default ScrollUp;
