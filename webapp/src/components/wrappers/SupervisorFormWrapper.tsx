import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { HiMiniPower } from "react-icons/hi2";

type SupervisorFormWrapperProps = {
  children: ReactNode;
};

const SupervisorFormWrapper = ({ children }: SupervisorFormWrapperProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    deleteCookie(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt");
    router.reload();
    router.push("/supervisor");
  };

  return (
    <Flex
      display="flex"
      flexDir="column"
      justifyContent={"space-between"}
      py={12}
      px={6}
      h="full"
    >
      <Flex flexDir={"column"}>
        <Heading mb={8}>
          Donner accès à l'application Carte Jeune Engagé
        </Heading>
        {children}
      </Flex>
      <Link onClick={handleLogout}>
        <Flex alignItems="center" gap={2}>
          <Icon as={HiMiniPower} color={"error"} w={6} h={6} />
          <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
            Me déconnecter
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default SupervisorFormWrapper;
