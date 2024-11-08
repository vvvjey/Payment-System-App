import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { EventsGateway } from 'src/events/events.gateway';
@Module({
  controllers: [WalletController],
  providers: [WalletService,TransactionService,
    // EventsGateway
  ],
})
export class WalletModule {}
