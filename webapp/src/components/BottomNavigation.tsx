import { Flex, Icon, Text } from "@chakra-ui/react";
import { WalletIcon } from "./icons/wallet";
import { HomeIcon } from "./icons/home";
import { AccountIcon } from "./icons/account";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

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
      href: "/dashboard/offers",
    },
    {
      label: "Profil",
      icon: AccountIcon,
      href: "/dashboard/account",
    },
  ];

  return (
    <Flex
      borderTopRadius={24}
      bgColor="white"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      justifyContent="space-between"
      py={5}
      px={14}
    >
      {navigationItems.map(({ href, label, icon }) => (
        <Flex
          key={label}
          flexDir="column"
          alignItems="center"
          gap={1}
          cursor="pointer"
          onClick={() => {
            router.push(href);
          }}
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
    </Flex>
  );
};

export default BottomNavigation;
