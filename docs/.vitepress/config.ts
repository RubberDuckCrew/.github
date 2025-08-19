import { defineConfig } from "vitepress";

const content = [
    {
        text: "Contributing",
        items: [
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
        items: [{ text: "CI/CD", link: "/development/ci-cd" }],
    },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "RubberDuckCrew Docs",
    description: "General documentation for the organization",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.svg",

        nav: [{ text: "Home", link: "/" }, ...content],

        sidebar: [...content],
        editLink: {
            pattern:
                "https://github.com/RubberDuckCrew/.github/blob/main/docs/:path",
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
