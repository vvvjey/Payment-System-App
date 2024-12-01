import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { TransactionService } from './transaction.service';
class DTOTransactionRequest{
    userId:number;
    month:number;
    year:number;
    // params:json;
}
@Controller('transaction')
export class TransactionController {
    constructor(private transactionService : TransactionService){

    }
    @Get('get-all-transactions-by-user-id/:params')
    async getAllTransactionByUserId(@Param('params') params:string){
        try {
            console.log('get all transaction',params)
            let data = JSON.parse(params)
            let {userId} = data

            const transactions = await this.transactionService.getAllTransactionByUserId(userId);
            return {
                errCode : 0 ,
                errMessage : "Find transactions successfully successfully",
                data:transactions
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Get('get-all-transactions-by-month-user-id/:params')
    async getAllTransactionByUserIdByMonth(@Param('params') params:string){
        try {
            console.log('get data fe pass to',params)
            let data = JSON.parse(params)
            let {userId,year,month} = data
            const transactions = await this.transactionService.getAllTransactionByUserIdByMonth(userId,month,year);
            return {
                errCode : 0 ,
                errMessage : `Find all transactions in month : ${month} - year : ${year} successfully`,
                data:transactions
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Get('get-all-transactions-last-7days-by-user-id/:params')
    async getAllTransactionByUserIdLast7Days(@Param('params') params:string){
        try {
            console.log('get data fe pass to',params)
            let data = JSON.parse(params)
            let {userId} = data
            const transactions = await this.transactionService.getAllTransactionByUserIdLast7Days(userId);
            return {
                errCode : 0 ,
                errMessage : `Find all transactions last 7 days successfully`,
                data:transactions
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
}
