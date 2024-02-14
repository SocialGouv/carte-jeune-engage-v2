/* theme.ts */
import {
  StyleFunctionProps,
  extendTheme,
  theme as defaultTheme,
} from "@chakra-ui/react";
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

export const dottedPattern = (bgColor: string) => ({
  _after: {
    content: `""`,
    position: "absolute",
    bottom: -2, // Adjust this value as needed to align with your design
    left: 0,
    right: 0,
    height: "40px", // This is the height of the pseudo-element
    backgroundImage: `radial-gradient(circle, ${bgColor} 8px, rgba(0, 0, 0, 0) 8px)`, // The color should be the same as the border color
    backgroundSize: "23px 17px", // Adjust the size of the dots
    backgroundRepeat: "repeat-x",
    backgroundPosition: "bottom",
  },
});

const activeLabelStyles = {
  transform: "scale(1) translateY(-14px)",
  fontSize: "xs",
};

export const theme = extendTheme({
  components: {
    Button: {
      sizes: {
        lg: {
          borderRadius: "2xl",
          py: 8,
          fontWeight: "medium",
        },
        sm: {
          borderRadius: "lg",
          py: 12,
          fontWeight: "medium",
          whiteSpace: "normal",
        },
      },
      defaultProps: {
        size: "lg",
        colorScheme: "blackBtn",
      },
      variants: {
        solid: (props: StyleFunctionProps) => ({
          "@media(hover: none)": {
            _hover: {
              bg: defaultTheme.components.Button.variants?.solid(props).bg,
            },
          },
        }),
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, .chakra-autocomplete-has-value + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              mx: 5,
              my: 5,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "bgWhite",
      },
    }),
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
    whiteBtn: {
      "50": "#FFFFFF",
      "100": "#FFFFFF",
      "200": "#FFFFFF",
      "300": "#FFFFFF",
      "400": "#FFFFFF",
      "500": "#FFFFFF",
      "600": "#FFFFFF",
      "700": "#FFFFFF",
      "800": "#FFFFFF",
      "900": "#FFFFFF",
    },
    blackBtn: {
      "50": "#000000",
      "100": "#000000",
      "200": "#000000",
      "300": "#000000",
      "400": "#000000",
      "500": "#000000",
      "600": "#000000",
      "700": "#000000",
      "800": "#000000",
      "900": "#000000",
    },
    "cje-gray": {
      "50": "#f6f7f9",
      "100": "#c5c7cb",
      "200": "#cfd1d5",
      "300": "#d9dbdf",
      "400": "#e3e5e9",
      "500": "#edeff3",
      "600": "#f7f9fd",
      "700": "#ffffff",
      "800": "#ffffff",
      "900": "#ffffff",
    },
    success: "#42B918",
    error: "#DE190C",
    errorLight: "#FFE8E8",
    bgWhite: "#F7F7F7",
    disabled: "#9595B1",
    secondaryText: "#5C5C70",
    blackLight: "#20202C",
  },
  radii: {
    "1.5xl": "1.25rem",
  },
  fonts: {
    heading: Marianne.style.fontFamily,
    body: Marianne.style.fontFamily,
  },
});
