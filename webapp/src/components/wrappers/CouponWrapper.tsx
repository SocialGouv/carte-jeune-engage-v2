import {
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FiCopy, FiLock, FiUnlock } from "react-icons/fi";
import {
  HiBuildingStorefront,
  HiCursorArrowRays,
  HiOutlineInformationCircle,
  HiReceiptPercent,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import { CouponIncluded } from "~/server/api/routers/coupon";
import { OfferIncluded } from "~/server/api/routers/offer";
import ToastComponent from "../ToastComponent";
import { IoCloseCircleOutline } from "react-icons/io5";
import Barcode from "react-barcode";
import { useAuth } from "~/providers/Auth";
import { PassIcon } from "../icons/pass";

type CouponWrapperProps = {
  children: ReactNode;
  coupon?: CouponIncluded;
  offer: OfferIncluded;
  handleOpenOtherConditions: () => void;
};

const CouponWrapper = ({
  children,
  coupon,
  offer,
  handleOpenOtherConditions,
}: CouponWrapperProps) => {
  const { user } = useAuth();
  const toast = useToast();

  const handleCopyToClipboard = (text: string) => {
    toast({
      render: () => (
        <ToastComponent
          text="Code promo copié avec succès"
          icon={IoCloseCircleOutline}
        />
      ),
      duration: 2000,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <Flex
      flexDir="column"
      overflowY="auto"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      px={8}
      h="full"
      pb={12}
    >
      <Heading
        as="h3"
        fontSize="2xl"
        fontWeight="extrabold"
        textAlign="center"
        mt={6}
      >
        {offer.title}
      </Heading>
      {offer.kind === "code" ? (
        <Flex alignItems="center" alignSelf="center" gap={2} mt={4}>
          <Icon as={HiCursorArrowRays} w={6} h={6} />
          <Text fontWeight="medium">En ligne sur {offer.partner.name}</Text>
        </Flex>
      ) : offer.kind === "voucher" ? (
        <Flex alignItems="center" alignSelf="center" gap={2} mt={4}>
          <Icon as={HiBuildingStorefront} w={6} h={6} />
          <Text fontWeight="medium">
            dans {offer.nbOfEligibleStores ?? 1} magasins participants
          </Text>
        </Flex>
      ) : null}
      {(offer.kind === "voucher" &&
        ((user?.image !== undefined && user?.status_image === "approved") ||
          (user?.image === undefined && user?.status_image === "pending"))) ||
      offer.kind !== "voucher" ? (
        <>
          <Flex flexDir="column" mt={8}>
            <Flex
              flexDir="column"
              position="relative"
              gap={5}
              borderRadius="xl"
              w="full"
              bgColor={coupon ? "bgWhite" : "cje-gray.500"}
              border={coupon ? "1px solid" : "none"}
              borderColor="#B5BBBD"
              textAlign="center"
              px={4}
              py={5}
            >
              {coupon && (
                <HStack spacing={3} align="center" alignSelf="center">
                  <Icon as={HiReceiptPercent} w={6} h={6} />
                  <Text fontSize="lg" fontWeight="bold">
                    {offer.kind === "code"
                      ? "Mon code promo à saisir"
                      : "Mon code barre à scanner"}
                  </Text>
                </HStack>
              )}
              <Flex
                id="coupon-code-text"
                alignItems="center"
                justifyContent="center"
                gap={3}
                borderRadius="lg"
                bgColor={coupon ? "white" : "cje-gray.500"}
                py={8}
              >
                {offer.kind === "code" ? (
                  <Text fontSize="2xl" fontWeight="bold" letterSpacing={3}>
                    {coupon?.code ? coupon.code : "6FHDJFHEIDJF"}
                  </Text>
                ) : (
                  <Barcode
                    value={coupon?.code ?? "6FHDJFHEIDJF"}
                    background={coupon ? "white" : "#edeff3"}
                    height={70}
                  />
                )}
                {coupon && offer.kind === "code" && (
                  <Icon
                    as={FiCopy}
                    w={6}
                    h={6}
                    mt={1}
                    onClick={() =>
                      handleCopyToClipboard(coupon?.code as string)
                    }
                  />
                )}
              </Flex>
              {coupon && (
                <HStack spacing={2} align="center">
                  <Icon as={HiOutlineInformationCircle} w={6} h={6} mt={0.5} />
                  <Text
                    fontWeight="medium"
                    textDecoration="underline"
                    textUnderlineOffset={3}
                    onClick={handleOpenOtherConditions}
                  >
                    Conditions d’utilisation
                  </Text>
                </HStack>
              )}
              <Flex
                id="coupon-code-icon"
                position="absolute"
                bgColor="white"
                p={5}
                shadow="md"
                borderRadius="full"
                justifyContent="center"
                alignItems="center"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Icon
                  id="coupon-code-icon-unlock"
                  as={FiUnlock}
                  display="none"
                  w={6}
                  h={6}
                />
                <Icon id="coupon-code-icon-lock" as={FiLock} w={6} h={6} />
              </Flex>
            </Flex>
          </Flex>
          {!coupon && <Divider mt={6} />}
        </>
      ) : (
        <Flex
          flexDir="column"
          mt={8}
          borderRadius="xl"
          w="full"
          bgColor="cje-gray.500"
          textAlign="center"
          gap={4}
          alignItems="center"
          p={8}
        >
          <Flex alignItems="center" alignSelf="center">
            <Flex bgColor="blackLight" py={1.5} px={2.5} borderRadius="lg">
              <PassIcon color="cje-gray.500" />
            </Flex>
            <Flex bgColor="cje-gray.500" borderRadius="full" p={2.5} ml={-1}>
              <Icon as={HiWrenchScrewdriver} w={6} h={6} />
            </Flex>
          </Flex>
          <Text fontWeight="bold" px={10}>
            Votre pass CJE est en cours de création
          </Text>
          <Text fontWeight="medium" fontSize="sm">
            Notre équipe vérifie votre photo en ce moment. D’ici 24h vous aurez
            votre pass CJE pour bénéficier de toutes les offres en magasin
            disponibles sur l’application.
          </Text>
        </Flex>
      )}

      <Flex flexDir="column" mt={coupon ? 6 : 0}>
        {children}
      </Flex>
    </Flex>
  );
};

export default CouponWrapper;
