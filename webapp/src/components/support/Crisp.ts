"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

type CrispProps = {
	onClose: () => void;
}

const CrispChat = (props: CrispProps) => {
	const { onClose } = props;
	useEffect(() => {
		Crisp.configure(process.env.NEXT_PUBLIC_CRISP_TOKEN as string, {
			autoload: false
		});
		Crisp.chat.open()
		Crisp.chat.show()
		Crisp.chat.onChatClosed(() => {
			Crisp.chat.hide()
			onClose()
		})
	}, [])

	return null
}

export default CrispChat