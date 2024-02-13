import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  UseFormRegister,
  ValidationValueMessage,
} from "react-hook-form";

type Props = {
  label: string;
  name: string;
  kind: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
  fieldError: FieldError | undefined;
  rules?: { [key: string]: string | ValidationValueMessage };
};

const FormInput = ({
  label,
  name,
  kind,
  register,
  fieldError,
  rules,
}: Props) => {
  return (
    <FormControl isRequired isInvalid={!!fieldError} variant="floating">
      <Input
        id={name}
        type={kind}
        placeholder=""
        borderRadius={16}
        border="none"
        errorBorderColor="transparent"
        autoComplete="off"
        backgroundColor={!fieldError ? "cje-gray.500" : "errorLight"}
        px={5}
        pt={9}
        autoFocus
        pb={7}
        _focusVisible={{
          borderColor: "transparent",
          boxShadow: "none",
        }}
        {...register(name, { ...rules })}
      />
      <FormLabel fontWeight="medium" color="disabled">
        {label}
      </FormLabel>
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
