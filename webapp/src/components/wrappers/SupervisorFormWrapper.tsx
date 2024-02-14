import { Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type SupervisorFormWrapperProps = {
  children: ReactNode;
};

const SupervisorFormWrapper = ({ children }: SupervisorFormWrapperProps) => {
  return (
    <Flex display="flex" flexDir="column" py={12} px={6} h="full">
      <Heading mb={8}>Donner accès à l'application Carte Jeune Engagé</Heading>
      {children}
    </Flex>
  );
};

export default SupervisorFormWrapper;
