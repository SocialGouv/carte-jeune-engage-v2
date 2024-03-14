import { Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  HiHome,
  HiMiniSquares2X2,
  HiMiniSwatch,
  HiMiniUser,
} from "react-icons/hi2";

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const updatePadding = () => {
      const computedStyle = getComputedStyle(document.body);

      const safeAreaInsetBottom = computedStyle.getPropertyValue(
        "--safe-area-inset-bottom"
      );

      const bottomNavigation = document.getElementById("cje-bottom-navigation");

      if (bottomNavigation)
        bottomNavigation.style.paddingBottom =
          safeAreaInsetBottom !== "0px" ? safeAreaInsetBottom : "20px";
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);

    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  const navigationItems = [
    {
      label: "Accueil",
      icon: HiHome,
      href: "/dashboard",
    },
    {
      label: "Explorer",
      icon: HiMiniSquares2X2,
      href: "/dashboard/categories",
    },
    {
      label: "Mes réductions",
      icon: HiMiniSwatch,
      href: "/dashboard/wallet",
    },
    {
      label: "Profil",
      icon: HiMiniUser,
      href: "/dashboard/account",
    },
  ];

  return (
    <SimpleGrid
      id="cje-bottom-navigation"
      columns={4}
      borderTopRadius={24}
      bgColor="white"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      pt={5}
      px={6}
    >
      {navigationItems.map(({ href, label, icon }) => (
        <Flex
          key={label}
          flexDir="column"
          alignItems="center"
          gap={0.5}
          cursor="pointer"
          onClick={() => router.push(href)}
        >
          <Icon
            as={icon}
            color={pathname === href ? "black" : "disabled"}
            width={6}
            height={6}
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
