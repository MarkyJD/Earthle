import { useEffect, useRef, useState } from 'react';

interface MapProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onClick?: (event: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}
export default function GuessMap({ center, zoom, onClick, onIdle }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return <div ref={ref} className="h-full w-full" />;
}

GuessMap.defaultProps = {
  onClick: () => {},
  onIdle: () => {},
};
