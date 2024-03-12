import { Button, VStack } from "@chakra-ui/react";

type StepsButtonsProps = {
  mainBtnText: string;
  activeStep: number;
  count: number;
  setActiveStep: (index: number) => void;
  handleValidate?: () => void;
  onClose: () => void;
};

const StepsButtons = ({
  mainBtnText,
  handleValidate,
  onClose,
  activeStep,
  setActiveStep,
  count,
}: StepsButtonsProps) => {
  const handleOnClose = () => {
    setActiveStep(1);
    onClose();
  };

  return (
    <VStack
      spacing={6}
      bottom={0}
      pb={6}
      position={"fixed"}
      w="full"
      left={0}
      px={4}
      bg={"bgWhite"}
      pt={4}
    >
      <Button
        onClick={() =>
          activeStep !== count
            ? setActiveStep(activeStep + 1)
            : handleValidate && handleValidate()
        }
        w="full"
      >
        {activeStep !== count ? "Suivant" : mainBtnText}
      </Button>
      <Button
        onClick={handleOnClose}
        variant="ghost"
        colorScheme="btnWhite"
        size="md"
        w="full"
      >
        Cette offre ne m'interesse pas
      </Button>
    </VStack>
  );
};

export default StepsButtons;
