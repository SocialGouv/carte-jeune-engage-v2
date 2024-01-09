/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import localFont from "next/font/local";

export const Marianne = localFont({
  src: [
    {
      path: "../styles/fonts/Marianne-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../styles/fonts/Marianne-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/Marianne-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/Marianne-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/Marianne-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/Marianne-ExtraBold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

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
    bgWhite: "#F7F7FA",
  },
  fonts: {
    heading: Marianne.style.fontFamily,
    body: Marianne.style.fontFamily,
  },
});
