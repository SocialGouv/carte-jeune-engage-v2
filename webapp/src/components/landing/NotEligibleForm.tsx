import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { HiCheckCircle, HiFaceFrown, HiIdentification } from "react-icons/hi2";
import FormInput from "../forms/FormInput";
import FormBlock from "../forms/FormBlock";

type NeedingHelpForm = {
  registered: string;
  firstName: string;
  lastName: string;
  email: string;
};

const NotEligibleForm = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const [displayForm, setDisplayForm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm<NeedingHelpForm>({
    mode: "onSubmit",
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<NeedingHelpForm> = (data) => {
    console.log(data);
    setRequestSent(true);
  };

  if (displayForm && requestSent) {
    return (
      <Flex flexDir={!isDesktop ? "column-reverse" : "row"} alignItems="center">
        <Box w={!isDesktop ? "auto" : "60%"}>
          <Heading fontSize="5xl" fontWeight="extrabold">
            Notre équipe traite votre demande au plus vite.
          </Heading>
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color="secondaryText"
            mt={12}
          >
            Nous avons bien reçu votre demande, nous allons vous envoyer un mail
            pour vous aider à vous connecter à l’application.
          </Text>
        </Box>
        <Center w={!isDesktop ? "auto" : "40%"}>
          <Icon as={HiCheckCircle} w="200px" h="200px" />
        </Center>
      </Flex>
    );
  }

  if (displayForm) {
    return (
      <Flex flexDir={!isDesktop ? "column-reverse" : "row"} alignItems="center">
        <Box w={!isDesktop ? "auto" : "60%"}>
          <Heading fontSize="5xl" fontWeight="extrabold">
            Nous allons vous aider à accéder à l’application.
          </Heading>
          <Text fontSize="xl" fontWeight="medium" mt={8}>
            Êtes-vous inscrit à la Mission locale de Sarcelles ?
          </Text>
          <Flex alignItems="center" w="full" gap={6} mt={4}>
            <Controller
              control={control}
              name="registered"
              render={({ field: { onChange, value } }) => (
                <>
                  <FormBlock
                    value="yes"
                    currentValue={value}
                    onChange={onChange}
                  >
                    Oui
                  </FormBlock>
                  <FormBlock
                    value="no"
                    currentValue={value}
                    onChange={onChange}
                  >
                    Non
                  </FormBlock>
                </>
              )}
            />
          </Flex>
          {formValues.registered === "no" && (
            <Text color="red" mt={4}>
              L’application est en phase d’expérimentation. Elle est réservée
              aux jeunes inscrits en contrat d’engagement jeune à la Mission
              locale de Sarcelles.
            </Text>
          )}
          {formValues.registered === "yes" && (
            <Flex flexDir="column">
              <Flex flexDir="column" gap={6} mt={6}>
                <Text fontSize="xl" fontWeight="medium">
                  Vos informations personnelles
                </Text>
                <Flex
                  flexDir={!isDesktop ? "column" : "row"}
                  alignItems="center"
                  gap={6}
                >
                  <FormInput
                    field={{
                      name: "firstName",
                      kind: "text",
                      label: "Prénom",
                    }}
                    register={register}
                    fieldError={errors.firstName}
                  />
                  <FormInput
                    field={{
                      name: "lastName",
                      kind: "text",
                      label: "Nom",
                    }}
                    register={register}
                    fieldError={errors.lastName}
                  />
                </Flex>
                <FormInput
                  field={{
                    name: "email",
                    kind: "email",
                    label: "Adresse email",
                  }}
                  register={register}
                  fieldError={errors.email}
                />
              </Flex>
              <Button
                mx="auto"
                mt={10}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Envoyer ma demande
              </Button>
            </Flex>
          )}
        </Box>
        <Center w={!isDesktop ? "auto" : "40%"}>
          <Icon as={HiIdentification} w="200px" h="200px" />
        </Center>
      </Flex>
    );
  }

  return (
    <Flex flexDir={!isDesktop ? "column-reverse" : "row"} alignItems="center">
      <Box w={!isDesktop ? "auto" : "60%"}>
        <Heading fontSize="5xl" fontWeight="extrabold">
          On dirait que vous n’êtes pas encore inscrit.
        </Heading>
        <Text fontSize="2xl" fontWeight="medium" color="secondaryText" mt={12}>
          Vérifiez que votre numéro de téléphone correspond à celui avec lequel
          votre conseiller à la Mission locale de Sarcelles vous a inscrit.
        </Text>
        <Divider my={12} />
        <Text fontSize="2xl" fontWeight="medium" color="secondaryText">
          Vous avez déjà été inscrit par votre conseiller ?
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          textDecoration="underline"
          mt={6}
          cursor="pointer"
          onClick={() => setDisplayForm(true)}
        >
          J’ai besoin d’aide pour me connecter
        </Text>
      </Box>
      <Center w={!isDesktop ? "auto" : "40%"}>
        <Icon as={HiFaceFrown} w="200px" h="200px" />
      </Center>
    </Flex>
  );
};

export default NotEligibleForm;
