import { Icon, IconProps } from "@chakra-ui/react";

export const AccountIcon = (props: IconProps) => {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <circle
        cx="11.9999"
        cy="6.8278"
        r="4.66468"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.846 21.7749V19.8766C20.846 17.6674 19.0552 15.8766 16.846 15.8766H7.15381C4.94467 15.8766 3.15381 17.6674 3.15381 19.8766V21.7749H12.6034"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
