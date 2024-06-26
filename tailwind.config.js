/** @type {DefaultColors} */
const colors = require("tailwindcss/colors");

const defaultTheme = require('tailwindcss/defaultTheme');
const {lightBlue, warmGray, trueGray, blueGray, coolGray, ...allOtherColors} = colors;

module.exports = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            ...allOtherColors,
        },
        screens: {
            xs: '500px',
            ...defaultTheme.screens
        },
        extend: {
            backgroundSize: {
                full: "100%",
            },
            fontFamily: {
                'twitter-chirp': ['TwitterChirp', 'sans-serif'],
                'twitter-chirp-extended': ['TwitterChirpExtendedHeavy', 'sans-serif']
            },
            // prettier-ignore
            colors: {
                'main-primary': 'rgb(var(--main-primary) / <alpha-value>)',
                'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
                'main-background': 'rgb(var(--main-background) / <alpha-value>)',
                'main-search-background': 'rgb(var(--main-search-background) / <alpha-value>)',
                'main-sidebar-background': 'rgb(var(--main-sidebar-background) / <alpha-value>)',
                'main-accent': 'rgb(var(--main-accent) / <alpha-value>)',
                'accent-yellow': 'rgb(var(--accent-yellow) / <alpha-value>)',
                'accent-blue': 'rgb(var(--accent-blue) / <alpha-value>)',
                'accent-pink': 'rgb(var(--accent-pink) / <alpha-value>)',
                'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
                'accent-orange': 'rgb(var(--accent-orange) / <alpha-value>)',
                'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
                'accent-red': '#F4212E',
                'dark-primary': '#E7E9EA',
                'dark-secondary': '#71767B',
                'light-primary': '#0F1419',
                'light-secondary': '#536471',
                'dark-border': '#2F3336',
                'light-border': '#EFF3F4',
                'dark-line-reply': '#333639',
                'light-line-reply': '#CFD9DE',
                'twitter-icon': '#D6D9DB',
                'image-preview-hover': '#272C30',
            },

        }
    },
    plugins: [
        ({addVariant}) => {
            addVariant('inner', '& > *');
        },
        ({addUtilities}) => {
            const newUtilities = {
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "scrollbar-color": "rbg(31 29 29) white !important",
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "white"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgb(31 41 55)",
                        borderRadius: "20px",
                        border: "1px solid white",
                    }
                }
            }
            addUtilities(newUtilities, ['responsive', 'hover']);
        }
    ],
}

