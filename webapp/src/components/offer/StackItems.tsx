import {
  As,
  ChakraProps,
  HStack,
  Icon,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

export type StackItem = {
  text: string;
  icon?: As;
};

type StackItemsProps = {
  items: StackItem[];
  active?: boolean;
  title?: string;
  props?: StackProps;
  propsItem?: ChakraProps;
};

const propsActiveText = {
  py: 2,
  px: 3,
  borderRadius: "full",
  bgColor: "sucessLight",
} as ChakraProps;

const StackItems = ({
  items,
  title,
  active,
  props,
  propsItem,
}: StackItemsProps) => {
  return (
    <VStack spacing={props?.spacing ?? 6} align="start" {...props}>
      {title && (
        <Text fontSize="sm" fontWeight="bold">
          {title}
        </Text>
      )}
      {items.map(({ text, icon }, index) => (
        <HStack
          key={index}
          spacing={3}
          w="full"
          {...(active && index === 0 ? propsActiveText : undefined)}
          {...(index !== 0 ? propsItem : undefined)}
        >
          {icon && <Icon as={icon} w={6} h={6} />}
          <Text fontWeight="medium">{text}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

export default StackItems;
