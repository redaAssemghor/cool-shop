import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ff00b5",

          secondary: "#0000ff",

          accent: "#008c00",

          neutral: "#090909",

          "base-100": "#f5fefc",

          info: "#00a4da",

          success: "#92d200",

          warning: "#d08900",

          error: "#f83e5b",
        },
      },
    ],
  },
  plugins: [daisyui],
};
