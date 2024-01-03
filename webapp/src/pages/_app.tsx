import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "~/layouts/DefaultLayout";
import "~/styles/globals.css";

import { api } from "~/utils/api";
import { ReactNode } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const getLayout = (children: ReactNode) => {
    return <DefaultLayout>{children}</DefaultLayout>;
  };

  return (
    <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
