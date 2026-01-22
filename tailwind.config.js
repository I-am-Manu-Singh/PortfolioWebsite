/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#004f90', // Deep Blue
                    light: '#4dabf5',
                },
                secondary: {
                    DEFAULT: '#00d4ff', // Cyan
                },
                dark: {
                    DEFAULT: '#0a0a0a',
                    card: '#121212',
                },
                text: {
                    DEFAULT: '#e0e0e0',
                    muted: '#a0a0a0',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['Space Grotesk', 'monospace'],
            },
            animation: {
                'shine': 'shine 2s linear infinite',
            },
            keyframes: {
                shine: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            }
        },
    },
    plugins: [],
}
