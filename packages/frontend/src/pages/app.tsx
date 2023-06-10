/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useCallback } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer, Author } from '../types/app'
import { Category } from '../types/category'
import { generateAuthor } from '../utils/randomAuthor'

import 'twin.macro'
import { randomBytes } from 'crypto'

const AppPage: NextPage = () => {

    const markers: Offer[] = [
      {
        id: 1,
        price: 1000,
        location: {
          latitude: 50.102425406026136,
          longitude: 14.449577761673018,
        },
        images: [
          "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwbG92ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
          "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=834&q=80",
          "https://images.unsplash.com/photo-1511657304136-7d9f56e0d574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
        ],
        category: Category.PET_CARE,
        author: generateAuthor(),
        title: 'Dog walking',
        description: "Calling all dog lovers! <br/> Need someone to give your furry friend some exercise? Look no further! I'm a fitness enthusiast who adores dogs and is ready to take your pup on exciting walks. With me, your canine companion will get the exercise and attention they need. Let's keep those tails wagging!",
      },
      {
        id: 2,
        price: 100,
        location: {
          latitude: 50.106576158326526,
          longitude: 14.4458621243181541
        },
        category: Category.LENDING_HOME_SERVICES,
        author: generateAuthor(),
        title: "Handy Tools for Borrow!",
        description: "DIY enthusiasts, I've got you covered! <br/> I'm a handy neighbor with a collection of tools ready to lend a helping hand. From hammers to drills, you can borrow the tools you need for your home projects. No need to invest in expensive equipment—simply borrow and get the job done. Let's tackle those DIY dreams together!",
      },
      {
        id: 3,
        price: 500,
        location: {
          latitude: 50.107593822962535,
          longitude: 14.453795834816791
        },
        category: Category.EDUCATION_TUTORING,
        author: generateAuthor(),
        title: "Tutoring Services for Academic Success!",
        description: "Struggling with your studies? Don't worry, I'm here to help! <br/> As an experienced and dedicated tutor, I offer personalized tutoring services to help you excel in your academic pursuits. From math and science to language arts, I'll provide the guidance and support you need to achieve your goals. Let's unlock your full potential and achieve academic success together!"
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
