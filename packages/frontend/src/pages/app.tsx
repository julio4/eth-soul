import { useState, useCallback } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer } from '../types/app'

import 'twin.macro'

const AppPage: NextPage = () => {
  const markers: Offer[] = [
    {
      id: 1,
      price: 1000,
      location: {
        latitude: 50.102425406026136,
        longitude: 14.449577761673018, 
      },
    },
  ];

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 50.10340217817493,
    lng: 14.450536191137255
  });

  const [zoom, setZoom] = useState<number>(15);

  const [highlightedMarker, setHighlightedMarker] = useState<Offer | null>(null);

  const onMarkerClick = useCallback(
    (payload: Offer) => {
      if (highlightedMarker?.id === payload.id) {
        setHighlightedMarker(null);
      } else {
        setHighlightedMarker(payload);
      }
    },
    [highlightedMarker]
  );

  return (
    <>
      <TopBar />
      <MarkedMap
        zoom={zoom}
        center={center}
        markers={markers}
        onMarkerClick={onMarkerClick}
        highlightedMarkerId={highlightedMarker?.id}
      />
    </>
  )
}

export default AppPage
