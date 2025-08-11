import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "RubberDuckCrew Docs",
    description: "Documentation for RubberDuckCrew organization",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
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
        ],

        sidebar: [
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
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/RubberDuckCrew/" },
        ],
    },
    srcDir: "./src",
    assetsDir: "./assets",
    cleanUrls: true,
    lastUpdated: true,
});
