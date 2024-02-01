import { Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { WalletIcon } from "./icons/wallet";
import { HomeIcon } from "./icons/home";
import { AccountIcon } from "./icons/account";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FiLayers } from "react-icons/fi";

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Accueil",
      icon: HomeIcon,
      href: "/dashboard",
    },
    {
      label: "Mes réductions",
      icon: WalletIcon,
      href: "/dashboard/wallet",
    },
    {
      label: "Explorer",
      icon: FiLayers,
      href: "/dashboard/categories",
    },
    {
      label: "Profil",
      icon: AccountIcon,
      href: "/dashboard/account",
    },
  ];

  return (
    <SimpleGrid
      columns={4}
      borderTopRadius={24}
      bgColor="white"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      py={5}
      px={6}
    >
      {navigationItems.map(({ href, label, icon }) => (
        <Flex
          key={label}
          flexDir="column"
          alignItems="center"
          gap={1}
          cursor="pointer"
          onClick={() => router.push(href)}
        >
          <Icon
            as={icon}
            fill="none"
            color={pathname === href ? "black" : "disabled"}
            width="24px"
            height="24px"
          />
          <Text
            fontSize="2xs"
            fontWeight="bold"
            color={pathname === href ? "black" : "disabled"}
          >
            {label}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default BottomNavigation;
