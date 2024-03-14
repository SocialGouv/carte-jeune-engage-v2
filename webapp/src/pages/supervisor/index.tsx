import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiOutlineArrowRight } from "react-icons/hi";
import FormInput from "~/components/forms/FormInput";
import { api } from "~/utils/api";

type LoginForm = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutate: loginUser, isLoading } = api.user.loginSupervisor.useMutation(
    {
      onSuccess: async ({ data }) => {
        setCookie(
          process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt",
          data.token || "",
          { expires: new Date((data.exp as number) * 1000) }
        );
        router.push("/");
      },
    }
  );

  const handleLogin: SubmitHandler<LoginForm> = async (values) => {
    await loginUser(values);
  };

  return (
    <Flex
      display="flex"
      flexDir="column"
      py={12}
      px={6}
      justifyContent="space-between"
      h="full"
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box>
          <Heading>Connexion référents</Heading>
          <Flex flexDir="column" mt={12} borderRadius={8} gap={6}>
            <FormInput
              field={{
                name: "email",
                label: "Email",
                kind: "email",
                rules: { required: "Ce champ est obligatoire" },
              }}
              fieldError={errors.email}
              register={register}
            />
            <FormInput
              field={{
                name: "password",
                label: "Mot de passe",
                kind: "password",
                rules: { required: "Ce champ est obligatoire" },
              }}
              fieldError={errors.password}
              register={register}
            />
          </Flex>
        </Box>
        <Flex justifyContent="end" mt={6}>
          <Button
            rightIcon={<Icon as={HiOutlineArrowRight} />}
            type="submit"
            isLoading={isLoading}
          >
            Se connecter
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
