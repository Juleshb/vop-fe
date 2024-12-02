/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {
      colors: {
        Teal: "#F8B824",
        HummingBird: "#d1f1ee",
        yellow: "#e4d63b",
        Solitude: "#e9e9ea",
        gray: "#4B4B4C",
        close: "#e11d48",
      },
      animation: {
        slide: "slide 25s linear infinite",
      },
      keyframes: {
        slide: {
          "0%, 100%": { transform: "translateX(5%)" },
          "50%": { transform: "translateX(-120%)" },
        },
      },
    },
    screens: {
      // Existing sizes
      xs: "480px",
      sm: "768px",
      md: "1060px",

      // Added additional sizes
      xxs: "320px", // Extra small devices
      lg: "1024px", // Laptops
      xl: "1280px", // Large desktops
      "2xl": "1536px", // Extra large screens
      "3xl": "1920px", // Ultra large screens
    },
  },
  plugins: [],
};
