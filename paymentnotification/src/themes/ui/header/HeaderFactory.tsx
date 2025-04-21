import { BaseHeaderFactory } from "@/interfaces/BaseHeaderFactory";
import { useThemeStore } from "@/store/themeStore";
import { DarkHeaderFactory } from "../DarkHeaderFactory";
import { LightHeaderFactory } from "../LightHeaderFactory";

export const useHeaderFactory = (): BaseHeaderFactory => {
  const { theme } = useThemeStore();

  switch (theme.name) {
    case "dark":
      return new DarkHeaderFactory();
    case "light":
    default:
      return new LightHeaderFactory();
  }
};
