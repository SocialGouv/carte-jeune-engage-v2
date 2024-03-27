import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {

	const getTarteAuCitronInitByEnv = () => {
		switch (process.env.NEXT_PUBLIC_ENV_APP) {
			case "preproduction":
				return <script
					type="text/javascript"
					src="/static/tarteaucitron/env/preprod/initTarteaucitron.js"
				/>
			case "production":
				return <script
					type="text/javascript"
					src="/static/tarteaucitron/env/prod/initTarteaucitron.js"
				/>
		}
	}
	return (
		<Html lang="en">
			<Head >
				<script
					type="text/javascript"
					src="/static/tarteaucitron/tarteaucitron.js"
				/>
				{getTarteAuCitronInitByEnv()}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
