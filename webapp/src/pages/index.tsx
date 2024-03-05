import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
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
import { HiArrowRight, HiChevronLeft } from "react-icons/hi2";
import BigLoader from "~/components/BigLoader";
import ChakraNextImage from "~/components/ChakraNextImage";
import FormInput from "~/components/forms/FormInput";
import Header from "~/components/landing/Header";
import Footer from "~/components/landing/Footer";
import { loginAnimation } from "~/utils/animations";
import { api } from "~/utils/api";
import { addSpaceToTwoCharacters, frenchPhoneNumber } from "~/utils/tools";

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

export default function Home() {
  const router = useRouter();

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [hasOtpError, setHasOtpError] = useState(false);
  const [hasOtpExpired, setHasOtpExpired] = useState(false);
  const [forceLoader, setForceLoader] = useState(false);

  const [timeToResend, setTimeToResend] = useState(defaultTimeToResend);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

  if (isLoadingOtp || isLoadingLogin || forceLoader) return <BigLoader />;

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
      overflowY="auto"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
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
      <Flex flexDir="column" px={8} py={16}></Flex>
      <Footer />
    </Flex>
  );
}
