import { Box, ChakraProps } from "@chakra-ui/react";
import { QRCode } from "react-qrcode-logo";

type QRCodeProps = {
  value: string;
  wrapperProps?: ChakraProps;
};

const QRCodeWrapper = ({ value, wrapperProps }: QRCodeProps) => {
  return (
    <Box {...wrapperProps} borderRadius="2xl">
      <QRCode
        value={value}
        qrStyle="dots"
        eyeRadius={16}
        logoPadding={4}
        size={256}
        logoImage="/images/cje-logo.png"
      />
    </Box>
  );
};

export default QRCodeWrapper;
