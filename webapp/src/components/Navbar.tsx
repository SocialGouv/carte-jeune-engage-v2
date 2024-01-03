import { Link } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Navbar() {
  const navigationItems: { label: string; href: string }[] = [
    { label: "Accueil", href: "/" },
    { label: "Connexion", href: "/login" },
    { label: "Inscription", href: "/register" },
  ];

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      px={16}
      py={4}
      shadow="md"
    >
      <Link href="/">
        <Image
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Company Logo"
          width={32}
          height={32}
        />
        <Text srOnly>Company Logo</Text>
      </Link>
      <Flex as="nav" alignItems="center" gap={8}>
        {navigationItems.map(({ label, href }) => (
          <Link
            key={href}
            fontWeight="medium"
            color="gray.700"
            _hover={{ textDecoration: "none" }}
            href={href}
          >
            {label}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
