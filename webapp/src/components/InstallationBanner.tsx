import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { BeforeInstallPromptEvent, useAuth } from "~/providers/Auth";
import { useLocalStorage } from "usehooks-ts";
import { CloseIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";

type Props = {
  withoutUserOutcome: boolean;
  theme: "light" | "dark";
};

const InstallationBanner: React.FC<Props> = ({ withoutUserOutcome, theme }) => {
  // overlay show state
  const toast = useToast();
  const { user } = useAuth();
  const [userOutcome, setUserOutcome] = useLocalStorage<
    "accepted" | "dismissed" | null
  >("cje-pwa-user-outcome", null);

  const { showing, deferredEvent, setShowing, setDeferredEvent } = useAuth();

  async function handleInstallClick() {
    if (deferredEvent) {
      await deferredEvent.prompt();
      const { outcome } = await deferredEvent.userChoice;
      setUserOutcome(outcome);
      setDeferredEvent(null);
    } else {
      toast({
        title: "Installation failed, please try again later!",
        status: "error",
      });
    }

    setShowing(false);
  }

  if (
    !showing ||
    user === null ||
    (!withoutUserOutcome && userOutcome === "dismissed")
  )
    return null;

  return (
    <Flex
      flexDir="column"
      mb={4}
      p={4}
      gap={3}
      borderRadius="1.5xl"
      bgColor={theme === "light" ? "cje-gray.500" : "blackLight"}
      color={theme === "light" ? "black" : "white"}
    >
      <Flex alignItems="flex-start">
        <Text fontSize="lg" fontWeight="bold" w="85%">
          Ajouter l’application sur votre téléphone
        </Text>
        {!withoutUserOutcome && (
          <Icon
            as={FiX}
            ml="auto"
            h={7}
            w={7}
            onClick={() => setUserOutcome("dismissed")}
          />
        )}
      </Flex>
      <Text fontSize="sm" fontWeight="medium">
        Créer un raccourci sur votre téléphone pour pouvoir accéder à toutes vos
        promotions simplement et rapidement.
      </Text>
      <Button
        size="lg"
        mt={3}
        py={3}
        fontSize="md"
        fontWeight="bold"
        color="black"
        colorScheme="whiteBtn"
        onClick={handleInstallClick}
      >
        Ajouter l’application sur l’accueil
      </Button>
    </Flex>
  );
};

export default InstallationBanner;
