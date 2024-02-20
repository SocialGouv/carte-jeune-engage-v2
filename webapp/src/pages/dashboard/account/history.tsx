import { Box, Center, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "~/providers/Auth";
import LoadingLoader from "~/components/LoadingLoader";
import { HiArrowLeft } from "react-icons/hi2";
import { api } from "~/utils/api";
import { UserIncluded } from "~/server/api/routers/user";
import Image from "next/image";

const UserSavingsNoData = () => {
  return (
    <Box textAlign="center" mt={40}>
      <Text fontWeight="medium" fontSize="sm" px={14}>
        Vous n’avez pas encore utilisé les réductions de votre application.
      </Text>
    </Box>
  );
};

export default function AccountHistory() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: resultUserSavings, isLoading: isLoadingUserSavings } =
    api.saving.getByUserId.useQuery(
      { userId: (user as UserIncluded)?.id },
      { enabled: !!user?.id }
    );

  const { data: userSavings } = resultUserSavings || {};

  if (!user || isLoadingUserSavings || !userSavings)
    return (
      <Center h="full" w="full">
        <LoadingLoader />
      </Center>
    );

  return (
    <Box pt={12} pb={36} px={8}>
      <Icon
        as={HiArrowLeft}
        w={6}
        h={6}
        onClick={() => router.back()}
        cursor="pointer"
      />
      <Heading
        as="h2"
        size="lg"
        fontWeight="extrabold"
        mt={4}
        textAlign="center"
      >
        Historique de mes <br />
        économies
      </Heading>
      <Text fontWeight="medium" fontSize="sm" mt={6}>
        Vos économies peuvent prendre quelques jours pour s’afficher ici
      </Text>
      {userSavings.length > 0 ? (
        <Flex flexDir="column" mt={8}>
          {userSavings.map((userSaving, index) => {
            const currentDate = new Date();
            const currentCouponUsedAt = new Date(userSaving.usedAt as string);
            const previousCouponUsedAt = new Date(
              userSavings[index - 1]?.usedAt as string
            );

            const currentMonth = currentCouponUsedAt.toLocaleString("fr-FR", {
              month: "long",
            });

            const formatedCurrentMonth =
              index === 0 &&
              currentDate.getMonth() === currentCouponUsedAt.getMonth() &&
              currentDate.getFullYear() === currentCouponUsedAt.getFullYear()
                ? "Ce mois-ci"
                : `${
                    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
                  } ${
                    currentDate.getFullYear() !==
                    currentCouponUsedAt.getFullYear()
                      ? currentCouponUsedAt.getFullYear()
                      : ""
                  }`;

            return (
              <>
                {currentCouponUsedAt.getMonth() !==
                  previousCouponUsedAt.getMonth() && (
                  <Text
                    key={currentCouponUsedAt.getMonth()}
                    fontWeight="extrabold"
                    color="primary"
                    mt={index === 0 ? 0 : 8}
                  >
                    {formatedCurrentMonth}
                  </Text>
                )}
                <Flex
                  key={userSaving.id}
                  alignItems="center"
                  justifyContent="space-between"
                  mt={5}
                >
                  <Flex alignItems="center" gap={4}>
                    <Box
                      borderRadius="full"
                      overflow="hidden"
                      bgColor="white"
                      p={1}
                    >
                      <Image
                        src={userSaving.offer.partner.icon.url as string}
                        alt={userSaving.offer.partner.icon.alt as string}
                        width={42}
                        height={42}
                        objectFit="cover"
                        objectPosition="center"
                        style={{ width: "42px", height: "42px" }}
                      />
                    </Box>
                    <Text fontSize="sm" fontWeight="bold">
                      {userSaving.offer.partner.name}
                    </Text>
                  </Flex>
                  {userSaving.savingAmount === null ? (
                    <Text fontSize="xs" fontWeight="medium" color="disabled">
                      Information <br />
                      manquante
                    </Text>
                  ) : (
                    <Text fontWeight="bold">{userSaving.savingAmount}€</Text>
                  )}
                </Flex>
              </>
            );
          })}
        </Flex>
      ) : (
        <UserSavingsNoData />
      )}
    </Box>
  );
}
