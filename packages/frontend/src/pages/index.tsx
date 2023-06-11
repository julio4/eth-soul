import { HomePageTitle } from '@components/home/HomePageTitle'
import { TopBar } from '@components/top/TopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { Button } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import type { NextPage } from 'next'
import 'twin.macro'
import Link from 'next/link'
import { useAppoloClient } from '@hooks/AppoloClientHook/useAppoloClient'
import { QueriesTypes } from '@hooks/AppoloClientHook/types'
import MarkedMap from '@components/map/MarkedMap'
import { Offer } from '@types/app'
import { TopBanner } from '@components/top/TopBanner'

const center = {
	lat: 50.10340217817493,
	lng: 14.450536191137255,
}

const HomePage: NextPage = () => {
	const { address, isConnected } = useAccount()

	// const { queries } = useAppoloClient();
	// queries[QueriesTypes.Offers]({ first: 10 });

	return (
		<>
			{/* Top banner ? */}
			{/* <TopBanner /> */}

			<TopBar hideBg={true} />

			<MarkedMap
				zoom={15}
				center={center}
				markers={[]}
				onMarkerClick={function (payload: Offer): void {
					throw new Error('Function not implemented.')
				}}
				tw="z-0"
			/>

			<CenterBody tw="absolute min-h-screen w-full backdrop-blur-lg">
				{/* Title */}
				<HomePageTitle />

				{/* Go to app */}
				{isConnected && (
					<div tw="mt-4">
						<Link href="/app">
							<Button colorScheme="green">Go to app</Button>
						</Link>
					</div>
				)}

				{/* Greeter.sol Contract Interactions */}
				{/* <GreeterContractInteractions /> */}
			</CenterBody>
		</>
	)
}

export default HomePage
