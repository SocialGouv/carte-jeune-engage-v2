import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	HStack,
	Icon,
	Spinner,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useDisclosure,
	useSteps,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import {
	HiArrowRight,
	HiInformationCircle,
	HiLink,
	HiMiniCheck,
	HiOutlineCheckBadge,
	HiQuestionMarkCircle,
} from "react-icons/hi2";
import ChakraNextImage from "~/components/ChakraNextImage";
import LoadingLoader from "~/components/LoadingLoader";
import BaseModal from "~/components/modals/BaseModal";
import StackItems, { StackItem } from "~/components/offer/StackItems";
import StepsButtons from "~/components/offer/StepsButtons";
import CouponWrapper from "~/components/wrappers/CouponWrapper";
import OfferWrapper from "~/components/wrappers/OfferWrapper";
import StepsWrapper from "~/components/wrappers/StepsWrapper";
import { couponAnimation } from "~/utils/animations";
import { api } from "~/utils/api";

const itemsTermsOfUse = [
	{ text: "Copier le code promo", icon: FiCopy },
	{
		text: "Utiliser le lien du site qui est dans mon application",
		icon: HiLink,
	},
	{
		text: "Coller le code promo au moment du paiement en ligne sur le site",
		icon: FiCopy,
	},
] as StackItem[];

const itemsExternalLink = [
	{
		text: "Tous les sites de nos partenaires sont sécurisés",
		icon: HiLockClosed,
	},
	{
		text: "Vos données sont protégées et ne sont pas diffusées au partenaire",
		icon: HiOutlineCheckBadge,
	},
] as StackItem[];

export default function Dashboard() {
	const router = useRouter();
	const { id } = router.query;

	const [timeoutIdExternalLink, setTimeoutIdExternalLink] =
		useState<NodeJS.Timeout>();

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

	const {
		mutate: mutateCouponToUser,
		isLoading,
		isSuccess,
	} = api.coupon.assignToUser.useMutation({
		onSuccess: () => refetchCoupon(),
	});

	const nbSteps = 2;

	const { activeStep, setActiveStep } = useSteps({
		index: 1,
		count: nbSteps,
	});

	const {
		isOpen: isOpenActivateOffer,
		onOpen: onOpenActivateOffer,
		onClose: onCloseActivateOffer,
	} = useDisclosure();

	const {
		isOpen: isOpenTermsOfUse,
		onOpen: onOpenTermsOfUse,
		onClose: onCloseTermsOfUse,
	} = useDisclosure();

	const {
		isOpen: isOpenOtherConditions,
		onOpen: onOpenOtherConditions,
		onClose: onCloseOtherConditions,
	} = useDisclosure();

	const {
		isOpen: isOpenExternalLink,
		onOpen: onOpenExternalLink,
		onClose: onCloseExternalLink,
	} = useDisclosure({
		onOpen: () => {
			const timeoutId = setTimeout(() => {
				window.open(offer?.partner.url, "_blank");
				onCloseExternalLink();
			}, 1000);
			setTimeoutIdExternalLink(timeoutId);
		},
		onClose: () => clearTimeout(timeoutIdExternalLink),
	});

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
		<OfferWrapper offer={offer} isModalOpen={isOpenActivateOffer}>
			<CouponWrapper
				coupon={coupon}
				offer={offer}
				handleOpenOtherConditions={onOpenOtherConditions}
			>
				{coupon && (
					<Button onClick={onOpenExternalLink}>Aller sur le site</Button>
				)}
				<StackItems
					active={!!coupon}
					items={[
						{
							text: !coupon ? "J'active cette offre" : "Cette offre est active",
							icon: HiMiniCheck,
						},
						{ text: "Je copie mon code promo", icon: FiCopy },
						{ text: "Je vais sur le site de l’offre", icon: HiLink },
					]}
					title="Comment ça marche ?"
					props={{ mt: 6, spacing: 3 }}
					propsItem={{ color: !coupon ? "disabled" : undefined }}
				/>
				{!coupon && (
					<Button onClick={onOpenActivateOffer} mt={6}>
						J'active mon offre
					</Button>
				)}
				<Divider my={6} />
				<Button
					className="btn-conditions"
					size="sm"
					colorScheme="cje-gray"
					color="black"
					onClick={onOpenTermsOfUse}
				>
					<Flex flexDir="column" alignItems="center" gap={3}>
						<Icon as={HiQuestionMarkCircle} w={6} h={6} />
						<Text fontWeight="bold" fontSize="sm">
							Comment ça marche ?
						</Text>
					</Flex>
				</Button>
				<Divider my={6} />
				{
					!!(offer.conditions ?? []).length && (

						<Flex flexDir="column" gap={2}>
							<HStack spacing={4}>
								<Icon as={HiInformationCircle} w={6} h={6} />
								<Text fontWeight="extrabold">Conditions</Text>
							</HStack>
							<Text fontWeight="medium" my={2}>
								<Text>
									{
										(offer.conditions ?? []).slice(0, 2).map(condition => <Text mb={2}>{condition.text}<br /></Text>)
									}
								</Text>
							</Text>
							{
								(offer.conditions ?? []).length > 2 && (

									<HStack
										spacing={1}
										w="fit-content"
										borderBottom="1px solid black"
										onClick={onOpenOtherConditions}
									>
										<Text as="span" fontWeight="medium">
											Lire la suite
										</Text>
										<Icon as={HiArrowRight} w={4} h={4} />
									</HStack>
								)
							}
						</Flex>
					)
				}
			</CouponWrapper>
			<BaseModal
				onClose={onCloseActivateOffer}
				isOpen={isOpenActivateOffer}
				hideCloseBtn
			>
				<StepsWrapper
					stepContext={{ current: activeStep, total: 2 }}
					onBack={() =>
						activeStep !== 1
							? setActiveStep(activeStep - 1)
							: onCloseActivateOffer()
					}
				>
					<Tabs
						index={activeStep - 1}
						onChange={(index) => setActiveStep(index)}
						h="full"
					>
						<TabPanels h="full">
							<TabPanel as={Flex} flexDir="column" h="full" px={0}>
								<Text fontSize="2xl" fontWeight="extrabold">
									Comment bénificier de cette offre ?
								</Text>
								<StackItems items={itemsTermsOfUse} props={{ mt: 6 }} />
								<StepsButtons
									activeStep={activeStep}
									setActiveStep={setActiveStep}
									count={nbSteps}
									mainBtnText="J'ai compris"
									onClose={onCloseActivateOffer}
								/>
							</TabPanel>
							<TabPanel as={Flex} flexDir="column" h="full" px={0}>
								<Text fontSize="2xl" fontWeight="extrabold">
									Conditions de cette offre {offer.partner.name}
								</Text>
								<StackItems items={offer.conditions ?? []} props={{ mt: 6 }} />
								<StepsButtons
									activeStep={activeStep}
									setActiveStep={setActiveStep}
									count={nbSteps}
									mainBtnText="J'active cette offre"
									handleValidate={() => {
										mutateCouponToUser({ offer_id: offer.id });
										onCloseActivateOffer();
									}}
									onClose={onCloseActivateOffer}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</StepsWrapper>
			</BaseModal>
			<BaseModal
				onClose={onCloseTermsOfUse}
				isOpen={isOpenTermsOfUse}
				title="Comment bénéficier de cette offre ?"
			>
				<StackItems items={itemsTermsOfUse} props={{ mt: 6 }} />
			</BaseModal>
			<BaseModal
				onClose={onCloseOtherConditions}
				isOpen={isOpenOtherConditions}
				title={`Conditions de cette offre ${offer.partner.name}`}
			>
				<StackItems items={offer.conditions ?? []} props={{ mt: 6 }} />
			</BaseModal>
			<BaseModal
				onClose={onCloseExternalLink}
				isOpen={isOpenExternalLink}
				title={`Nous vous redirigeons vers le site ${offer.partner.name}`}
			>
				<Flex flexDir="column">
					<Flex position="relative" mt={16}>
						<Spinner
							mx="auto"
							thickness="8px"
							speed="0.85s"
							emptyColor="gray.200"
							color="blackLight"
							boxSize={40}
						/>
						<Box
							bgColor="white"
							objectFit="cover"
							objectPosition="center"
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -50%)"
							p={2}
							borderRadius="full"
						>
							<ChakraNextImage
								src={offer.partner.icon.url as string}
								alt={offer.partner.icon.alt as string}
								width={12}
								height={12}
							/>
						</Box>
					</Flex>
					<StackItems items={itemsExternalLink} props={{ mt: 16 }} />
				</Flex>
			</BaseModal>
		</OfferWrapper>
	);
}
