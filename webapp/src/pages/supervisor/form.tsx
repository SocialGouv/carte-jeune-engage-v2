import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import payload from "payload";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import FormInput from "~/components/forms/FormInput";
import SupervisorFormWrapper from "~/components/wrappers/SupervisorFormWrapper";
import { api } from "~/utils/api";

type SignUpForm = {
  phone: string;
};

const frenchPhoneNumberRegex = /^\+33[1-9](\d{8})$/;

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onSubmit",
    defaultValues: {
      phone: "+33",
    },
  });

  const { mutate: createPermission, isLoading } =
    api.permission.create.useMutation({
      onSuccess: async () => {
        setSubmitted(true);
      },
      onError: (e) => {
        if (e.data && e.data.httpStatus === 409) {
          setError("phone", {
            type: "conflict",
            message: "Ce numéro existe déjà dans la base de donnée",
          });
        }
      },
    });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    createPermission({ phone: data.phone });
  };

  if (submitted) {
    return (
      <SupervisorFormWrapper>
        <Text>
          Le numéro <Text as="b">{getValues("phone")}</Text> a bien été ajouté,
          le jeune peut désormais se connecter à l'application et configurer son
          compte.
        </Text>
        <Button
          mt={6}
          colorScheme="cje-gray"
          color="black"
          fontWeight="bold"
          variant="solid"
          onClick={() => {
            setSubmitted(false);
            reset();
          }}
        >
          Entrer un autre numéro
        </Button>
      </SupervisorFormWrapper>
    );
  }

  return (
    <SupervisorFormWrapper>
      <Text fontSize="sm" fontWeight="medium" color="secondaryText">
        Saisissez le numéro de téléphone du jeune sous la forme +33XXXXXXXXX
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box my={6}>
          <FormInput
            field={{
              label: "Numéro",
              kind: "tel",
              name: "phone",
              rules: {
                required: "Ce champ est obligatoire",
                pattern: {
                  value: frenchPhoneNumberRegex,
                  message: "Numéro de téléphone invalide",
                },
              },
            }}
            register={register}
            fieldError={errors["phone"]}
          />
        </Box>
        <Button
          colorScheme="blackBtn"
          type={"submit"}
          float="right"
          isLoading={isLoading}
          rightIcon={<Icon as={HiArrowRight} w={6} h={6} />}
        >
          Valider
        </Button>
      </form>
    </SupervisorFormWrapper>
  );
}
