/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue1: "#030027",
        blue2: "#012792",
        blue3: "#00175B",
        blue4: "#001244",
        blue5: "#001242",
        tabhover: "#00217A",
      },
    },
  },
  plugins: [],
};
