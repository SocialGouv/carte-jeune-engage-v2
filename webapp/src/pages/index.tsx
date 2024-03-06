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
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { setCookie } from "cookies-next";
import { isValidMotionProp, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
import Footer from "~/components/landing/Footer";
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

export default function Home() {
  const router = useRouter();

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [hasOtpError, setHasOtpError] = useState(false);
  const [hasOtpExpired, setHasOtpExpired] = useState(false);
  const [forceLoader, setForceLoader] = useState(false);

  const [timeToResend, setTimeToResend] = useState(defaultTimeToResend);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [faqCurrentIndex, setFaqCurrentIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const formValues = watch();

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
          setError("phone_number", {
            type: "conflict",
            message:
              "Votre numéro de téléphone n'est pas autorisé à accéder à l'application",
          });
        } else {
          setError("phone_number", {
            type: "internal",
            message: "Erreur coté serveur, veuillez contacter le support",
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

  const handleGenerateOtp: SubmitHandler<LoginForm> = async (values) => {
    generateOtp({ phone_number: values.phone_number });
  };

  const handleLoginUser = async (otp: string) => {
    setForceLoader(true);
    loginUser({
      phone_number: formValues.phone_number,
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

  if (
    isLoadingOtp ||
    isLoadingLogin ||
    forceLoader ||
    isLoadingLogoPartners ||
    isLoadingFAQ
  )
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
              setValue("phone_number", "");
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
            {addSpaceToTwoCharacters(formValues.phone_number)} pour pouvoir
            créer votre compte
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
                handleGenerateOtp({ phone_number: formValues.phone_number });
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
    <Flex
      flexDir="column"
      pt={8}
      h="full"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      overflowY="auto"
      bgColor="white"
    >
      <Header />
      <Flex id="login-form" flexDir="column" px={8} py={16} textAlign="center">
        <Heading fontSize="2xl" fontWeight="extrabold">
          Des remises exclusives pour
          <br />
          les jeunes qui vont
          <br />
          commencer la vie active.
          <br />
          Avec la carte “jeune engagé”
        </Heading>
        <Text fontSize="lg" fontWeight="medium" color="secondaryText" mt={8}>
          Les économies pensées pour bien démarrer dans la vie et pour toutes
          ses dépenses quotidiennes.
        </Text>
        <Box
          as="form"
          shadow="landing-phone-number-component"
          borderRadius="1.125rem"
          mt={6}
          p={3}
          onSubmit={handleSubmit(handleGenerateOtp)}
        >
          <FormInput
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
            mt={4}
            colorScheme="blackBtn"
            type={"submit"}
            float="right"
            w="full"
            isLoading={isLoadingOtp}
            rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
          >
            Vérifier mon éligibilité
          </Button>
        </Box>
      </Flex>
      <Flex flexDir="column" textAlign="center" gap={8}>
        <Heading fontSize="3xl" fontWeight="extrabold">
          Ils vous offrent
          <br />
          des remises
        </Heading>
        <Flex overflowX="hidden" whiteSpace="nowrap">
          <ChakraBox
            display="flex"
            animate={{
              x: [
                "0px",
                `-${57 * logoPartners.length + 32 * logoPartners.length}px`,
              ],
              transition: {
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              },
            }}
            ml={8}
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
                display="inline-block"
                src={logo.url as string}
                alt={logo.alt as string}
                width={57}
                height={57}
                filter="grayscale(100%)"
              />
            ))}
          </ChakraBox>
        </Flex>
      </Flex>
      <Flex flexDir="column" px={8} mt={16} gap={9}>
        {sectionItems.map((section, index) => (
          <SectionContent key={`section-${index}`} {...section} />
        ))}
      </Flex>
      <Box mt={24} zIndex={10}>
        <Heading fontSize="3xl" fontWeight="extrabold" textAlign="center">
          Qui peut en profiter ?
        </Heading>
        <AspectRatio ratio={1} pt={4} mt={8} mb={-10}>
          <Image src="/images/landing/map.png" transform="rotate(-4.5deg)" />
        </AspectRatio>
        <Flex flexDir="column" px={8} gap={8}>
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
      </Box>
      <Box px={8}>
        <Box mt={28} textAlign="center">
          <Heading fontSize="3xl" fontWeight="extrabold">
            Comment ça marche ?
          </Heading>
          <Text fontWeight="medium" fontSize="sm" color="secondaryText" mt={8}>
            Rappel : Vous devez être inscrit en Missions locale dans le “Contrat
            d’engagement jeune”.
          </Text>
          <Flex flexDir="column" gap={8} mt={9}>
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
        <Box mt={24} textAlign="center">
          <Heading fontSize="3xl" fontWeight="extrabold">
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
      </Box>
      <Footer />
    </Flex>
  );
}
