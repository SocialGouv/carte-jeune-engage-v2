import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  HiBuildingLibrary,
  HiChatBubbleOvalLeftEllipsis,
  HiCurrencyEuro,
  HiMiniChevronRight,
  HiMiniPower,
  HiUser,
  HiUserCircle,
} from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import InstallationBanner from "~/components/InstallationBanner";
import { useAuth } from "~/providers/Auth";

export default function Account() {
  const router = useRouter();

  const { user } = useAuth();

  const userCreatedAtFormatted = useMemo(() => {
    if (!user) return "";
    return new Date(user.createdAt).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [user]);

  const itemsPrimary: {
    label: string;
    href: string;
    icon: IconType;
  }[] = [
    {
      label: "Suivre mes économies",
      href: "/dashboard/account/history",
      icon: HiCurrencyEuro,
    },
    {
      label: "Ma carte CJE",
      href: "/dashboard/account/card",
      icon: HiUserCircle,
    },
    {
      label: "J'ai besoin d'aide",
      href: "/dashboard/account/help",
      icon: HiChatBubbleOvalLeftEllipsis,
    },
  ];

  const itemsSecondary: {
    label: string;
    href?: string;
    icon: IconType;
    iconColor?: string;
    onClick?: () => void;
  }[] = [
    {
      label: "Informations personnelles",
      href: "/dashboard/account/information",
      icon: HiUser,
    },
    { label: "Mentions légales", href: "/legal", icon: HiBuildingLibrary },
    {
      label: "Me déconnecter",
      onClick: () => handleLogout(),
      icon: HiMiniPower,
      iconColor: "error",
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    deleteCookie(process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt");
    router.reload();
    router.push("/");
  };

  return (
    <Box pt={12} pb={36} px={8}>
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="extrabold" lineHeight="shorter">
          {user?.firstName},
          <br />
          vous avez économisé
        </Text>
        <Text fontSize="5xl" fontWeight="extrabold">
          0€
        </Text>
        <Text fontSize="xs" fontWeight="medium" mt={2}>
          Depuis que vous utilisez la carte jeune : {userCreatedAtFormatted}
        </Text>
      </Box>
      <Flex flexDir="column" mt={8} mb={6} gap={4}>
        {itemsPrimary.map((item) => (
          <Link href={item.href} key={item.icon.toString()} color="blue">
            <Flex
              alignItems="center"
              gap={4}
              bgColor="cje-gray.500"
              p={4}
              borderRadius="1.5xl"
            >
              <Flex bgColor="blackLight" p={1} borderRadius="lg">
                <Icon as={item.icon} fill="white" w={6} h={6} />
              </Flex>
              <Flex flexDir="column">
                <Text fontWeight="bold" noOfLines={1}>
                  {item.label}
                </Text>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
      <InstallationBanner withoutUserOutcome={true} theme="dark" />
      <Flex flexDir="column" mt={8} gap={8} px={5}>
        {itemsSecondary.map((item) => (
          <Link
            href={item.href ?? ""}
            key={item.icon.toString()}
            onClick={item.onClick}
            color="blue"
          >
            <Flex alignItems="center" gap={4}>
              <Icon as={item.icon} color={item.iconColor} w={6} h={6} />
              <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                {item.label}
              </Text>
              <Icon as={HiMiniChevronRight} w={6} h={6} ml="auto" />
            </Flex>
          </Link>
        ))}
      </Flex>
      <Text fontSize="xs" fontWeight="medium" textAlign="center" mt={12}>
        Version appli beta test V0001
      </Text>
    </Box>
  );
}
