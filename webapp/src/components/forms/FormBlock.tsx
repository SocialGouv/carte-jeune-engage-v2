import { Flex } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  value: string;
  currentValue: string;
  onChange: (value: string | undefined) => void;
};

const FormBlock = ({ children, value, currentValue, onChange }: Props) => {
  return (
    <Flex
      flex={1}
      bgColor="cje-gray.500"
      borderRadius="2xl"
      p={5}
      fontWeight="medium"
      justifyContent="center"
      onClick={() => onChange(value)}
      border="2px solid"
      borderColor={currentValue === value ? "blackLight" : "transparent"}
    >
      {children}
    </Flex>
  );
};

export default FormBlock;
