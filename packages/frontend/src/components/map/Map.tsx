import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  ReactNode
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
}

const Map = ({
  className,
  onClick,
  onIdle,
  children,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        styles: mapStyle,
      }));
    }
  }, [ref, map]);

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
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} className={className} tw="h-screen"/>

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
