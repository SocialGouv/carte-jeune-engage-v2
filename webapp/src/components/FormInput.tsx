import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  kind: HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
  fieldError: FieldError | undefined;
  rules?: { [key: string]: string };
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
    <FormControl isRequired isInvalid={!!fieldError}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        type={kind}
        bgColor="white"
        borderRadius={16}
        p={5}
        {...register(name, { ...rules })}
      />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
