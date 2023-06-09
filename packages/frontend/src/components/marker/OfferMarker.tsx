import { useCallback, useMemo } from 'react'
import OverlayView from '../map/OverlayView'
import { motion } from 'framer-motion'
import { Offer } from '../../types/app'
import { AnimatePresence } from 'framer-motion'

import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { OfferPopUp } from './OfferPopUp'

import tw from 'twin.macro'

interface OfferMarkerProps {
    offer: Offer
    map?: google.maps.Map
    onClick: (payload: Offer) => void
    highlight?: boolean
}

const OfferMarker = ({ offer, map, onClick, highlight }: OfferMarkerProps) => {
    const price = useMemo(() => {
        return offer.price
    }, [offer])

    const handleClick = useCallback(() => {
        onClick(offer)
    }, [onClick, offer])

    return (
        <>
            {map && highlight && (
                <OverlayView
                    position={{
                        lat: offer.location.latitude as number,
                        lng: offer.location.longitude as number,
                    }}
                    map={map}
                    zIndex={99}
                >
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            <OfferPopUp width="20%" />
                        </motion.div>
                    </AnimatePresence>
                </OverlayView>
            )}
            {map && (
                <OverlayView
                    position={{
                        lat: offer.location.latitude as number,
                        lng: offer.location.longitude as number,
                    }}
                    map={map}
                    zIndex={highlight ? 99 : 0}
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
                            stiffness: 400,
                            damping: 20,
                        }}
                    >
                        {highlight ? (
                            <button
                                tw="rounded-full bg-gray-400 py-2 px-2 font-bold text-xs text-white transition-all hover:drop-shadow"
                                onClick={handleClick}
                            >
                                {`T ${price}`}
                            </button>
                        ) : (
                            <button
                                tw="rounded-full bg-white py-2 px-2 font-bold text-xs text-gray-600 transition-all hover:(scale-105 drop-shadow)"
                                onClick={handleClick}
                            >
                                {`T ${price}`}
                            </button>
                        )}
                    </motion.div>
                </OverlayView>
            )}
        </>
    )
}

export default OfferMarker
