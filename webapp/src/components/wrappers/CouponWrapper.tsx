import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { FiCopy, FiLock, FiUnlock } from "react-icons/fi";
import {
  HiBuildingStorefront,
  HiCursorArrowRays,
  HiMiniCheck,
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
import StackItems, { StackItem } from "../offer/StackItems";
import Link from "next/link";
import { getItemsTermsOfUse } from "~/payload/components/CustomSelectField";
import { Offer } from "~/payload/payload-types";

type CouponWrapperProps = {
  children: ReactNode;
  coupon?: CouponIncluded;
  offer: OfferIncluded;
  handleOpenOtherConditions: () => void;
  handleActivateOffer: () => void;
  handleOpenExternalLink: () => void;
};

const CTAButton = ({
  offerKind,
  handleOpenExternalLink,
}: {
  offerKind: Offer["kind"];
  handleOpenExternalLink: () => void;
}) => {
  return (
    <Box mt={6}>
      {offerKind.startsWith("code") ? (
        <Button onClick={handleOpenExternalLink} w="full">
          Aller sur le site
        </Button>
      ) : (
        <Link href="/dashboard/account/card">
          <Button leftIcon={<Icon as={PassIcon} w={6} h={6} />} w="full">
            Présenter mon pass CJE
          </Button>
        </Link>
      )}
    </Box>
  );
};

const CouponWrapper = ({
  children,
  coupon,
  offer,
  handleOpenOtherConditions,
  handleActivateOffer,
  handleOpenExternalLink,
}: CouponWrapperProps) => {
  const { user } = useAuth();
  const toast = useToast();

  const isPassInCreation = useMemo(() => {
    if (!user) return false;
    return (
      (user.image !== undefined && user.status_image === "approved") ||
      (user.image === undefined && user.status_image === "pending")
    );
  }, [user]);

  const itemsSimpleTermsOfUse = useMemo(() => {
    if (!offer) return [];
    return [
      { icon: "HiMiniCheck", text: "J'active cette offre", slug: "activate" },
      getItemsTermsOfUse(offer.kind).filter((item) =>
        offer.termsOfUse
          ?.filter((termOfUse) => termOfUse.isHighlighted)
          .map((termOfUse) => termOfUse.slug)
          .includes(item.slug)
      ) ?? [],
    ].flat();
  }, [offer, coupon]);

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

  const getCouponWrapperContent = () => {
    if (offer.kind === "voucher" || offer.kind === "code") {
      return (
        <>
          {(offer.kind === "voucher" && isPassInCreation) ||
          offer.kind === "code" ? (
            <>
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
                mt={8}
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
                    <Icon
                      as={HiOutlineInformationCircle}
                      w={6}
                      h={6}
                      mt={0.5}
                    />
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
              {!coupon ? (
                <Divider mt={6} />
              ) : (
                <CTAButton
                  offerKind={offer.kind}
                  handleOpenExternalLink={handleOpenExternalLink}
                />
              )}
              <StackItems
                active={!!coupon}
                items={itemsSimpleTermsOfUse}
                title="Comment ça marche ?"
                props={{ mt: 6, spacing: 3 }}
                propsItem={{ color: !coupon ? "disabled" : undefined }}
              />
              {!coupon && (
                <Button onClick={handleActivateOffer} mt={6}>
                  J'active mon offre
                </Button>
              )}
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
                <Flex
                  bgColor="cje-gray.500"
                  borderRadius="full"
                  p={2.5}
                  ml={-1}
                >
                  <Icon as={HiWrenchScrewdriver} w={6} h={6} />
                </Flex>
              </Flex>
              <Text fontWeight="bold" px={10}>
                Votre pass CJE est en cours de création
              </Text>
              <Text fontWeight="medium" fontSize="sm">
                Notre équipe vérifie votre photo en ce moment. D’ici 24h vous
                aurez votre pass CJE pour bénéficier de toutes les offres en
                magasin disponibles sur l’application.
              </Text>
            </Flex>
          )}
        </>
      );
    } else {
      return (
        <>
          <Divider mt={6} />
          <StackItems
            active={!!coupon}
            items={itemsSimpleTermsOfUse}
            title="Comment ça marche ?"
            props={{ mt: 6, spacing: 3 }}
            propsItem={{ color: !coupon ? "disabled" : undefined }}
          />
          {!coupon ? (
            <Button onClick={handleActivateOffer} mt={6}>
              J'active mon offre
            </Button>
          ) : (
            <CTAButton
              offerKind={offer.kind}
              handleOpenExternalLink={handleOpenExternalLink}
            />
          )}
        </>
      );
    }
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
      <Flex alignItems="center" alignSelf="center" gap={2} mt={4}>
        <Icon
          as={
            offer.kind.startsWith("code")
              ? HiCursorArrowRays
              : HiBuildingStorefront
          }
          w={6}
          h={6}
        />
        <Text fontWeight="medium">
          {offer.kind.startsWith("code")
            ? `En ligne sur ${offer.partner.name}`
            : `dans ${offer.nbOfEligibleStores ?? 1} magasins participants`}
        </Text>
      </Flex>
      {getCouponWrapperContent()}
      <Flex flexDir="column">{children}</Flex>
    </Flex>
  );
};

export default CouponWrapper;
