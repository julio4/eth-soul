import Link from 'next/link'
import { Flex, Spacer } from '@chakra-ui/react'
import 'twin.macro'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export const TopBar = () => {
  return (
    <>
      <Flex
        tw="z-10 items-center whitespace-pre-wrap py-2 px-2 text-center font-semibold backdrop-blur-lg text-sm text-black/75 hover:text-black"
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
        <ConnectButton />

      </Flex>
    </>
  )
}
