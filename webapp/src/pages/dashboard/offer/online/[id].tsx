import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { api } from "~/utils/api";
import { ArrowForwardIcon, CheckIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { dottedPattern } from "~/utils/chakra-theme";
import { CouponIcon } from "~/components/icons/coupon";
import {
  FiBook,
  FiLock,
  FiGlobe,
  FiClock,
  FiRotateCw,
  FiTag,
  FiLink,
  FiCopy,
  FiUnlock,
} from "react-icons/fi";
import { TbBuildingStore } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ToastComponent from "~/components/ToastComponent";
import { OfferIncluded } from "~/server/api/routers/offer";
import Link from "next/link";
import Head from "next/head";
import LoadingLoader from "~/components/LoadingLoader";
import gsap, { Cubic } from "gsap";
import { useGSAP } from "@gsap/react";

const ModalContentComponent = ({
  onClose,
  onlyCgu,
  offer,
  mutateCouponToUser,
}: {
  onClose: () => void;
  onlyCgu?: boolean;
  offer: OfferIncluded;
  mutateCouponToUser: ({ offer_id }: { offer_id: number }) => void;
}) => {
  const validityToDate = new Date(offer.validityTo);

  const cguItems: { icon: IconType; text: string; cross?: boolean }[] = [
    { icon: FiGlobe, text: "Utilisable en ligne" },
    { icon: TbBuildingStore, text: "À utiliser en magasin", cross: true },
    {
      icon: FiClock,
      text: `À utiliser avant le ${validityToDate.toLocaleDateString()} !`,
    },
    { icon: FiRotateCw, text: "Utilisation illimité" },
    { icon: FiTag, text: "Non cumulable" },
  ];

  return (
    <ModalContent h="full">
      {onlyCgu && <ModalHeader mt={4}>Conditions d’utilisation</ModalHeader>}
      <ModalBody
        pos="sticky"
        display="flex"
        flexDir="column"
        justifyContent="end"
        h="full"
        py={10}
      >
        <List spacing={6} my="auto">
          {cguItems.map(({ icon, text, cross }, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon as={icon} w={6} h={6} mr={3}></ListIcon>
              <Text
                fontWeight="medium"
                textDecorationLine={cross ? "line-through" : "none"}
              >
                {text}
              </Text>
            </ListItem>
          ))}
        </List>
        <Button
          rightIcon={!onlyCgu ? <ArrowForwardIcon w={6} h={6} /> : undefined}
          onClick={() => {
            if (!onlyCgu) mutateCouponToUser({ offer_id: offer.id });
            onClose();
          }}
        >
          {!onlyCgu ? "Activer le code promo" : "Fermer"}
        </Button>
      </ModalBody>
    </ModalContent>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;
  const container = useRef(null);

  const { data: resultOffer, isLoading: isLoadingOffer } =
    api.offer.getById.useQuery(
      {
        id: parseInt(id as string),
      },
      { enabled: id !== undefined }
    );

  const {
    data: resultCoupon,
    isLoading: isLoadingCoupon,
    refetch: refetchCoupon,
  } = api.coupon.getOne.useQuery(
    {
      offer_id: parseInt(id as string),
    },
    { enabled: id !== undefined }
  );

  const { data: offer } = resultOffer || {};
  const { data: coupon } = resultCoupon || {};

  const [isOnlyCgu, setIsOnlyCgu] = useState(false);

  const {
    mutate: mutateCouponToUser,
    isLoading,
    isSuccess,
  } = api.coupon.assignToUser.useMutation({
    onSuccess: () => refetchCoupon(),
  });

  const toast = useToast();
  const theme = useTheme();
  const dotColor = theme.colors.bgWhite;

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => setIsOnlyCgu(false),
  });

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

  useGSAP(
    () => {
      if (isSuccess) {
        gsap.to("#coupon-code-icon", {
          backgroundColor: "#42B918",
          color: "white",
          duration: 1,
        });

        gsap.to("#coupon-code-icon-lock", {
          display: "none",
          duration: 0,
          delay: 0.5,
        });

        gsap.to("#coupon-code-icon-unlock", {
          display: "block",
          duration: 0,
          delay: 0.5,
        });
      }

      gsap.to("#coupon-code-icon", {
        opacity: coupon ? 0 : 1,
        duration: isSuccess ? 0.5 : 0,
        delay: isSuccess ? 1.25 : 0,
      });

      gsap.to("#coupon-code-text", {
        filter: coupon ? "blur(0px)" : "blur(4.5px)",
        duration: isSuccess ? 1 : 0,
        delay: isSuccess ? 1.75 : 0,
      });

      if (isSuccess) {
        gsap.fromTo(
          ".coupon-info",
          {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "top",
          },
          {
            scaleY: 1,
            transformOrigin: "top",
            opacity: 1,
            ease: Cubic.easeIn,
            duration: 0.75,
            delay: 1.5,
          }
        );

        gsap.fromTo(
          ".btn-utils",
          {
            opacity: 0,
            translateY: -35,
          },
          {
            opacity: 1,
            translateY: 0,
            duration: 1,
            ease: Cubic.easeIn,
            delay: 1.5,
          }
        );

        gsap.fromTo(
          ".btn-conditions",
          {
            translateY: -35,
            delay: 1,
          },
          {
            opacity: 1,
            duration: 1,
            translateY: 0,
            ease: Cubic.easeIn,
            delay: 1.5,
          }
        );
      }
    },
    { dependencies: [isLoadingCoupon, coupon, isSuccess] }
  );
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={isOpen ? "#ffffff" : offer?.partner.color}
        />
      </Head>
      <Flex flexDir="column" h="full" ref={container}>
        <Flex
          bgColor={offer?.partner.color}
          px={8}
          py={6}
          position="relative"
          sx={{ ...dottedPattern(dotColor) }}
          alignItems="center"
        >
          <Button
            position="absolute"
            colorScheme="whiteBtn"
            onClick={() => router.back()}
            size="md"
            iconSpacing={0}
            px={0}
            rightIcon={<ChevronLeftIcon w={6} h={6} color="black" />}
          />
          <Flex mx="auto" alignItems="center" gap={3}>
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor="white"
              p={2}
              borderRadius="full"
            >
              <Image
                src={offer?.partner.icon.url as string}
                alt={offer?.partner.icon.alt as string}
                width={48}
                height={48}
              />
            </Flex>
            <Text fontSize="xl" fontWeight="bold" color="white">
              {offer?.partner.name}
            </Text>
          </Flex>
        </Flex>
        {isLoadingOffer || !offer || isLoadingCoupon ? (
          <Center h="full">
            <LoadingLoader />
          </Center>
        ) : (
          <>
            <Flex
              flexDir="column"
              bgColor="bgWhite"
              overflowY="auto"
              px={8}
              h="full"
              gap={6}
              pb={12}
            >
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                textAlign="center"
                mt={6}
              >
                {offer?.title}
              </Heading>
              <Flex flexDir="column">
                <Box
                  position="relative"
                  borderRadius="xl"
                  w="full"
                  bgColor={coupon ? "white" : "cje-gray.500"}
                  textAlign="center"
                  py={10}
                >
                  <Text
                    id="coupon-code-text"
                    fontSize="2xl"
                    fontWeight="bold"
                    letterSpacing={4}
                  >
                    {coupon?.code ? coupon.code : "6FHDJFHEIDJF"}
                  </Text>
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
                </Box>
                {coupon && (
                  <Flex
                    className="coupon-info"
                    flexDir="column"
                    alignItems="center"
                    gap={1}
                    py={4}
                    bgColor="white"
                    borderRadius="xl"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right, #E9E9E9 55%, #fff 0%)",
                      backgroundSize: "27.5px 2px",
                      backgroundRepeat: "repeat-x",
                    }}
                  >
                    <Flex alignItems="center" gap={2}>
                      <Text fontSize="lg" fontWeight="bold">
                        Code promo activé
                      </Text>
                      <Flex bgColor="success" borderRadius="full" p={1}>
                        <Icon as={CheckIcon} w={3} h={3} color="white" />
                      </Flex>
                    </Flex>
                    <Text as="span" fontSize="sm" color="disabled">
                      Utilisable jusqu'au:{" "}
                      <Text as="span" color="black" fontWeight="bold">
                        {new Date(coupon.offer.validityTo).toLocaleDateString()}
                      </Text>
                    </Text>
                  </Flex>
                )}
              </Flex>
              {!coupon ? (
                <>
                  <Button rightIcon={<CouponIcon />} py={8} onClick={onOpen}>
                    Activer le code promo
                  </Button>
                  <Divider />
                </>
              ) : (
                <ButtonGroup gap={3} className="btn-utils">
                  <Button
                    size="sm"
                    colorScheme="cje-gray"
                    color="black"
                    w="full"
                  >
                    <Link href={coupon.offer.partner.url} target="_blank">
                      <Flex flexDir="column" alignItems="center" gap={3}>
                        <Icon as={FiLink} w={6} h={6} />
                        Aller sur le site du partenaire
                      </Flex>
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="cje-gray"
                    color="black"
                    w="full"
                    onClick={() => handleCopyToClipboard(coupon.code)}
                  >
                    <Flex flexDir="column" alignItems="center" gap={3}>
                      <Icon as={FiCopy} w={6} h={6} />
                      Copier le code promo
                    </Flex>
                  </Button>
                </ButtonGroup>
              )}
              <Button
                className="btn-conditions"
                size="sm"
                colorScheme="cje-gray"
                color="black"
                opacity={isLoading || isSuccess ? 0 : 1}
                onClick={() => {
                  setIsOnlyCgu(true);
                  onOpen();
                }}
              >
                <Flex flexDir="column" alignItems="center" gap={6}>
                  <Icon as={FiBook} w={6} h={6} />
                  Voir les conditions d'utilisation
                </Flex>
              </Button>
            </Flex>
            <Modal size="full" onClose={onClose} isOpen={isOpen}>
              <ModalOverlay />
              {offer && (
                <ModalContentComponent
                  onClose={onClose}
                  onlyCgu={isOnlyCgu}
                  offer={offer}
                  mutateCouponToUser={mutateCouponToUser}
                />
              )}
            </Modal>
          </>
        )}
      </Flex>
    </>
  );
}
