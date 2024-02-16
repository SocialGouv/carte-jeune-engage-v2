import { Box, Button, Divider, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import ChakraNextImage from "~/components/ChakraNextImage";
import FormInput from "~/components/forms/FormInput";
import { loginAnimation } from "~/utils/animations";
import { api } from "~/utils/api";
import { frenchPhoneNumber } from "~/utils/tools";

type LoginForm = {
	phone: string;
};

export default function Home() {
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: 'onSubmit'
	});

	const { mutate: loginUser, isLoading } = api.user.loginUser.useMutation({
		onSuccess: async ({ data }) => {
			setCookie(
				process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt",
				data.token || ""
			);
			router.reload();
			router.push("/dashboard");
		},
	});

	const handleLogin: SubmitHandler<LoginForm> = async (values) => {
		console.log(values);
	};

	useEffect(() => {
		loginAnimation()
	}, [])

	return (
		<Flex flexDir="column" py={8} h="full">
			<Box
				id="login-gov-image"
				ml={4}>
				<ChakraNextImage
					src="/images/marianne.svg"
					alt="Logo marianne du gouvernement français"
					width={74}
					height={49}
				/>
			</Box>
			<Heading
				id="login-heading"
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
				<form onSubmit={handleSubmit(handleLogin)}>
					<FormInput
						field={{
							name: "phone",
							kind: "tel",
							placeholder: "Votre numéro de téléphone",
							prefix: "🇫🇷",
							rules: {
								required: "Ce champ est obligatoire",
								pattern: {
									value: frenchPhoneNumber,
									message: "On dirait que ce numéro de téléphone n’est pas valide. Vérifiez votre numéro",
								},
							},
						}}
						fieldError={errors.phone}
						register={register}
					/>
					<Button
						mt={4}
						colorScheme="blackBtn"
						type={"submit"}
						float="right"
						w="full"
						isLoading={isLoading}
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
