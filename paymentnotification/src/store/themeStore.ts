import { create } from "zustand";
import { LightTheme } from "@/themes/LightTheme";
import { DarkTheme } from "@/themes/DarkTheme";
import { ITheme } from "@/interfaces/ITheme";

type ThemeState = {
  theme: ITheme;
  setTheme: (type: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: LightTheme,
  setTheme: (type) =>
    set(() => ({
      theme: type === "light" ? LightTheme : DarkTheme,
    })),
}));
