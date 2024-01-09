import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "~/layouts/DefaultLayout";
import "~/styles/globals.css";

import { api } from "~/utils/api";
import { ReactNode } from "react";
import { theme } from "~/utils/chakra-theme";
import { usePathname } from "next/navigation";
import { AuthProvider } from "~/providers/Auth";

const MyApp: AppType = ({ Component, pageProps }) => {
  const pathname = usePathname();
  const getLayout = (children: ReactNode) => {
    if (pathname.startsWith("/admin")) {
      return children;
    } else {
      return <DefaultLayout>{children}</DefaultLayout>;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
