import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { subDays, startOfMonth, endOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionService {
    constructor(private prismaService:PrismaService){

    }
    async createTransaction(walletId:number,amount:number,act_type:string,status:string,transaction_log_message:string,utr:string,content:string){
        try {
            if(!walletId && !act_type && !amount && !status && !transaction_log_message){
                throw new Error("Missingg required parameter");
            }
            const transaction = await this.prismaService.transaction.create({
                data:{
                    wallet_id:walletId,
                    amount:amount,
                    act_type:act_type,
                    status:status,
                    transaction_log_message:transaction_log_message,
                    utr:utr,
                    content:content
                }
            })
            return transaction;
        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
    async getAllTransactionByUserId(userId:number){
        try {
            const wallet = await this.prismaService.wallet.findUnique({
                where:{
                    userId:userId
                }
            })
            if(!wallet){
                throw new Error("This user have no wallet")
            }
            const transactions = await this.prismaService.transaction.findMany({
                where:{
                    wallet_id:wallet.wallet_id
                }
            })
            return transactions
        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
    async getAllTransactionByUserIdByMonth(userId: number, month: number, year: number) {
        try {
            const wallet = await this.prismaService.wallet.findUnique({
                where: { userId: userId }
            });
            if (!wallet) {
                throw new Error("This user has no wallet");
            }

            // Get the start and end of the specified month
            const startOfMonthDate = new Date(year, month - 1, 1); // month is 0-indexed
            const endOfMonthDate = endOfMonth(startOfMonthDate);

            const transactions = await this.prismaService.transaction.findMany({
                where: {
                    wallet_id: wallet.wallet_id,
                    createdAt: {
                        gte: startOfMonthDate, // greater than or equal to start of month
                        lte: endOfMonthDate    // less than or equal to end of month
                    }
                }
            });
            return transactions;
        } catch (error) {
            throw new Error("Error: " + error.message);
        }
    }

    // Get all transactions for the user in the last week
    async getAllTransactionByUserIdLast7Days(userId: number) {
        try {
            const wallet = await this.prismaService.wallet.findUnique({
                where: { userId: userId }
            });
            if (!wallet) {
                throw new Error("This user has no wallet");
            }

            // Calculate the date for one week ago
            const oneWeekAgo = subDays(new Date(), 7); 

            const transactions = await this.prismaService.transaction.findMany({
                where: {
                    wallet_id: wallet.wallet_id,
                    createdAt: {
                        gte: oneWeekAgo,  // greater than or equal to one week ago
                        lte: new Date()   // less than or equal to current date
                    }
                }
            });
            return transactions;
        } catch (error) {
            throw new Error("Error: " + error.message);
        }
    }
    async addBalanceZalopayOrder(userId:number,walletId:number,amount:number,status:string){
        try {
            let transaction = await this.prismaService.transaction.create({
                data:{
                    wallet_id:walletId,
                    act_type:'receive',
                    amount:amount,
                    status:status,
                    transaction_log_message:`Receive zalopay app money successfully with amount ${amount}`
                }
            });
            const updatedWallet = await this.prismaService.wallet.update({
                where: {
                    wallet_id: walletId, 
                },
                data: {
                    balance: {
                        increment: amount, 
                    },
                },
            });
            return {
                transaction,
                updatedWallet,
            };

        } catch (error) {
            throw new Error("Error: " + error.message);
        }
    }
    private generateUTR(): string {
        const prefix = 'NEXPAY';
        const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        const uuid = uuidv4().split('-')[0]; 
        return `${prefix}-${timestamp}-${uuid}`;
    }
}
