import { useEffect, useRef, useState } from 'react';
import { CHALLENGE_MAP_FIELDS } from '../../constants';
// @ts-ignore

interface MapProps extends google.maps.MapOptions {
  location: google.maps.LatLngLiteral;
}
export default function ChallengeMap({ location }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pano, setPano] = useState<google.maps.StreetViewPanorama>();

  useEffect(() => {
    async function initMap() {
      const streetViewService = new google.maps.StreetViewService();
      const streetViewRequest = {
        location,
        radius: 10000,
        source: google.maps.StreetViewSource.OUTDOOR,
      };

      let position = null;

      await streetViewService.getPanorama(streetViewRequest, (data, status) => {
        console.log(data);
        console.log(status);
        if (status === google.maps.StreetViewStatus.OK) {
          // @ts-ignore
          position = data.location.latLng;
        } else {
          position = CHALLENGE_MAP_FIELDS.DEFAULT_LOCATION;
        }
      });

      const streetViewPanoramaOptions = {
        addressControl: false,
        fullscreenControl: false,
        linksControl: false,
        showRoadLabels: false,
        position,
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
    }

    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="h-full w-full" />;

  // return <Streetview streetViewPanoramaOptions={streetViewPanoramaOptions} />;
}
