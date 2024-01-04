import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Head>
        <title>Carte Jeune Engagé</title>
        <meta name="description" content="Carte Jeune Engagé" />
      </Head>
      <Box
        as="main"
        role="main"
        background="linear-gradient(192deg, rgba(226, 227, 255, 0.50) 50.5%, rgba(234, 222, 255, 0.50) 100%), #FFF;"
      >
        <Box
          style={{
            backgroundImage: "url('/onboarding/background.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
          }}
        >
          <Container
            maxWidth={{ base: "container.xs", lg: "container.sm" }}
            px={pathname === "/" ? 0 : undefined}
            h="full"
          >
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}
