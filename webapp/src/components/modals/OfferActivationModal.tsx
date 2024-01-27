import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Text,
  List,
  ListIcon,
  ListItem,
  ModalBody,
  ModalContent,
  ModalHeader
} from '@chakra-ui/react';
import { FiClock, FiGlobe, FiRotateCw, FiTag } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { TbBuildingStore } from 'react-icons/tb';
import { OfferIncluded } from '~/server/api/routers/offer';

const OfferActivationModal = ({
  onClose,
  onlyCgu,
  offer,
  mutateCouponToUser
}: {
  onClose: () => void;
  onlyCgu?: boolean;
  offer: OfferIncluded;
  mutateCouponToUser: ({ offer_id }: { offer_id: number }) => void;
}) => {
  const validityToDate = new Date(offer.validityTo);

  const cguItems: { icon: IconType; text: string; cross?: boolean }[] = [
    { icon: FiGlobe, text: 'Utilisable en ligne' },
    { icon: TbBuildingStore, text: 'À utiliser en magasin', cross: true },
    {
      icon: FiClock,
      text: `À utiliser avant le ${validityToDate.toLocaleDateString()} !`
    },
    { icon: FiRotateCw, text: 'Utilisation illimité' },
    { icon: FiTag, text: 'Non cumulable' }
  ];

  return (
    <ModalContent h="full">
      {onlyCgu && <ModalHeader mt={4}>Conditions d’utilisation</ModalHeader>}
      <ModalBody
        pos="sticky"
        display="flex"
        flexDir="column"
        justifyContent="end"
        h="full"
        py={10}
      >
        <List spacing={6} my="auto">
          {cguItems.map(({ icon, text, cross }, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon as={icon} w={6} h={6} mr={3}></ListIcon>
              <Text
                fontWeight="medium"
                textDecorationLine={cross ? 'line-through' : 'none'}
              >
                {text}
              </Text>
            </ListItem>
          ))}
        </List>
        <Button
          rightIcon={!onlyCgu ? <ArrowForwardIcon w={6} h={6} /> : undefined}
          onClick={() => {
            if (!onlyCgu) mutateCouponToUser({ offer_id: offer.id });
            onClose();
          }}
        >
          {!onlyCgu ? 'Activer le code promo' : 'Fermer'}
        </Button>
      </ModalBody>
    </ModalContent>
  );
};

export default OfferActivationModal;
