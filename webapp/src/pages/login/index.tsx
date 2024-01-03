import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
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
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutate: loginUser, isLoading } = api.user.login.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleLogin: SubmitHandler<LoginForm> = async (values) => {
    await loginUser(values);
  };

  return (
    <Box mt={28}>
      <Heading>Connexion</Heading>
      <Flex
        as="form"
        flexDir="column"
        mt={6}
        bg="gray.50"
        shadow="lg"
        borderRadius={8}
        p={8}
        gap={6}
        onSubmit={handleSubmit(handleLogin)}
      >
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Ce champ est obligatoire" })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Ce champ est obligatoire" })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent="end">
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Connexion
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
