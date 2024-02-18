import {
  Box,
  Button,
  Divider,
  Flex,
  FormErrorMessage,
  HStack,
  Heading,
  Icon,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import ChakraNextImage from "~/components/ChakraNextImage";
import FormInput from "~/components/forms/FormInput";
import { loginAnimation } from "~/utils/animations";
import { api } from "~/utils/api";
import { frenchPhoneNumber } from "~/utils/tools";

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

export default function Home() {
  const router = useRouter();

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [hasOtpError, setHasOtpError] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const formValues = watch();

  const { mutate: generateOtp, isLoading: isLoadingOtp } =
    api.user.generateOTP.useMutation({
      onSuccess: async ({ data }) => {
        setIsOtpGenerated(true);
      },
      onError: async ({ data }) => {
        if (data?.httpStatus === 401) {
          setError("phone_number", {
            type: "conflict",
            message:
              "Votre numéro de téléphone n'est pas autorisé à accéder à l'application",
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
        }
      },
    });

  const handleGenerateOtp: SubmitHandler<LoginForm> = async (values) => {
    generateOtp({ phone_number: values.phone_number });
  };

  const handleLoginUser = async (otp: string) => {
    console.log(otp);
    loginUser({
      phone_number: formValues.phone_number,
      otp,
    });
  };

  useEffect(() => {
    loginAnimation();
  }, []);

  if (isOtpGenerated) {
    return (
      <Flex py={8} px={8} flexDir={"column"}>
        <Heading fontSize={"2xl"} fontWeight={"extrabold"} mb={6}>
          Vous avez reçu un code à 4 chiffres par SMS
        </Heading>
        <Text fontSize={"sm"} fontWeight="medium" color="secondaryText">
          Saisissez le code envoyé au 06 15 29 20 93 pour pouvoir créer votre
          compte
        </Text>
        <Box my={8}>
          <HStack>
            <PinInput
              placeholder="-"
              otp
              onComplete={handleLoginUser}
              onChange={() => {
                setHasOtpError(false);
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
          onClick={() => {
            handleGenerateOtp({ phone_number: formValues.phone_number });
          }}
        >
          Me renvoyer un code par SMS
        </Link>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" py={8} h="full" overflow={"hidden"}>
      <Box id="login-gov-image" opacity={0} ml={4}>
        <ChakraNextImage
          src="/images/marianne.svg"
          alt="Logo marianne du gouvernement français"
          width={74}
          height={49}
        />
      </Box>
      <Heading
        id="login-heading"
        transform="translateY(35vh)"
        textAlign={"center"}
        mt={8}
        mb={12}
        fontSize={"xl"}
        fontWeight={"extrabold"}
      >
        Ma carte
        <br />
        jeune engagé
      </Heading>
      <Flex
        id="login-form"
        transform="translateY(70vh)"
        opacity={0}
        flexDir={"column"}
        borderTopWidth={1}
        borderTopColor={"cje-gray.300"}
        borderTopRadius={"3xl"}
        px={8}
        py={12}
      >
        <Heading fontSize={"2xl"} fontWeight={"extrabold"} mb={6}>
          Connectez-vous avec votre n° de téléphone
        </Heading>
        <form onSubmit={handleSubmit(handleGenerateOtp)}>
          <FormInput
            field={{
              name: "phone_number",
              kind: "tel",
              placeholder: "Votre numéro de téléphone",
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
            Accéder aux réductions
          </Button>
        </form>
        <Divider my={6} />
        <Link textAlign="center" textDecor={"underline"}>
          J'ai changé de numéro de téléphone
        </Link>
      </Flex>
    </Flex>
  );
}
