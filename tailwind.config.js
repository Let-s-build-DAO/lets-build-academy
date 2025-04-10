/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        72: "72px",
        223: "223px",
      },
    },
    screens: {
      sm: { max: "700px" },
      md: "700px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1500px",
    },
    colors: {
      white: "#F8F8F8",
      purple: "#40196C",
      gray: "#5C555E",
    },
  },

  plugins: [],
};
