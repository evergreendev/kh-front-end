import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'ptserif': ['var(--font-ptserif)'],
      'opensans': ['var(--font-open-sans)'],
    },
    extend: {
      colors: {
        "brand-yellow": "#ffde00",
        "grey": "#e5e5e5",
        "pale-1": "#fffcf3",
        "pale-2": "#f5f5f5"
      },
      maxWidth: {
        'top': 'calc(1800px + ((100vw - 1800px - 3.5rem) / 2))'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
