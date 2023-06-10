import Link from 'next/link'
import Image from 'next/image'
import { Flex, Spacer } from '@chakra-ui/react'
import 'twin.macro'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { fetchBalance } from '@wagmi/core'

import logo from "../../../public/images/Logo.svg"

export const TopBar = () => {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<bigint | null>(null);

  useEffect(() => {
    if (address && isConnected) {
      // fetchBalance({
      //   address,
      //   token: TOKEN_ADDRESS,
      // }).then((result) => {
      //   setBalance(result.value);
      // });
      setBalance(BigInt(10000));
    }
  }, [address]);

  return (
    <div tw='sticky top-0 left-0 z-10 bg-transparent backdrop-blur-lg'>
      <Flex
        tw="items-center whitespace-pre-wrap py-2 px-2 text-center font-semibold text-sm text-black/75 hover:text-black"
      >
        <Link
          href={'/'}
          className="group"
          tw="cursor-pointer ml-4 rounded-xl"
        >
          <Image
            priority
            src={logo}
            alt="Sould"
            height={40}
          />
        </Link>

        <Spacer />

        <Flex
          tw="items-center text-center gap-4"
        >
          {balance != null && (
            <button
              tw="rounded-xl bg-white p-2.5 hover:scale-105 transition-all duration-200 ease-in-out" 
            >
              <p>{balance.toString()} SEL</p>
            </button>
          )}

          {/* Rainbowkit Connect Button */}
          <ConnectButton showBalance={false} chainStatus={"icon"}/>
        </Flex>

      </Flex>
    </div>
  )
}
