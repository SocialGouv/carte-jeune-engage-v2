import {
  Box,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiMousePointer } from "react-icons/fi";

type WalletWrapperProps = {
  children: ReactNode;
};

const WalletWrapper = ({ children }: WalletWrapperProps) => {
  return (
    <Box pt={12} px={8} h="full">
      <Heading as="h2" textAlign="center">
        Mes Réductions
      </Heading>
      <Tabs
        isFitted
        variant="solid-rounded"
        colorScheme="whiteBtn"
        mt={6}
        h="full"
      >
        <TabList bgColor="cje-gray.500" p={1} borderRadius="3xl">
          <Tab color="black" alignItems="end" gap={2} py={2.5}>
            <Icon as={BsCart2} w={6} h={6} />
            <Text as="span" fontSize="sm">
              En magasin
            </Text>
          </Tab>
          <Tab color="black" alignItems="end" gap={2} py={2.5}>
            <Icon as={FiMousePointer} w={6} h={6} />
            <Text as="span" fontSize="sm">
              En ligne
            </Text>
          </Tab>
        </TabList>
        <TabPanels mt={8}>{children}</TabPanels>
      </Tabs>
    </Box>
  );
};

export default WalletWrapper;
