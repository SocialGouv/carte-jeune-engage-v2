import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import InstallationBanner from "~/components/InstallationBanner";

export default function DefaultLayout({
  children,
  classname,
}: {
  children: ReactNode;
  classname?: string;
}) {
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
      <Box
        as="main"
        role="main"
        className={classname}
        background={
          !pathname.startsWith("/dashboard")
            ? "linear-gradient(192deg, rgba(226, 227, 255, 0.50) 50.5%, rgba(234, 222, 255, 0.50) 100%), #FFF;"
            : "transparent"
        }
        bgColor={!pathname.startsWith("/dashboard") ? "transparent" : "bgWhite"}
      >
        <Box
          style={
            !pathname.startsWith("/dashboard")
              ? {
                  backgroundImage: "url('/images/onboarding/background.svg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                }
              : { height: "100%" }
          }
        >
          <Container
            maxWidth={{ base: "container.sm", lg: "container.sm" }}
            px={0}
            h="full"
          >
            {children}
          </Container>
          <InstallationBanner />
        </Box>
      </Box>
    </>
  );
}
