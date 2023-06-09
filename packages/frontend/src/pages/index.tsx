import { HomePageTitle } from '@components/home/HomePageTitle'
import { TopBar } from '@components/top/TopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { Button } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import type { NextPage } from 'next'
import 'twin.macro'
import Link from 'next/link'

const HomePage: NextPage = () => {
  const { address, isConnected } = useAccount();
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
