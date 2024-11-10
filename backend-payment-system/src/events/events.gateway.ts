import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,  // Đảm bảo interface này được import
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TransactionService } from 'src/transaction/transaction.service';

@WebSocketGateway({
    cors: {
        origin: '*', // Cho phép tất cả các nguồn, có thể thay đổi cho bảo mật
        methods: ['GET', 'POST'],
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;
    constructor(private transactionService: TransactionService) {}  

    // Phương thức afterInit phải nằm trong lớp này và thực thi từ OnGatewayInit
    afterInit(server: Server) {
        console.log('Server initialized');
        // Thực hiện các thao tác sau khi server được khởi tạo
    }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
        // Bạn có thể emit một sự kiện đến client khi họ kết nối
        client.emit('connected', 'Welcome to the WebSocket server');
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string) {
        console.log('Received message from client:', data);
        // Phát tin nhắn tới tất cả client
        this.server.emit('message', `Server received: ${data}`);
    }
    @SubscribeMessage('zalopay-order-status')
    async handleZaloPayOrderStatus(@MessageBody() data: any) {
        console.log('Received Zalopay order status:', data);
        await this.transactionService.addBalanceZalopayOrder(data.userId,data.walletId,data.amount,'completed');
        // // Emit a response if needed
        // this.server.emit('transactionStatus', { status: 'processed' });
    }

}
