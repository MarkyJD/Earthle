import { useContext, useEffect, useRef, useState } from 'react';
import { CHALLENGE_MAP_FIELDS } from '../../constants';
import GameContext from '../../contexts/GameContext';
// @ts-ignore

interface MapProps extends google.maps.MapOptions {
  location: google.maps.LatLngLiteral;
}
export default function ChallengeMap({ location }: MapProps) {
  // @ts-ignore
  const { getTrueLocation } = useContext(GameContext);
  const ref = useRef<HTMLDivElement>(null);
  const [pano, setPano] = useState<google.maps.StreetViewPanorama>();

  useEffect(() => {
    async function initMap() {
      const streetViewService = new google.maps.StreetViewService();
      const streetViewRequest = {
        location,
        radius: CHALLENGE_MAP_FIELDS.RADIUS,
        source: google.maps.StreetViewSource.OUTDOOR,
      };

      let position = null;

      await streetViewService.getPanorama(streetViewRequest, (data, status) => {
        console.log(data);
        console.log(status);
        let isDefault = true;
        if (status === google.maps.StreetViewStatus.OK) {
          // @ts-ignore
          position = data.location.latLng;
          isDefault = false;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } else {
          position = CHALLENGE_MAP_FIELDS.DEFAULT_LOCATION;
        }

        getTrueLocation(position, isDefault);
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
