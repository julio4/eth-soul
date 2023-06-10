/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useCallback } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer, Author } from '../types/app'
import { Category } from '../types/category'

import 'twin.macro'

const AppPage: NextPage = () => {

  const defaultAuthor: Author = {
    id: 1,
    name: 'Jean V.',
    isVerified: true,
    numberOfReviews: 17,
    rating: {
      numberOfReviews: 17,
      average: 4.5,
    },
  };

  const markers: Offer[] = [
    {
      id: 1,
      price: 1000,
      location: {
        latitude: 50.102425406026136,
        longitude: 14.449577761673018,
      },
      category: Category.PET_CARE,
      author: defaultAuthor,
      title: 'Dog walking',
      description: "Calling all dog lovers! Need someone to give your furry friend some exercise? Look no further! I'm a fitness enthusiast who adores dogs and is ready to take your pup on exciting walks. With me, your canine companion will get the exercise and attention they need. Let's keep those tails wagging!",
    },
    {
      id: 2,
      price: 100,
      location: {
        latitude: 50.106576158326526,
        longitude: 14.4458621243181541
      },
      category: Category.LENDING_HOME_SERVICES,
      author: defaultAuthor,
      title: "Handy Tools for Borrow!",
      description: "DIY enthusiasts, I've got you covered! I'm a handy neighbor with a collection of tools ready to lend a helping hand. From hammers to drills, you can borrow the tools you need for your home projects. No need to invest in expensive equipment—simply borrow and get the job done. Let's tackle those DIY dreams together!",
    },
    {
      id: 3,
      price: 500,
      location: {
        latitude: 50.107593822962535,
        longitude: 14.453795834816791
      },
      category: Category.EDUCATION_TUTORING,
      author: defaultAuthor,
      title: "Tutoring Services for Academic Success!",
      description: "Struggling with your studies? Don't worry, I'm here to help! As an experienced and dedicated tutor, I offer personalized tutoring services to help you excel in your academic pursuits. From math and science to language arts, I'll provide the guidance and support you need to achieve your goals. Let's unlock your full potential and achieve academic success together!"
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
