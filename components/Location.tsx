import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocationComponent() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [latitude, setlatitude] = useState<number | undefined>(undefined);
    const [longitude, setlongitude] = useState<number | undefined>(undefined);

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



    return { latitude, longitude };

}
