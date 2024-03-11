import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiPlus, HiXMark } from "react-icons/hi2";

type FAQSectionAccordionItemProps = {
  title: string;
  content: string;
  index: number;
  currentIndex: number | null;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  total: number;
};

const FAQSectionAccordionItem = ({
  title,
  content,
  index,
  currentIndex,
  setCurrentIndex,
  total,
}: FAQSectionAccordionItemProps) => {
  const accordionBtnSize = useBreakpointValue({
    base: "sm",
    lg: "md",
  });

  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <Box
          bgColor={isExpanded ? "bgWhite" : "none"}
          borderRadius={isExpanded ? "3xl" : "none"}
          borderBottom={index !== total - 1 ? "1px solid" : "none"}
          borderColor={
            isExpanded || (currentIndex && currentIndex - 1 == index)
              ? "transparent"
              : "gray.200"
          }
          pb={{ base: isExpanded ? 2 : 0, lg: 8 }}
        >
          <AccordionButton
            _hover={{
              background: "none",
            }}
            onClick={() => setCurrentIndex(!isExpanded ? index : null)}
            pt={{ base: 2, lg: 8 }}
            px={{ base: 4, lg: 8 }}
          >
            <Text
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="bold"
              fontSize={{ base: "lg", lg: "3xl" }}
              mr={8}
            >
              {title}
            </Text>
            {!isExpanded ? (
              <IconButton
                as="div"
                icon={<Icon as={HiPlus} />}
                onClick={() => setCurrentIndex(index)}
                colorScheme="gray"
                px={{ lg: 0 }}
                size={accordionBtnSize}
                borderRadius="full"
                aria-label="Ouvrir l'accordéon"
              />
            ) : (
              <IconButton
                as="div"
                icon={<Icon as={HiXMark} />}
                onClick={() => setCurrentIndex(null)}
                px={{ lg: 0 }}
                size={accordionBtnSize}
                borderRadius="full"
                aria-label="Fermer l'accordéon"
              />
            )}
          </AccordionButton>
          <AccordionPanel px={{ base: 4, lg: 8 }} w="85%">
            <Text
              textAlign="left"
              fontWeight="medium"
              fontSize={{ base: "md", lg: "xl" }}
              color="secondaryText"
            >
              {content}
            </Text>
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  );
};

export default FAQSectionAccordionItem;
