import { Spinner } from "@chakra-ui/react";

export default function LoadingLoader() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.400"
      size="xl"
    />
  );
}
