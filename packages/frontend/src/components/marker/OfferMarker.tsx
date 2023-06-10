import { useCallback, useState } from 'react';
import OverlayView from '../map/OverlayView';
import { AnimatePresence, motion } from 'framer-motion';
import { Offer } from '../../types/app';
import { OfferPopUp } from './OfferPopUp';

import tw from 'twin.macro';
import { Category, CategoryDetails } from '@types/category';

interface OfferMarkerProps {
  offer: Offer;
  map?: google.maps.Map;
  onClick: (payload: Offer) => void;
  highlight?: boolean;
}

const OfferMarker = ({ offer, map, onClick, highlight }: OfferMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const width = '15vw'

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    onClick(offer);
  }, [onClick, offer]);

  const categoryEmoji = CategoryDetails[offer.category as Category].emoji

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
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              tw='rounded-full bg-white shadow-lg p-0.5 border border-gray-200'
            >
              <div tw='w-6 h-6'>
                <span tw='text-xl leading-tight'>{categoryEmoji}</span>
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick()}

                  style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
                  tw='hover:cursor-pointer'
                >
                  <OfferPopUp width={width} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </OverlayView >
      )}
    </>
  );
};

export default OfferMarker;
