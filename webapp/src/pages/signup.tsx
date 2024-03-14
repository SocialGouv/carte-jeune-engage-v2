import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import FormInput, { type FieldProps } from "~/components/forms/FormInput";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import LoadingLoader from "~/components/LoadingLoader";
import FormBlock from "~/components/forms/FormBlock";
import FormAutocompleteInput from "~/components/forms/FormAutocompleteInput";
import { useQuery } from "@tanstack/react-query";
import useDebounceValueWithState from "~/hooks/useDebounceCallbackWithPending";
import OnBoardingStepsWrapper from "~/components/wrappers/OnBoardingStepsWrapper";
import { onBoardingSteps } from "./onboarding";
import { api } from "~/utils/api";
import { getCookie, setCookie } from "cookies-next";

type SignUpForm = {
  civility: "man" | "woman";
  firstName: string;
  lastName: string;
  birthDate: string;
  userEmail: string;
  address: string;
};

export type SignUpFormStep = {
  title: string;
  description?: string;
  field: FieldProps;
};

export const signupSteps = [
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
        minLength: {
          value: 2,
          message: "Votre prénom doit contenir au moins 2 caractères",
        },
        maxLength: {
          value: 50,
          message: "Votre prénom ne peut pas contenir plus de 50 caractères",
        },
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
        minLength: {
          value: 2,
          message: "Votre nom doit contenir au moins 2 caractères",
        },
        maxLength: {
          value: 50,
          message: "Votre nom ne peut pas contenir plus de 50 caractères",
        },
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
        // rules to validate from 16 years old to 26 years old
        validate: (value: string | number) => {
          const currentDate = new Date(value);
          const now = new Date();
          const age = now.getFullYear() - currentDate.getFullYear();
          const has26YearsPassed =
            currentDate.getMonth() <= now.getMonth() &&
            currentDate.getDate() < now.getDate();
          return age >= 16 &&
            age <= 26 &&
            (age !== 26 ? true : has26YearsPassed)
            ? true
            : "Vous devez avoir entre 16 et 26 ans pour vous inscrire";
        },
      },
    },
  },
  {
    title: "Quelle est votre adresse email ?",
    description:
      "Votre adresse email vous permettra aussi de vous reconnecter si vous changez de numéro de téléphone par exemple",
    field: {
      name: "userEmail",
      kind: "email",
      label: "Email",
      rules: {
        required: "Ce champ est obligatoire",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Veuillez saisir une adresse email valide",
        },
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

  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } =
    api.user.update.useMutation();

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
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    if (!currentSignupStep) return;
    const currentStepIndex = signupSteps.findIndex(
      (step) => step.field.name === currentSignupStep.field.name
    );
    if (currentStepIndex === signupSteps.length - 1) {
      localStorage.removeItem("cje-signup-form");
      updateUser(data).then(() => {
        const jwtToken = getCookie(
          process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt"
        );
        if (!jwtToken) return;

        fetch("/api/users/refresh-token", {
          method: "POST",
          credentials: "omit",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }).then((req) => {
          req.json().then((data) => {
            setCookie(
              process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt",
              data.refreshedToken as string,
              { expires: new Date((data.exp as number) * 1000) }
            );
            router.push("/onboarding");
          });
        });
      });
    } else {
      const nextStep = signupSteps[currentStepIndex + 1];
      if (!nextStep) return;
      router.push({ query: { signupStep: nextStep.field.name } });
      setCurrentSignupStep(nextStep);
    }
  };

  const formValues = watch();

  const [debouncedAddress, isDebouncePending] = useDebounceValueWithState(
    formValues.address,
    500
  );

  const { data: addressOptions, isLoading: isLoadingAddressOptions } = useQuery(
    ["getAddressOptions", debouncedAddress],
    async () => {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${debouncedAddress}&limit=4&autocomplete=1&type=housenumber`
      );
      const data = await response.json();
      return data.features.map((feature: any) =>
        [feature.properties.name, feature.properties.city].join(", ")
      ) as string[];
    },
    {
      enabled: !!debouncedAddress && debouncedAddress.length > 4,
    }
  );

  useEffect(() => {
    const { address, ...tmpFormValues } = formValues;
    localStorage.setItem(
      "cje-signup-form",
      JSON.stringify({ ...tmpFormValues, address: debouncedAddress })
    );
  }, [formValues, debouncedAddress]);

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
    <OnBoardingStepsWrapper
      stepContext={{
        current:
          signupSteps.findIndex(
            (step) => step.field.name === currentSignupStep.field.name
          ) + 1,
        total: signupSteps.length + onBoardingSteps.length,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <Flex
          display="flex"
          flexDir="column"
          pt={8}
          pb={12}
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
              ) : currentSignupStep.field.name === "address" ? (
                <FormAutocompleteInput
                  control={control}
                  options={addressOptions}
                  setError={setError}
                  clearErrors={clearErrors}
                  isLoading={isLoadingAddressOptions || isDebouncePending}
                  field={currentSignupStep.field}
                  fieldError={
                    errors[currentSignupStep?.field.name as keyof SignUpForm]
                  }
                  handleSubmit={() => handleSubmit(onSubmit)()}
                />
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
            isDisabled={
              !currentFieldValue ||
              errors[currentSignupStep.field.name as keyof SignUpForm]
                ?.message !== undefined
            }
            type="submit"
            rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
            isLoading={isLoadingUpdateUser}
          >
            Continuer
          </Button>
        </Flex>
      </form>
    </OnBoardingStepsWrapper>
  );
}
