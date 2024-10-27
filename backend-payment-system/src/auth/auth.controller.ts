import { Controller,Post,Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){
    }
    @Post("register")
    async register(@Body() body: AuthDTO){
        console.log('hehe',body)
        const user = await this.authService.register(body);
        try {
            return {
                errCode:0,
                errMessage:"Register successfully",
                user
            } 
        } catch (error) {
            return {
                errCode:1,
                errMesage : error.message
            }            
        }
    }
    @Post("login")
    login(@Body() body: AuthDTO) {
        return this.authService.login(body);
    }
    
}