import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import type { RouteProp } from '@react-navigation/native';
type RootStackParamList = {
    Home: undefined
    QRCodeScreen : {walletId : number | undefined}
    CameraHandleQRCode:undefined
    LoginScreen:undefined
    RegisterScreen:undefined
    WebviewZaloPayScreen:{amount : string | undefined}
    DepositWithdraw: undefined;
    ConfirmPayment: undefined;
    PaymentSuccess: undefined;
    CreateWebviewZaloPay:undefined;
}
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type ScreenQRCodeRouteProp = RouteProp<RootStackParamList,"QRCodeScreen">
export type ScreenQRCodeZaloQRRouteProp = RouteProp<RootStackParamList,"WebviewZaloPayScreen">
