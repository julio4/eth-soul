import { useCallback, useState } from 'react'
import OverlayView from '../map/OverlayView'
import { AnimatePresence, motion } from 'framer-motion'
import { Offer } from '../../types/app'
import { OfferPopUp } from './OfferPopUp'
import { Category, CategoryDetails } from '@types/category'

interface OfferMarkerProps {
	offer: Offer
	map?: google.maps.Map
	onClick: (payload: Offer) => void
	highlight?: boolean
}

const OfferMarker = ({ offer, map, onClick, highlight }: OfferMarkerProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

	const width = '15vw'

	const handleMouseEnter = () => {
		setIsHovered(true)
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
	}

	const handleMouseLeave = () => {
		const timeoutId = setTimeout(() => {
			setIsHovered(false)
		}, 300)
		setTimeoutId(timeoutId)
	}

	const handleClick = useCallback(() => {
		onClick(offer)
	}, [onClick, offer])

	const categoryEmoji = offer.category ? CategoryDetails[offer.category as Category].emoji : '🏠'

	return (
		<>
			{map && (
				<OverlayView
					position={{
						lat: offer.location.latitude as number,
						lng: offer.location.longitude as number,
					}}
					map={map}
					zIndex={highlight || isHovered ? 99 : 0}
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: Math.random() * 0.3 },
						}}
						exit={{ opacity: 0 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 10,
						}}
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.98 }}
					>
						<button
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							tw="rounded-full border border-gray-200 bg-white p-0.5 shadow-lg"
						>
							<div tw="h-6 w-6">
								<span tw="text-xl leading-tight">{categoryEmoji}</span>
							</div>
						</button>
						<AnimatePresence>
							{isHovered && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										type: 'spring',
										stiffness: 260,
										damping: 20,
									}}
									onMouseEnter={() => {
										if (isHovered) {
											if (timeoutId) {
												clearTimeout(timeoutId)
											}
										}
									}}
									onMouseLeave={handleMouseLeave}
									onClick={() => handleClick()}
									style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
									tw="hover:cursor-pointer"
								>
									<OfferPopUp width={width} offer={offer} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</OverlayView>
			)}
		</>
	)
}

export default OfferMarker
