import { Box, Flex, HStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { HiChevronLeft } from "react-icons/hi2";

type StepsWrapperProps = {
  children: ReactNode;
  stepContext: { current: number; total: number };
  onBack?: () => void;
};

const StepsWrapper = ({
  children,
  stepContext: { current, total },
  onBack,
}: StepsWrapperProps) => {
  const router = useRouter();

  return (
    <Flex flexDir="column" h="full">
      <Icon
        as={HiChevronLeft}
        w={6}
        h={6}
        onClick={() => (onBack ? onBack() : router.back())}
        cursor="pointer"
      />
      <HStack w="full" spacing={2} my={6}>
        {[...Array(total)].map((_, index) => (
          <Box
            key={index}
            as={motion.div}
            layout
            bgColor={index < current ? "blackLight" : "cje-gray.500"}
            borderRadius="md"
            // Adjust the width of the steps based on the total, example if total is 4, then width should be 25%
            w={`${100 / total}%`}
            h="7px"
          />
        ))}
      </HStack>
      {children}
    </Flex>
  );
};

export default StepsWrapper;
