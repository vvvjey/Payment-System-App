import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { WalletService } from "src/wallet/wallet.service";
@Injectable({})
export class AuthService{
    constructor(
        private prismaService: PrismaService,
        private jwtService:JwtService,
        private configService:ConfigService,
        private walletService:WalletService
    ){

    }
    async register(authDTO: AuthDTO){
        try {
            console.log("data register",authDTO);
            let hassedPassword = await argon.hash(authDTO.password);
            const user = await this.prismaService.user.create({
                data:{
                    phoneNumber:authDTO.phoneNumber,
                    email:authDTO.email,
                    hassedPassword:hassedPassword,
                    firstName:'',
                    lastName:''
                },
                select:{
                    id:true,
                    phoneNumber:true,
                    createdAt:true
                }

            });
            const newWallet  = await this.walletService.createWallet(user.id);
            // const jwtToken = await this.signJwtToken(user.id,user.email);
            // return {
            //     newWallet,
            //     jwtToken
            // }

        } catch (error) {
            throw new ForbiddenException("Error",error.message)
        }
        
    }
    async login(authDTO : AuthDTO){
        try {
            console.log("auuth",authDTO)
            let user = await this.prismaService.user.findUnique({
                where:{
                    phoneNumber: authDTO.phoneNumber
                },
                select:{
                    id:true,
                    email:true,
                    firstName:true,
                    phoneNumber:true,
                    hassedPassword:true,
                }
            });
            if(!user){
                throw new ForbiddenException("User not exist")
            }  
            const passwordMatched = await argon.verify(
                user.hassedPassword,
                authDTO.password
            );

            if(!passwordMatched){
                throw new ForbiddenException("Incorrect password")
            }
            console.log(3);
            const { hassedPassword, ...userWithoutPassword } = user; // Create a new object without hassedPassword

            const accessToken = await this.signJwtToken(user.id,user.phoneNumber);
            console.log("access",accessToken)
            return {
                user:userWithoutPassword,
                accessToken
            };
            

        } catch (error) {
            console.log("error",error);
            throw new ForbiddenException("Error 1"+error)
        }
    }
    async signJwtToken(userId:number,email:string):Promise<{accessToken:string}>{
        const payload = {
            sub:userId,
            email
        };
        const jwtString = await this.jwtService.signAsync(payload,{
            expiresIn:'10m',
            secret:this.configService.get("JWT_SECRET")
        });
        return {
            accessToken:jwtString
        } 
    }
}