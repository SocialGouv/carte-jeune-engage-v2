import { User } from "~/payload/payload-types";
import { getBaseUrl } from "./tools";

export const getHtmlPassAccepted = (user: User) => {
  return `
    <p>Bonjour${user.firstName ? ` ${user.firstName}` : ""},</p>
    <p>Votre carte CJE est prête pour toutes les réductions en magasin.</p>
    <p>Activez les offres en magasin qui vous intéressent pour en bénéficier en présentant votre carte.</p>
    <a href="${getBaseUrl()}/dashboard/wallet">Rendez-vous ici</a>
    <p>Carte "jeune engagé"</p>
  `;
};

export const getHtmlPassRejected = (user: User) => {
  return `
    <p>Bonjour${user.firstName ? ` ${user.firstName}` : ""},</p>
    <p>Pour vos réductions en magasin, la photo que vous avez envoyé pour créer votre carte CJE ne correspond pas aux critères.</p>
    <p>Vous pouvez ajoutez une autre photo dès maintenant pour créer votre carte CJE.</p>
    <a href="${getBaseUrl()}/dashboard/account">Rendez-vous ici</a>
    <p>Carte "jeune engagé"</p>
  `;
};
