/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            margin: {
                'app-container': '0 max(1rem, 10vw);',
            },
            gridTemplateColumns: {
                'fill-container': 'repeat(auto-fit, auto)',
            },
        },
        colors: {
            'off-black': {
                DEFAULT: '#121113',
                tsp: '#12111366',
            },
            'white': '#FFFFFF',
            'purple': '#E8E1EF',
            'cyan': '#D9FFF8',
            'pink': '#FF7B9C',
        },
        fontFamily: {
            sono: ['Sono', 'sans-serif'],
        },
    },
    plugins: [],
};
