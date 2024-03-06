import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
  IconButton,
  Text,
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
          pb={isExpanded ? 2 : 0}
        >
          <AccordionButton
            _hover={{
              background: "none",
            }}
            onClick={() => setCurrentIndex(!isExpanded ? index : null)}
          >
            <Text
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="bold"
              fontSize="lg"
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
                size="sm"
                borderRadius="full"
                aria-label="Ouvrir l'accordéon"
              />
            ) : (
              <IconButton
                as="div"
                icon={<Icon as={HiXMark} />}
                onClick={() => setCurrentIndex(null)}
                size="sm"
                borderRadius="full"
                aria-label="Fermer l'accordéon"
              />
            )}
          </AccordionButton>
          <AccordionPanel>
            <Text textAlign="left" fontWeight="medium" color="secondaryText">
              {content}
            </Text>
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  );
};

export default FAQSectionAccordionItem;
