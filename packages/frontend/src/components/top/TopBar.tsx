import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'
import 'twin.macro'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export const TopBar = () => {
  return (
    <div tw='sticky top-0 left-0 z-10 bg-white/10 backdrop-blur-lg'>
      <Flex
        tw="items-center whitespace-pre-wrap py-2 px-2 text-center font-semibold text-sm text-black/75 hover:text-black"
      >
        <Link
          href={'/'}
          className="group"
          tw="cursor-pointer ml-4"
        >
          Logo/Title
        </Link>

        <Spacer />

        {/* Rainbowkit Connect Button */}
        <ConnectButton showBalance={false} chainStatus={"icon"}/>

      </Flex>
    </div>
  )
}
