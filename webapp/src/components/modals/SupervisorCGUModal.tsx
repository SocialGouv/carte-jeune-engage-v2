import { Box, Button, Checkbox, Text } from "@chakra-ui/react";
import BaseModal from "./BaseModal";
import { useState } from "react";

type SupervisorCGUModalProps = {
  onClose: () => void;
  isOpen: boolean;
  onValidate: () => void;
  isLoading: boolean;
};

const SupervisorCGUModal = ({
  onClose,
  isOpen,
  onValidate,
  isLoading,
}: SupervisorCGUModalProps) => {
  const [hasAcceptedCGU, setHasAcceptedCGU] = useState<boolean>(false);
  return (
    <BaseModal onClose={onClose} isOpen={isOpen} size="xl" pb={4}>
      <Box maxH={500} overflowY={"scroll"}>
        <Text fontWeight="bold">Préambule</Text>
        <Text mt={4}>
          Dans un contexte où le coût de la vie augmente de façon significative
          (énergie, carburant, alimentation), les difficultés financières des
          jeunes en insertion ont tendance à se renforcer. D'autant plus que les
          jeunes en insertion ne sont pas éligibles à la plupart des
          tarifications solidaires et autres services d'aides, fléchés vers les
          étudiants, demandeurs d'emploi ou bénéficiaires des minimas sociaux.
        </Text>

        <Text mt={4}>
          Dans ce contexte, le Délégué interministériel à la jeunesse (DIJ) avec
          l'appui de la Fabrique numérique des ministères sociaux de la
          Direction numérique des ministères sociaux (DNUM) entend déployer un
          service public numérique dénommé “Carte Jeune Engagé” (ci-après “CJE”)
          selon la méthode “Start-up d'Etat”.
        </Text>

        <Text mt={4}>
          Carte Jeune Engagé permet à des entreprises partenaires dites
          “Entreprises Engagées” de proposer à des jeunes inscrits dans un
          parcours d'insertion - dits “Jeunes Engagés” - divers avantages sur
          des biens et services.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 1er - Objet
        </Text>
        <Text mt={4}>
          Les présentes conditions générales d'utilisation “conseillers” (dites
          « CGU Conseillers ») fixent le cadre juridique de l'expérimentation de
          la Plateforme Carte Jeune Engagé et définissent les conditions d'accès
          et d'utilisation des services proposés par l'Utilisateur. Toute
          utilisation de la Plateforme est subordonnée à l'acceptation préalable
          et au respect intégral des présentes conditions générales
          d'utilisation.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 2 - Définitions
        </Text>
        <Text mt={4}>
          “L'Editeur” : désigne la Fabrique des ministères sociaux qui développe
          la Plateforme sous la supervision du Délégué interministériel à la
          jeunesse.
        </Text>
        <Text mt={4}>
          “Jeune Engagé” : désigne toute personne physique inscrite dans un
          parcours d'insertion éligible et qui peut bénéficier des offres de
          Carte Jeune Engagé.
        </Text>
        <Text mt={4}>
          “Plateforme” : désigne le back office qui permet aux Utilisateurs de
          renseigner les numéros de téléphone des Jeunes Engagés.
        </Text>
        <Text mt={4}>
          “Service” : désigne toutes les fonctionnalités offertes par la
          Plateforme pour répondre à ses finalités.
        </Text>
        <Text mt={4}>
          “Utilisateur” : désigne le conseiller qui dispose d'un compte sur le
          Service.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 3 - Fonctionnalités et engagements
        </Text>
        <Text mt={4}>
          3.1 Accès au compte: L'Utilisateur accède à la Plateforme en
          renseignant son adresse e-mail professionnelle et son mot de passe.
          Lors de sa première connexion, il doit prendre connaissance et
          accepter les présentes conditions générales d'utilisation.
        </Text>
        <Text mt={4}>
          3.2 Saisie d'informations sur les usagers accompagnés: L'Utilisateur
          renseigne sur la Plateforme sur la base du volontariat, les numéros de
          téléphone des Jeunes Engagés pour qu'ils puissent accéder au
          dispositif Carte Jeune Engagé. Ce numéro permet à l'Éditeur de
          confirmer l'éligibilité des Jeunes Engagés au Service.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 4 - Responsabilités
        </Text>
        <Text mt={4}>
          4.1 L'Éditeur de la Plateforme: Les sources des informations diffusées
          sur la Plateforme sont réputées fiables mais la Plateforme ne garantit
          pas qu'elle soit exempte de défauts, d'erreurs ou d'omissions.
          L'Éditeur s'autorise à suspendre ou révoquer n'importe quel compte et
          toutes les actions réalisées par ce biais, s'il estime que l'usage
          réalisé du service porte préjudice à son image ou ne correspond pas
          aux exigences de sécurité. L'Éditeur s'engage à la sécurisation de la
          Plateforme, notamment en prenant toutes les mesures nécessaires
          permettant de garantir la sécurité et la confidentialité des
          informations fournies. L'Éditeur fournit les moyens nécessaires et
          raisonnables pour assurer un accès continu, sans contrepartie
          financière, à la Plateforme. Il se réserve la liberté de faire
          évoluer, de modifier ou de suspendre, sans préavis, la Plateforme pour
          des raisons de maintenance ou pour tout autre motif jugé nécessaire.
        </Text>
        <Text mt={4}>
          4.2 L'Utilisateur: L'Utilisateur s'assure de garder son mot de passe
          secret. Toute divulgation du mot de passe, quelle que soit sa forme,
          est interdite. Il assume les risques liés à l'utilisation de son
          identifiant et mot de passe. Par ailleurs, l'Utilisateur s'engage à
          renseigner les numéros de téléphone valides et appartenant bien à un
          Jeune Engagé. Il est rappelé que toute personne procédant à une fausse
          déclaration pour elle-même ou pour autrui s'expose, notamment, aux
          sanctions prévues à l'article 441-1 du code pénal, prévoyant des
          peines pouvant aller jusqu'à trois ans d'emprisonnement et 45 000
          euros d'amende. L'Utilisateur s'engage à ne pas mettre en ligne de
          contenus ou informations contraires aux dispositions légales et
          réglementaires en vigueur. L'Utilisateur s'engage à communiquer des
          données strictement nécessaires à sa demande. Il veille
          particulièrement aux données sensibles notamment les données relatives
          aux opinions philosophiques, politiques, syndicales et religieuses. Il
          s'engage notamment à horodater chaque numéro de téléphone renseigné
          sur la Plateforme.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 5 - Mise à jour des conditions générales
        </Text>
        <Text mt={4}>
          Les termes des présentes CGU peuvent être amendés à tout moment, sans
          préavis, en fonction des modifications apportées à la Plateforme, de
          l'évolution de la législation ou pour tout autre motif jugé
          nécessaire. Chaque modification donne lieu à une nouvelle version qui
          est acceptée par l'Utilisateur.
        </Text>

        <Text mt={4} fontWeight="bold">
          Article 6 - Durée
        </Text>
        <Text mt={4}>
          L'adhésion aux présentes CGU est valide pour la durée de l'opération.
          Pour résilier les présentes CGU, la partie en informe l'autre en
          indiquant les motifs de sa décision. Les parties définissent
          conjointement la période de préavis nécessaire avant que la
          résiliation ne soit pleinement effective. Toutefois, cette période ne
          peut excéder un mois. Durant cette période, les deux parties
          s'engagent à assurer le Service selon les présentes conditions
          générales. La présente adhésion est résiliée de plein droit en cas
          d'arrêt du Service sans aucune indemnité d'aucune sorte.
        </Text>
      </Box>
      <Checkbox
        required
        mt={10}
        checked={hasAcceptedCGU}
        onChange={(e) => {
          setHasAcceptedCGU(e.target.checked);
        }}
      >
        J'ai lu et j'accepte les conditions générales d'utilisation
      </Checkbox>
      <Button
        size="lg"
        w={"full"}
        mt={10}
        onClick={onValidate}
        isDisabled={!hasAcceptedCGU}
        isLoading={isLoading}
      >
        Valider
      </Button>
    </BaseModal>
  );
};

export default SupervisorCGUModal;
