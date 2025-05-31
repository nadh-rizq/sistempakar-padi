import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ScrollUp from "./Components/ScrollUp";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) =>
    //     resolvePageComponent(
    //         `./Pages/${name}.jsx`,
    //         import.meta.glob("./Pages/**/*.jsx")
    //     ),
    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

        // Layout default: DashboardAdmin
        if (name.startsWith("Admin/PagesAdmin")) {
            page.default.layout =
                page.default.layout ||
                ((page) => <DashboardAdmin>{page}</DashboardAdmin>);
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <ScrollUp />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
