import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { TransactionService } from './transaction.service';
class DTOTransactionRequest{
    @IsNotEmpty()
    userId:number;
    month:number;
    year:number;
}
@Controller('transaction')
export class TransactionController {
    constructor(private transactionService : TransactionService){

    }
    @Get('get-all-transactions-by-user-id')
    async getAllTransactionByUserId(@Body() body:DTOTransactionRequest){
        try {
            const transactions = await this.transactionService.getAllTransactionByUserId(body.userId);
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
    @Get('get-all-transactions-by-month-user-id')
    async getAllTransactionByUserIdByMonth(@Body() body:DTOTransactionRequest){
        try {
            const transactions = await this.transactionService.getAllTransactionByUserIdByMonth(body.userId,body.month,body.year);
            return {
                errCode : 0 ,
                errMessage : `Find all transactions in month : ${body.month} - year : ${body.year} successfully`,
                data:transactions
            }
        } catch (error) {
            return {
                errCode : 1,
                errMessage : error.message
            }
        }
    }
    @Get('get-all-transactions-last-7days-by-user-id')
    async getAllTransactionByUserIdLast7Days(@Body() body:DTOTransactionRequest){
        try {
            const transactions = await this.transactionService.getAllTransactionByUserIdLast7Days(body.userId);
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
