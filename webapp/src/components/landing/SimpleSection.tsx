import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

type SimpleSectionProps = {
  title: string;
  description: string;
  image: string;
};

const SimpleSection = ({ title, description, image }: SimpleSectionProps) => {
  return (
    <Flex flexDir={{ base: "column", lg: "row-reverse" }} gap={8}>
      <Box w={{ base: "full", lg: "50%" }} bgColor="bgWhite" borderRadius="2xl">
        <Image src={image} />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="center"
        mr="auto"
        w={{ base: "full", lg: "43%" }}
      >
        <Heading fontWeight="extrabold" lineHeight="shorter">
          {title}
        </Heading>
        <Text
          fontWeight="medium"
          color="secondaryText"
          mt={{ base: 4, lg: 12 }}
          fontSize={{ base: "md", lg: "2xl" }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SimpleSection;
