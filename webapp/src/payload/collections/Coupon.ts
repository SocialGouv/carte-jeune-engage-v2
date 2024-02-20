import dynamic from "next/dynamic";
import type { Props } from "payload/components/views/List";
import { type CollectionConfig } from "payload/types";

const ImportCoupons = dynamic<Props>(
	() => import("../components/ImportCoupons"),
	{
		ssr: false,
	}
);

export const Coupons: CollectionConfig = {
	slug: "coupons",
	labels: {
		singular: "Bon de réduction",
		plural: "Bons de réduction",
	},
	fields: [
		{
			name: "code",
			type: "text",
			label: "Code",
			required: true,
		},
		{
			name: "used",
			type: "checkbox",
			label: "Utilisé",
			admin: {
				description: "Cette case est cochée si le coupon a été utilisé",
				position: "sidebar",
			},
			defaultValue: false,
		},
		{
			name: "usedAt",
			type: "date",
			label: "Date d'utilisation",
			admin: {
				position: "sidebar",
				// readOnly: true,
			},
		},
		{
			name: "user",
			type: "relationship",
			label: "Utilisateur",
			relationTo: "users",
			hasMany: false,
		},
		{
			name: "assignUserAt",
			type: "date",
			label: "Date d'attribution",
			admin: {
				// readOnly: true,
			},
		},
		{
			name: "offer",
			type: "relationship",
			label: "Offre",
			relationTo: "offers",
			hasMany: false,
			required: true,
		},
	],
	hooks: {
		afterChange: [
			async ({ doc, previousDoc, operation, req, context }) => {
				if (context.triggerAfterChange === false) {
					return;
				}
				if (operation === "update") {
					if (doc.used !== previousDoc.used) {
						const usedAt = doc.used ? new Date().toISOString() : null;
						req.payload.update({
							collection: "coupons",
							id: doc.id,
							data: {
								usedAt,
								used: doc.used,
							},
							context: {
								triggerAfterChange: false,
							},
						});

						doc.usedAt = usedAt;
					} else if (doc.user !== previousDoc.user) {
						const assignUserAt = doc.user ? new Date().toISOString() : null;
						req.payload.update({
							collection: "coupons",
							id: doc.id,
							data: {
								assignUserAt,
								user: typeof doc.user === "object" ? doc.user.id : doc.user,
							},
							context: {
								triggerAfterChange: false,
							},
						});

						doc.assignUserAt = assignUserAt;
					}
				}
			},
		],
	},
	admin: {
		components: {
			BeforeListTable: [ImportCoupons],
		},
	},
};
