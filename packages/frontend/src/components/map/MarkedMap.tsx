import { FC, PropsWithChildren, useState, useEffect } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import Map from './Map'
import { Offer } from '../../types/app'
import OfferMarker from '../marker/OfferMarker'
import GoogleMapsMarker from '@components/marker/GoogleMapsMarker'
import ZoomContext from '@utils/zoomContext'
import { DetailedOffer } from '../offer/DetailedOffer'

import 'twin.macro'
import { useDisclosure } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

interface MarkedMapProps {
  onIdle?: (map: google.maps.Map) => void
  onClick?: (e: google.maps.MapMouseEvent) => void
  onMarkerClick: (payload: Offer) => void
  markers?: Offer[]
  center: google.maps.LatLngLiteral
  zoom: number
  highlightedMarker?: Offer | null
  clickable?: boolean
  targetPos?: google.maps.LatLng | null
  setTargetPos?: (pos: google.maps.LatLng) => void
}

const MarkedMap = ({
  onClick,
  onIdle,
  zoom,
  center,
  markers,
  onMarkerClick,
  highlightedMarker,
  clickable = false,
  targetPos,
  setTargetPos
}: MarkedMapProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(zoom);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (highlightedMarker) {
      onOpen();
    } else {
      onClose();
    }
  }, [highlightedMarker, onOpen, onClose]);

  const render = (status: Status) => {
    console.log('Map status', status)
    return <></>
  }

  const handleOnTargetDrag = (e: google.maps.KmlMouseEvent) => {
    if (e.latLng === null) return;
    if (setTargetPos) {
      setTargetPos(e.latLng);
      console.log('Target position dragged to', e.latLng.toJSON())
    }
  }

  return (
    <ZoomContext.Provider value={{ zoomLevel, setZoomLevel }}>

      <div tw="absolute flex min-h-full min-w-full flex-col">
        <main tw="relative flex grow flex-col">
          <Wrapper
            apiKey={
              process.env
                .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
            }
            render={render}
          >
            <Map
              center={center}
              zoom={zoom}
              minZoom={14}
              maxZoom={18}
              onIdle={onIdle}
              onClick={(e) => {
                if (!clickable) return
                if (onClick)
                  onClick(e)
              }}
              onZoomChange={setZoomLevel}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              zoomControl={false}
              clickableIcons={false}
              draggableCursor={clickable ? 'crosshair' : 'default'}
              disableDoubleClickZoom={clickable}
            >
              {!clickable && markers?.map((marker) => (
                <OfferMarker
                  key={marker.id}
                  offer={marker}
                  onClick={onMarkerClick}
                  highlight={
                    highlightedMarker?.id === marker.id}
                />
              ))}
              {clickable && targetPos && (
                <GoogleMapsMarker
                  key={100 + targetPos?.lat() + targetPos?.lng()}
                  position={targetPos}
                  draggable={true}
                  onDrag={handleOnTargetDrag}
                />
              )}
            </Map>
            {
              highlightedMarker && (
                <DetailedOffer offer={highlightedMarker} isOpen={isOpen} onClose={onClose} />
              )
            }
          </Wrapper>
        </main>
      </div>
    </ZoomContext.Provider>

  )
}

export default MarkedMap
