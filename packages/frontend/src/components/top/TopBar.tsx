import Link from 'next/link'
import Image from 'next/image'
import { Flex, Spacer, Box, useDisclosure } from '@chakra-ui/react'
import 'twin.macro'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { fetchBalance } from '@wagmi/core'
import { CgProfile } from 'react-icons/cg'
import { ProfileDrawer } from '../profile/ProfileDrawer'

import logo from '../../../public/images/Logo.svg'
import { CONTRACT_ADDRESS } from '@utils/const'

export const TopBar = ({ hideBg = false }: { hideBg?: boolean }) => {
	const { address, isConnected } = useAccount()
	const [balance, setBalance] = useState<bigint | null>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		if (address && isConnected) {
			fetchBalance({
				address,
				token: CONTRACT_ADDRESS,
			})
				.then((result) => {
					setBalance(result.value)
				})
				.catch((error) => {
					// If the contract call fails, we display a custom message
					console.error('Please check your chain ID. The contract may not be deployed on this chain.')
				})

			setBalance(BigInt(10000))
		}
	}, [address, isConnected])

	return (
		<>
			<div
				tw="sticky top-0 left-0 z-10 bg-transparent backdrop-blur-lg"
				css={{
					backdropFilter: hideBg ? 'none' : 'blur(16px)',
				}}
			>
				<Flex tw="items-center whitespace-pre-wrap py-2 px-2 text-center font-semibold text-sm text-black/75 hover:text-black">
					<Link href={'/'} className="group" tw="ml-4 cursor-pointer rounded-xl">
						<Image priority src={logo} alt="Sould" height={40} />
					</Link>

					<Spacer />

					<Flex tw="items-center gap-4 text-center">
						<Box backgroundColor="white" tw="rounded-xl p-2">
							<CgProfile tw="cursor-pointer text-gray-500" size={28} color={'#2D3748'} onClick={onOpen} />
						</Box>
						{balance != null && (
							<button tw="rounded-xl bg-white p-2.5 transition-all duration-200 ease-in-out hover:scale-105">
								<p>{balance.toString()} SEL</p>
							</button>
						)}

						{/* Rainbowkit Connect Button */}
						<ConnectButton showBalance={false} chainStatus={'icon'} />
					</Flex>
				</Flex>
			</div>
			<ProfileDrawer isOpen={isOpen} onClose={onClose} isConnected={isConnected} />
		</>
	)
}
