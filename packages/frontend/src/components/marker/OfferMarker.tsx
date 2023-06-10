import { useCallback, useMemo, useContext, useState } from 'react';
import OverlayView from '../map/OverlayView';
import { motion } from 'framer-motion';
import { Offer } from '../../types/app';
import { AnimatePresence } from 'framer-motion';
import ZoomContext from '@shared/zoomContext';
import { CategoryDetails, Category } from '../../types/category';

import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react';
import { OfferPopUp } from './OfferPopUp';

import tw from 'twin.macro';
import PinIcon from './PinIcon';

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

  const width = useMemo(() => {
    if (!zoomLevel) return '25%';
    if (zoomLevel === 15) return '20%';
    if (zoomLevel === 14) return '15%';
    if (zoomLevel === 13) return '10%';
    if (zoomLevel <= 12) return '8%';
    return '30%';
  }, [zoomLevel]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    onClick(offer);
  }, [onClick, offer]);

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
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <PinIcon category={offer.category} onClick={handleClick} />
            </div>
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
