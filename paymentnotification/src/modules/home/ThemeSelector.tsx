import { useThemeStore } from "@/store/themeStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect } from "react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.name === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Select
      value={theme.name}
      onValueChange={(value) => setTheme(value as "light" | "dark")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccionar tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Claro</SelectItem>
        <SelectItem value="dark">Oscuro</SelectItem>
      </SelectContent>
    </Select>
  );
};
