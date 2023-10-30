/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    logs: false,
  },
};
