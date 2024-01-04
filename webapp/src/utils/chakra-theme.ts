/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      sizes: {
        lg: {
          px: "1.5rem",
          borderRadius: "6.25rem",
        },
      },
      defaultProps: {
        size: "lg",
        colorScheme: "primary",
      },
    },
  },
  colors: {
    primary: {
      "50": "#dee8ff",
      "100": "#c3d3ff",
      "200": "#9fb5ff",
      "300": "#788dff",
      "400": "#5965fb",
      "500": "#4141f1",
      "700": "#302dd5",
      "800": "#2928ab",
      "900": "#282a87",
      "950": "#18184e",
    },
  },
});
