import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full shadow-md bg-white dark:bg-gray-800 hover:scale-110 transition-all"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-purple-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
