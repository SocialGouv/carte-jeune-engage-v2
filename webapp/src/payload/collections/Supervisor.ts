import { type CollectionConfig } from "payload/types";

export const Supervisors: CollectionConfig = {
	slug: "supervisors",
	auth: true,
	labels: {
		singular: "Référent",
		plural: "Référents",
	},
	admin: {
		useAsTitle: "email",
	},
	fields: [
		{
			name: "email",
			type: "email",
			unique: true,
			label: "Email",
		}
	],
};
