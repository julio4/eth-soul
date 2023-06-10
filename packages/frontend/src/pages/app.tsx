/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useCallback } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer } from '../types/app'
import { Category } from '../types/category'

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
      category: Category.PET_CARE
    },
    {
      id: 2,
      price: 100,
      location: {
        latitude: 50.106576158326526,
        longitude: 14.4458621243181541
      },
      category: Category.LENDING_HOME_SERVICES
    },
    {
      id: 3,
      price: 500,
      location: {
        latitude: 50.107593822962535,
        longitude: 14.453795834816791
      },
      category: Category.EDUCATION_TUTORING
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
        highlightedMarker={highlightedMarker}
      />
    </>
  )
}

export default AppPage
