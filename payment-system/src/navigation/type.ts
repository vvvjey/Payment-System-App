import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import type { RouteProp } from '@react-navigation/native';
type RootStackParamList = {
    Home: undefined
    QRCodeScreen : {walletId : number | undefined}
    CameraHandleQRCode:undefined
}
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type ScreenQRCodeRouteProp = RouteProp<RootStackParamList,"QRCodeScreen">  