import { Box, Center, Flex, Text } from "@chakra-ui/react";

type HowItWorksSectionCardProps = {
  title: string;
  description: string;
  number: number;
};

const HowItWorksSectionCard = ({
  title,
  description,
  number,
}: HowItWorksSectionCardProps) => {
  return (
    <Flex
      flex={1}
      flexDir="column"
      alignItems="center"
      gap={4}
      p={{ base: 6, lg: 9 }}
      bgColor="bgWhite"
      borderRadius="3xl"
    >
      <Center h="50px" w="50px" bgColor="black" p={2} borderRadius="full">
        <Text as="span" fontSize="2xl" fontWeight="medium" color="white">
          {number}
        </Text>
      </Center>
      <Text
        fontSize={{ base: "xl", lg: "2xl" }}
        fontWeight="extrabold"
        px={{ base: 0, lg: 9 }}
        lineHeight={{ base: "normal", lg: "shorter" }}
      >
        {title}
      </Text>
      <Text fontWeight="medium" color="secondaryText">
        {description}
      </Text>
    </Flex>
  );
};

export default HowItWorksSectionCard;
