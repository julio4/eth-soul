import React, { Dispatch, SetStateAction } from 'react';

interface ZoomContextType {
  zoomLevel: number | null;
  setZoomLevel: Dispatch<SetStateAction<number>> | null;
}

const ZoomContext = React.createContext<ZoomContextType>({
    zoomLevel: 15,
    setZoomLevel: null,
});

export default ZoomContext;