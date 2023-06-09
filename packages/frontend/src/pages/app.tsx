import { TopBar } from '@components/top/TopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import type { NextPage } from 'next'
import 'twin.macro'

const AppPage: NextPage = () => {
  const { address, isConnected } = useAccount();
  return (
    <>
      {/* <TopBanner /> */}
      <TopBar />

      <CenterBody tw="mb-20">
        <div>Todo</div>
        {/* Greeter.sol Contract Interactions */}
        {/* <GreeterContractInteractions /> */}
      </CenterBody>
    </>
  )
}

export default AppPage
