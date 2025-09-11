import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "RubberDuckCrew Docs",
    description: "General documentation for the organization",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.svg",

        nav: [
            { text: "Home", link: "/" },
            {
                text: "Contributing",
                link: "/contributing/",
            },
            {
                text: "Development",
                link: "/development/",
            },
        ],

        sidebar: [
            {
                text: "Contributing",
                link: "/contributing/",
                items: [
                    {
                        text: "Code of Conduct",
                        link: "/contributing/code-of-conduct",
                    },
                    {
                        text: "Verified commits",
                        link: "/contributing/verified-commits",
                    },
                    {
                        text: "Contributing conventions",
                        link: "/contributing/conventions",
                    },
                    {
                        text: "Contributing with forks",
                        link: "/contributing/forks",
                    },
                ],
            },
            {
                text: "Development",
                link: "/development/",
                items: [{ text: "CI/CD", link: "/development/ci-cd" }],
            },
        ],
        editLink: {
            pattern:
                "https://github.com/RubberDuckCrew/.github/blob/main/docs/src/:path",
            text: "View this page on GitHub",
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/RubberDuckCrew/" },
        ],
        search: {
            provider: "local",
        },
    },
    markdown: {
        image: {
            lazyLoading: true,
        },
    },
    srcDir: "./src",
    cleanUrls: true,
    lastUpdated: true,
    vite: {
        publicDir: "../public",
    },
});
