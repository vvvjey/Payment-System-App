import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { IsNotEmpty } from 'class-validator';
// DTO
class DTOWalletRequest{
    @IsNotEmpty()
    userId:number;
    deposit:number;
}
// class CreateWalletRequest{
//     userId:number;
// }

@Controller('wallet')
export class WalletController {
    constructor(private walletService:WalletService){

    }
    @Post('create')
    async createWallet(@Body() body:DTOWalletRequest){
        try {
            const wallet = await this.walletService.createWallet(body.userId);
            return {
                errCode : 0 ,
                errMessage : "Create successfully",
                data:wallet
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Get('get-by-id')
    async getWalletByUserId(@Body() req:DTOWalletRequest){
        try {
            const wallet = await this.walletService.getWalletByUserId(req.userId); 
            console.log("wallet here",wallet)
            return {
                errCode : 0 ,
                errMessage : "Find successfully",
                data:wallet
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Post('add-deposit')
    async addDeposit(@Body() req:DTOWalletRequest){
        try {
        const wallet =await this.walletService.addDeposit(req.userId,req.deposit); 
        return {
            errCode : 0 ,
            errMessage : "Add successfully",
            data: wallet
        }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Get("test")
    async testApi(){
        return {
            errCode:0,
            errMessage:"Hello mn"
        }
    }
}
