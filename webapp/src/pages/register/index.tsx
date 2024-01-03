import { api } from "~/utils/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export default function Home() {
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const { mutate: registerUser, isLoading } = api.user.register.useMutation({
    onSuccess: () => {
      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    },
    onError: (error) => {
      console.log(error.data?.httpStatus);
      if (error.data?.httpStatus === 409) {
        setError("email", {
          type: "manual",
          message: "Cet email existe déjà",
        });
        console.log(errors);
      }
    },
  });

  const handleRegister: SubmitHandler<RegisterForm> = async (values) => {
    await registerUser(values);
  };

  return (
    <Box mt={28}>
      <Heading>Inscription</Heading>
      <Flex
        as="form"
        flexDir="column"
        mt={6}
        bg="gray.50"
        shadow="lg"
        borderRadius={8}
        p={8}
        gap={6}
        onSubmit={handleSubmit(handleRegister)}
      >
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Ce champ est obligatoire",
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">Prénom</FormLabel>
          <Input
            id="firstName"
            type="firstName"
            {...register("firstName", {
              required: "Ce champ est obligatoire",
            })}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Nom</FormLabel>
          <Input
            id="lastName"
            type="lastName"
            {...register("lastName", {
              required: "Ce champ est obligatoire",
            })}
          />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Ce champ est obligatoire",
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères",
              },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.passwordConfirmation}>
          <FormLabel htmlFor="passwordConfirmation">
            Confirmation mot de passe
          </FormLabel>
          <Input
            id="passwordConfirmation"
            type="password"
            {...register("passwordConfirmation", {
              required: "Ce champ est obligatoire",
              validate: (value) =>
                value === getValues("password") ||
                "Les mots de passe ne correspondent pas",
            })}
          />
          <FormErrorMessage>
            {errors.passwordConfirmation?.message}
          </FormErrorMessage>
        </FormControl>
        <Flex justifyContent="end">
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Inscription
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
