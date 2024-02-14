import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  useForm,
  type SubmitHandler,
  ValidationValueMessage,
  Controller,
} from "react-hook-form";
import FormInput, { type FieldProps } from "~/components/forms/FormInput";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute, useEffect, useMemo, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import LoadingLoader from "~/components/LoadingLoader";
import FormBlock from "~/components/forms/FormBlock";

type SignUpForm = {
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
};

export type SignUpFormStep = {
  title: string;
  description?: string;
  field: FieldProps;
};

const signupSteps = [
  {
    title: "Bienvenue ! Comment peut-on vous appeler ?",
    field: {
      name: "civility",
      kind: "text",
      label: "Civilité",
      rules: {
        required: "Ce champ est obligatoire",
      },
    },
  },
  {
    title: "Quel est votre prénom ?",
    field: {
      name: "firstName",
      kind: "text",
      label: "Prénom",
      rules: {
        required: "Ce champ est obligatoire",
      },
    },
  },
  {
    title: "Quel est votre nom de famille ?",
    field: {
      name: "lastName",
      kind: "text",
      label: "Nom de famille",
      rules: {
        required: "Ce champ est obligatoire",
      },
    },
  },
  {
    title: "Quelle est votre date de naissance ?",
    description:
      "Votre date de naissance nous permet de personnaliser votre expérience et de garantir la sécurité de vos données",
    field: {
      name: "birthDate",
      kind: "date",
      label: "Date de naissance",
      rules: {
        required: "Ce champ est obligatoire",
      },
    },
  },
  {
    title: "Quelle est votre adresse email ?",
    description:
      "Votre adresse email vous permettra aussi de vous reconnecter si vous changez de numéro de téléphone par exemple",
    field: {
      name: "email",
      kind: "email",
      label: "Email",
      rules: {
        required: "Ce champ est obligatoire",
        email: "Veuillez saisir une adresse email valide",
      },
    },
  },
  {
    title: "Votre adresse",
    description:
      "Votre adresse nous permet de chercher les meilleures réductions en magasin",
    field: {
      name: "address",
      kind: "text",
      label: "Adresse",
      rules: {
        required: "Ce champ est obligatoire",
      },
    },
  },
] as const;

export default function Signup() {
  const router = useRouter();

  const { signupStep } = router.query as {
    signupStep: keyof SignUpForm | undefined;
  };

  const [currentSignupStep, setCurrentSignupStep] =
    useState<SignUpFormStep | null>(null);

  const defaultValues = useMemo(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cje-signup-form") as string)
      : {};
  }, [typeof window !== "undefined"]);

  const {
    handleSubmit,
    register,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "all",
    defaultValues,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    if (!currentSignupStep) return;
    const currentStepIndex = signupSteps.findIndex(
      (step) => step.field.name === currentSignupStep.field.name
    );
    if (currentStepIndex === signupSteps.length - 1) {
      console.log("Submit", data);
    } else {
      const nextStep = signupSteps[currentStepIndex + 1];
      if (!nextStep) return;
      router.push({ query: { signupStep: nextStep.field.name } });
      setCurrentSignupStep(nextStep);
    }
  };

  const formValues = watch();

  useEffect(() => {
    localStorage.setItem("cje-signup-form", JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    if (!signupStep || typeof signupStep !== "string") {
      if (router.isReady)
        router.replace({ query: { signupStep: signupSteps[0].field.name } });
      return;
    }

    const signupStepNames = signupSteps.map((step) => step.field.name);

    const tmpCurrentSignupStep = signupSteps.find(
      (step) => step.field.name === signupStep
    );

    if (!signupStepNames.includes(signupStep) || !tmpCurrentSignupStep) {
      router.back();
      return;
    }

    setCurrentSignupStep(tmpCurrentSignupStep);
  }, [signupStep, router.isReady]);

  if (!currentSignupStep)
    return (
      <Center w="full" h="full">
        <LoadingLoader />
      </Center>
    );

  const currentFieldValue = getValues(
    currentSignupStep.field.name as keyof SignUpForm
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Flex
        display="flex"
        flexDir="column"
        py={12}
        px={6}
        justifyContent="space-between"
        h="full"
      >
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h1" size="md" fontWeight="extrabold" mb={4}>
            {currentSignupStep?.title}
          </Heading>
          <Text fontSize="sm" fontWeight="medium" color="secondaryText">
            {currentSignupStep?.description ||
              "Saisissez la même information que sur vos documents administratifs officiels."}
          </Text>
          <Box mt={6} key={currentSignupStep.field.name}>
            {currentSignupStep.field.name === "civility" ? (
              <Flex alignItems="center" w="full" gap={6}>
                <Controller
                  control={control}
                  name={currentSignupStep.field.name}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <FormBlock
                        value="man"
                        currentValue={value}
                        onChange={onChange}
                      >
                        Monsieur
                      </FormBlock>
                      <FormBlock
                        value="woman"
                        currentValue={value}
                        onChange={onChange}
                      >
                        Madame
                      </FormBlock>
                    </>
                  )}
                />
              </Flex>
            ) : (
              <FormInput
                register={register}
                field={currentSignupStep.field}
                fieldError={
                  errors[currentSignupStep?.field.name as keyof SignUpForm]
                }
              />
            )}
          </Box>
        </Flex>
        <Button
          colorScheme="blackBtn"
          isDisabled={!currentFieldValue || currentFieldValue === ""}
          type="submit"
          rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
        >
          Continuer
        </Button>
      </Flex>
    </form>
  );
}
