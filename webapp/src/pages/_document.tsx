import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html lang="en">
			<Head >
				<script
					type="text/javascript"
					src="/static/tarteaucitron/tarteaucitron.js"
				/>
				<script
					type="text/javascript"
					src="/static/tarteaucitron/initTarteaucitron.js"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
