import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

// interface CreateWalletResponse {
//     wallet?: {
//         createdAt: Date;
//         updatedAt: Date;
//         wallet_id: number;
//         userId: number;
//         balance: number;
//     };
//     error?: string;
// }
@Injectable()
export class WalletService {
    constructor(
        private prismaService:PrismaService,
        private transactionService:TransactionService
    ){   
    }
    async createWallet(userId:number){
        try {
            const userExists = await this.prismaService.user.findUnique({
                where: { id: userId },
            });
            if (!userExists) {
                throw new Error('User does not exist'); 
            }
            const wallet = await this.prismaService.wallet.create({
                data:{
                    userId:userId,
                    balance:0
                }
            })
            return { wallet };
        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
    async getWalletByUserId(userId:number){
        try {
            const wallet = await this.prismaService.wallet.findUnique({
                where:{
                    userId:userId
                }
            })
            if(!wallet){
                throw new Error("Cannot find this wallet");
            }
            console.log('helo') 
            return wallet;
        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
    async addDeposit(userId:number,deposit:number){
        try {
            const updatedWallet = await this.prismaService.wallet.update({
                where:{
                    userId:userId
                },
                data:{
                    balance:{
                        increment:deposit
                    }
                }
            })
            if(!updatedWallet){
                throw new Error("Cannot find this wallet");
            }
            const transaction = await this.transactionService.createTransaction(
                updatedWallet.wallet_id,
                deposit,
                'deposit',
                'completed',
                'add deposit successfully'
            );
            if(!transaction){
                throw new Error("Save transaction fail");
            }
            return {updatedWallet,transaction};
        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
    async tranferMoney(senderWalletId:number,receiverWalletId:number,amount:number){
        try {
            // 1. Validate sender's wallet
            const senderWallet = await this.prismaService.wallet.findUnique({
                where: { wallet_id: senderWalletId },
                include:{
                    user:true
                }
            });
            if (!senderWallet) {
                throw new Error('Sender wallet does not exist');
            }
            // 2. Validate receiver's wallet
            const receiverWallet = await this.prismaService.wallet.findUnique({
                where: { wallet_id: receiverWalletId },
                include: {
                    user: true, 
                },
            });
            if (!receiverWallet) {
                throw new Error('Receiver wallet does not exist');
            }
             // 3. Check if sender has enough balance
             if (senderWallet.balance < amount) {
                throw new Error('Insufficient funds in sender wallet');
            }
            // 4. Update sender's wallet (deduct amount)
            const updatedSenderWallet = await this.prismaService.wallet.update({
                where: { wallet_id: senderWalletId },
                data: {
                    balance: {
                        decrement: amount,
                    },
                },
            });
            // 5. Update receiver's wallet (add amount)
            const updatedReceiverWallet = await this.prismaService.wallet.update({
                where: { wallet_id: receiverWalletId },
                data: {
                    balance: {
                        increment: amount,
                    },
                },
            });
            const senderTransaction = await this.transactionService.createTransaction(
                senderWalletId,
                amount,
                'send',
                'completed',
                `Money sent to ${receiverWallet.user.firstName} ${receiverWallet.user.lastName} (userID: ${receiverWallet.user.id})`
            );
    
            // 7. Create a transaction for the receiver
            const receiverTransaction = await this.transactionService.createTransaction(
                receiverWalletId,
                amount,
                'receive',
                'completed',
                `Money received from ${senderWallet.user.firstName} ${senderWallet.user.lastName} (userID: ${senderWallet.user.id})`
            );
            return {
                errCode:0,
                errMessage:"Tranfer successfully ",
                senderTransaction,
                receiverTransaction
            }

        } catch (error) {
            throw new Error("Errror : "+ error.message);
        }
    }
}
