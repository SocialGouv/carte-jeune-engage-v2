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

export type FieldProps = {
  label?: string;
  name: string;
  kind: HTMLInputTypeAttribute;
  placeholder?: string;
  prefix?: string;
  rules?: { [key: string]: string | ValidationValueMessage };
};

interface Props {
  field: FieldProps;
  register: UseFormRegister<any>;
  fieldError: FieldError | undefined;
}

const FormInput = ({
  field: { name, kind, rules, label, placeholder, prefix },
  register,
  fieldError,
}: Props) => {
  return (
    <FormControl
      isRequired
      isInvalid={!!fieldError}
      variant="floating"
      _before={
        prefix
          ? {
              content: `"${prefix}"`,
              position: "absolute",
              top: "50%",
              transform: "translateY(-75%)",
              left: "1rem",
              width: "1rem",
              height: "1rem",
              zIndex: 99,
            }
          : {}
      }
    >
      <Input
        id={name}
        type={kind}
        placeholder={placeholder}
        borderRadius={16}
        border="none"
        errorBorderColor="transparent"
        autoComplete="off"
        backgroundColor={!fieldError ? "cje-gray.500" : "errorLight"}
        pr={5}
        pl={prefix ? 12 : 5}
        pt={label ? 9 : 7}
        autoFocus
        pb={7}
        _focusVisible={{
          borderColor: "transparent",
          boxShadow: "none",
        }}
        {...register(name, { ...rules })}
        position={"relative"}
      />
      {label && (
        <FormLabel fontWeight="medium" color="disabled">
          {label}
        </FormLabel>
      )}
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
