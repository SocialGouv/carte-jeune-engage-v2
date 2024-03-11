import { Box, ChakraProps } from "@chakra-ui/react";
import { QRCode } from "react-qrcode-logo";

type QRCodeProps = {
  value: string;
  size?: number;
  wrapperProps?: ChakraProps;
};

const QRCodeWrapper = ({ value, size, wrapperProps }: QRCodeProps) => {
  return (
    <Box {...wrapperProps} borderRadius="2xl">
      <QRCode
        value={value}
        qrStyle="dots"
        logoWidth={50}
        logoHeight={30}
        eyeRadius={16}
        logoPadding={6}
        removeQrCodeBehindLogo={true}
        size={size ?? 256}
        logoImage="/images/cje-logo.png"
      />
    </Box>
  );
};

export default QRCodeWrapper;
