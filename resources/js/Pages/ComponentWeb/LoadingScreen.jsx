import { motion } from "framer-motion";

const pathVariant = {
    initial: { opacity: 0, y: 10 },
    animate: (i) => ({
        opacity: [0, 1, 1, 0, 0],
        y: [10, 0, 0, 10, 10],
        transition: {
            duration: 2.4,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut",
            repeat: 2,
            repeatType: "loop",
            delay: i * 0.3,
        },
    }),
};

const WavyText = ({ text }) => (
    <span className="inline-flex overflow-hidden">
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                initial={{ y: 0 }}
                animate={{
                    y: [0, -6, 0, 0, 0, 0], // naik-turun dan tahan
                }}
                transition={{
                    duration: 2.5,
                    times: [0, 0.1, 0.3, 0.5, 0.7, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.08,
                }}
                className="inline-block"
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </span>
);

export default function LoadingScreen({ text }) {
    return (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary text-primary"
        >
            <svg
                width="96"
                height="96"
                viewBox="0 0 29 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {[...Array(3)].map((_, i) => (
                    <motion.path
                        key={i}
                        custom={i}
                        variants={pathVariant}
                        initial="initial"
                        animate="animate"
                        fill="#43766C"
                        d={
                            i === 0
                                ? "M14.1367 32.5081C6.75177 32.8728 0.469526 27.1818 0.104871 19.7969L-0.000243956 17.6681C7.38464 17.3035 13.6669 22.9945 14.0315 30.3794L14.1367 32.5081Z"
                                : i === 1
                                ? "M19.2202 15.5003C11.8353 15.8649 5.55302 10.1739 5.18837 2.78903L5.08325 0.660264C12.4681 0.295609 18.7504 5.98664 19.115 13.3715L19.2202 15.5003Z"
                                : "M15.3804 32.4468C22.7653 32.0821 28.4563 25.7999 28.0917 18.415L27.9866 16.2862C20.6017 16.6509 14.9107 22.9331 15.2753 30.318L15.3804 32.4468Z"
                        }
                    />
                ))}
            </svg>

            <p className="mt-4 text-lg font-medium text-primary">
                <WavyText text={text} />
            </p>
        </motion.div>
    );
}
