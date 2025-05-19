import { ToastAndroid } from 'react-native';

export default function Alertas(props: string) {
    return (
        ToastAndroid.showWithGravityAndOffset(
            props,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            50,
            50
        )
  )
}
