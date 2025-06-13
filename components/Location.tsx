import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface FirmaProps {
  setlatitude: (lat: number | undefined) => void;
  setlongitude: (lng: number | undefined) => void;
}
export function useLocationComponent({ setlatitude, setlongitude }: FirmaProps) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setlatitude(location?.coords.latitude);
            setlongitude(location?.coords.longitude);

        }

        getCurrentLocation();
    }, []);

}
