import {
  Accordion,
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  PinInput,
  PinInputField,
  Text,
  chakra,
  shouldForwardProp,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { setCookie } from "cookies-next";
import { isValidMotionProp, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler, ErrorOption } from "react-hook-form";
import {
  HiArrowRight,
  HiCalendarDays,
  HiChevronLeft,
  HiMapPin,
  HiMiniClipboardDocumentCheck,
} from "react-icons/hi2";
import BigLoader from "~/components/BigLoader";
import ChakraNextImage from "~/components/ChakraNextImage";
import FormInput from "~/components/forms/FormInput";
import Header from "~/components/landing/Header";
import { loginAnimation } from "~/utils/animations";
import { api } from "~/utils/api";
import { addSpaceToTwoCharacters, frenchPhoneNumber } from "~/utils/tools";
import SectionContent from "~/components/landing/SimpleSection";
import MapSectionCard from "~/components/landing/MapSectionCard";
import HowItWorksSectionCard from "~/components/landing/HowItWorkSectionCard";
import FAQSectionAccordionItem from "~/components/landing/FAQSectionAccordionItem";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

type LoginForm = {
  phone_number: string;
};

const pinProps = {
  w: 12,
  h: 12,
  borderColor: "transparent",
  _hover: { borderColor: "transparent" },
  _focus: { borderColor: "blackLight", borderWidth: "2px" },
  _focusVisible: { boxShadow: "none" },
};

const defaultTimeToResend = 30;

const sectionItems = [
  {
    title:
      "Bénéficiez d’un statut privilégié qui vous offre des remises avantageuses",
    description:
      "Vous n’êtes pas encore en formation ni en emploi, vous bénéficiez d’un statut de jeune engagé en étant inscrit à la Mission locale, avec la carte “jeune engagé”, vous accédez à toutes les réductions disponibles pour vous !",
    image: "/images/landing/section-1.png",
  },
  {
    title:
      "Tout ce qu’il faut pour bien démarrer dans la vie active, à prix réduit grâce aux partenaires",
    description:
      "La carte “jeune engagé” vous fait économisez pour tout grâce aux nombreux partenaires participants. Bénéficiez de prix instantanément réduits pour faire vos courses, pour équiper votre logement, pour le matériel informatique mais aussi pour vos assurances et vos abonnements. ",
    image: "/images/landing/section-2.png",
  },
  {
    title: "Des réductions à utiliser en ligne ou en magasin",
    description:
      "Profitez d’une flexibilité totale avec la carte “jeune engagé” ! L’application vous offre des réductions à utiliser en ligne mais aussi directement en magasin : plus pratique pour faire vos courses par exemple. ",
    image: "/images/landing/section-3.png",
  },
  {
    title: "Suivez toutes vos économies",
    description:
      "Gardez un œil sur vos économies grâce à notre fonction de suivi intégrée. Consultez facilement l'historique de vos économies et suivez les au fil du temps. ",
    image: "/images/landing/section-4.png",
  },
];

type ComponentPhoneNumberKeys = "phone-number-cta" | "phone-number-footer";

const ComponentFormPhoneNumber = ({
  onSubmit,
  currentKey,
  setCurrentPhoneNumberKey,
  error,
  isLoadingOtp,
}: {
  onSubmit: SubmitHandler<LoginForm>;
  currentKey: ComponentPhoneNumberKeys;
  setCurrentPhoneNumberKey: React.Dispatch<
    React.SetStateAction<ComponentPhoneNumberKeys>
  >;
  error: {
    name: ComponentPhoneNumberKeys;
    error: ErrorOption;
  } | null;
  isLoadingOtp: boolean;
}) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  if (currentKey === error?.name && errors.phone_number === undefined) {
    setError("phone_number", {
      type: error.error.type,
      message: error.error.message,
    });
  }

  return (
    <Flex
      key={currentKey}
      as="form"
      flexDir={{ base: "column", lg: "row" }}
      mr={{ base: 0, lg: currentKey === "phone-number-cta" ? 12 : 0 }}
      alignItems="center"
      shadow="landing-phone-number-component"
      borderRadius="1.125rem"
      mt={{ base: 6, lg: 16 }}
      p={2}
      onSubmit={(e: any) => {
        e.preventDefault();
        setCurrentPhoneNumberKey(currentKey);
        handleSubmit(onSubmit)();
      }}
    >
      <FormInput
        wrapperProps={{ w: "full" }}
        inputProps={{
          bgColor: { base: "white", lg: "transparent" },
          fontSize: { base: "md", lg: "xl" },
        }}
        field={{
          name: "phone_number",
          kind: "tel",
          placeholder: "Mon numéro de téléphone",
          prefix: "🇫🇷",
          rules: {
            required: "Ce champ est obligatoire",
            pattern: {
              value: frenchPhoneNumber,
              message:
                "On dirait que ce numéro de téléphone n’est pas valide. Vérifiez votre numéro",
            },
          },
        }}
        fieldError={errors.phone_number}
        register={register}
      />
      <Button
        mt={{ base: 4, lg: 0 }}
        w={{ base: "full", lg: "full" }}
        colorScheme="blackBtn"
        px={0}
        type="submit"
        fontSize={{ base: "md", lg: "2xl" }}
        py={{ base: "inherit", lg: 9 }}
        isLoading={isLoadingOtp}
        rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
      >
        Vérifier mon éligibilité
      </Button>
    </Flex>
  );
};

export default function Home() {
  const router = useRouter();

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [hasOtpError, setHasOtpError] = useState(false);
  const [hasOtpExpired, setHasOtpExpired] = useState(false);
  const [forceLoader, setForceLoader] = useState(false);

  const [timeToResend, setTimeToResend] = useState(defaultTimeToResend);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [faqCurrentIndex, setFaqCurrentIndex] = useState<number | null>(null);

  const [currentPhoneNumberKey, setCurrentPhoneNumberKey] =
    useState<ComponentPhoneNumberKeys>("phone-number-cta");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<{
    name: ComponentPhoneNumberKeys;
    error: ErrorOption;
  } | null>(null);

  const resetTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setTimeToResend(defaultTimeToResend);
    const id = setInterval(() => {
      setTimeToResend((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);
  };

  const { data: resultLogoPartners, isLoading: isLoadingLogoPartners } =
    api.globals.landingPartnersGetLogos.useQuery();

  const logoPartners = resultLogoPartners?.data || [];

  const { data: resultFAQ, isLoading: isLoadingFAQ } =
    api.globals.landingFAQGetAll.useQuery();

  const landingFAQ = resultFAQ?.data || [];

  const { mutate: generateOtp, isLoading: isLoadingOtp } =
    api.user.generateOTP.useMutation({
      onSuccess: async ({ data }) => {
        setIsOtpGenerated(true);
        resetTimer();
      },
      onError: async ({ data }) => {
        console.log(data?.httpStatus);
        if (data?.httpStatus === 401) {
          setPhoneNumberError({
            name: currentPhoneNumberKey,
            error: {
              type: "conflict",
              message:
                "Votre numéro de téléphone n'est pas autorisé à accéder à l'application",
            },
          });
        } else {
          setPhoneNumberError({
            name: currentPhoneNumberKey,
            error: {
              type: "internal",
              message: "Erreur coté serveur, veuillez contacter le support",
            },
          });
        }
      },
    });

  const { mutate: loginUser, isLoading: isLoadingLogin } =
    api.user.loginUser.useMutation({
      onSuccess: async ({ data }) => {
        setCookie(
          process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt",
          data.token || ""
        );
        router.reload();
        router.push("/dashboard");
      },
      onError: async ({ data }) => {
        if (data?.httpStatus === 401) {
          setHasOtpError(true);
        } else if (data?.httpStatus === 408) {
          setHasOtpExpired(true);
        }
        setForceLoader(false);
      },
    });

  const logoAnimationBreakpoint = useBreakpointValue({
    base: {
      x: ["0px", `-${57 * logoPartners.length + 32 * logoPartners.length}px`],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "linear",
      },
    },
    lg: undefined,
  });

  const handleGenerateOtp: SubmitHandler<LoginForm> = async (values) => {
    setCurrentPhoneNumber(values.phone_number);
    generateOtp({ phone_number: values.phone_number });
  };

  const handleLoginUser = async (otp: string) => {
    setForceLoader(true);
    loginUser({
      phone_number: currentPhoneNumber,
      otp,
    });
  };

  useGSAP(() => {
    // loginAnimation();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeToResend((prevTime) => prevTime - 1);
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  if (isLoadingLogin || forceLoader || isLoadingLogoPartners || isLoadingFAQ)
    return <BigLoader />;

  if (isOtpGenerated) {
    return (
      <>
        <Flex
          position="relative"
          alignItems="center"
          justifyContent="center"
          pt={8}
        >
          <Icon
            as={HiChevronLeft}
            w={6}
            h={6}
            onClick={() => {
              setIsOtpGenerated(false);
              setCurrentPhoneNumber("");
            }}
            cursor="pointer"
            position="absolute"
            left={6}
          />
          <Text fontWeight={"extrabold"} fontSize={"sm"}>
            Connexion
          </Text>
        </Flex>
        <Flex py={8} px={8} flexDir={"column"}>
          <Heading fontSize={"2xl"} fontWeight={"extrabold"} mb={6}>
            Vous avez reçu un code à 4 chiffres par SMS
          </Heading>
          <Text fontSize={"sm"} fontWeight="medium" color="secondaryText">
            Saisissez le code envoyé au{" "}
            {addSpaceToTwoCharacters(currentPhoneNumber)} pour pouvoir créer
            votre compte
          </Text>
          <Box my={8}>
            <HStack>
              <PinInput
                placeholder="-"
                otp
                onComplete={handleLoginUser}
                onChange={() => {
                  setHasOtpError(false);
                  setHasOtpExpired(false);
                }}
              >
                <PinInputField
                  {...pinProps}
                  bg={hasOtpError ? "errorLight" : "cje-gray.500"}
                />
                <PinInputField
                  {...pinProps}
                  bg={hasOtpError ? "errorLight" : "cje-gray.500"}
                />
                <PinInputField
                  {...pinProps}
                  bg={hasOtpError ? "errorLight" : "cje-gray.500"}
                />
                <PinInputField
                  {...pinProps}
                  bg={hasOtpError ? "errorLight" : "cje-gray.500"}
                />
              </PinInput>
            </HStack>
            {hasOtpExpired && (
              <Text color="error" fontSize={"sm"} mt={2}>
                Le code n'est plus valide, cliquez sur le lien ci-dessous pour
                recevoir un nouveau SMS
              </Text>
            )}
            {hasOtpError && (
              <Text color="error" fontSize={"sm"} mt={2}>
                On dirait que ce code n’est pas le bon
              </Text>
            )}
          </Box>
          <Link
            mt={6}
            textDecor={"underline"}
            fontWeight={"medium"}
            color={timeToResend <= 0 ? "initial" : "gray.500"}
            onClick={() => {
              if (timeToResend <= 0)
                handleGenerateOtp({ phone_number: currentPhoneNumber });
            }}
          >
            Me renvoyer un code par SMS{" "}
            {timeToResend <= 0 ? "" : `(${timeToResend}s)`}
          </Link>
        </Flex>
      </>
    );
  }

  return (
    <Flex flexDir="column" pt={8} h="full">
      <Header />
      <Flex
        id="login-form"
        alignItems="center"
        px={8}
        mt={14}
        mb={24}
        justifyContent={{ base: "center", lg: "space-between" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Box w={{ base: "full", lg: "65%" }}>
          <Heading
            fontSize={{ base: "2xl", lg: "56px" }}
            fontWeight="extrabold"
            px={{ base: 2, lg: 0 }}
          >
            Des remises exclusives pour les jeunes qui vont commencer la vie
            active. Avec la carte “jeune engagé”
          </Heading>
          <Text
            fontSize={{ base: "lg", lg: "28px" }}
            fontWeight="medium"
            color="secondaryText"
            mt={8}
          >
            Les économies pensées pour bien démarrer dans la vie
            <Box as="br" display={{ base: "none", lg: "block" }} />
            et pour toutes ses dépenses quotidiennes.
          </Text>
          <ComponentFormPhoneNumber
            isLoadingOtp={isLoadingOtp}
            onSubmit={handleGenerateOtp}
            currentKey="phone-number-cta"
            error={phoneNumberError}
            setCurrentPhoneNumberKey={setCurrentPhoneNumberKey}
          />
        </Box>
        <Image
          h="600px"
          display={{ base: "none", lg: "block" }}
          src="/images/landing/main.png"
        />
      </Flex>
      <Flex flexDir="column" textAlign="center" gap={8}>
        <Heading fontSize="3xl" fontWeight="extrabold">
          Ils vous offrent{" "}
          <Box as="br" display={{ base: "block", lg: "none" }} />
          des remises
        </Heading>
        <Flex overflowX="hidden" whiteSpace="nowrap">
          <ChakraBox
            display="flex"
            justifyContent={{ base: "normal", lg: "space-around" }}
            w="full"
            animate={logoAnimationBreakpoint}
            ml={{ base: 8, lg: 0 }}
            mx={{ base: 0, lg: "auto" }}
            gap={8}
          >
            {logoPartners.map((logo, index) => (
              <ChakraNextImage
                key={`logo-${index}`}
                display="inline-block"
                src={logo.url as string}
                alt={logo.alt as string}
                width={57}
                height={57}
                filter="grayscale(100%)"
              />
            ))}
            {logoPartners.map((logo, index) => (
              <ChakraNextImage
                key={`logo-duplicate-${index}`}
                display={{ base: "inline-block", lg: "none" }}
                src={logo.url as string}
                alt={logo.alt as string}
                width={57}
                height={57}
                filter="grayscale(100%)"
              />
            ))}
          </ChakraBox>
        </Flex>
        <Text fontWeight="bold" fontSize="2xl">
          Et encore plein d’autres...
        </Text>
      </Flex>
      <Flex
        id="what-is-it-section"
        flexDir="column"
        px={8}
        pt={{ base: 8, lg: 24 }}
        mt={{ base: 8, lg: 16 }}
        gap={{ base: 9, lg: 40 }}
      >
        {sectionItems.map((section, index) => (
          <SectionContent key={`section-${index}`} {...section} />
        ))}
      </Flex>
      <Box
        id="who-can-benefit-section"
        pt={{ base: 6, lg: 12 }}
        mt={{ base: 14, lg: 28 }}
        zIndex={10}
      >
        <Heading
          size={{ base: "xl", lg: "2xl" }}
          fontWeight="extrabold"
          textAlign="center"
        >
          Qui peut en profiter ?
        </Heading>
        <Flex
          flexDirection={{ base: "column", lg: "row-reverse" }}
          alignItems="center"
          mt={{ base: 8, lg: 16 }}
        >
          <AspectRatio
            w={{ base: "full", lg: "58%" }}
            ratio={1}
            pt={4}
            mb={-10}
          >
            <Image src="/images/landing/map.png" transform="rotate(-4.5deg)" />
          </AspectRatio>
          <Flex flexDir="column" px={8} gap={8} w={{ base: "auto", lg: "42%" }}>
            <MapSectionCard
              text="Disponible uniquement dans le département du Val d’Oise"
              icon={HiMapPin}
            />
            <MapSectionCard
              text="Réservé aux jeunes inscrits en contrat d’engagement jeune à la Mission locale "
              icon={HiMiniClipboardDocumentCheck}
            />
            <MapSectionCard
              text="Réservé aux jeunes ni en emploi, ni en formation, âgés entre 18 et 25 ans."
              icon={HiCalendarDays}
            />
          </Flex>
        </Flex>
      </Box>
      <Box px={8}>
        <Box
          id="how-does-it-work-section"
          pt={{ base: 6, lg: 12 }}
          mt={{ base: 14, lg: 36 }}
          textAlign="center"
        >
          <Heading fontWeight="extrabold" size={{ base: "xl", lg: "2xl" }}>
            Comment ça marche ?
          </Heading>
          <Text fontWeight="medium" fontSize="sm" color="secondaryText" mt={8}>
            Rappel : Vous devez être inscrit en Missions locale dans le “Contrat
            d’engagement jeune”.
          </Text>
          <Flex flexDir={{ base: "column", lg: "row" }} gap={8} mt={9}>
            <HowItWorksSectionCard
              title="Votre conseiller vous inscrit"
              description="Votre conseiller du contrat d’engagement jeune (CEJ) vous inscrit avec votre numéro de téléphone. "
              number={1}
            />
            <HowItWorksSectionCard
              title="Créez votre compte sur l’application"
              description="Téléchargez l’application et créez votre compte pour accéder aux offres et aux réductions."
              number={2}
            />
            <HowItWorksSectionCard
              title="Bénéficiez de vos réductions"
              description="Dès qu’une réduction vous intéresse, activez-la et profitez-en en ligne ou en magasin."
              number={3}
            />
          </Flex>
        </Box>
        <Box
          id="faq-section"
          pt={{ base: 6, lg: 16 }}
          mt={{ base: 14, lg: 24 }}
          textAlign="center"
        >
          <Heading size={{ base: "xl", lg: "2xl" }} fontWeight="extrabold">
            Questions fréquentes
          </Heading>
          <Accordion my={10} allowToggle>
            {landingFAQ.map(({ title, content }, index) => (
              <FAQSectionAccordionItem
                key={`faq-item-${index}`}
                title={title}
                content={content}
                index={index}
                currentIndex={faqCurrentIndex}
                setCurrentIndex={setFaqCurrentIndex}
                total={landingFAQ.length}
              />
            ))}
          </Accordion>
        </Box>
        <Flex
          flexDir="column"
          mt={{ base: 16, lg: 48 }}
          mb={{ base: 8, lg: 24 }}
          textAlign="center"
        >
          <Heading size={{ base: "xl", lg: "2xl" }} fontWeight="extrabold">
            Je profite des réductions{" "}
            <Box as="br" display={{ base: "block", lg: "none" }} />
            dès maintenant
          </Heading>
          <Text
            fontWeight="medium"
            color="secondaryText"
            w={{ base: "full", lg: "60%" }}
            alignSelf={{ lg: "center" }}
            fontSize={{ base: "md", lg: "2xl" }}
            mt={{ base: 6, lg: 12 }}
          >
            Accédez aux réductions et aux offres des entreprises qui aident les
            jeunes à se lancer dans la vie active.
          </Text>
          <Box w={{ base: "full", lg: "60%" }} alignSelf={{ lg: "center" }}>
            <ComponentFormPhoneNumber
              isLoadingOtp={isLoadingOtp}
              onSubmit={handleGenerateOtp}
              currentKey="phone-number-footer"
              error={phoneNumberError}
              setCurrentPhoneNumberKey={setCurrentPhoneNumberKey}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
