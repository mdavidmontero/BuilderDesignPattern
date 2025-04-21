import { Input } from "@/components/ui/input";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeInput() {
  const { theme } = useThemeStore();
  return (
    <Input
      style={{
        backgroundColor: theme.primaryColor,
        borderRadius: theme.borderRadius,
        color: theme.color,
      }}
      type="email"
      placeholder="Email"
    />
  );
}
