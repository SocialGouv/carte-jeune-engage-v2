import { Icon, IconProps } from "@chakra-ui/react";

export const WalletIcon = (props: IconProps) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <path
        d="M6.07819 7.86373L21.5865 9.68813V22.4033L4.99215 20.0501C3.51283 19.8403 2.41336 18.574 2.41336 17.0798V8.07352C2.41336 6.70448 3.34019 5.5091 4.66608 5.16808L18.5519 1.59668V5.74749"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5866 13.6767L16.6496 13.1208C15.2025 12.9579 13.9356 14.0902 13.9356 15.5464V15.5464C13.9356 16.7849 14.863 17.827 16.0931 17.9708L21.5866 18.6131"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
