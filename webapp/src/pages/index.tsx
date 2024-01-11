import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

export default function Home() {
  const router = useRouter();

  const onBoardingItems = [
    {
      title: "Des réductions pour vous accompagner au quotidien",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      image: "/images/onboarding/discount.svg",
    },
    {
      title: "Générer facilement la promo associé à l’offre",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      image: "/images/onboarding/box.svg",
    },
    {
      title:
        "Utilisez la promo en ligne ou directement chez l’enseigne partenaire",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      image: "/images/onboarding/computer.svg",
    },
  ];

  const [onBoardingItemIndex, setOnBoardingItemIndex] = useState(0);

  return (
    <Flex flexDir="column" h="full" justifyContent="space-between">
      <Image
        src={onBoardingItems[onBoardingItemIndex]?.image}
        alt={onBoardingItems[onBoardingItemIndex]?.title}
        w="full"
        my="auto"
        h="350px"
        objectPosition="bottom"
        objectFit="cover"
      />
      <Box w="full" px={6} mb={6}>
        <Flex
          px={6}
          py={8}
          flexDir="column"
          h="45vh"
          borderRadius="3xl"
          textAlign="center"
          background="linear-gradient(217deg, rgba(252, 252, 253, 0.50) -0.01%, rgba(252, 252, 253, 0.30) 100%)"
        >
          <Heading as="h2" fontSize="xl" fontWeight="semibold">
            {onBoardingItems[onBoardingItemIndex]?.title}
          </Heading>
          <Text my={4} fontSize="sm">
            {onBoardingItems[onBoardingItemIndex]?.description}
          </Text>
          <Flex flexDir="column" mt="auto" mx="auto">
            <Flex
              bgColor="white"
              mt={5}
              p={4}
              gap={6}
              shadow="sm"
              borderRadius="6.25rem"
            >
              <Icon
                as={HiOutlineArrowLeft}
                w="24px"
                h="24px"
                onClick={() => {
                  if (onBoardingItemIndex !== 0)
                    setOnBoardingItemIndex((prev) => prev - 1);
                }}
                color={onBoardingItemIndex === 0 ? "gray.300" : "primary.500"}
              />
              <Box h="24px" w="0.5px" bgColor="gray.200" />
              <Icon
                as={HiOutlineArrowRight}
                w="24px"
                h="24px"
                onClick={() => {
                  if (onBoardingItemIndex !== onBoardingItems.length - 1) {
                    setOnBoardingItemIndex((prev) => prev + 1);
                  } else {
                    router.push("/login");
                  }
                }}
                color="primary.500"
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
