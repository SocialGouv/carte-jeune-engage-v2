import { ChakraProps, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const TextWithLinks = ({
  text,
  props,
}: {
  text: string;
  props?: ChakraProps;
}) => {
  const URL_REGEX = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  const html = text.split(" ").map((part) => {
    if (URL_REGEX.test(part)) {
      const urlPart = part.startsWith("www.") ? `http://${part}` : part;
      return (
        <>
          <Link
            as={NextLink}
            key={part}
            href={urlPart}
            borderBottom="1px solid black"
            _hover={{ textDecoration: "none" }}
            isExternal
          >
            {part}
          </Link>{" "}
        </>
      );
    }

    return <>{part} </>;
  });

  return <Text {...props}>{html}</Text>;
};

export default TextWithLinks;
