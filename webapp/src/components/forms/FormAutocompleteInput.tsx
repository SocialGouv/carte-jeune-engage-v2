import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FieldProps } from "./FormInput";

interface Props {
  field: FieldProps;
  options: string[];
  setError: any;
  clearErrors: any;
  isLoading: boolean;
  control: Control<any>;
  fieldError: FieldError | undefined;
}

const FormAutocompleteInput = ({
  field,
  control,
  fieldError,
  options,
  setError,
  clearErrors,
  isLoading,
}: Props) => {
  const { label, name } = field;

  return (
    <FormControl isRequired isInvalid={!!fieldError} variant="floating">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          if (value && !options.includes(value) && fieldError === undefined) {
            console.log(options);
            console.log("setting error");
            setError(name, {
              type: "autocompleteValue",
              message: "",
            });
          }

          return (
            <Box
              className={
                value && value !== "" ? "chakra-autocomplete-has-value" : ""
              }
            >
              <AutoComplete
                defaultIsOpen
                openOnFocus
                isLoading={isLoading}
                emptyState={
                  <Center
                    bgColor="cje-gray.500"
                    borderRadius="2xl"
                    fontWeight="medium"
                    py={8}
                  >
                    <Text>Pas de résultats</Text>
                  </Center>
                }
                onSelectOption={({ item }: any) => {
                  clearErrors(name);
                  onChange(item.value);
                }}
              >
                <AutoCompleteInput
                  placeholder=""
                  borderRadius="2xl"
                  border="none"
                  loadingIcon={<></>}
                  errorBorderColor="transparent"
                  autoComplete="off"
                  backgroundColor={
                    !fieldError || fieldError.type === "autocompleteValue"
                      ? "cje-gray.500"
                      : "errorLight"
                  }
                  px={5}
                  pt={9}
                  autoFocus
                  onChange={(e: any) => {
                    onChange(e.target.value);
                    if (!options.includes(e.target.value)) {
                      setError(name, {
                        type: "autocompleteValue",
                        message: "",
                      });
                    } else {
                      clearErrors(name);
                    }
                  }}
                  value={value}
                  pb={7}
                  _focusVisible={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                />
                <AutoCompleteList
                  style={{
                    backgroundColor: "transparent",
                    border: "0",
                    boxShadow: "none",
                  }}
                  loadingState={
                    <Center
                      bgColor="cje-gray.500"
                      borderRadius="2xl"
                      fontWeight="medium"
                      w="full"
                      py={8}
                    >
                      <Spinner />
                    </Center>
                  }
                  gap={2}
                  mt={-4}
                >
                  {options?.map((option) => (
                    <AutoCompleteItem
                      key={option}
                      value={option}
                      mx={0}
                      textTransform="capitalize"
                      bgColor="cje-gray.500"
                      borderRadius="2xl"
                      py={3}
                      px={4}
                      justifyContent="center"
                      border="2px solid"
                      borderColor={
                        option === value ? "blackLight" : "transparent"
                      }
                      _focus={{
                        borderColor: "blackLight",
                      }}
                    >
                      <Text noOfLines={1} fontWeight="medium">
                        {option}
                      </Text>
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </Box>
          );
        }}
      />
      <FormLabel fontWeight="medium" color="disabled">
        {label}
      </FormLabel>
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormAutocompleteInput;
