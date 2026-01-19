/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bluey: {
                    dark: '#30598a',
                    light: '#72bfed',
                    cream: '#e4dcbd',
                    orange: {
                        light: '#f1b873',
                        dark: '#e27a37',
                    }
                },
                // Mapeo de colores originales del HTML para compatibilidad
                'blue-light': '#D4E8F8',
                'blue-dark': '#6CA6D9',
                'pink-light': '#FDE2E8',
                'pink-dark': '#F5B0C2',
                'yellow-soft': '#FEF3C7',
                'yellow-btn': '#FCD385',
            },
            fontFamily: {
                fredoka: ['Fredoka', 'sans-serif'],
                quicksand: ['Quicksand', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            }
        },
    },
    plugins: [],
}
