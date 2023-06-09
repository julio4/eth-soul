import { useEffect, useRef, useState } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'

import 'twin.macro'

const AppPage: NextPage = () => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 50.10340217817493,
    lng: 14.450536191137255
  });

  const [zoom, setZoom] = useState<number>(15);

  return (
    <>
      <TopBar />
      <MarkedMap zoom={zoom} center={center}/>
    </>
  )
}

export default AppPage
