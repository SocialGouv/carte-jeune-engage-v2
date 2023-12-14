import Head from "next/head";
import type { ReactNode } from "react";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Header, type HeaderProps } from "@codegouvfr/react-dsfr/Header";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();

  const quickAccessItems: HeaderProps.QuickAccessItem[] = [
    !pathname.startsWith("/administration")
      ? {
          iconId: "fr-icon-account-line",
          linkProps: {
            href: "/login",
            target: "_self",
          },
          text: "Connexion / Inscription",
        }
      : {
          iconId: "ri-logout-circle-line",
          buttonProps: {
            onClick: () => {
              void signOut();
            },
          },
          text: "Déconnexion",
        },
  ];

  const navigationItems: MainNavigationProps.Item[] = [];

  return (
    <>
      <Head>
        <title>Carte Jeune Engagé</title>
        <meta name="description" content="Carte Jeune Engagé" />
      </Head>
      <Header
        brandTop={
          <>
            REPUBLIQUE <br /> FRANCAISE
          </>
        }
        homeLinkProps={{
          href: "/",
          title: "Accueil",
        }}
        id="fr-header-public-header"
        quickAccessItems={quickAccessItems}
        navigation={navigationItems}
        serviceTitle="Carte Jeune Engagé"
        serviceTagline="baseline - précisions sur l'organisation"
      />
      <main id="main" role="main">
        {children}
      </main>
      <Footer
        accessibility="non compliant"
        bottomItems={[headerFooterDisplayItem]}
      />
    </>
  );
}
