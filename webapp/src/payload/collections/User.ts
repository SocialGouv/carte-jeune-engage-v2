import { type CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
	slug: "users",
	auth: true,
	labels: {
		singular: "Utilisateur",
		plural: "Utilisateurs",
	},
	admin: {
		useAsTitle: "email",
	},
	fields: [
		{
			name: "phone_number",
			type: "text",
			required: true,
			unique: true,
			label: "Numéro de téléphone",
		},
		{
			name: "firstName",
			type: "text",
			label: "Prénom",
		},
		{
			name: "lastName",
			type: "text",
			label: "Nom",
		},
		{
			name: "address",
			type: "text",
			label: "Adresse",
		},
		{
			name: "image",
			type: "upload",
			label: "Photo de profil",
			relationTo: "media",
		},
		{
			name: "status_image",
			type: "select",
			label: "Statut de la photo de profil",
			defaultValue: "pending",
			options: [
				{
					label: "En attente",
					value: "pending",
				},
				{
					label: "Validée",
					value: "approved",
				},
				{
					label: "Refusée",
					value: "rejected",
				},
			],
		},
		{
			name: "preferences",
			type: "relationship",
			label: "Préférences",
			relationTo: "categories",
			hasMany: true,
		},
	],
};
