// mobile-themes.ts
export type MobileThemeKey =
  | "classic"
  | "dark"
  | "pastel"
  | "neon"
  | "sunset"
  | "ocean"
  | "forest"
  | "cyberpunk"
  | "minimal";

export const mobileThemes: Record<MobileThemeKey, {
  screen: string;
  card: string;
  button: string;
  text: string;
  muted: string;
}> = {
  // Updated existing themes
  classic: {
    screen: "bg-gray-50",
    card: "bg-white border-gray-200",
    button: "bg-gray-900 text-white",
    text: "text-gray-900",
    muted: "text-gray-400",
  },
  dark: {
    screen: "bg-gray-900",
    card: "bg-gray-800 border-gray-700",
    button: "bg-white text-gray-900",
    text: "text-white",
    muted: "text-gray-400",
  },
  pastel: {
    screen: "bg-pink-50",
    card: "bg-white border-pink-100",
    button: "bg-pink-400 text-white",
    text: "text-pink-900",
    muted: "text-pink-500",
  },
  neon: {
    screen: "bg-black",
    card: "bg-black border-fuchsia-500",
    button: "bg-fuchsia-500 text-black",
    text: "text-fuchsia-400",
    muted: "text-fuchsia-300",
  },

  // New themes
  sunset: {
    screen: "bg-orange-50",
    card: "bg-white border-orange-200",
    button: "bg-orange-500 text-white",
    text: "text-orange-800",
    muted: "text-orange-400",
  },
  ocean: {
    screen: "bg-blue-50",
    card: "bg-white border-blue-200",
    button: "bg-blue-500 text-white",
    text: "text-blue-900",
    muted: "text-blue-400",
  },
  forest: {
    screen: "bg-green-50",
    card: "bg-white border-green-200",
    button: "bg-green-600 text-white",
    text: "text-green-900",
    muted: "text-green-500",
  },
  cyberpunk: {
    screen: "bg-gray-900",
    card: "bg-gray-800 border-pink-500",
    button: "bg-cyan-400 text-black",
    text: "text-pink-400",
    muted: "text-cyan-300",
  },
  minimal: {
    screen: "bg-white",
    card: "bg-gray-100 border-gray-200",
    button: "bg-gray-900 text-white",
    text: "text-gray-900",
    muted: "text-gray-500",
  },
};
