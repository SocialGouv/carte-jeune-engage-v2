import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "~/providers/Auth";
import { useLocalStorage } from "usehooks-ts";
import { CloseIcon } from "@chakra-ui/icons";
import { FiX } from "react-icons/fi";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
const InstallationBanner: React.FC = () => {
  // overlay show state
  const toast = useToast();
  const { user } = useAuth();
  const [overlayShowing, setOverlayShowing] = useState(false);
  const [userOutcome, setUserOutcome] = useLocalStorage<
    "accepted" | "dismissed" | null
  >("cje-pwa-user-outcome", null);

  const [showing, setShowing] = useState(false);

  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handleBeforeInstallPrompt = (event: Event) => {
    // Prevent the default behavior to keep the event available for later use
    event.preventDefault();

    // Save the event for later use
    setDeferredEvent(event as BeforeInstallPromptEvent);

    setShowing(true);
  };

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

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any)?.workbox !== undefined
    ) {
      // const wb = (window as any)?.workbox;
      // add event listeners to handle PWA lifecycle events
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [user]);

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
