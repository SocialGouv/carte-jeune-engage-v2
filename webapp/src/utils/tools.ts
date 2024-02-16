export const convertFrenchDateToEnglish = (
	frenchDate: string
): string | null => {
	const match = frenchDate.match(/^(\d{2})\/(\d{2})\/(\d{2})$/);

	if (match) {
		const [, day, month, year] = match.map(Number);

		if (year !== undefined && month !== undefined && day !== undefined) {
			// Creating a Date object with a four-digit year
			const englishFormattedDate = new Date(2000 + year, month - 1, day);

			// Using toISOString to get the date in ISO format (YYYY-MM-DD)
			return englishFormattedDate.toISOString().split("T")[0] || null;
		}
	}

	// Return null if the input format is incorrect
	return null;
};

export const frenchPhoneNumber = /^(?:\+33[1-9](\d{8})|(?!.*\+\d{2}).{10})$/;

export const payloadOrPhoneNumberCheck = (phone_number: string) => {
	const hasDialingCode = phone_number.startsWith('+')

	return {
		or: [
			{ phone_number: { equals: hasDialingCode ? phone_number : `+33${phone_number.substring(1)}` } },
			{ phone_number: { equals: hasDialingCode ? `0${phone_number.substring(3)}` : phone_number } },
		]
	}
}