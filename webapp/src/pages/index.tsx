import {
	Box,
	Button,
	Divider,
	Flex,
	FormErrorMessage,
	HStack,
	Heading,
	Icon,
	Link,
	PinInput,
	PinInputField,
	Text,
} from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HiArrowRight, HiChevronLeft } from "react-icons/hi2";
import BigLoader from "~/components/BigLoader";
import ChakraNextImage from "~/components/ChakraNextImage";
import FormInput from "~/components/forms/FormInput";
import { loginAnimation } from "~/utils/animations";
import { api } from "~/utils/api";
import { addSpaceToTwoCharacters, frenchPhoneNumber } from "~/utils/tools";

type LoginForm = {
	phone_number: string;
};

const pinProps = {
	w: 12,
	h: 12,
	borderColor: "transparent",
	_hover: { borderColor: "transparent" },
	_focus: { borderColor: "blackLight", borderWidth: "2px" },
	_focusVisible: { boxShadow: "none" },
};

const defaultTimeToResend = 30;

export default function Home() {
	const router = useRouter();

	const [isOtpGenerated, setIsOtpGenerated] = useState(false);
	const [hasOtpError, setHasOtpError] = useState(false);
	const [hasOtpExpired, setHasOtpExpired] = useState(false);
	const [forceLoader, setForceLoader] = useState(false);

	const [timeToResend, setTimeToResend] = useState(defaultTimeToResend);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const {
		handleSubmit,
		register,
		setError,
		setValue,
		watch,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onSubmit",
	});

	const formValues = watch();

	const resetTimer = () => {
		if (intervalId) clearInterval(intervalId);
		setTimeToResend(defaultTimeToResend);
		const id = setInterval(() => {
			setTimeToResend((prevTime) => prevTime - 1);
		}, 1000);
		setIntervalId(id);
	};

	const { mutate: generateOtp, isLoading: isLoadingOtp } =
		api.user.generateOTP.useMutation({
			onSuccess: async ({ data }) => {
				setIsOtpGenerated(true);
				resetTimer();
			},
			onError: async ({ data }) => {
				console.log(data?.httpStatus)
				if (data?.httpStatus === 401) {
					setError("phone_number", {
						type: "conflict",
						message:
							"Votre numéro de téléphone n'est pas autorisé à accéder à l'application",
					});
				} else {
					setError("phone_number", {
						type: "internal",
						message:
							"Erreur coté serveur, veuillez contacter le support",
					});
				}
			},
		});

	const { mutate: loginUser, isLoading: isLoadingLogin } =
		api.user.loginUser.useMutation({
			onSuccess: async ({ data }) => {
				setCookie(
					process.env.NEXT_PUBLIC_JWT_NAME ?? "cje-jwt",
					data.token || ""
				);
				router.reload();
				router.push("/dashboard");
			},
			onError: async ({ data }) => {
				if (data?.httpStatus === 401) {
					setHasOtpError(true);
				} else if (data?.httpStatus === 408) {
					setHasOtpExpired(true);
				}
				setForceLoader(false);
			},
		});

	const handleGenerateOtp: SubmitHandler<LoginForm> = async (values) => {
		generateOtp({ phone_number: values.phone_number });
	};

	const handleLoginUser = async (otp: string) => {
		setForceLoader(true);
		loginUser({
			phone_number: formValues.phone_number,
			otp,
		});
	};

	useEffect(() => {
		loginAnimation();
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setTimeToResend((prevTime) => prevTime - 1);
		}, 1000);

		setIntervalId(id);

		return () => clearInterval(id);
	}, []);

	if (isLoadingOtp || isLoadingLogin || forceLoader) return <BigLoader />;

	if (isOtpGenerated) {
		return (
			<>
				<Flex
					position="relative"
					alignItems="center"
					justifyContent="center"
					pt={8}
				>
					<Icon
						as={HiChevronLeft}
						w={6}
						h={6}
						onClick={() => {
							setIsOtpGenerated(false);
							setValue("phone_number", "");
						}}
						cursor="pointer"
						position="absolute"
						left={6}
					/>
					<Text fontWeight={"extrabold"} fontSize={"sm"}>
						Connexion
					</Text>
				</Flex>
				<Flex py={8} px={8} flexDir={"column"}>
					<Heading fontSize={"2xl"} fontWeight={"extrabold"} mb={6}>
						Vous avez reçu un code à 4 chiffres par SMS
					</Heading>
					<Text fontSize={"sm"} fontWeight="medium" color="secondaryText">
						Saisissez le code envoyé au {addSpaceToTwoCharacters(formValues.phone_number)} pour pouvoir créer votre
						compte
					</Text>
					<Box my={8}>
						<HStack>
							<PinInput
								placeholder="-"
								otp
								onComplete={handleLoginUser}
								onChange={() => {
									setHasOtpError(false);
									setHasOtpExpired(false);
								}}
							>
								<PinInputField
									{...pinProps}
									bg={hasOtpError ? "errorLight" : "cje-gray.500"}
								/>
								<PinInputField
									{...pinProps}
									bg={hasOtpError ? "errorLight" : "cje-gray.500"}
								/>
								<PinInputField
									{...pinProps}
									bg={hasOtpError ? "errorLight" : "cje-gray.500"}
								/>
								<PinInputField
									{...pinProps}
									bg={hasOtpError ? "errorLight" : "cje-gray.500"}
								/>
							</PinInput>
						</HStack>
						{
							hasOtpExpired && (
								<Text color="error" fontSize={"sm"} mt={2}>
									Le code n'est plus valide, cliquez sur le lien ci-dessous pour recevoir un nouveau SMS
								</Text>
							)
						}
						{hasOtpError && (
							<Text color="error" fontSize={"sm"} mt={2}>
								On dirait que ce code n’est pas le bon
							</Text>
						)}
					</Box>
					<Link
						mt={6}
						textDecor={"underline"}
						fontWeight={"medium"}
						color={timeToResend <= 0 ? "initial" : "gray.500"}
						onClick={() => {
							if (timeToResend <= 0)
								handleGenerateOtp({ phone_number: formValues.phone_number });
						}}
					>
						Me renvoyer un code par SMS{" "}
						{timeToResend <= 0 ? "" : `(${timeToResend}s)`}
					</Link>
				</Flex>
			</>
		);
	}

	return (
		<Flex flexDir="column" py={8} h="full" overflow={"hidden"}>
			<Box id="login-gov-image" ml={4}>
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
				<form onSubmit={handleSubmit(handleGenerateOtp)}>
					<FormInput
						field={{
							name: "phone_number",
							kind: "tel",
							placeholder: "Votre numéro de téléphone",
							prefix: "🇫🇷",
							rules: {
								required: "Ce champ est obligatoire",
								pattern: {
									value: frenchPhoneNumber,
									message:
										"On dirait que ce numéro de téléphone n’est pas valide. Vérifiez votre numéro",
								},
							},
						}}
						fieldError={errors.phone_number}
						register={register}
					/>
					<Button
						mt={4}
						colorScheme="blackBtn"
						type={"submit"}
						float="right"
						w="full"
						isLoading={isLoadingOtp}
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
