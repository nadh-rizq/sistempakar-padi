const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                // sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                sans: ["nunito", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                green: "#43766C",
                cream: "#F8FAE5",
                choco: "#B19470",
                tree: "#76453B",
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
            },
        },
    },

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#43766C",

                    "primary-content": "#FFFFFF",

                    secondary: "#F8FAE5",

                    "secondary-content": "#43766C",

                    accent: "#B19470",

                    "accent-content": "#FFFFFF",

                    neutral: "#43766C",

                    "neutral-content": "#FFFFFF",

                    "base-100": "#FFFFFF",

                    "base-200": "#D7F2EC",

                    "base-300": "#8CC4B8",

                    "base-content": "#2B2B2B",

                    info: "#70A1D7",

                    "info-content": "#2B2B2B",

                    success: "#A1DE93",

                    "success-content": "#2B2B2B",

                    warning: "#F7F48B",

                    "warning-content": "#2B2B2B",

                    error: "#F47C7C",

                    "error-content": "#2B2B2B",
                },
            },
        ],
    },

    plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
