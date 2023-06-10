import { useCallback, useMemo, useContext, useState } from 'react';
import OverlayView from '../map/OverlayView';
import { motion } from 'framer-motion';
import { Offer } from '../../types/app';
import { AnimatePresence } from 'framer-motion';
import ZoomContext from '@shared/zoomContext';
import { CategoryDetails, Category } from '../../types/category';
import { IconType } from 'react-icons';

import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import { OfferPopUp } from './OfferPopUp';

import tw from 'twin.macro';

interface OfferMarkerProps {
  offer: Offer;
  map?: google.maps.Map;
  onClick: (payload: Offer) => void;
  highlight?: boolean;
}

const OfferMarker = ({ offer, map, onClick, highlight }: OfferMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { zoomLevel } = useContext(ZoomContext);

  const price = useMemo(() => {
    return offer.price;
  }, [offer]);

  const width = '15vw'
  // useMemo(() => {
  //   if (!zoomLevel) return '25%';
  //   if (zoomLevel === 15) return '20%';
  //   if (zoomLevel === 14) return '15%';
  //   if (zoomLevel === 13) return '10%';
  //   if (zoomLevel <= 12) return '8%';
  //   return '30%';
  // }, [zoomLevel]);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsHovered(true);
  }, [timeoutId]);

  const handleMouseLeave = useCallback(() => {
    const id = setTimeout(() => {
      setIsHovered(false);
      setTimeoutId(null);
    }, 200);
    setTimeoutId(id);
  }, []);

  const handleClick = useCallback(() => {
    onClick(offer);
  }, [onClick, offer]);

  const IconComponent: IconType = CategoryDetails[offer.category as Category].icon;

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
              stiffness: 400,
              damping: 20,
            }}
          >

            <button
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              tw='rounded-full bg-white shadow-lg p-1.5 ring-1 ring-green-400'
            >
              <IconComponent
                size={18}
                style={{
                  position: 'relative',
                  color: 'black',
                }}
              />
            </button>
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
                style={{ position: 'absolute', top: 0, right:0, left: 0, bottom: 0 }}
                tw='hover:cursor-default'
              >
                <OfferPopUp width={width} />
              </motion.div>
            )}
          </motion.div>
        </OverlayView>
      )}
    </>
  );
};

export default OfferMarker;
