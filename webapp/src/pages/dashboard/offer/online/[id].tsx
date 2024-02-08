import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiBook, FiCopy, FiLink } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocalStorage } from "usehooks-ts";
import LoadingLoader from "~/components/LoadingLoader";
import ToastComponent from "~/components/ToastComponent";
import { CouponIcon } from "~/components/icons/coupon";
import OfferActivationModal from "~/components/modals/OfferActivationModal";
import CouponWrapper from "~/components/wrappers/CouponWrapper";
import OfferWrapper from "~/components/wrappers/OfferWrapper";
import { OfferIncluded } from "~/server/api/routers/offer";
import { couponAnimation } from "~/utils/animations";
import { api } from "~/utils/api";

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  const [userOffers, setUserOffers] = useLocalStorage<OfferIncluded[]>(
    "cje-user-offers",
    []
  );

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
    onSuccess: (response) => {
      if (offer)
        setUserOffers([
          ...userOffers,
          {
            ...offer,
            coupons: [response.data],
          },
        ]);
      refetchCoupon();
    },
  });

  const toast = useToast();

  const {
    isOpen: isModalOpen,
    onOpen,
    onClose,
  } = useDisclosure({
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
      couponAnimation(isSuccess, !!coupon);
    },
    { dependencies: [isLoadingCoupon, coupon, isSuccess] }
  );

  if (isLoadingOffer || !offer || isLoadingCoupon)
    return (
      <OfferWrapper>
        <Center h="full">
          <LoadingLoader />
        </Center>
      </OfferWrapper>
    );

  return (
    <OfferWrapper offer={offer} isModalOpen={isModalOpen}>
      <CouponWrapper coupon={coupon} offer={offer}>
        {!coupon ? (
          <>
            <Button rightIcon={<CouponIcon />} py={8} onClick={onOpen}>
              Activer le code promo
            </Button>
            <Divider />
          </>
        ) : (
          <ButtonGroup gap={3} className="btn-utils">
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
      </CouponWrapper>
      <Modal size="full" onClose={onClose} isOpen={isModalOpen}>
        <ModalOverlay />
        {offer && (
          <OfferActivationModal
            onClose={onClose}
            onlyCgu={isOnlyCgu}
            offer={offer}
            mutateCouponToUser={mutateCouponToUser}
          />
        )}
      </Modal>
    </OfferWrapper>
  );
}
