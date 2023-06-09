import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback
} from "react";

import { useDeepCompareEffectForMaps } from "./useDeepCompareEffectForMaps";
import mapStyle from "./mapStyle";

import 'twin.macro'

interface MapWindow extends Window {
  google: any;
}

declare const window: MapWindow;

interface MapProps extends google.maps.MapOptions {
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
  onZoomChange?: (zoom: number) => void;
}

const Map = ({
  className,
  onClick,
  onIdle,
  children,
  onZoomChange,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [zoomLevel, setZoomLevel] = useState<number>(options.zoom || 0);

  useEffect(() => {
    setZoomLevel(options.zoom || 0);
  }, [options.zoom]);

  const handleIdle = useCallback(() => {
    const currentZoom = map?.getZoom();
    if (currentZoom !== undefined) {
      setZoomLevel(currentZoom);
        onZoomChange && onZoomChange(currentZoom);
    }
    onIdle && onIdle(map);
  }, [map, onIdle, onZoomChange]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        styles: mapStyle,
      });
      newMap.addListener("zoom_changed", () => {
        const zoom = newMap.getZoom();
        if (zoom !== undefined) {
          setZoomLevel(zoom);
          onZoomChange && onZoomChange(zoom);
        }
      });
  
      setMap(newMap);
    }
  }, [ref, map, onZoomChange]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", handleIdle);
      }
    }
  }, [map, onClick, handleIdle]);

  return (
    <>
      <div ref={ref} className={className} tw="h-screen" />

      {map && Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })
      }
    </>
  )
};

export default Map;
