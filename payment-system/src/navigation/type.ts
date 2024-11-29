import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import type { RouteProp } from '@react-navigation/native';
type RootStackParamList = {
    QRCodeScreen : {userId : number | undefined}
    Home: undefined
    CameraHandleQRCode:undefined
    LoginScreen:undefined
    RegisterScreen:undefined
    WebviewZaloPayScreen:{amount : string | undefined}
    DepositWithdraw: undefined;
    ConfirmPayment: undefined;
    PaymentSuccess: {amount:string,contentSend:string,nameUser:string,utrCode:string};
    CreateWebviewZaloPay:undefined;
    ConfirmPaymentInsideWallet: {receiverId:number;amount:string;contentSend:string }
    InputMoney:{receiverId:number }
}
export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type ScreenQRCodeRouteProp = RouteProp<RootStackParamList,"QRCodeScreen">
export type ScreenQRCodeZaloQRRouteProp = RouteProp<RootStackParamList,"WebviewZaloPayScreen">
export type ScreenMoneyInputRouteProp = RouteProp<RootStackParamList,"InputMoney">
export type ScreenConfirmPaymentRouteProp = RouteProp<RootStackParamList,"ConfirmPaymentInsideWallet">
export type ScreenPaymentSuccessRouteProp = RouteProp<RootStackParamList,"PaymentSuccess">
