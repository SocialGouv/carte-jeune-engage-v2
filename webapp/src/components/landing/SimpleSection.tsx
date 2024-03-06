import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

type SimpleSectionProps = {
  title: string;
  description: string;
  image: string;
};

const SimpleSection = ({ title, description, image }: SimpleSectionProps) => {
  return (
    <Flex flexDir="column" gap={8}>
      <Box bgColor="bgWhite" borderRadius="2xl">
        <Image src={image} />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <Heading fontWeight="extrabold" lineHeight="shorter">
          {title}
        </Heading>
        <Text fontWeight="medium" color="secondaryText" mt={4}>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SimpleSection;
