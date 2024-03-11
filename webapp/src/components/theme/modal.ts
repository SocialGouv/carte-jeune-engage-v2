import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { useBreakpoint } from "@chakra-ui/react";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const dialogPart = defineStyle({
  maxWidth: "calc(100% - 150px)",
  paddingBottom: 0,
  borderRadius: "3xl",
});

const bodyPart = defineStyle({
  px: 12,
  pb: 12,
});

const sizes = {
  desktop: definePartsStyle({ dialog: dialogPart, body: bodyPart }),
};

export const modalTheme = defineMultiStyleConfig({
  sizes,
});
