import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MapProps extends google.maps.MapOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  guessSubmitted: boolean;
  flightPath: google.maps.Polyline | undefined;
  setFlightPath: (flightPath: google.maps.Polyline) => void;
  path: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  onClick?: (event: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export default function GuessMap({
  children,
  center,
  guessSubmitted,
  zoom,
  flightPath,
  setFlightPath,
  path,
  onClick,
  onIdle,
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!flightPath) {
      setFlightPath(
        new google.maps.Polyline({
          path: [],
          // geodesic: true,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0,
          strokeWeight: 3,
        })
      );
    }

    if (ref.current && !map) {
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        gestureHandling: 'cooperative',
        streetViewControl: false,
        mapTypeControl: false,
      };

      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
    if (map && flightPath) {
      flightPath.setMap(map);
    }
  }, [ref, center, zoom, map, flightPath, setFlightPath]);

  useEffect(() => {
    if (map && guessSubmitted && flightPath) {
      flightPath.setPath(path);
      const bound = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(path[0].lat, path[0].lng),
        new window.google.maps.LatLng(path[1].lat, path[1].lng)
      );
      map.fitBounds(bound);
    }
  }, [guessSubmitted, map, center, zoom, flightPath, path]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick && !guessSubmitted) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle, guessSubmitted]);

  return (
    <>
      <div ref={ref} className="h-full w-full" />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return cloneElement(child, { map });
        }
        return null;
      })}
    </>
  );
}

GuessMap.defaultProps = {
  onClick: () => {},
  onIdle: () => {},
};
