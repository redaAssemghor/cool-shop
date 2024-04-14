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
          primary: "#ff00a2",

          secondary: "#0061f3",

          accent: "#00e100",

          neutral: "#000a0d",

          "base-100": "#fff9ef",

          info: "#00e8ff",

          success: "#70ac00",

          warning: "#ff8900",

          error: "#ff6975",
        },
      },
    ],
  },
  plugins: [daisyui],
};
