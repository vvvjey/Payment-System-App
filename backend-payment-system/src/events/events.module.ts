// src/events/events.module.ts
import { Module,Global  } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { TransactionService } from 'src/transaction/transaction.service';
@Global()
@Module({
  providers: [EventsGateway,TransactionService],
  exports: [EventsGateway],

})
export class EventsModule {}
