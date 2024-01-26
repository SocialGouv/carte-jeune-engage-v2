import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
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
} from "react-icons/fi";
import { TbBuildingStore } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ToastComponent from "~/components/ToastComponent";
import { OfferIncluded } from "~/server/api/routers/offer";
import Link from "next/link";
import Head from "next/head";

const DrawerContentComponent = ({
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
    <DrawerContent h="full">
      {onlyCgu && <DrawerHeader mt={4}>Conditions d’utilisation</DrawerHeader>}
      <DrawerBody
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
      </DrawerBody>
    </DrawerContent>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  const [isOnlyCgu, setIsOnlyCgu] = useState(false);

  const { data: resultOffer } = api.offer.getById.useQuery(
    {
      id: parseInt(id as string),
    },
    { enabled: id !== undefined }
  );

  const { data: resultCoupon, refetch: refetchCoupon } =
    api.coupon.getOne.useQuery(
      {
        offer_id: parseInt(id as string),
      },
      { enabled: id !== undefined }
    );

  const { data: offer } = resultOffer || {};
  const { data: coupon } = resultCoupon || {};

  const { mutate: mutateCouponToUser } = api.coupon.assignToUser.useMutation({
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

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={isOpen ? "#ffffff" : offer?.partner.color}
        />
      </Head>
      <Flex flexDir="column" h="full">
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
                fontSize="2xl"
                fontWeight="bold"
                letterSpacing={4}
                sx={!coupon ? { filter: "blur(4.5px)" } : {}}
              >
                {coupon?.code ? coupon.code : "6FHDJFHEIDJF"}
              </Text>
              {!coupon && (
                <Flex
                  position="absolute"
                  p={5}
                  shadow="md"
                  borderRadius="full"
                  bgColor="white"
                  justifyContent="center"
                  alignItems="center"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  <Icon
                    as={FiLock}
                    w={6}
                    h={6}
                    aria-label="Copier le code promo"
                  />
                </Flex>
              )}
            </Box>
            {coupon && (
              <Flex
                flexDir="column"
                alignItems="center"
                py={4}
                gap={1}
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
            <ButtonGroup gap={3}>
              <Button size="sm" colorScheme="cje-gray" color="black" w="full">
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
            size="sm"
            colorScheme="cje-gray"
            color="black"
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
        <Drawer
          placement="bottom"
          size="full"
          onClose={onClose}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          {offer && (
            <DrawerContentComponent
              onClose={onClose}
              onlyCgu={isOnlyCgu}
              offer={offer}
              mutateCouponToUser={mutateCouponToUser}
            />
          )}
        </Drawer>
      </Flex>
    </>
  );
}
