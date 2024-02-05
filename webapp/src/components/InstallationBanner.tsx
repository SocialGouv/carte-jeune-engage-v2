import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { BeforeInstallPromptEvent, useAuth } from "~/providers/Auth";
import { useLocalStorage } from "usehooks-ts";
import { CloseIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";

const InstallationBanner: React.FC = () => {
  // overlay show state
  const toast = useToast();
  const { user } = useAuth();
  const [overlayShowing, setOverlayShowing] = useState(false);
  const [userOutcome, setUserOutcome] = useLocalStorage<
    "accepted" | "dismissed" | null
  >("cje-pwa-user-outcome", null);

  const { showing, deferredEvent, setShowing, setDeferredEvent } = useAuth();

  async function handleInstallClick() {
    if (deferredEvent) {
      setOverlayShowing(true);
      await deferredEvent.prompt();
      const { outcome } = await deferredEvent.userChoice;
      setUserOutcome(outcome);
      setOverlayShowing(false);
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
    overlayShowing ||
    !showing ||
    user === null ||
    userOutcome === "dismissed"
  )
    return null;

  return (
    <Flex
      flexDir="column"
      mb={4}
      p={4}
      gap={4}
      borderRadius="xl"
      bgColor="cje-gray.500"
    >
      <Flex alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold" w="85%">
          Ajouter l’application sur votre téléphone
        </Text>
        <Icon
          as={FiX}
          ml="auto"
          h={7}
          w={7}
          onClick={() => setUserOutcome("dismissed")}
        />
      </Flex>
      <Text fontWeight="medium">
        Créer un raccourci sur votre téléphone pour pouvoir accéder à toutes vos
        promotions simplement et rapidement.
      </Text>
      <Button
        size="lg"
        mt={3}
        py={3}
        fontSize="md"
        fontWeight="medium"
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
