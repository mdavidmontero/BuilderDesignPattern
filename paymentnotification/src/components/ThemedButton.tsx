import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";

export const ThemedButton = () => {
  const { theme } = useThemeStore();

  return (
    <Button
      variant={theme.buttonVariant}
      style={{
        backgroundColor: theme.primaryColor,
        borderRadius: theme.borderRadius,
        color: theme.color,
      }}
    >
      Botón Temático
    </Button>
  );
};
