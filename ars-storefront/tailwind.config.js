module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "100rem",
      },
      colors: {
        "metallic-bronze": {
          50: "#f8f9ed",
          100: "#eef0d1",
          200: "#e0e2a6",
          300: "#d1d073",
          400: "#c3bd4c",
          500: "#b4a93e",
          600: "#9b8933",
          700: "#7c672c",
          800: "#68542b",
          900: "#493a21",
          950: "#342714",
        },
        "gulf-stream": {
          50: "#f4f9f8",
          100: "#daedea",
          200: "#b4dbd6",
          300: "#82beb9",
          400: "#5ea39f",
          500: "#448885",
          600: "#356c6b",
          700: "#2d5857",
          800: "#284747",
          900: "#243d3d",
          950: "#112122",
        },
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
      },
      keyframes: {
        "accordion-open": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-close": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-open": "accordion-open 0.3s ease-out",
        "accordion-close": "accordion-close 0.3s ease-out",
      },
    },
  },
}
