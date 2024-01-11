import { Icon, IconProps } from "@chakra-ui/react";

export const OnlineIcon = (props: IconProps) => {
  return (
    <Icon width="16px" height="16px" viewBox="0 0 16 16">
      <path
        d="M4.60869 12.9565L2 2L12.9565 4.60869L9.82607 6.69567L14 10.8695L10.8695 14L6.69567 9.82607L4.60869 12.9565Z"
        fill={props.color === "black" ? "white" : "black"}
        stroke={props.color === "black" ? "black" : "white"}
        strokeOpacity="0.95"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
