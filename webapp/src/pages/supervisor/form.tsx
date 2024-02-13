import { Box, Button, Text, Flex, Heading, Icon } from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiOutlineArrowRight } from "react-icons/hi";
import FormInput from "~/components/FormInput";
import { api } from "~/utils/api";

type SignUpForm = {
	phone: string;
};

export default function Home() {
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignUpForm>();

	return (
		<Flex
			display="flex"
			flexDir="column"
			py={12}
			px={6}
			justifyContent="space-between"
			h="full"
		>
			<Heading>Donner accès à l'application Carte Jeune Engagé</Heading>
			<Text>HELLO WORLD</Text>
		</Flex>
	);
}
