import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { HiChevronLeft } from "react-icons/hi2";

type StepsWrapperProps = {
  children: ReactNode;
  stepContext: { current: number; total: number };
};

const StepsWrapper = ({
  children,
  stepContext: { current, total },
}: StepsWrapperProps) => {
  const router = useRouter();

  return (
    <Flex flexDir="column" h="full">
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        pt={8}
      >
        <Icon
          as={HiChevronLeft}
          w={6}
          h={6}
          onClick={() => router.back()}
          cursor="pointer"
          position="absolute"
          left={6}
        />
        <Box bgColor="cje-gray.300" borderRadius="xl" w="30%" h="6px">
          <Box
            as={motion.div}
            layout
            h="6px"
            w={`${(current / total) * 100}%`}
            borderRadius="xl"
            bgColor="blackLight"
          />
        </Box>
      </Flex>
      {children}
    </Flex>
  );
};

export default StepsWrapper;
