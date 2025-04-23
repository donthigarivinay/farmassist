module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        earthyGreen: {
          50: "#e8f5e9", // Light green shade
          100: "#c8e6c9",
          600: "#43a047",
        },
        earthyBrown: "#8d6e63",
        earthyYellow: "#fdd835",
      },
    },
  },
  plugins: [],
};
