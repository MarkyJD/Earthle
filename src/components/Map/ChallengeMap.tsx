import { useEffect, useRef, useState } from 'react';
// @ts-ignore

interface MapProps extends google.maps.MapOptions {
  location: any;
}
export default function ChallengeMap({ location }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pano, setPano] = useState<google.maps.StreetViewPanorama>();
  useEffect(() => {
    const streetViewPanoramaOptions = {
      addressControl: false,
      fullscreenControl: false,
      linksControl: false,
      showRoadLabels: false,
      position: { lat: 46.9171876, lng: 17.8951832 },
      pov: { heading: 100, pitch: 0 },
      zoom: 1,
      panControl: false,
      streetViewControl: false,
      clickToGo: false,
    };
    if (ref.current && !pano) {
      const panorama = new window.google.maps.StreetViewPanorama(
        ref.current,
        streetViewPanoramaOptions
      );

      if (panorama) {
        setPano(panorama);
      }
    }
  }, [pano]);

  return <div ref={ref} className="h-full w-full" />;

  // return <Streetview streetViewPanoramaOptions={streetViewPanoramaOptions} />;
}
