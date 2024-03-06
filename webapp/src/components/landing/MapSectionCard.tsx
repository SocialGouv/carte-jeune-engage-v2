import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type MapSectionCardProps = {
  text: string;
  icon: IconType;
};

const MapSectionCard = ({ text, icon }: MapSectionCardProps) => {
  return (
    <Flex
      flexDir="column"
      gap={4}
      p={6}
      bgColor="bgWhite"
      borderRadius="3xl"
      zIndex={10}
    >
      <Box bgColor="black" p={2} borderRadius="full" alignSelf="start">
        <Icon as={icon} display="block" color="white" w={6} h={6} />
      </Box>
      <Text fontSize="xl" lineHeight="shorter">
        {text}
      </Text>
    </Flex>
  );
};

export default MapSectionCard;
