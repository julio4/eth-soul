
import { FC, PropsWithChildren } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from './Map'

import 'twin.macro'

interface MarkedMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  // onMarkerClick: (payload: TODO) => void;
  // markers?: TODO[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  highlightedMarkerId?: string;
}

const MarkedMap = ({
  onClick,
  onIdle,
  zoom,
  center,
  // markers,
  // onMarkerClick,
  // highlightedMarkerId,
}: MarkedMapProps) => {
  const render = (status: Status) => {
    console.log("Map status", status)
    return (
      <></>
    )
  }

  return (
    <>
      <div tw="absolute flex min-h-full min-w-full flex-col">
        <main tw="relative flex grow flex-col">
          <Wrapper 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            render={render}
          >
            <Map
              center={center}
              zoom={zoom}
              minZoom={2}
              maxZoom={18}
              onIdle={onIdle}
              onClick={onClick}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              zoomControl={false}
              clickableIcons={false}
            >
              {/* markers here */}
            </Map>
          </Wrapper>
        </main>
      </div>
    </>
  )
}

export default MarkedMap