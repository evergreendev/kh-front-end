export const buttonConfig = {
    primary: "bg-black text-white hover:bg-gray-600 transition-colors",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    tertiary: "bg-white text-black hover:bg-gray-100 transition-colors font-bold",
    highlight: "bg-brand-yellow font-bold",
    text: "bg-transparent hover:bg-gray-100"
}

export type Config = (typeof buttonConfig)[keyof typeof buttonConfig];
