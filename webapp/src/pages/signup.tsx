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
} from "react-hook-form";
import FormInput from "~/components/FormInput";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute, useEffect, useMemo, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import LoadingLoader from "~/components/LoadingLoader";

type SignUpForm = {
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
};

type SignUpFormStep = {
  title: string;
  description?: string;
  field: {
    name: keyof SignUpForm;
    kind: HTMLInputTypeAttribute;
    unique?: boolean;
    label: string;
    rules: {
      [key: string]: string | ValidationValueMessage;
    };
  };
};

export default function Home() {
  const router = useRouter();

  const { signupStep } = router.query as {
    signupStep: keyof SignUpForm | undefined;
  };

  const defaultValues = useMemo(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cje-signup-form") as string)
      : {};
  }, [typeof window !== "undefined"]);

  const { handleSubmit, register, getValues, watch, formState } =
    useForm<SignUpForm>({
      mode: "all",
      defaultValues,
    });

  const formValues = watch();

  useEffect(() => {
    localStorage.setItem("cje-signup-form", JSON.stringify(formValues));
  }, [formValues]);

  const { errors } = formState;

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    if (!currentSignupStep) return;
    if (
      signupSteps.findIndex(
        (step) => step.field.name === currentSignupStep.field.name
      ) ===
      signupSteps.length - 1
    ) {
      console.log("Submit", data);
      return;
    } else {
      const currentStepIndex = signupSteps.findIndex(
        (step) => step.field.name === currentSignupStep.field.name
      );
      const nextStep = signupSteps[currentStepIndex + 1];
      if (!nextStep) return;
      router.push({ query: { signupStep: nextStep.field.name } });
      setCurrentSignupStep(nextStep);
    }
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

  const [currentSignupStep, setCurrentSignupStep] =
    useState<SignUpFormStep | null>(null);

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

  const currentFieldValue = getValues(currentSignupStep.field.name);

  return (
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
        <Box mt={6}>
          <FormInput
            key={currentSignupStep.field.name}
            label={currentSignupStep.field.label}
            name={currentSignupStep.field.name}
            kind={currentSignupStep?.field.kind}
            register={register}
            fieldError={errors[currentSignupStep?.field.name]}
            rules={currentSignupStep?.field.rules}
          />
        </Box>
      </Flex>
      <Button
        colorScheme="blackBtn"
        isDisabled={!currentFieldValue || currentFieldValue === ""}
        type={
          currentSignupStep.field.name ===
          signupSteps[signupSteps.length - 1]?.field.name
            ? "submit"
            : "button"
        }
        rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
        onClick={handleSubmit(onSubmit)}
      >
        Continuer
      </Button>
    </Flex>
  );
}
