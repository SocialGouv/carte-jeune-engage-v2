import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "~/components/Navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>Carte Jeune Engagé</title>
        <meta name="description" content="Carte Jeune Engagé" />
      </Head>
      {!pathname.startsWith("/admin") && <Navbar />}
      <main role="main">
        {pathname.startsWith("/admin") ? (
          children
        ) : (
          <Container>{children}</Container>
        )}
      </main>
    </>
  );
}
