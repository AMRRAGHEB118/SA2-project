/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('daisyui'),
        // eslint-disable-next-line no-undef
        require('tailwindcss/plugin')
    ],
}