import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-green">
            <div>
                <Link href="/">
                    <svg
                        width="80"
                        viewBox="0 0 29 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.1367 32.5081C6.75177 32.8728 0.469526 27.1818 0.104871 19.7969L-0.000243956 17.6681C7.38464 17.3035 13.6669 22.9945 14.0315 30.3794L14.1367 32.5081Z"
                            fill="#F8FAE5"
                        />
                        <path
                            d="M19.2202 15.5003C11.8353 15.8649 5.55302 10.1739 5.18837 2.78903L5.08325 0.660264C12.4681 0.295609 18.7504 5.98664 19.115 13.3715L19.2202 15.5003Z"
                            fill="#F8FAE5"
                        />
                        <path
                            d="M15.3804 32.4468C22.7653 32.0821 28.4563 25.7999 28.0917 18.415L27.9866 16.2862C20.6017 16.6509 14.9107 22.9331 15.2753 30.318L15.3804 32.4468Z"
                            fill="#F8FAE5"
                        />
                    </svg>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-cream shadow-lg overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
