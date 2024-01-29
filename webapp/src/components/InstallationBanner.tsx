import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "~/providers/Auth";
import { useLocalStorage } from "usehooks-ts";
import { CloseIcon } from "@chakra-ui/icons";

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
    <Box
      position="absolute"
      bottom={24}
      left={6}
      right={6}
      bg="white"
      zIndex={49}
      p={4}
      borderRadius={8}
      bgColor="primary.500"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Flex flexDir="column" gap={1} w="70%">
          <Text fontSize="md" fontWeight="bold" color="white">
            Installer l'application
          </Text>
          <Text fontSize="xs" color="white" noOfLines={2}>
            Pour une meilleure expérience, installez l'app sur votre téléphone.
          </Text>
        </Flex>
        <Button
          size="md"
          variant="ghost"
          color="white"
          onClick={handleInstallClick}
        >
          Installer
        </Button>
        <CloseIcon
          position="absolute"
          h={3}
          w={3}
          right={-1}
          top={-1}
          color="white"
          onClick={() => setUserOutcome("dismissed")}
        />
      </Flex>
    </Box>
  );
};

export default InstallationBanner;
