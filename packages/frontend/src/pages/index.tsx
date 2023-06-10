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

const HomePage: NextPage = () => {
  const { address, isConnected } = useAccount();

  // const { queries } = useAppoloClient();
  // queries[QueriesTypes.OfferProposals]({ first: 10, offerId: 1 });

  return (
    <>
      {/* Top banner ? */}

      <TopBar />

      <CenterBody tw="mb-20">
        {/* Title */}
        <HomePageTitle />

        {/* Go to app */}
        {isConnected && (
          <div tw='mt-4'>
            <Link href="/app">
              <Button
                colorScheme='green'
              >
                Go to app
              </Button>
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
