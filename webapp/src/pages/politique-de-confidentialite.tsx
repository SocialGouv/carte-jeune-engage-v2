import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "~/providers/Auth";

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <Heading as="h2" size={{ base: "lg", lg: "2xl" }} mt={10} color="black">
    {children}
  </Heading>
);

export default function PrivacyPolicy() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <VStack
      spacing={8}
      align="left"
      mt={!!user ? 0 : 12}
      py={!!user ? 10 : 0}
      px={{ base: 6, lg: 2 }}
      fontWeight="medium"
      color="secondaryText"
    >
      {!!user && (
        <Button
          colorScheme="whiteBtn"
          onClick={() => {
            router.back();
          }}
          size="md"
          width={8}
          iconSpacing={0}
          px={0}
          rightIcon={<ChevronLeftIcon w={6} h={6} color="black" />}
        />
      )}
      <Heading
        as="h1"
        size={{ base: "xl", lg: "3xl" }}
        fontWeight="extrabold"
        color="black"
      >
        Politique de confidentialité
      </Heading>
      <Divider />
      <Box>
        <SubHeading>Qui est responsable de la plateforme ?</SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Carte Jeune Engagé est une application web qui permet à des
            entreprises partenaires de proposer à des jeunes inscrits dans un
            parcours d’insertion de bénéficier d’avantages sur des biens et
            services de la vie courante.
          </Text>
          <Text>
            Carte Jeune Engagé est développé au sein de la Fabrique des
            ministères sociaux, sous la responsabilité de traitement du Délégué
            interministériel à la jeunesse.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Pourquoi traitons-nous des données à caractère personnel ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Carte Jeune Engagé traite des données à caractère personnel pour
            permettre aux jeunes engagés en dispositif d’insertion d’accéder à
            des avantages sur des biens et services et développer des
            partenariats avec des entreprises pour ajouter des avantages pour
            les jeunes engagés.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Quelles sont les données à caractère personnel que nous traitons ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Carte Jeune Engagé traite les données identifiantes suivantes :
          </Text>
          <Text>
            Données de contact des jeunes : nom, prénom, âge, numéro de
            téléphone, adresse postale, photo (pour la carte à présenter en
            magasin) ;
          </Text>
          <Text>
            Données de contact des conseillers : adresse e-mail professionnelle.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Qu’est-ce qui nous autorise à traiter des données à caractère
          personnel ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Carte Jeune Engagé traite des données à caractère personnel en se
            basant sur l’exécution d’une mission d’intérêt public ou relevant de
            l’exercice de l’autorité publique dont est investi le responsable de
            traitement au sens de l’article 6-1 e) du RGPD.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Pendant combien de temps conservons-nous ces données ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Les données de contact des jeunes sont conservées 2 ans à compter du
            dernier contact et les données de contact des conseillers sont
            conservées 2 ans à compter de la dernière connexion.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>Quels sont vos droits ?</SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Vous disposez :
            <UnorderedList pl={8}>
              <ListItem>
                d’un droit d’information et d’un droit d’accès à vos données ;
              </ListItem>
              <ListItem>d’un droit de rectification ;</ListItem>
              <ListItem>d’un droit d’opposition ;</ListItem>
              <ListItem>d’un droit à la limitation du traitement.</ListItem>
            </UnorderedList>
          </Text>
          <Text>
            Pour les exercer, contactez-nous à l’adresse suivante :
            cje@fabrique.social.gouv.fr
          </Text>
          <Text>
            Puisque ce sont des droits personnels, nous ne traiterons votre
            demande que si nous sommes en mesure de vous identifier. Dans le cas
            où nous ne parvenons pas à vous identifier, nous pouvons être amenés
            à vous demander une preuve de votre identité.
          </Text>
          <Link
            href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces"
            isExternal
          >
            Pour vous aider dans votre démarche, vous trouverez un modèle de
            courrier élaboré par la CNIL ici.
          </Link>
          <Text>
            Nous nous engageons à vous répondre dans un délai raisonnable qui ne
            saurait dépasser 1 mois à compter de la réception de votre demande.
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Qui va avoir accès aux données à caractère personnel ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Les accès aux données sont strictement encadrés et juridiquement
            justifiés. Les personnes suivantes vont avoir accès aux données :
            Les membres de l’équipe de Carte Jeune Engagé qui y ont accès de
            fait (développeurs notamment).
          </Text>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Quelles mesures de sécurité mettons-nous en place ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Nous mettons en place plusieurs mesures pour sécuriser les données :
          </Text>
          <UnorderedList pl={8}>
            <ListItem>Stockage des données en base de données</ListItem>
            <ListItem>Cloisonnement des données</ListItem>
            <ListItem>Mesures de traçabilité</ListItem>
            <ListItem>Surveillance</ListItem>
            <ListItem>
              Protection contre les virus, malwares et logiciels espions
            </ListItem>
            <ListItem>Protection des réseaux</ListItem>
            <ListItem>Sauvegarde</ListItem>
            <ListItem>
              Mesures restrictives limitant l’accès physique aux données à
              caractère personnel
            </ListItem>
          </UnorderedList>
        </VStack>
      </Box>
      <Box>
        <SubHeading>
          Qui nous aide à traiter les données à caractère personnel ?
        </SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Certaines des données sont envoyées à d’autres acteurs, appelés
            “sous-traitants de données”, pour qu’ils nous aident à les traiter.
            Nous nous assurons qu’ils respectent strictement le RGPD et qu’ils
            apportent des garanties suffisantes en matière de confidentialité et
            de sécurité.
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Sous-traitant</Th>
                <Th>Pays destinataire</Th>
                <Th>Traitement réalisé</Th>
                <Th>Garanties</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>OVH</Td>
                <Td>France</Td>
                <Td>Hébergement</Td>
                <Td>
                  <Link
                    href="https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/9e74492-OVH_Data_Protection_Agreement-FR-6.0.pdf"
                    isExternal
                  >
                    Lien Garantie
                  </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>Crisp</Td>
                <Td>France</Td>
                <Td>Outil de chat et de support</Td>
                <Td>
                  <Link
                    href="https://help.crisp.chat/en/article/how-to-sign-my-gdpr-data-processing-agreement-dpa-1wfmngo/"
                    isExternal
                  >
                    Lien Garantie
                  </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </VStack>
      </Box>
      <Box>
        <SubHeading>Cookies et traceurs</SubHeading>
        <Divider mt={3} mb={4} />
        <VStack spacing={4} fontSize={{ base: "md", lg: "2xl" }} align="start">
          <Text>
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </Text>
          <Text>
            En application de l’article 5(3) de la directive 2002/58/CE modifiée
            concernant le traitement des données à caractère personnel et la
            protection de la vie privée dans le secteur des communications
            électroniques, transposée à l’article 82 de la loi n°78-17 du 6
            janvier 1978 relative à l’informatique, aux fichiers et aux
            libertés, les traceurs ou cookies suivent deux régimes distincts.
          </Text>
          <Text>
            Les cookies strictement nécessaires au service ou ayant pour
            finalité exclusive de faciliter la communication par voie
            électronique sont dispensés de consentement préalable au titre de
            l’article 82 de la loi n°78-17 du 6 janvier 1978.
          </Text>
          <Text>
            Les cookies n’étant pas strictement nécessaires au service ou
            n’ayant pas pour finalité exclusive de faciliter la communication
            par voie électronique doivent être consenti par l’utilisateur.
          </Text>
          <Text>
            Ce consentement de la personne concernée pour une ou plusieurs
            finalités spécifiques constitue une base légale au sens du RGPD et
            doit être entendu au sens de l'article 6-a du Règlement (UE)
            2016/679 du Parlement européen et du Conseil du 27 avril 2016
            relatif à la protection des personnes physiques à l'égard du
            traitement des données à caractère personnel et à la libre
            circulation de ces données.
          </Text>
          <Text>
            À tout moment, vous pouvez refuser l’utilisation des cookies et
            désactiver le dépôt sur votre ordinateur en utilisant la fonction
            dédiée de votre navigateur (fonction disponible notamment sur
            Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
            Apple Safari et Opera).
          </Text>
          <Text>
            Pour aller plus loin, vous pouvez consulter les ﬁches proposées par
            la Commission Nationale de l'Informatique et des Libertés (CNIL) :
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
}
