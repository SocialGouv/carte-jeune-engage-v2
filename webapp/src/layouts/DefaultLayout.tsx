import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import InstallationBanner from "~/components/InstallationBanner";
import BottomNavigation from "~/components/BottomNavigation";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Carte Jeune Engagé</title>
        <meta name="description" content="Carte Jeune Engagé" />
        <link rel="shortcut icon" href="/pwa/appIcon/maskable_icon_x48.png" />
        <link rel="manifest" href="/pwa/manifest.json" />
        /* iOS */
        <meta name="apple-mobile-web-app-status-bar-style" content="#F7F7FA" />
        <link
          rel="apple-touch-icon"
          href="/pwa/appIcon/maskable_icon_x192.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Box as="main" role="main" bgColor="bgWhite">
        <Container
          maxWidth={{ base: "container.sm", lg: "container.sm" }}
          px={0}
          h="full"
        >
          {children}
        </Container>
        {(pathname === "/dashboard" ||
          pathname === "/dashboard/offers" ||
          pathname === "/dashboard/account") && <BottomNavigation />}
        <InstallationBanner />
      </Box>
    </>
  );
}
