import { AuthGuard } from "@nestjs/passport";

export class MyJWTGuard extends AuthGuard('jwt'){

};