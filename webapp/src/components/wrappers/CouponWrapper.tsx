import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { CouponIncluded } from "~/server/api/routers/coupon";
import { OfferIncluded } from "~/server/api/routers/offer";

type CouponWrapperProps = {
  children: ReactNode;
  coupon?: CouponIncluded;
  offer: OfferIncluded;
};

const CouponWrapper = ({ children, coupon, offer }: CouponWrapperProps) => {
  return (
    <Flex
      flexDir="column"
      overflowY="auto"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      px={8}
      h="full"
      gap={6}
      pb={12}
    >
      <Heading
        as="h3"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mt={6}
      >
        {offer.title}
      </Heading>
      <Flex flexDir="column">
        <Box
          position="relative"
          borderRadius="xl"
          w="full"
          bgColor={coupon ? "white" : "cje-gray.500"}
          textAlign="center"
          py={10}
        >
          <Text
            id="coupon-code-text"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing={4}
          >
            {coupon?.code ? coupon.code : "6FHDJFHEIDJF"}
          </Text>
          <Flex
            id="coupon-code-icon"
            position="absolute"
            bgColor="white"
            p={5}
            shadow="md"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Icon
              id="coupon-code-icon-unlock"
              as={FiUnlock}
              display="none"
              w={6}
              h={6}
            />
            <Icon id="coupon-code-icon-lock" as={FiLock} w={6} h={6} />
          </Flex>
        </Box>
        {coupon && (
          <Flex
            className="coupon-info"
            flexDir="column"
            alignItems="center"
            gap={1}
            py={4}
            bgColor="white"
            borderRadius="xl"
            sx={{
              backgroundImage:
                "linear-gradient(to right, #E9E9E9 55%, #fff 0%)",
              backgroundSize: "27.5px 2px",
              backgroundRepeat: "repeat-x",
            }}
          >
            <Flex alignItems="center" gap={2}>
              <Text fontSize="lg" fontWeight="bold">
                Code promo activé
              </Text>
              <Flex bgColor="success" borderRadius="full" p={1}>
                <Icon as={CheckIcon} w={3} h={3} color="white" />
              </Flex>
            </Flex>
            <Text as="span" fontSize="sm" color="disabled">
              Utilisable jusqu'au:{" "}
              <Text as="span" color="black" fontWeight="bold">
                {new Date(coupon.offer.validityTo).toLocaleDateString()}
              </Text>
            </Text>
          </Flex>
        )}
      </Flex>
      {children}
    </Flex>
  );
};

export default CouponWrapper;
